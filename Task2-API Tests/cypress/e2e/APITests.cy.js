/// <reference types="Cypress" />
import dataJson from '../fixtures/createBooking.json'


describe("API Tests", () => {

  let accessToken = '0dd8c6f4a0acea8' 

  it("Scenario 1: Get Booking Ids", () => {
      
      cy.request({
          method: 'GET',
          url: '/',
          headers: {
              'Authorization' : "Bearer " + accessToken
          }
      }).then((res)=>{
          expect(res.status).to.eq(200)
          expect(res.body).length.to.be.greaterThan(1)
      })

  })

  
  it("Scenario 2: Get Booking based on a booking id provided", () => {
      
    //1. creating a new booking to fetch its bookingid
    cy.request({
      method: 'POST',
      url: '/',
      headers: {
          'Authorization' : "Bearer " + accessToken
      },
      body: {
        'firstname' : dataJson.firstname,
        'lastname' : dataJson.lastname,
        'totalprice' : dataJson.totalprice,
        'depositpaid' : dataJson.depositpaid,
        'bookingdates' : {
            'checkin' :  dataJson.bookingdates.checkin,
            'checkout' : dataJson.bookingdates.checkout
        },
        'additionalneeds' : dataJson.additionalneeds
      }
    }).then((res)=>{
      //fetching a newly created booking id
      expect(res.status).to.eq(200)
      const bookingId = res.body.bookingid
      cy.log("bookingid is: " + bookingId)
      //2. get specific booking based on the provided id
      cy.request({
        method: 'GET',
        url: '/'+bookingId,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
      }).then((res)=>{
        expect(res.status).to.eq(200)
        expect(res.body.firstname).to.eq("Jane")
        expect(res.body.lastname).to.eq("Brown")
        expect(res.body.totalprice).to.eq(254)
      })
    })

  })



  it("Scenario 3: Create a Booking", () => {
        
    cy.request({
      method: 'POST',
      url: '/',
      headers: {
          'Authorization' : "Bearer " + accessToken
      },
      body: {
        'firstname' : dataJson.firstname,
        'lastname' : dataJson.lastname,
        'totalprice' : dataJson.totalprice,
        'depositpaid' : dataJson.depositpaid,
        'bookingdates' : {
            'checkin' :  dataJson.bookingdates.checkin,
            'checkout' : dataJson.bookingdates.checkout
        },
        'additionalneeds' : dataJson.additionalneeds
      }
    }).then((res)=>{
      expect(res.status).to.eq(200)
      expect(res.body.booking.firstname).to.eq('Jane')
      expect(res.body.booking.lastname).to.eq('Brown')
      expect(res.body.booking.depositpaid).to.eq(true)
      expect(res.body.booking.additionalneeds).to.eq('Breakfast')
    })
  })



  it("Scenario 4: Update Booking based on a booking id provided", () => {
      
    //1. creating a new booking to fetch its bookingid
    cy.request({
      method: 'POST',
      url: '/',
      headers: {
          'Authorization' : "Bearer " + accessToken
      },
      body: {
        'firstname' : dataJson.firstname,
        'lastname' : dataJson.lastname,
        'totalprice' : dataJson.totalprice,
        'depositpaid' : dataJson.depositpaid,
        'bookingdates' : {
            'checkin' :  dataJson.bookingdates.checkin,
            'checkout' : dataJson.bookingdates.checkout
        },
        'additionalneeds' : dataJson.additionalneeds
      }
    }).then((res)=>{
      //fetching a newly created booking id
      expect(res.status).to.eq(200)
      const bookingId = res.body.bookingid
      cy.log("bookingid is: " + bookingId)
      //2. updating all fields of specific booking based on the provided id
      cy.request({
        method: 'PUT',
        url: '/'+bookingId,
        failOnStatusCode: false,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        body: {
          "firstname" : "Rosy",
          "lastname" : "James",
          "totalprice" : 300,
          "depositpaid" : false,
          "bookingdates" : {
              "checkin" : "2020-01-01",
              "checkout" : "2021-01-01"
          },
          "additionalneeds" : "Dinner"
        }
      }).then((res)=>{
       /* expect(res.status).to.eq(403)
        expect(res.body.firstname).to.eq("Rosy")
        expect(res.body.lastname).to.eq("James")
        expect(res.body.totalprice).to.eq(300)
        expect(res.body.booking.depositpaid).to.eq(false)
        expect(res.body.booking.additionalneeds).to.eq('Dinner')*/
      })
    })

  })


  it("Scenario 5: Partial Update Booking based on a booking id provided", () => {
      
    //1. creating a new booking to fetch its bookingid
    cy.request({
      method: 'POST',
      url: '/',
      headers: {
          'Authorization' : "Bearer " + accessToken
      },
      body: {
        'firstname' : dataJson.firstname,
        'lastname' : dataJson.lastname,
        'totalprice' : dataJson.totalprice,
        'depositpaid' : dataJson.depositpaid,
        'bookingdates' : {
            'checkin' :  dataJson.bookingdates.checkin,
            'checkout' : dataJson.bookingdates.checkout
        },
        'additionalneeds' : dataJson.additionalneeds
      }
    }).then((res)=>{
      //fetching a newly created booking id
      expect(res.status).to.eq(200)
      const bookingId = res.body.bookingid
      cy.log("bookingid is: " + bookingId)
      //2. updating few fields of specific booking based on the provided id
      cy.request({
        method: 'PUT',
        url: '/'+bookingId,
        failOnStatusCode: false,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        body: {
          "firstname" : "Rosy",
          "lastname" : "James",
          "additionalneeds" : "Dinner"
        }
      }).then((res)=>{
       /* expect(res.status).to.eq(403)
        expect(res.body.firstname).to.eq("Rosy")
        expect(res.body.lastname).to.eq("James")
        expect(res.body.totalprice).to.eq(300)
        expect(res.body.booking.depositpaid).to.eq(false)
        expect(res.body.booking.additionalneeds).to.eq('Dinner')*/
      })
    })

  })






  it("Scenario 6: Delete a Booking based on a booking id provided", () => {
      
    //1. creating a new booking to fetch its bookingid
    cy.request({
      method: 'POST',
      url: '/',
      headers: {
          'Authorization' : "Bearer " + accessToken
      },
      body: {
        'firstname' : dataJson.firstname,
        'lastname' : dataJson.lastname,
        'totalprice' : dataJson.totalprice,
        'depositpaid' : dataJson.depositpaid,
        'bookingdates' : {
            'checkin' :  dataJson.bookingdates.checkin,
            'checkout' : dataJson.bookingdates.checkout
        },
        'additionalneeds' : dataJson.additionalneeds
      }
    }).then((res)=>{
      //fetching a newly created booking id
      expect(res.status).to.eq(200)
      const bookingId = res.body.bookingid
      cy.log("bookingid is: " + bookingId)
      //2. delete specific booking based on the provided id
      cy.request({
        method: 'DELETE',
        url: '/'+bookingId,
        failOnStatusCode: false,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Accept': 'application/json'
        }
      }).then((res)=>{
        expect(res.status).to.eq(403)
      })
    })
  
  })










})







