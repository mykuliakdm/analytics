describe('Guests', () => {
  it('Inability to see projects for unauthorised users', () => {
    cy.visit('/')

    cy.contains('Get Started').click()

    cy.location('pathname').should('eq', '/projects')

    cy.get('[data-test-id="alert"]')
      .should('contain.text', 'Unauthorized Access.')
      .should(
        'contain.text',
        'Access Denied: You must be signed in to view the projects. Please log in to continue.',
      )
  })

  it('Inability to create projects for unauthorised users', () => {
    cy.visit('/projects')

    cy.contains('Create project').click()

    cy.location('pathname').should('eq', '/projects/create')

    cy.get('[data-test-id="project-form"]').should('exist')

    cy.get('h1').should('contain.text', 'New project')

    cy.get('input[name="name"]').should('exist').should('contain.text', '')
    cy.get('input[name="url"]').should('exist').should('contain.text', '')
    cy.get('input[name="propertyId"]')
      .should('exist')
      .should('contain.text', '')
    cy.get('button[type="submit"]')
      .should('exist')
      .should('contain.text', 'Save data')

    cy.get('input[name="name"]').type('My first project')
    cy.get('input[name="url"]').type('https://my-first-project.com')
    cy.get('input[name="propertyId"]').type('123456789')

    cy.get('button[type="submit"]').click()

    cy.contains('User not logged in').should('exist')
  })
})
