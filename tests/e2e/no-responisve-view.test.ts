import { test, expect } from '@playwright/test'

test.describe('No responisve dialog', () => {
  test.skip(({ isMobile }) => Boolean(isMobile) === false, 'No responsive dialog not contemplate desktop resolutions')

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should be the title "En Construcción" on page load', async ({ page }) => {
    const errorMsgExpected = '"En Construcción" title expected on load page'

    await expect(page.locator('text=En Construcción'), errorMsgExpected).toBeVisible()
  })

  test('should be the "Descargar Curriculum" button on page load', async ({ page }) => {
    const errorMsgExpected = '"Descargar Curriculum" button expected on load page'

    await expect(page.locator('text=Descargar Curriculum >> nth=0'), errorMsgExpected).toBeVisible()
  })

  test('should download document to press "Descargar Curriculum" button', async ({ page }) => {
    const errorMsgExpected = 'Pressing the "Descargar Curriculum" button expected to download a document'
    const [fileDownloaded] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('text=Descargar Curriculum >> nth=0').click()
    ])

    expect(fileDownloaded.suggestedFilename(), errorMsgExpected).toMatch(/\.pdf$/)
  })
})
