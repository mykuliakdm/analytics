describe('Projects', () => {
  it('Create new project', () => {
    /* Login */
    cy.visit('/sign-in')

    cy.get('[data-test-id="login-form"]').should('exist')

    cy.get('input[name="email"]').type('user.test@gmail.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('[data-test-id="login-form"]').find('button[type="submit"]').click()

    cy.location('pathname').should('eq', '/')

    cy.get('[data-test-id="avatar"]').should('contain.text', 'UT')

    cy.contains('Projects').click()

    cy.get('[data-test-id="projects-table"]').should('exist')
    /* End login */

    cy.visit('/projects')

    cy.contains('Create project').click()

    cy.get('[data-test-id="project-form"]').should('exist')

    cy.get('input[name="name"]').type('Random project')
    cy.get('input[name="url"]').type('https://random-project.com')
    cy.get('input[name="propertyId"]').type('123456789')
    cy.get('button[type="submit"]').click()

    cy.location('pathname').should('eq', '/projects')

    cy.contains('Random project')
      .parent('tr')
      .find('td:eq(2)')
      .should('contain', 'https://random-project.com')

    cy.contains('Random project')
      .parent('tr')
      .find('[data-test-id="ga-connect"]')
      .should('not.have.attr', 'disabled')
  })

  it('View project', () => {
    /* Login */
    cy.visit('/sign-in')

    cy.get('[data-test-id="login-form"]').should('exist')

    cy.get('input[name="email"]').type('user.test@gmail.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('[data-test-id="login-form"]').find('button[type="submit"]').click()

    cy.location('pathname').should('eq', '/')

    cy.get('[data-test-id="avatar"]').should('contain.text', 'UT')

    cy.contains('Projects').click()

    cy.get('[data-test-id="projects-table"]').should('exist')
    /* End login */

    cy.contains('Random project')
      .parent('tr')
      .find('[data-test-id="view-project"]')
      .click()

    cy.location('pathname').should('contain', '/visits')

    cy.get('h1').should('contain.text', 'Random project')

    cy.contains('Events').click()

    cy.wait(2000)

    cy.contains('Navigation').click()

    cy.wait(2000)

    cy.contains('Traffic').click()

    cy.wait(2000)
  })

  it('Connect to Google Analytics', () => {
    /* Login */
    cy.visit('/sign-in')

    cy.get('[data-test-id="login-form"]').should('exist')

    cy.get('input[name="email"]').type('user.test@gmail.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('[data-test-id="login-form"]').find('button[type="submit"]').click()

    cy.location('pathname').should('eq', '/')

    cy.get('[data-test-id="avatar"]').should('contain.text', 'UT')

    cy.contains('Projects').click()

    cy.get('[data-test-id="projects-table"]').should('exist')
    /* End login */

    cy.visit('/projects')

    cy.contains('Random project')
      .parent('tr')
      .find('[data-test-id="ga-connect"]')
      .click()

    cy.contains("I've completed these points").click()

    cy.contains('Connect').click()

    cy.get('[data-test-id="alert"]').should('exist')
  })

  it('Edit project', () => {
    /* Login */
    cy.visit('/sign-in')

    cy.get('[data-test-id="login-form"]').should('exist')

    cy.get('input[name="email"]').type('user.test@gmail.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('[data-test-id="login-form"]').find('button[type="submit"]').click()

    cy.location('pathname').should('eq', '/')

    cy.get('[data-test-id="avatar"]').should('contain.text', 'UT')

    cy.contains('Projects').click()

    cy.get('[data-test-id="projects-table"]').should('exist')
    /* End login */

    cy.contains('Random project')
      .parent('tr')
      .find('[data-test-id="edit-project"]')
      .click()

    cy.get('[data-test-id="project-form"]').should('exist')

    cy.get('input[name="propertyId"]').should('have.value', '123456789')

    cy.get('input[name="propertyId"]').clear()

    cy.contains('Save data').click()

    cy.contains('Random project')
      .parent('tr')
      .find('[data-test-id="ga-connect"]')
      .should('have.attr', 'disabled')
  })

  it('Delete project', () => {
    /* Login */
    cy.visit('/sign-in')

    cy.get('[data-test-id="login-form"]').should('exist')

    cy.get('input[name="email"]').type('user.test@gmail.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('[data-test-id="login-form"]').find('button[type="submit"]').click()

    cy.location('pathname').should('eq', '/')

    cy.get('[data-test-id="avatar"]').should('contain.text', 'UT')

    cy.contains('Projects').click()

    cy.get('[data-test-id="projects-table"]').should('exist')
    /* End login */

    cy.visit('/projects')

    cy.contains('Random project')
      .parent('tr')
      .find('[data-test-id="delete-project"]')
      .click()

    cy.contains('Are you absolutely sure?').should('exist')

    cy.contains('Yes, remove project').click()

    cy.get('[data-test-id="projects-table"]')
      .find('tbody')
      .find('tr:eq(0)')
      .should('not.contain.text', 'Random project')
  })
})
