/// <reference types="cypress" />
import cadastro from '../pages/cadastro'
import login from '../pages/login'

import { faker } from '@faker-js/faker'

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com')
    })
    it('Test Case 1: Register User', () => {
        cadastro.criarConta()

        cy.url().should('includes', 'account_created')
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
 
        cy.contains(`Logged in as ${Cypress.env('nameUser')}`)
        cy.get('i.fa-user').parent().should('contain', Cypress.env('nameUser'))

    });
    it('Test Case 2: Login User with correct email and password', () => {
        cy.contains('Signup').click()
        login.logar('testandomuito-sempre@gmail.com', '123456')
        cy.get(':nth-child(10) > a').should('contain', `Logged in as Testando Muito`)
       
    });
    it('Test Case 3: Login User with incorrect email and password', () => {
        cy.contains('Signup').click()
        login.logar('testandomuito-nemsempre@gmail.com', 'errada')
        cy.get('.login-form form p').should('contain', 'Your email or password is incorrect!')
        
    });
    it('Test Case 4: Logout User', () => {
        cy.contains('Signup').click()
        login.logar('testandomuito-sempre@gmail.com', '123456')
        cy.contains('Logout').click()
        cy.url().should('includes', 'login')
        cy.contains('Login to your account').should('be.visible')
       
    });
    it('Test Case 5: Register User with existing email', () => {
        cy.get('a[href$=login]').click()
        cy.get('[data-qa="signup-name"]').type('Tentando Testar')
        cy.get('[data-qa="signup-email"]').type('testandomuito-sempre@gmail.com')
        cy.contains('button','Signup').click()
        cy.get('.signup-form form p').should('be.visible').and('contain', 'Email Address already exist!')
    });
    it('Test Case 6: Contact Us Form', () => {
        cy.contains('Contact us').click()
        cy.get('.contact-form h2')
            .should('be.visible')
            .and('have.text', 'Get In Touch')
        cy.get('[data-qa="name"]').type('Nome de quem preenche o forms')
        cy.get('[data-qa="email"]').type('email@gmail.com')
        cy.get('[data-qa="subject"]').type('Assunto')
        cy.get('[data-qa="message"]').type('Exemplo de mensagem')

        cy.fixture('Arquivo teste.pdf').as('arquivo')
        cy.get('input[name="upload_file"]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()
        cy.get('.status').should('contain', 'Success! Your details have been submitted successfully.')
    });
    it('Test Case 8: Verify All Products and product detail page', () => {
        cy.contains('Products').click()
        cy.url().should('includes', 'products')
        cy.get('.title').should('be.visible').and('have.text', 'All Products')
        cy.get('.single-products').should('be.visible').and('have.length.at.least', 1)
          .first().parent().contains('View Product').click()

        cy.get('.product-information > h2').should('be.visible')
        cy.get('.product-information p').should('be.visible').and('have.length', 4)
        cy.get('.product-information span span').should('be.visible')
    });
    it('Test Case 9: Search Product', () => {
        cy.contains('Products').click()
        cy.url().should('includes', 'products')
        cy.get('.title').should('be.visible').and('have.text', 'All Products')
        cy.get('input#search_product').type('dress')
        cy.get('button#submit_search').click()
        cy.get('.title').should('be.visible').and('have.text', 'Searched Products')
        cy.get('.single-products').should('be.visible').and('have.length.at.least', 1)    
    });
    it('Test Case 10: Verify Subscription in home page', () => {
        cy.get('input#susbscribe_email')
            .scrollIntoView()
            .type('emailqa@mail.com')
        cy.get('button#subscribe').click()
        cy.contains('You have been successfully subscribed!').should('be.visible')
    });
    it('Test Case 15: Place Order: Register before Checkout', () => {
        cadastro.criarConta()
        
        cy.url().should('includes', 'account_created')
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        cy.contains(`Logged in as ${Cypress.env('nameUser')}`)

        cy.contains('Add to cart').click()
        cy.contains('View Cart').click()
        cy.url().should('includes', 'view_cart')
        cy.contains('Proceed To Checkout').click()
        cy.get('.heading').first().should('have.text', 'Address Details')
        cy.get('.heading').last().should('have.text', 'Review Your Order')
        cy.get('.form-control').type('Tamanho único')
        cy.contains('Place Order').click()
        cy.get('[data-qa="name-on-card"]').type('Nome do cartão')
        cy.get('[data-qa="card-number"]').type('9999999999999')
        cy.get('[data-qa="cvc"]').type('888')
        cy.get('[data-qa="expiry-month"]').type('10')
        cy.get('[data-qa="expiry-year"]').type('2000')
        cy.get('[data-qa="pay-button"]').click()
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
        cy.contains('Delete Account').click()
        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()

        

    });

 
});