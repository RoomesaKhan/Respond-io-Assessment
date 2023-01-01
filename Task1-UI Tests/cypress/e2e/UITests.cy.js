describe('UI test automation suite', () => {


  beforeEach(() => {
    cy.visit('/')  //Navigate to home page
  })


 /* Scenario 1: Users are able to filter for an item by brand under the Computing > Laptop section

  Navigate to the `/computing/laptops` page
  Select the brand value to be Dell
  Validate that the results returned from page 1 matches the selected brand */

  it('Scenario 1 - User journey', () => {

    //Navigate to the `/computing/laptops` page
    cy.visit('/computing/laptops')
    cy.location("pathname").should("eq", "/computing/laptops/")
   // Select the brand value to be Dell
    cy.get('#open-filter-panel').click()
    cy.scrollTo('top')
    cy.get('span[data-vars-lb="Dell"]').eq(0).contains("Dell")//.click({ force: true })
    cy.visit('/dell/computing/laptops/?show-filter=1')
    cy.url().should('contain','/dell/computing/laptops/?show-filter=1')
   // Validate that the results returned from page 1 matches the selected brand
    cy.get('#product-list').find("h3").contains("Dell")
    
  })

  /*Scenario 2: Users are able to sort results under dresses by price in descending order

  - Navigate to the `/clothing/dresses` page
  - Click on Price sorting until the indicator indicates that the list is sorted by price in descending order
  - Validate that the results are sorted in descending order of Price */


  it('Scenario 2 - User journey', () => {

    //Navigate to the `/clothing/dresses` page
    cy.visit('/clothing/dresses')
    cy.location("pathname").should("eq", "/clothing/dresses/")
    //Click on Price sorting until the indicator indicates that the list is sorted by price in descending order
    cy.get('#sort-option').find("a").eq(2).as('priceFilter').contains("Price").click()
    cy.get('@priceFilter').click()
    cy.url().should('contain', '/clothing/dresses/?sort=price.net_desc')
    //Validate that the results are sorted in descending order of Price
    //Fetching the first & last value here and comparing there prices, for descending order first product's price should be greater than last one
    cy.get('.ellipsis-1.f16-360-o').first().invoke('text').then((firstValue) => {
      const start = firstValue.indexOf('R')
      const end = firstValue.indexOf('.', start)
      return firstValue.slice(start+3,end)
      }).then(parseFloat).then((val1) => {    
        cy.get('.ellipsis-1.f16-360-o').last().invoke('text').then((lastValue) => {
          const start = lastValue.indexOf('R')
          const end = lastValue.indexOf('.', start)
          return lastValue.slice(start+3,end)
          }).then(parseFloat).should((val2) => {
            expect(val1).to.be.gt(val2)
            })
        })

  })

  /*Scenario 3: Users are able to search for an item

  - Navigate to the homepage
  - Search for “iPhone 14”
  - Validate that the search results returned matches the search criteria*/

  it('Scenario 3 - User journey', () => {
    //Navigate to the homepage
    cy.location("pathname").should("eq", "/")
    //Search for “iPhone 14”
    cy.get('#search-zone').click().type('iPhone 14')
    cy.get('#search-btn').click()
    //Validate that the search results returned matches the search criteria
    cy.get('#product-list').find("h3").contains("iPhone 14")  
  })


})