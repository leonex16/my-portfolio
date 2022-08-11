import { test, expect } from '@playwright/test'

const MS_TO_WAIT_CHANGE_STATE_SRC = 2000

test.describe('Portfolio', () => {
  test.skip(({ isMobile }) => Boolean(isMobile), 'Portfolio-view only runs in desktop resolutions')

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should video progress bar to be empty when starting to load the video', async ({ page }) => {
    const errorMsgExpected = 'The video progress bar expected to be empty when starting to load the video'
    const firstVideoProgressBar = page.locator('div:nth-child(2) > .overflow-hidden > .bg-slate-100 >> nth=0')

    expect(await firstVideoProgressBar.getAttribute('style'), errorMsgExpected).toBe('width: 0%')
  })

  test('should video source changes when the user pressed the next button', async ({ page }) => {
    const errorMsgExpected = 'Video source expected to change when the user press the next button'
    const firstVideoUrl = await page.locator('video >> nth=0').getAttribute('src')
    const nextBtn = page.locator('button >> nth=1')

    await nextBtn.click()
    await page.waitForTimeout(MS_TO_WAIT_CHANGE_STATE_SRC)

    expect(await page.locator('video >> nth=0').getAttribute('src'), errorMsgExpected).not.toBe(firstVideoUrl)
  })

  test('should previous video progress bar to be full when press next button', async ({ page, browserName }) => {
    const errorMsgExpected = 'Previous video progress bar expected to be full when the user has pressed pressed the next button'
    const firstVideoProgressBar = page.locator('div:nth-child(2) > .overflow-hidden > .bg-slate-100 >> nth=0')
    const nextBtn = page.locator('button >> nth=1')

    await nextBtn.click()
    await page.waitForTimeout(MS_TO_WAIT_CHANGE_STATE_SRC)

    expect(await firstVideoProgressBar.getAttribute('style'), errorMsgExpected).toBe('width: 100%;')
  })

  test('should video source to be same that first video source when the user pressed the previous button', async ({ page }) => {
    const errorMsgExpected = 'Video source expected to be same that first video source when the user has pressed the previous button'
    const firstVideoUrl = await page.locator('video >> nth=0').getAttribute('src')
    const prevBtn = page.locator('button >> nth=0')
    const nextBtn = page.locator('button >> nth=1')

    await nextBtn.click()
    await page.waitForTimeout(MS_TO_WAIT_CHANGE_STATE_SRC)
    await prevBtn.click()
    await page.waitForTimeout(MS_TO_WAIT_CHANGE_STATE_SRC)

    expect(await page.locator('video >> nth=0').getAttribute('src'), errorMsgExpected).toBe(firstVideoUrl)
  })

  test('should the first progress bar begins from zero when finished the stories', async ({ page }) => {
    const errorMsgExpected = 'The first progress bar expected to begin from zero when finished the stories'
    const firstVideoProgressBar = page.locator('div:nth-child(2) > .overflow-hidden > .bg-slate-100 >> nth=0')
    const nextBtn = page.locator('button >> nth=1')
    const totalVideos = await page.locator('astro-island header').evaluate(header => header.children.length)

    await nextBtn.click({ clickCount: totalVideos, delay: 500 })

    expect(await firstVideoProgressBar.getAttribute('style'), errorMsgExpected).toBe('width: 0%;')
  })

  test('should video to be muted on load page', async ({ page }) => {
    const errorMsgExpected = 'Video expected to be muted on page load'
    const video = page.locator('video >> nth=0')
    // eslint-disable-next-line no-undef
    const isMuted = await video.evaluate(($video: HTMLVideoElement) => $video.muted)

    expect(isMuted).toBe(true)
    await expect(page.locator('.speaker >> nth=0'), errorMsgExpected).not.toBeVisible()
  })

  test('should video to be unmuted when the user clicks', async ({ page }) => {
    const errorMsgExpected = 'Video expected to be unmuted when the user has pressed the button'
    const video = page.locator('video >> nth=0')
    const speakerMutedButton = page.locator('.speaker--muted >> nth=0')
    let isMuted = true

    await speakerMutedButton.click()
    // eslint-disable-next-line no-undef
    isMuted = await video.evaluate(($video: HTMLVideoElement) => $video.muted)

    expect(isMuted).toBe(false)
    await expect(speakerMutedButton, errorMsgExpected).toBeVisible()
  })

  test('should video to be playing on load page', async ({ page }) => {
    // FIXME: Can not check if video is playing because the resources ( videos ) not loading...
    const errorMsgExpected = 'Video expected to be muted on page load'
    // const video = page.locator('video >> nth=0')
    // eslint-disable-next-line no-undef
    // const isPaused = await video.evaluate(($video: HTMLVideoElement) => $video.paused)

    // expect(isPaused).toBe(false)
    await expect(page.locator('.play-pause-icon'), errorMsgExpected).not.toBeVisible()
  })

  test.only('should video pause when the user clicks', async ({ page }) => {
    // FIXME: Can not check if video is playing because the resources ( videos ) not loading...
    const errorMsgExpected = 'Video expected to be unmuted when the user has pressed the button'
    // const video = page.locator('video >> nth=0')
    const playPauseButton = page.locator('.play-pause-icon')
    // let isPaused = false

    await playPauseButton.click()
    // eslint-disable-next-line no-undef
    // isPaused = await video.evaluate(($video: HTMLVideoElement) => $video.paused)

    // expect(isPaused).toBe(true)
    await expect(playPauseButton, errorMsgExpected).toBeVisible()
  })
})
