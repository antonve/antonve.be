import { expect, test, type Locator, type Page } from '@playwright/test'

const browserErrors = new WeakMap<Page, string[]>()
const scriptRequests = new WeakMap<Page, string[]>()

test.beforeEach(async ({ page }) => {
  const errors: string[] = []
  browserErrors.set(page, errors)
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', error => errors.push(error.message))

  const scripts: string[] = []
  scriptRequests.set(page, scripts)
  page.on('request', request => {
    if (request.resourceType() === 'script') scripts.push(request.url())
  })

})

test.afterEach(async ({ page }, testInfo) => {
  const errors = browserErrors.get(page) ?? []
  const unexpected = errors.filter(
    message =>
      !(
        (testInfo.title.includes('404') && message.includes('status of 404')) ||
        (testInfo.title.includes('5xx') && /status of 50[0234]/.test(message))
      ),
  )
  expect(unexpected, 'unexpected browser console/page errors').toEqual([])
  expect(scriptRequests.get(page), 'script requests').toEqual([])
})

test('self-hosts Open Sans and Merriweather', async ({ page }) => {
  const externalFontRequests: string[] = []
  page.on('request', request => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url())) {
      externalFontRequests.push(request.url())
    }
  })

  await page.goto('/')

  const fontState = await page.evaluate(async () => {
    await document.fonts.ready

    const app = document.querySelector<HTMLElement>('body > div')
    const heading = document.querySelector<HTMLElement>('h1')
    const resources = performance
      .getEntriesByType('resource')
      .map(entry => entry.name)
      .filter(url => /\/_astro\/.*\.woff2(?:\?|$)/.test(url))

    return {
      appFamily: app ? getComputedStyle(app).fontFamily : '',
      headingFamily: heading ? getComputedStyle(heading).fontFamily : '',
      faces: Array.from(document.fonts).map(font => ({
        family: font.family.replaceAll('"', ''),
        status: font.status,
      })),
      resources,
    }
  })

  expect(fontState.appFamily).toContain('Open Sans')
  expect(fontState.headingFamily).toContain('Merriweather')
  expect(fontState.faces).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ family: 'Open Sans', status: 'loaded' }),
      expect.objectContaining({ family: 'Merriweather', status: 'loaded' }),
    ]),
  )
  expect(fontState.resources.length).toBeGreaterThanOrEqual(2)
  expect(externalFontRequests).toEqual([])
})

test('home renders content, local images, and working navigation', async ({
  page,
}) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Anton Van Eechaute')
  await expect(
    page.getByRole('heading', { name: /Anton Van Eechaute/ }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Recent writing' }),
  ).not.toBeVisible()

  for (const name of ['Anton Van Eechaute', 'Headshot']) {
    const image = page.getByRole('img', { name })
    await expect(image).toBeVisible()
    await expect(image).toHaveJSProperty('complete', true)
    expect(await image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  }

  await expect(page).toHaveScreenshot('home.png', {
    animations: 'disabled',
    fullPage: true,
  })

  await page.getByRole('link', { name: 'Projects', exact: true }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible()
  await expect(page).toHaveScreenshot('projects.png', {
    animations: 'disabled',
    fullPage: true,
  })

  await page.getByRole('link', { name: 'Bookshelf', exact: true }).click()
  await expect(page).toHaveURL(/\/books$/)
  await expect(page.getByRole('heading', { name: 'Bookshelf' })).toBeVisible()
  await expect(page).toHaveScreenshot('books.png', {
    animations: 'disabled',
    fullPage: true,
  })
})

test('static routes, favicon, and 404 remain available', async ({ page }) => {
  for (const path of ['/projects', '/books']) {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
  }

  const trailingSlash = await page.goto('/projects/')
  expect(trailingSlash?.status()).toBe(200)
  await expect(page).toHaveURL(/\/projects$/)

  const favicon = await page.request.get('/favicon.ico')
  expect(favicon.status()).toBe(200)
  expect(favicon.headers()['content-type']).toContain('image')

  const redirect = await page.request.get('/projects/?from=nav', {
    maxRedirects: 0,
  })
  expect(redirect.status()).toBe(308)
  expect(redirect.headers().location).toBe('/projects?from=nav')

  await page.goto('/')
  const headshot = await page.getByRole('img', { name: 'Headshot' }).getAttribute('src')
  expect(headshot).toMatch(/^\/_astro\/.+\.webp$/)
  const image = await page.request.get(headshot!)
  expect(image.status()).toBe(200)
  expect(image.headers()['content-type']).toBe('image/webp')
  expect(image.headers()['cache-control']).toBe('public, max-age=31536000, immutable')

  const missing = await page.goto('/this-route-does-not-exist')
  expect(missing?.status()).toBe(404)
  await expect(
    page.getByRole('heading', { name: 'Page not found', exact: true }),
  ).toBeVisible()
  await expect(page).toHaveTitle('404: Page not found :: Anton Van Eechaute')
  await expect(page.getByRole('navigation')).toBeVisible()
  await expect(page.locator('script')).toHaveCount(0)
  await expect(page).toHaveScreenshot('404.png', {
    animations: 'disabled',
    fullPage: true,
  })

  for (const path of [
    '/posts/migration-plan',
    '/nested/missing/page',
    '/404',
    '/50x',
    '/404.html',
    '/50x.html',
    '/index',
    '/projects.html',
  ]) {
    const response = await page.goto(path)
    expect(response?.status()).toBe(404)
    await expect(
      page.getByRole('heading', { name: 'Page not found', exact: true }),
    ).toBeVisible()
  }

  await page.getByRole('link', { name: 'Back to home', exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/$/)
  await expect(
    page.getByRole('heading', { name: /Anton Van Eechaute/ }),
  ).toBeVisible()
})

// Posts show "October 2026"; the native tooltip reveals "October 25, 2026".
async function expectMonthWithFullDateOnHover(dates: Locator, count: number) {
  await expect(dates).toHaveCount(count)
  for (const date of await dates.all()) {
    await expect(date).toHaveText(/^[A-Z][a-z]+ \d{4}$/)
    await expect(date).toHaveAttribute('title', /^[A-Z][a-z]+ \d{1,2}, \d{4}$/)
    await expect(date).toHaveAttribute('datetime', /^\d{4}-\d{2}-\d{2}$/)
  }
}

test('blog index links to every post, and each post renders', async ({ page }) => {
  const response = await page.goto('/blog')
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { name: 'Blog', exact: true })).toBeVisible()

  const posts = await page.locator('main li > a').evaluateAll(links =>
    links.map(link => ({ path: link.getAttribute('href')!, title: link.textContent!.trim() })),
  )
  // The navigation only offers Blog once there is something to read.
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Blog', exact: true })).toHaveCount(posts.length ? 1 : 0)
  if (posts.length === 0) await expect(page.getByText('No posts yet.')).toBeVisible()
  await expectMonthWithFullDateOnHover(page.locator('main li time'), posts.length)

  for (const { path, title } of posts) {
    const post = await page.goto(path)
    expect(post?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
    await expect(page).toHaveTitle(`${title} :: Anton Van Eechaute`)
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', `https://antonve.be${path}`)
    await expect(page.locator('script')).toHaveCount(0)
    await expectMonthWithFullDateOnHover(page.locator('article time'), 1)
    const author = page.getByRole('region', { name: 'About the author' })
    await expect(author).toBeVisible()
    await expect(author).toContainText('Anton Van Eechaute is a Belgian software engineer in Tokyo, building AI systems at Third Intelligence.')
    await expect(author.getByRole('link', { name: 'Third Intelligence' })).toHaveAttribute('href', 'https://third-intelligence.com')
    await expect(author.getByRole('link')).toHaveText(['Third Intelligence', 'Twitter', 'GitHub', 'LinkedIn'])
    await expect(author.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/antonve')
    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect(image).toHaveJSProperty('complete', true)
      expect(await image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    }
    await page.getByRole('navigation').getByRole('link', { name: 'Blog', exact: true }).click()
    await expect(page).toHaveURL(/\/blog$/)
  }
})

test('navigation fits on a 360px-wide phone', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 })
  await page.goto('/blog')
  const posts = await page.locator('main li > a').evaluateAll(links => links.map(link => link.getAttribute('href')!))
  for (const path of ['/', '/projects', '/books', '/blog', ...posts]) {
    await page.goto(path)
    const overflow = await page.locator('nav a').evaluateAll(links => {
      const container = document.querySelector<HTMLElement>('body > div')!
      const right = container.getBoundingClientRect().right - parseFloat(getComputedStyle(container).paddingRight)
      return links.filter(link => link.getBoundingClientRect().right > right + 0.5).map(link => link.textContent)
    })
    expect(overflow, `nav links past the page edge on ${path}`).toEqual([])
  }
})

test('5xx error pages preserve statuses and working navigation', async ({ page }) => {
  for (const status of [500, 502, 503, 504]) {
    const response = await page.goto(`${process.env.E2E_ERROR_BASE_URL}/__test/${status}`)
    expect(response?.status()).toBe(status)
    await expect(page.getByRole('heading', { name: 'Something went wrong', exact: true })).toBeVisible()
    await expect(page).toHaveTitle('Server error: Something went wrong :: Anton Van Eechaute')
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.locator('script')).toHaveCount(0)
  }
  await page.getByRole('link', { name: 'Back to home', exact: true }).click()
  await expect(page.getByRole('heading', { name: /Anton Van Eechaute/ })).toBeVisible()
})

test('ships no JavaScript and works with it disabled', async ({
  page,
  browser,
}) => {
  for (const path of ['/', '/projects', '/books', '/blog']) {
    await page.goto(path)
    await expect(page.locator('script')).toHaveCount(0)
  }

  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: process.env.E2E_BASE_URL,
  })
  const noScript = await context.newPage()
  await noScript.goto('/')
  await expect(noScript.getByRole('img', { name: 'Headshot' })).toBeVisible()
  await noScript.getByRole('link', { name: 'Projects', exact: true }).click()
  await expect(noScript.getByRole('heading', { name: 'Projects' })).toBeVisible()
  await noScript.getByRole('link', { name: 'Bookshelf', exact: true }).click()
  await expect(noScript.getByRole('heading', { name: 'Bookshelf' })).toBeVisible()
  const missing = await noScript.goto('/this-route-does-not-exist')
  expect(missing?.status()).toBe(404)
  await expect(
    noScript.getByRole('heading', { name: 'Page not found', exact: true }),
  ).toBeVisible()
  await noScript.getByRole('link', { name: 'Back to home', exact: true }).click()
  await expect(noScript).toHaveURL(/\/$/)
  await context.close()
})

test('keyboard navigation, hover state, and contact link', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Home', exact: true })).toBeFocused()
  // Blog sits next to Home once there are posts.
  const blog = page.getByRole('navigation').getByRole('link', { name: 'Blog', exact: true })
  if (await blog.count()) {
    await page.keyboard.press('Tab')
    await expect(blog).toBeFocused()
  }
  await page.keyboard.press('Tab')
  const projects = page.getByRole('link', { name: 'Projects', exact: true })
  await expect(projects).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/projects$/)

  const chat = page.getByRole('link', { name: 'chat' })
  await expect(chat).toHaveAttribute('href', 'mailto:mail@antonve.be')
  await expect(chat).toHaveCSS('color', 'rgb(255, 34, 90)')
  await chat.hover()
  await expect(chat).toHaveCSS('color', 'rgb(38, 38, 38)')
  await expect
    .poll(() => chat.evaluate(link => getComputedStyle(link, '::after').transform))
    .toBe('matrix(1, 0, 0, 1, 0, 0)')

  await page.goto('/books')
  const book = page.locator('main section li a').first()
  await book.focus()
  await expect(book).toBeFocused()
  await expect(book).toHaveCSS('color', 'rgb(255, 34, 90)')
})
