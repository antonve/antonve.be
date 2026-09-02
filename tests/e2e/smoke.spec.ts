import { expect, test, type Page } from '@playwright/test'

const browserErrors = new WeakMap<Page, string[]>()

test.beforeEach(async ({ page }) => {
  const errors: string[] = []
  browserErrors.set(page, errors)
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', error => errors.push(error.message))

  await page.route('https://fonts.googleapis.com/**', route =>
    route.fulfill({ contentType: 'text/css', body: '' }),
  )
})

test.afterEach(async ({ page }, testInfo) => {
  const errors = browserErrors.get(page) ?? []
  const unexpected = errors.filter(
    message =>
      !(
        testInfo.title.includes('404') &&
        message.includes('status of 404')
      ),
  )
  expect(unexpected, 'unexpected browser console/page errors').toEqual([])
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

    const app = document.querySelector<HTMLElement>('#__next > div')
    const heading = document.querySelector<HTMLElement>('h1')
    const resources = performance
      .getEntriesByType('resource')
      .map(entry => entry.name)
      .filter(url => /\/_next\/static\/media\/.*\.woff2(?:\?|$)/.test(url))

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

  const favicon = await page.request.get('/favicon.ico')
  expect(favicon.status()).toBe(200)
  expect(favicon.headers()['content-type']).toContain('image')

  const missing = await page.goto('/this-route-does-not-exist')
  expect(missing?.status()).toBe(404)
  await expect(page.getByText('This page could not be found')).toBeVisible()
  await expect(page).toHaveScreenshot('404.png', {
    animations: 'disabled',
    fullPage: true,
  })

  const removedPost = await page.goto('/posts/migration-plan')
  expect(removedPost?.status()).toBe(404)
  await expect(page.getByText('This page could not be found')).toBeVisible()
})
