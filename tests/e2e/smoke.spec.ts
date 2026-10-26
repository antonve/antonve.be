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

// Phones fold the navigation behind a Menu disclosure.
async function openMenu(page: Page, isMobile: boolean) {
  const nav = page.getByRole('navigation')
  if (isMobile) await nav.locator('summary').click()
  return nav
}

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
  isMobile,
}) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Anton Van Eechaute')
  await expect(
    page.getByRole('heading', { name: /Anton Van Eechaute/ }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Recent writing' }),
  ).not.toBeVisible()

  // The cartoon avatar is decorative, so it has no accessible name.
  for (const image of [page.getByRole('img', { name: 'Anton Van Eechaute' }), page.locator('main img')]) {
    await image.scrollIntoViewIfNeeded()
    await expect(image).toBeVisible()
    await expect(image).toHaveJSProperty('complete', true)
    expect(await image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  }

  // The avatar must hold up at 2x, or the drawing smears on sharp screens.
  const avatar = await page.locator('main img').evaluate(element => ({
    natural: (element as HTMLImageElement).naturalWidth,
    rendered: element.getBoundingClientRect().width,
  }))
  expect(avatar.natural).toBeGreaterThanOrEqual(2 * avatar.rendered)

  await expect(page).toHaveScreenshot('home.png', {
    animations: 'disabled',
    fullPage: true,
  })

  await (await openMenu(page, isMobile)).getByRole('link', { name: 'Projects', exact: true }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible()
  await expect(page).toHaveScreenshot('projects.png', {
    animations: 'disabled',
    fullPage: true,
  })

  await (await openMenu(page, isMobile)).getByRole('link', { name: 'Bookshelf', exact: true }).click()
  await expect(page).toHaveURL(/\/books$/)
  await expect(page.getByRole('heading', { name: 'Bookshelf' })).toBeVisible()
  await expect(page).toHaveScreenshot('books.png', {
    animations: 'disabled',
    fullPage: true,
  })
})

test('static routes, favicon, and 404 remain available', async ({ page, isMobile }) => {
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
  const avatar = await page.locator('main img').getAttribute('src')
  expect(avatar).toMatch(/^\/_astro\/.+\.webp$/)
  const image = await page.request.get(avatar!)
  expect(image.status()).toBe(200)
  expect(image.headers()['content-type']).toBe('image/webp')
  expect((await image.body()).length, 'avatar bytes').toBeLessThan(15_000)
  expect(image.headers()['cache-control']).toBe('public, max-age=31536000, immutable')

  const missing = await page.goto('/this-route-does-not-exist')
  expect(missing?.status()).toBe(404)
  await expect(
    page.getByRole('heading', { name: 'Page not found', exact: true }),
  ).toBeVisible()
  await expect(page).toHaveTitle('404: Page not found :: Anton Van Eechaute')
  await expect(page.locator('script')).toHaveCount(0)
  await expect(page).toHaveScreenshot('404.png', {
    animations: 'disabled',
    fullPage: true,
  })
  await expect((await openMenu(page, isMobile)).getByRole('link', { name: 'Home', exact: true })).toBeVisible()

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

test('blog index links to every post, and each post renders', async ({ page, isMobile }) => {
  const response = await page.goto('/blog')
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { name: 'Blog', exact: true })).toBeVisible()

  const posts = await page.locator('main li > a').evaluateAll(links =>
    links.map(link => ({ path: link.getAttribute('href')!, title: link.textContent!.trim() })),
  )
  // The navigation only offers Blog once there is something to read.
  await expect((await openMenu(page, isMobile)).getByRole('link', { name: 'Blog', exact: true })).toHaveCount(posts.length ? 1 : 0)
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
    await (await openMenu(page, isMobile)).getByRole('link', { name: 'Blog', exact: true }).click()
    await expect(page).toHaveURL(/\/blog$/)
  }
})

test('phones fold the navigation into a menu that fits a 360px screen', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 })
  await page.goto('/blog')
  const posts = await page.locator('main li > a').evaluateAll(links => links.map(link => link.getAttribute('href')!))
  const labels = posts.length ? ['Home', 'Blog', 'Projects', 'Bookshelf'] : ['Home', 'Projects', 'Bookshelf']
  for (const path of ['/', '/projects', '/books', '/blog', ...posts]) {
    await page.goto(path)
    const nav = page.getByRole('navigation')
    const menu = nav.locator('summary')
    await expect(menu).toHaveAccessibleName('Menu')
    await expect(nav.getByRole('link')).toHaveCount(0)

    await menu.click()
    await expect(nav.getByRole('link')).toHaveText(labels)
    const edge = await page.locator('body > div').evaluate(
      container => container.getBoundingClientRect().right - parseFloat(getComputedStyle(container).paddingRight),
    )
    for (const link of await nav.getByRole('link').all()) {
      const box = (await link.boundingBox())!
      expect(box.x + box.width, `${await link.textContent()} past the page edge on ${path}`).toBeLessThanOrEqual(edge + 0.5)
    }
    const button = (await menu.boundingBox())!
    expect(button.x + button.width, `menu button past the screen on ${path}`).toBeLessThanOrEqual(360)
    if (path === '/') await expect(page).toHaveScreenshot('menu-open.png', { animations: 'disabled' })

    await menu.click()
    await expect(nav.getByRole('link')).toHaveCount(0)
  }
})

test('desktop keeps the navigation inline', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 740 })
  await page.goto('/')
  const nav = page.getByRole('navigation')
  await expect(nav.locator('summary')).toBeHidden()
  await expect(nav.getByRole('link')).toContainText(['Home', 'Projects', 'Bookshelf'])
})

test('the avatar peeks in from the bottom-left corner without covering text', async ({ page }) => {
  for (const [width, height] of [[360, 740], [1024, 768], [1280, 720], [1920, 1080]]) {
    await page.setViewportSize({ width, height })
    await page.goto('/')
    const placement = await page.locator('main img').evaluate(element => {
      const box = element.getBoundingClientRect()
      const text = [...document.querySelectorAll('main :is(h1, h2, p, dt, dd)')].map(node => node.getBoundingClientRect())
      return {
        left: box.left,
        bottom: box.bottom + scrollY,
        pageHeight: document.documentElement.scrollHeight,
        covered: text.filter(r => r.left < box.right && box.left < r.right && r.top < box.bottom && box.top < r.bottom).length,
      }
    })
    expect(placement.left, `${width}x${height}`).toBe(0)
    expect(placement.bottom, `${width}x${height}`).toBeCloseTo(placement.pageHeight, 0)
    expect(placement.covered, `${width}x${height}`).toBe(0)
    // A screen taller than the content keeps the avatar in its corner without scrolling.
    if (height === 1080) expect(placement.pageHeight).toBe(height)
  }
})

test('5xx error pages preserve statuses and working navigation', async ({ page, isMobile }) => {
  for (const status of [500, 502, 503, 504]) {
    const response = await page.goto(`${process.env.E2E_ERROR_BASE_URL}/__test/${status}`)
    expect(response?.status()).toBe(status)
    await expect(page.getByRole('heading', { name: 'Something went wrong', exact: true })).toBeVisible()
    await expect(page).toHaveTitle('Server error: Something went wrong :: Anton Van Eechaute')
    await expect((await openMenu(page, isMobile)).getByRole('link', { name: 'Home', exact: true })).toBeVisible()
    await expect(page.locator('script')).toHaveCount(0)
  }
  await page.getByRole('link', { name: 'Back to home', exact: true }).click()
  await expect(page.getByRole('heading', { name: /Anton Van Eechaute/ })).toBeVisible()
})

test('ships no JavaScript', async ({ page }) => {
  for (const path of ['/', '/projects', '/books', '/blog']) {
    await page.goto(path)
    await expect(page.locator('script')).toHaveCount(0)
  }
})

test.describe('with JavaScript disabled', () => {
  test.use({ javaScriptEnabled: false })

  test('navigation and the 404 page still work', async ({ page, isMobile }) => {
    await page.goto('/')
    await expect(page.locator('main img')).toBeVisible()
    await (await openMenu(page, isMobile)).getByRole('link', { name: 'Projects', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible()
    await (await openMenu(page, isMobile)).getByRole('link', { name: 'Bookshelf', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Bookshelf' })).toBeVisible()
    const missing = await page.goto('/this-route-does-not-exist')
    expect(missing?.status()).toBe(404)
    await expect(
      page.getByRole('heading', { name: 'Page not found', exact: true }),
    ).toBeVisible()
    await page.getByRole('link', { name: 'Back to home', exact: true }).click()
    await expect(page).toHaveURL(/\/$/)
  })
})

test('keyboard navigation, hover state, and contact link', async ({ page, isMobile }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  if (isMobile) {
    await expect(page.getByRole('navigation').locator('summary')).toBeFocused()
    await page.keyboard.press('Enter')
    await page.keyboard.press('Tab')
  }
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
