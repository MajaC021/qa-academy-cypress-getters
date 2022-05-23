const { createYield, idText } = require("typescript")

describe('Assertation, hooks and other', () => {
    beforeEach(()=> {
        cy.request('DELETE', '/api/boards')
        cy.intercept('/login').as('login')
        cy.visit('/')

        cy.get('[data-cy=login-menu]').click()
        cy.get('[data-cy=login-email]').type(Cypress.env('username'))
        cy.get('[data-cy=login-password]').type(Cypress.env('password'))
        cy.get('[data-cy=login]').click()
        cy.wait('@login')

        //assert that  we logged in
        cy.get('[data-cy=loggedin-bar]')
        .should('be.visible')
        .and('contain', 'User is logged in')

        //assert that  we logged in
        cy.get('[data-cy=logged-user]').should(($loggedInUser) => {
        expect($loggedInUser).to.contain('majacveticanin90@gmail.com')
        })
    })
    it("test", () => {


    });

    afterEach(() => {

        cy.get('[data-cy=logged-user]').click()
        cy.get('[data-cy=logout] ').click()

         //assert that  we logged out
        cy.get('[data-cy=login-menu] > svg').should('be.visible')
        cy.get('[data-cy=login-menu]').should('contain', 'Log in')
        
    })

    it("Assert and create a board", () => {

        //assert 
        cy.get('[data-cy="create-board"]').should(($elem) => {
            expect($elem).to.contain("Create a board")
        })

        //create new board
        cy.get('[data-cy="create-board"]').click()
        cy.get('[data-cy="new-board-input"]').type('my board{enter}')
        
        cy
        .url()
        .then((url) => {
            const id = url.match(/\/(\d+?)$/)
            cy.url().should('eq', `${Cypress.config('baseUrl')}/board/${id[1]}`)
        })  
 
        cy.go('back')
        cy.get("[data-cy='board-item']").trigger('mouseover')
        cy.get("[data-cy='star']").should('be.visible').click()
        cy.get("[data-cy='favorite-boards']").children().should('have.length', 1)

    });

    it.only('list items to assert it', () => {

//create new board
cy.get('[data-cy="create-board"]').click()
cy.get('[data-cy="new-board-input"]').type('My board{enter}')

cy.visit('/')
cy.get('[data-cy="My board"]').click()
cy.get('[data-cy=add-list]').click()
cy.get('[data-cy=add-list-input]').type("new list{enter}")

for(let i = 0; i <=2; i++){
    cy.get('[data-cy=new-task]').click()
    cy.get('[data-cy=task-input]').type(`task ${i + 1}{enter}`)
}
// //assert 
cy.get('[data-cy="tasks-list"]').should(($elem) => {
    expect($elem).to.contain("task 1")
    expect($elem).should('have.length', 2)
})
    })
});




