describe('Go to the website', () => {
    it('can navigate to the site', () => {
        cy.visit('http://localhost:3000/')

        cy.url().should('include', 'localhost')
    })
})

describe('is button initially dsbld?', () => {
    it('is it disabled now?', () => {
        cy.get('button')
        .should('be.disabled')
    })

})


describe('are fields typable?', () => {
    it('is name typable?', () => {
        cy.get('input[name="name"]')
        .type('Whats poppin')
        .should('have.value', 'Whats poppin')
    })

    it('email typable?', () => {
        cy.get('input[name="email"]')
        .type('remyboiiSwag@yomomma.gov')
        .should('have.value', 'remyboiiSwag@yomomma.gov')
    })

    it('password typable?', () => {
        cy.get('input[name="password"]')
        .type('daddyCHILLLLL')
        .should('have.value', 'daddyCHILLLLL')
    })
})

// checkbox check test

describe('is checkbox checked?', () => {
    it('can checkbox be checked?', () => {
        cy.get('input[name="terms"]')
        .not("[disabled]")
        .check()
        .should('be.checked')
    })
})

describe('is anything not filled bro, keep it real wit a big dawg', () => {
    it('is anything NOT filled???! BE HONEST', () => {
        cy.get('input[name="name"]').should('not.have.value')
        cy.get('input[name="email"]').should('not.have.value')
        cy.get('input[name="password"]').should('not.have.value')
        cy.get('input[name="terms"]').should('be.checked')
        
    })
})

describe('submit form funcitonal?', () => {
    it('can form submit?', () => {
        cy.get('button')
        .should('not.be.disabled')
    })
})

