describe('Login/Register', () => {
  it('Unable to authorise an unregistered user', () => {
    cy.visit('/sign-in')

    cy.get('[data-test-id="login-form"]').should('exist')

    cy.get('h1').should('contain.text', 'Sign In')

    cy.get('input[name="email"]').type('random.user@gmail.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('[data-test-id="login-form"]').find('button[type="submit"]').click()

    cy.contains('User with this email does not exist.').should('exist')
  })

  it('Registering a new user', () => {
    cy.visit('/sign-up')

    cy.get('[data-test-id="register-form"]').should('exist')

    cy.get('h1').should('contain.text', 'Sign Up')

    cy.get('input[name="email"]').type('new.user@gmail.com')
    cy.get('input[name="name"]').type('New User')
    cy.get('input[name="password"]').type('123456')
    cy.get('[data-test-id="register-form"]')
      .find('button[type="submit"]')
      .click()

    cy.location('pathname').should('eq', '/projects')

    cy.get('[data-test-id="alert"]')
      .should('contain.text', "You don't have any projects yet.")
      .should(
        'contain.text',
        'To work with our app, you need to create a project.',
      )

    cy.get('[data-test-id="avatar"]').should('contain.text', 'NU')
  })

  it('Authorisation of a registered user', () => {
    cy.visit('/sign-in')

    cy.get('[data-test-id="login-form"]').should('exist')

    cy.get('input[name="email"]').type('user.test@gmail.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('[data-test-id="login-form"]').find('button[type="submit"]').click()

    cy.location('pathname').should('eq', '/')

    cy.get('[data-test-id="avatar"]').should('contain.text', 'UT')

    cy.contains('Projects').click()

    cy.get('[data-test-id="projects-table"]').should('exist')
  })
})
