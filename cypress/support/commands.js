
Cypress.Commands.add('createTask', (taskName = '') => {
  cy.visit('/')

  cy.get('input[placeholder="Add a new Task"]').as('inputTask')

  if (taskName !== '') {
    cy.get('@inputTask')
      .type(taskName)
  }

  cy.contains('button', 'Create').click()

})

Cypress.Commands.add('isRequired', (text) => {
  cy.get('input[placeholder="Add a new Task"]')
    .invoke('prop', 'validationMessage')
    .should((text) => {
      expect(
        'This is a required field'
      ).to.eq(text)
    })
})

Cypress.Commands.add('removeTaskByName', (taskName) => {
  cy.request({
    url: Cypress.env('apiUrl') + '/helper/tasks',
    method: 'DELETE',
    body: { name: taskName }
  }).then(response => {
    expect(response.status).to.eq(204)
  })
})

Cypress.Commands.add('postTask', (task) => {
  cy.request({
    url: Cypress.env('apiUrl') + '/tasks',
    method: 'POST',
    body: task
  }).then(response => {
    expect(response.status).to.eq(201)
  })
})

