import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.describe.configure({ mode: 'serial' })
  const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'login' }).first().click()
    await page.getByRole('textbox').first().fill(username)
    await page.locator('input[type="password"]').fill(password)
    await page.getByRole('button', { name: 'login' }).last().click()
  }

  const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByPlaceholder('title').fill(title)
    await page.getByPlaceholder('author').fill(author)
    await page.getByPlaceholder('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByText(title).first().waitFor()
  }

  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'password123'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'password123')
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrong')

      const errorDiv = page.locator('.error')

      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('color', 'rgb(0, 128, 0)')
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'password123')
    })

    test('a new blog can be created', async ({ page }) => {
      const title = `Playwright is awesome ${Date.now()}`
      await createBlog(page, title, 'Microsoft', 'https://playwright.dev')
      await expect(page.getByText(title, { exact: false }).first()).toBeVisible()
    })

    test.describe('and a blog exists', () => {
      let title

      test.beforeEach(async ({ page }) => {
        title = `Testing Likes ${Date.now()}`
        await createBlog(page, title, 'Playwright', 'http://example.com')
      })

      test('a blog can be liked', async ({ page }) => {
        const blogContainer = page.locator('.blog').filter({ hasText: title })
        await blogContainer.getByRole('button', { name: 'view' }).click()

        await blogContainer.getByRole('button', { name: 'like' }).first().click()

        await expect(blogContainer.getByText('likes 1', { exact: false }).first()).toBeVisible()
      })

      test('the user who created the blog can delete it', async ({ page }) => {
        await page.reload()

        const appContainer = page.locator('.blog').filter({ hasText: title })
        await appContainer.waitFor()

        await appContainer.getByRole('button', { name: 'view' }).click()


        page.on('dialog', dialog => dialog.accept())
        await appContainer.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText(title)).not.toBeVisible()
      })

      test('only the creator sees the delete button', async ({ page, request }) => {
        await page.getByRole('button', { name: 'logout' }).click()

        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Hacker',
            username: 'hacker123',
            password: 'password123'
          }
        })

        await loginWith(page, 'hacker123', 'password123')

        const appContainer = page.locator('.blog').filter({ hasText: title })
        await appContainer.getByRole('button', { name: 'view' }).click()
        await expect(appContainer.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

    test.describe('sorting blogs', () => {
      test('blogs are arranged in descending order by likes', async ({ page }) => {
        const most = `Most ${Date.now()}`
        const least = `Least ${Date.now()}`
        const medium = `Medium ${Date.now()}`

        await createBlog(page, most, 'Author', 'http://example.com/most')
        await createBlog(page, least, 'Author', 'http://example.com/least')
        await createBlog(page, medium, 'Author', 'http://example.com/medium')

        const mostLikesBlog = page.locator('.blog').filter({ hasText: most })
        const mediumLikesBlog = page.locator('.blog').filter({ hasText: medium })

        await mostLikesBlog.getByRole('button', { name: 'view' }).click()
        const mostLikesButton = mostLikesBlog.getByRole('button', { name: 'like' }).first()
        await mostLikesButton.click()
        await expect(mostLikesBlog.getByText('likes 1')).toBeVisible()
        await mostLikesButton.click()
        await expect(mostLikesBlog.getByText('likes 2')).toBeVisible()

        await mediumLikesBlog.getByRole('button', { name: 'view' }).click()
        const mediumLikesButton = mediumLikesBlog.getByRole('button', { name: 'like' }).first()
        await mediumLikesButton.click()
        await expect(mediumLikesBlog.getByText('likes 1')).toBeVisible()

        await page.waitForTimeout(500)

        const blogLocators = page.locator('.blog')
        const allBlogTitles = await blogLocators.allInnerTexts()

        const sortedTitles = allBlogTitles.filter(t => t.includes(most) || t.includes(medium) || t.includes(least))
        expect(sortedTitles[0]).toContain(most)
        expect(sortedTitles[1]).toContain(medium)
        expect(sortedTitles[2]).toContain(least)
      })
    })
  })
})