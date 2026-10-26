import { expect, test } from '@playwright/test'

test.use({ javaScriptEnabled: false })

const pages = [
  {
    path: '/',
    name: 'Home',
    title: 'Anton Van Eechaute',
    description: 'Anton Van Eechaute is a software engineer from Belgium, based in Tokyo, building AI systems and tools that help others build software.',
  },
  {
    path: '/projects',
    name: 'Projects',
    title: 'Anton Van Eechaute :: Projects',
    description: 'Software projects by Anton Van Eechaute, including Tadoku, a language immersion platform, and hsfp.tokyo, a Japanese visa points calculator.',
  },
  {
    path: '/books',
    name: 'Bookshelf',
    title: 'Anton Van Eechaute :: Bookshelf',
    description: 'Anton Van Eechaute’s reading log: books on software engineering, teams, careers, and personal finance, read in English and Japanese.',
  },
  {
    path: '/blog',
    name: 'Blog',
    title: 'Anton Van Eechaute :: Blog',
    description: 'Articles and notes by Anton Van Eechaute.',
  },
]

for (const { path, name, title, description } of pages) {
  test(`${name} returns static sharing metadata and a loadable preview image`, async ({ page }, testInfo) => {
    const response = await page.goto(`${path}?utm_source=share#preview`)
    expect(response?.status()).toBe(200)
    await testInfo.attach('returned-page.html', {
      body: await response!.body(),
      contentType: 'text/html',
    })

    await expect(page).toHaveTitle(title)
    await expect(page.locator('head meta[name="description"]')).toHaveAttribute('content', description)
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', `https://antonve.be${path}`)
    await expect(page.locator('head meta[name="robots"]')).toHaveCount(0)
    await expect(page.locator('script')).toHaveCount(0)

    const openGraph = {
      'og:type': 'website',
      'og:site_name': 'Anton Van Eechaute',
      'og:title': title,
      'og:description': description,
      'og:url': `https://antonve.be${path}`,
      'og:image:type': 'image/jpeg',
      'og:image:width': '500',
      'og:image:height': '500',
      'og:image:alt': 'Portrait of Anton Van Eechaute',
    }
    for (const [property, content] of Object.entries(openGraph)) {
      await expect(page.locator(`head meta[property="${property}"]`)).toHaveAttribute('content', content)
    }

    const twitter = {
      'twitter:card': 'summary',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image:alt': 'Portrait of Anton Van Eechaute',
    }
    for (const [name, content] of Object.entries(twitter)) {
      await expect(page.locator(`head meta[name="${name}"]`)).toHaveAttribute('content', content)
    }

    const preview = page.locator('head meta[property="og:image"]')
    await expect(preview).toHaveAttribute('content', /^https:\/\/antonve\.be\/.+\.jpg$/)
    const imageURL = new URL((await preview.getAttribute('content'))!)
    await expect(page.locator('head meta[name="twitter:image"]')).toHaveAttribute('content', imageURL.href)

    // Fetch the deployed path from the release fixture, keeping the real canonical host in the HTML.
    const image = await page.request.get(imageURL.pathname)
    expect(image.status()).toBe(200)
    expect(image.headers()['content-type']).toBe('image/jpeg')
    await testInfo.attach('share-image.jpg', {
      body: await image.body(),
      contentType: 'image/jpeg',
    })

    const dimensions = await page.evaluate(async imagePath => {
      const image = new Image()
      image.src = imagePath
      await image.decode()
      return { width: image.naturalWidth, height: image.naturalHeight }
    }, imageURL.pathname)
    expect(dimensions).toEqual({ width: 500, height: 500 })
  })
}

test('404 pages are noindex and do not advertise canonical or social pages', async ({ page }, testInfo) => {
  for (const path of ['/missing-preview-page', '/nested/missing/page', '/posts/migration-plan', '/404', '/50x', '/404.html', '/50x.html']) {
    const response = await page.goto(`${path}?utm_source=share`)
    expect(response?.status()).toBe(404)
    await expect(page).toHaveTitle('404: Page not found :: Anton Van Eechaute')
    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', 'noindex')
    await expect(page.locator('head link[rel="canonical"], head meta[property^="og:"], head meta[name^="twitter:"]')).toHaveCount(0)
    await expect(page.locator('script')).toHaveCount(0)
    await testInfo.attach(`${path.replaceAll('/', '_')}.html`, {
      body: await response!.body(),
      contentType: 'text/html',
    })
  }
})

test('5xx pages are noindex and do not advertise canonical or social pages', async ({ page }, testInfo) => {
  for (const status of [500, 502, 503, 504]) {
    const response = await page.goto(`${process.env.E2E_ERROR_BASE_URL}/__test/${status}`)
    expect(response?.status()).toBe(status)
    await expect(page).toHaveTitle('Server error: Something went wrong :: Anton Van Eechaute')
    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', 'noindex')
    await expect(page.locator('head link[rel="canonical"], head meta[property^="og:"], head meta[name^="twitter:"]')).toHaveCount(0)
    await expect(page.locator('script')).toHaveCount(0)
    await testInfo.attach(`${status}.html`, {
      body: await response!.body(),
      contentType: 'text/html',
    })
  }
})
