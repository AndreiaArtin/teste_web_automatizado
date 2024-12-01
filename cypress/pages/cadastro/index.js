class Cadastro {
    criarConta() {
        const timestamp = new Date().getTime()
        const nameUser = 'TestandoSom'
        const emailUser = `testando${timestamp}@gmail.com`
        const senha = '123456'

        Cypress.env('nameUser', nameUser)

        cy.get('a[href$=login]').click()
        cy.get('[data-qa="signup-name"]').type(Cypress.env('nameUser'))
        cy.get('[data-qa="signup-email"]').type(emailUser)
        cy.contains('button','Signup').click()
        cy.get('input[type=radio]').first().check()
        cy.get('[type="password"]').type(senha, {log : false})

        cy.get('[data-qa="days"]').select('10')
        cy.get('[data-qa="months"]').select('April')
        cy.get('[data-qa="years"]').select('2021')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('[data-qa="first_name"]').type('Teste123')
        cy.get('[data-qa="last_name"]').type('last name')
        cy.get('[data-qa="company"]').type('company')
        cy.get('[data-qa="address"]').type('endereço')
        cy.get('[data-qa="address2"]').type('complemento')
        cy.get('[data-qa="country"]').select('Canada')
        cy.get('[data-qa="state"]').type('estado')
        cy.get('[data-qa="city"]').type('cidade')
        cy.get('[data-qa="zipcode"]').type('898989898')
        cy.get('[data-qa="mobile_number"]').type('475541541')
        cy.get('[data-qa="create-account"]').click()

 
    }


}
export default new Cadastro()
