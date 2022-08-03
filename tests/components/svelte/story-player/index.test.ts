import { test, expect } from '@playwright/test'

test('StoryPlayer', async ({ page }) => {
  let msgErrorExpected = ''

  await page.goto('/')

  const totalVideos = await page.locator('astro-island header').evaluate(header => header.children.length)
  const firstVideoUrl = await page.locator('video >> nth=0').getAttribute('src')
  const firstVideoProgressBar = page.locator('div:nth-child(2) > .overflow-hidden > .bg-slate-100 >> nth=0')
  const speakerBtn = page.locator('.speaker--muted >> nth=0')
  const prevBtn = page.locator('button >> nth=0')
  const nextBtn = page.locator('button >> nth=1')

  // Test 1
  msgErrorExpected = 'Expected that video progress bar to be empty when starting to load the video'
  expect(await firstVideoProgressBar.getAttribute('style'), msgErrorExpected).toBe('width: 0%')

  // Test 2
  msgErrorExpected = 'Expected that video source changes when the user pressed the next button'
  await nextBtn.click()
  expect(await page.locator('video >> nth=0').getAttribute('src'), msgErrorExpected).not.toBe(firstVideoUrl)

  // Test 3
  msgErrorExpected = 'Expected that previous video progress bar to be full when press next button'
  await page.waitForTimeout(800)
  expect(await firstVideoProgressBar.getAttribute('style'), msgErrorExpected).toBe('width: 100%;')

  // Test 4
  msgErrorExpected = 'Expected that video source to be same that first video source when the user pressed the previous button'
  await prevBtn.click()
  expect(await page.locator('video >> nth=0').getAttribute('src'), msgErrorExpected).toBe(firstVideoUrl)

  // Test 5
  msgErrorExpected = 'Expected that the first progress bar begins from zero when finished the stories'
  await nextBtn.click({ clickCount: totalVideos, delay: 500 })
  expect(await firstVideoProgressBar.getAttribute('style'), msgErrorExpected).toBe('width: 0%;')

  // Test 6
  msgErrorExpected = 'Expected video to be muted'
  await expect(page.locator('.speaker >> nth=0'), msgErrorExpected).not.toBeVisible()

  // Test 7
  msgErrorExpected = 'Expected video to be unmuted'
  await speakerBtn.click()
  await expect(page.locator('.speaker--muted >> nth=0'), msgErrorExpected).toBeVisible()
})
