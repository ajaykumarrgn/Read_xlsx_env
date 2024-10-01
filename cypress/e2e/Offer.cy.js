describe('Quotation Flow', () => {
  beforeEach(() => {
    // Read data from the Excel file
    cy.task('readExcelFile', { filePath: './cypress/e2e/variables/offer.xlsx', sheetName: 'Sheet1' }).then((data) => {  
        Cypress.log({message:'excel data loaded',log:false});
        cy.wrap(data, {log:false}).as('testdata');
    });
});
  it('Offer Flow', () => {
      // Sequence 1
      // Login  
      cy.get('@testdata').then((testdata) => {
        const url = testdata.find(item => item.FieldName === 'Source').Value;
        const url2 = testdata.find(item => item.FieldName === 'Target').Value;
        cy.visit(url); 
        const username = Cypress.env('username');
        const password = Cypress.env('password');
        cy.get('#login_email').type(username);
        cy.get('#login_password').type(password);   
        cy.get('.for-login > .login-content > .form-signin > .page-card-actions > .btn').click();          
        cy.location('pathname',{timeout:20000}).should('include', '/app');
        cy.visit(url2);
        cy.get('.primary-action').click();
      
      // Sequence 2
      // Default input at creation of quotation
      cy.get('#quotation-__details > :nth-child(2) > .section-body > :nth-child(3) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
        .should('have.value', testdata[2].Value);
      // cy.get('div[data-fieldname="valid_till"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback').should('have.value', env.validTill)
      cy.get('#quotation-__details > :nth-child(2) > .section-body > :nth-child(1) > form > div[data-fieldtype="Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
        .should('have.value', testdata[3].Value);
      
      // // Sequence 2.1
      // // Mandatory fields in details tab
       cy.get('.tab-content', { timeout: 20000 }).should('be.visible');
      
       cy.get(':nth-child(2) > .section-body > :nth-child(3) > form > div[data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback', { scrollBehavior: 'center' })
         .should('be.visible')     
         .wait(500)                 
         .focus()                   
         .type(testdata[4].Value, { force: true }) 
         .type('{enter}');     
 
      cy.get('div[data-fieldname="request_date"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback', { timeout: 10000 }).should('be.visible');
        const TodayDate = new Date();
        const PastDate = new Date(TodayDate); 
        PastDate.setDate(TodayDate.getDate() - 4); 
        const Day = PastDate.getDate().toString().padStart(2, '0');
        const Month = (PastDate.getMonth() + 1).toString().padStart(2, '0'); 
        const Year = PastDate.getFullYear();
        const FormattedDate = `${Day}.${Month}.${Year}`;
      cy.get('div[data-fieldname="request_date"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback', { scrollBehavior: 'center' })
        .clear()  
        .wait(1000)
        .type(FormattedDate + '{Enter}', { force: true }); 
      cy.wait(6000);
      // Sequence 3
      // Validate the customer informations
      cy.get('.tab-content', { timeout: 10000 }).should('be.visible');
      cy.get('div[data-fieldtype="Dynamic Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback', { scrollBehavior: 'center' })
       .type(testdata[5].Value)
       .type('{enter}');
      cy.get('#quotation-__details > :nth-child(3) > .section-body > :nth-child(1) > form > div[data-fieldtype="Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback', { timeout: 10000 }).should('be.visible');
      cy.get('#quotation-__details > :nth-child(3) > .section-body > :nth-child(1) > form > div[data-fieldtype="Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback', { timeout: 10000 })
        .should('have.value', testdata[6].Value);
      cy.get('div[data-fieldname="selling_price_list"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback', { timeout: 10000 })
        .should('have.value', testdata[7].Value);
      cy.get('#quotation-address_and_contact_tab-tab', { timeout: 10000 }).should('be.visible');
      cy.get('#quotation-address_and_contact_tab-tab').click({force:true});
      cy.get('#quotation-address_and_contact_tab > :nth-child(2) > .section-body > :nth-child(1) > form > .input-max-width > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback', { timeout: 10000 }).should('be.visible');
      cy.get('#quotation-address_and_contact_tab > :nth-child(2) > .section-body > :nth-child(1) > form > .input-max-width > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback', { timeout: 10000 })
        .should('have.value', testdata[8].Value);
      const expectedText = testdata[9].Value.trim().replace(/\s+/g, ' '); 
      cy.get(':nth-child(1) > form > [data-fieldtype="Small Text"] > .form-group > .control-input-wrapper > .control-value')
        .invoke('text')
        .then((text) => {
         const normalizedText = text.replace(/\s+/g, ' ').trim();
         const expectedText = testdata[9].Value.replace(/\s+/g, ' ').trim();
         expect(normalizedText).to.eq(expectedText);
       });
      cy.get('#quotation-address_and_contact_tab > :nth-child(3) > .section-body > :nth-child(1) > form > div[data-fieldtype="Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback', { timeout: 10000 })
        .should('have.value', testdata[10].Value);
      cy.get(':nth-child(2) > .section-body > :nth-child(2) > form > div[data-fieldtype="Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
        .wait(3000)
        .type(testdata[29].Value)
        .wait(3000)
        .type('{enter}');
      cy.get('[data-fieldname="contact_display"] > .form-group > .control-input-wrapper > .control-value')
        .should('have.text', testdata[30].Value);
      cy.get('#quotation-terms_tab-tab', { timeout: 10000 }).should('be.visible');
      cy.get('#quotation-terms_tab-tab').click();
      cy.get('#quotation-terms_tab > :nth-child(2) > .section-body > :nth-child(1) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback', { timeout: 10000 }).should('be.visible');
      cy.get('#quotation-terms_tab > :nth-child(2) > .section-body > :nth-child(1) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback', { timeout: 10000 })
        .should('have.value', testdata[11].Value);
      cy.get('#quotation-terms_tab > :nth-child(3) > .section-body > :nth-child(1) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback', { timeout: 10000 })
        .should('have.value', testdata[12].Value);
      cy.get('#quotation-terms_tab > :nth-child(4) > .section-body > .form-column > form > .input-max-width > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback', { timeout: 10000 })
        .should('have.value', testdata[13].Value);
 
      // Sequence 4
      // Validate the Item Details
      cy.get('#quotation-__details-tab', { timeout: 10000 }).should('be.visible');
      cy.get('#quotation-__details-tab').click();
      cy.get('.rows > .grid-row > .data-row > .col-xs-4', {scrollBehavior: 'center'})
        .type(testdata[14].Value)
        .wait(1000);
      cy.get('.col-xs-1.bold > .field-area > .form-group > .input-with-feedback')
        .type(testdata[15].Value);
      cy.wait(1000);
      cy.get('.col-xs-2.bold > .field-area > .form-group > .input-with-feedback')
        .invoke('val')
        .wait(2000) 
        .then((text) => {
          const trimmedValue = text.replace(/,/g, '');  
          const expectedValue = testdata[16].Value;
          expect(trimmedValue).to.eq(expectedValue);  
        }); //Rate
      cy.get(':nth-child(7) > .field-area > .form-group > .input-with-feedback')  
        .invoke('val') 
        .wait(2000)
        .then((text) => {
        const trimmedValue = text.replace(/,/g, '');  
        const expectedValue = testdata[17].Value;
        expect(trimmedValue).to.eq(expectedValue);  
      }); //Amount
      cy.get('[data-fieldname="total_qty"] > .form-group > .control-input-wrapper > .control-value')
        .invoke('text')   
        .then((text) => {
          const expectedString = String(testdata[18].Value);  
          expect(text.trim()).to.eq(expectedString);  
      });// Total qnty
      cy.get('[data-fieldname="total"] > .form-group > .control-input-wrapper > .control-value')
        .invoke('text')  
        .then((text) => {
          cy.log('Retrieved text: ', text);  
          const trimmedValue = text.replace(/,/g, '').trim(); 
          const expectedValue = testdata[19].Value;  
          cy.log('Trimmed value: ', trimmedValue);  
          expect(trimmedValue).to.eq(expectedValue);  
      }); //Total (EUR)
      cy.wait(4000);
      // Sequence 4.1
      // Item rate should be red if it is more than 3 month for qsgbcz
      cy.get('.col-xs-2.bold', { timeout: 10000 }).should('have.css', 'color', 'rgb(255, 0, 0)');
      //Sequence 5
      //Validate the taxes and Charges
      cy.get(':nth-child(6) > .section-head').click({force:true});
      cy.get('div[data-fieldname="taxes_and_charges"] > .form-group > .clearfix > .control-label').click({force:true});
      cy.get('div[data-fieldname="taxes_and_charges"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
        .type(testdata[20].Value)
        .wait(2000)
        .type('{enter}'); //Taxes and charges
      cy.get('.rows > .grid-row > .data-row > [data-fieldname="charge_type"] > .static-area')
        .invoke('text')
        .then((text) => {
          const expectedString = String(testdata[21].Value);  
          expect(text.trim()).to.eq(expectedString);  
         }); //Type
      cy.get('[data-fieldname="account_head"] > .static-area > a')
        .invoke('text')
        .then((text) => {
          const expectedString = String(testdata[22].Value);  
          expect(text.trim()).to.eq(expectedString);  
        }); // Account head
      cy.get(':nth-child(7) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > [data-fieldname="rate"] > .static-area > div')
        .invoke('text')   
        .then((text) => {
          const expectedString = String(testdata[23].Value);  
          expect(text.trim()).to.eq(expectedString);  
        }); //Rate
      cy.get('[data-fieldname="tax_amount"] > .static-area > div')
        .invoke('text')  
        .then((text) => {
          cy.log('Retrieved text: ', text);  
          const trimmedValue = text.replace(/,/g, '').trim(); 
          const expectedValue = testdata[24].Value;  
          cy.log('Trimmed value: ', trimmedValue);  
          expect(trimmedValue).to.eq(expectedValue);  
       }); // Amount Tax
      cy.get('[data-fieldname="total"] > .static-area > div')
        .invoke('text')  
        .then((text) => {
          cy.log('Retrieved text: ', text);  
          const trimmedValue = text.replace(/,/g, '').trim(); 
          const expectedValue = testdata[25].Value;  
          cy.log('Trimmed value: ', trimmedValue);  
          expect(trimmedValue).to.eq(expectedValue);  
      }); // Total Tax
      cy.get(':nth-child(8) > .section-body > :nth-child(2) > form > .frappe-control > .form-group > .control-input-wrapper > .control-value')
        .invoke('text')  
        .then((text) => {
          cy.log('Retrieved text: ', text);  
          const trimmedValue = text.replace(/,/g, '').trim(); 
          const expectedValue = testdata[26].Value;  
          cy.log('Trimmed value: ', trimmedValue);  
          expect(trimmedValue).to.eq(expectedValue);  
       }); // Total Taxes and Charges (EUR)
      cy.get('[data-fieldname="grand_total"] > .form-group > .control-input-wrapper > .control-value')
        .invoke('text')  
        .then((text) => {
          cy.log('Retrieved text: ', text);  
          const trimmedValue = text.replace(/,/g, '').trim(); 
          const expectedValue = testdata[27].Value;  
          cy.log('Trimmed value: ', trimmedValue);  
          expect(trimmedValue).to.eq(expectedValue);  
       }); // Grand Total
      cy.get('[data-fieldname="rounded_total"] > .form-group > .control-input-wrapper > .control-value')
        .invoke('text')  
        .then((text) => {
          cy.log('Retrieved text: ', text);  
          const trimmedValue = text.replace(/,/g, '').trim(); 
          const expectedValue = testdata[28].Value;  
          cy.log('Trimmed value: ', trimmedValue);  
          expect(trimmedValue).to.eq(expectedValue);  
       }); //Rounded Total
      //Sequence 6
      //Save the Quotation
      cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .primary-action').click();
      cy.wait(10000);
      // Submit the quotation
      //To submit we need Permission 
      cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').should('be.visible')
        .click();
      cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').should('be.visible')
        .click({ force: true });
      cy.wait(10000);
      // Cancel the quotation
      cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .btn').scrollIntoView()
        .click();
      cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .actions-btn-group > .dropdown-menu > :nth-child(1) > .grey-link').should('be.visible')
        .click({ force: true });
      cy.wait(10000);
      
      // Delete the quotation
      cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .menu-btn-group > .btn > :nth-child(1)').should('be.visible')
        .click();
      cy.get('#page-Quotation > .page-head > .container > .row > .col > .standard-actions > .menu-btn-group > .dropdown-menu > :nth-child(6) > .grey-link > .menu-item-label').should('be.visible')
        .click({ force: true });
      cy.wait(4000);
      cy.get('.modal-content').should('be.visible');
      cy.get('.modal-footer > .standard-actions > .btn-primary').should('be.visible')
        .click({ force: true });


      // // Create Sales Order from this and check
      // cy.get('.dropdown-menu > [data-label="Sales%20Order"]').click({force:true}); //create the sales order
      // cy.wait(4000);
      // cy.get('#sales-order-__details > :nth-child(2) > .section-body > :nth-child(1) > form > div[data-fieldtype="Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .invoke('val')  
      //   .then((value) => {
      //     const cleanedValue = value.replace(/\u00A0/g, ' ').trim();  
      //     const expectedString = String(testdata[5].Value).trim();  
      //     cy.log('Cleaned value:', cleanedValue);  
      //     cy.log('Expected string:', expectedString); 
      //     expect(cleanedValue).to.eq(expectedString);
      //   });// Customer Sales Order      
      // cy.get('#sales-order-__details > :nth-child(2) > .section-body > :nth-child(1) > form > [data-fieldname="customer_name"] > .form-group > .control-input-wrapper > .control-value')
      //   .should('have.text',testdata[31].Value); //Customer Name Sales Order
      // cy.get('#sales-order-__details > :nth-child(2) > .section-body > :nth-child(2) > form > div[data-fieldtype="Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .invoke('val') 
      //   .should('eq', testdata[32].Value); // Factory Sales Order
      // cy.get('#sales-order-__details > :nth-child(2) > .section-body > :nth-child(3) > form > div[data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
      //   .type(testdata[33].Value)
      //   .type('{enter}'); // Customer Purchase Order Sales
      // cy.get('div[data-fieldname="po_date"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback', { timeout: 10000 })
      //   .should('be.visible');
      // const todayDate = new Date();
      // const futureDate = new Date(todayDate); 
      // futureDate.setDate(todayDate.getDate() - 10); 
      // const day = futureDate.getDate().toString().padStart(2, '0'); 
      // const month = (futureDate.getMonth() + 1).toString().padStart(2, '0'); 
      // const year = futureDate.getFullYear(); 
      // const formattedDate = `${day}.${month}.${year}`; 
      // cy.get('div[data-fieldname="po_date"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback', { scrollBehavior: 'center' })
      //   .clear()  
      //   .wait(1000) 
      //   .type(formattedDate + '{Enter}', { force: true });   // Customer Purchase Order Date Sales  
      // cy.get('.rows > .grid-row > .data-row > .col-xs-3')
      //   .invoke('text')
      //   .then((text) => {
      //     const trimmedText = text.trim(); 
      //     expect(trimmedText).to.eq(testdata[14].Value); 
      //   });//Item Code Sales Order
      // cy.get(':nth-child(6) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > .col-xs-1.bold > .static-area > div')
      //   .invoke('text')   
      //   .then((text) => {
      //     const expectedString = String(testdata[18].Value);  
      //     expect(text.trim()).to.eq(expectedString);  
      // }); //Sales Order Quantity
      // cy.get(':nth-child(6) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > .col-xs-2.text-right > .static-area > div')
      //   .invoke('text') 
      //   .then((text) => {
      //     cy.log('Retrieved text:', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim();
      //     const expectedValue = testdata[16].Value;
      //     cy.log('Trimmed value:', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);
      //    });// Rate Sales Order
      // cy.get(':nth-child(7) > .section-body > :nth-child(3) > form > [data-fieldname="total"] > .form-group > .control-input-wrapper > .control-value')
      //   .invoke('text')  
      //   .then((text) => {
      //     cy.log('Retrieved text: ', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim(); 
      //     const expectedValue = testdata[19].Value;  
      //     cy.log('Trimmed value: ', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);  
      //  }); // Total(EUR) Sales Order
      // cy.get(':nth-child(8) > .section-body > :nth-child(1) > form > div[data-fieldname="taxes_and_charges"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback') 
      //   .invoke('val')  
      //   .then((value) => {
      //     const expectedString = String(testdata[20].Value);  
      //     expect(value.trim()).to.eq(expectedString);  
      //   }); //Sales Taxes and Charges Template
      // cy.get(':nth-child(9) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > [data-fieldname="charge_type"] > .static-area')
      //   .invoke('text')
      //   .then((text) => {
      //     const expectedString = String(testdata[21].Value);  
      //     expect(text.trim()).to.eq(expectedString);  
      //   }); // Tax type Sales Order
      // cy.get(':nth-child(9) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > [data-fieldname="account_head"] > .static-area > a')
      //   .invoke('text')
      //   .then((text) => {
      //     const expectedString = String(testdata[22].Value);  
      //     expect(text.trim()).to.eq(expectedString);  
      //   }); // Account head sales Order
      // cy.get(':nth-child(9) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > [data-fieldname="rate"] > .static-area > div')
      //   .invoke('text')   
      //   .then((text) => {
      //     const expectedString = String(testdata[23].Value);  
      //     expect(text.trim()).to.eq(expectedString);  
      //   }); //Rate Sales Order
      // cy.get(':nth-child(9) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > [data-fieldname="tax_amount"] > .static-area > div')
      //   .invoke('text')  
      //   .then((text) => {
      //     cy.log('Retrieved text: ', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim(); 
      //     const expectedValue = testdata[24].Value;  
      //     cy.log('Trimmed value: ', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);  
      //  }); // Amount Tax Sales Order
      // cy.get(':nth-child(9) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > [data-fieldname="total"] > .static-area > div')
      //   .invoke('text')  
      //   .then((text) => {
      //     cy.log('Retrieved text: ', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim(); 
      //     const expectedValue = testdata[25].Value;  
      //     cy.log('Trimmed value: ', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);  
      //   }); // Total Tax Sales Order
      // cy.get('#sales-order-__details > :nth-child(10) > .section-body > :nth-child(2) > form > .frappe-control > .form-group > .control-input-wrapper > .control-value')
      //   .invoke('text')  
      //   .then((text) => {
      //     cy.log('Retrieved text: ', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim(); 
      //     const expectedValue = testdata[26].Value;  
      //     cy.log('Trimmed value: ', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);  
      //  }); // Total Taxes and Charges (EUR) Sales Order
      // cy.get(':nth-child(11) > .section-body > :nth-child(2) > form > [data-fieldname="grand_total"] > .form-group > .control-input-wrapper > .control-value')
      //   .invoke('text')  
      //   .then((text) => {
      //     cy.log('Retrieved text: ', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim(); 
      //     const expectedValue = testdata[27].Value;  
      //     cy.log('Trimmed value: ', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);  
      //  }); // Grand Total Sales Order
      // cy.get(':nth-child(11) > .section-body > :nth-child(2) > form > [data-fieldname="rounded_total"] > .form-group > .control-input-wrapper > .control-value')
      //   .invoke('text')  
      //   .then((text) => {
      //     cy.log('Retrieved text: ', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim(); 
      //     const expectedValue = testdata[28].Value;  
      //     cy.log('Trimmed value: ', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);  
      //  }); //Rounded Total Sales Order
      //  cy.wait(3000);
      //  cy.get('div[data-fieldname="documentation_language"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //  .click()
      //  .wait(2000)
      //  .type(testdata[37].Value + {force:true})
      //  .type('{enter}')
      //  .wait(4000); // Documentation Lan Sales

      // // Validate the address and Contacts 
      // cy.get('#sales-order-contact_info-tab').click({force:true});
      // cy.get('#sales-order-contact_info > :nth-child(2) > .section-body > :nth-child(1) > form > div[data-fieldname="customer_address"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .should('have.value', testdata[8].Value); // Customer Address Sales
      // cy.get('#sales-order-contact_info > :nth-child(2) > .section-body > :nth-child(2) > form > div[data-fieldtype="Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .should('have.value', testdata[29].Value); // Contact Person Sales
      // cy.get('#sales-order-contact_info > :nth-child(2) > .section-body > :nth-child(1) > form > [data-fieldtype="Small Text"] > .form-group > .control-input-wrapper > .control-value')
      //   .invoke('text')  
      //   .then((text) => {
      //     const actualText = text.replace(/\s+/g, ' ').trim(); 
      //     const expectedText = testdata[9].Value.replace(/\s+/g, ' ').trim(); 
      //     expect(actualText).to.eq(expectedText); 
      //   });// Address Sales
      // cy.get('#sales-order-contact_info > :nth-child(2) > .section-body > :nth-child(2) > form > [data-fieldname="contact_display"] > .form-group > .control-input-wrapper > .control-value')
      //   .invoke('text')  
      //   .then((text) => {
      //     const actualText = text.replace(/\s+/g, ' ').trim(); 
      //     const expectedText = testdata[30].Value.replace(/\s+/g, ' ').trim(); 
      //     expect(actualText).to.eq(expectedText); 
      //   }); //contact Sales
      // cy.get(':nth-child(2) > .section-body > :nth-child(1) > form > div[data-fieldname="territory"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .should('have.value', testdata[34].Value); //Territory Sales
      // cy.get('#sales-order-contact_info > :nth-child(3) > .section-body > :nth-child(1) > form > .input-max-width > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .should('have.value', testdata[10].Value); // Shipping Address Name
      // cy.get(':nth-child(3) > .section-body > :nth-child(1) > form > [data-fieldtype="Small Text"] > .form-group > .control-input-wrapper > .control-value')
      //   .invoke('text')  
      //   .then((text) => {
      //     const actualText = text.replace(/\s+/g, ' ').trim(); 
      //     const expectedText = testdata[9].Value.replace(/\s+/g, ' ').trim(); 
      //     expect(actualText).to.eq(expectedText); 
      //   }); // Shipping Address Sales
      // cy.get('#sales-order-contact_info > :nth-child(4) > .section-body > :nth-child(1) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .invoke('val')  
      //   .then((value) => {
      //     const expectedString = String(testdata[35].Value);  
      //     expect(value.trim()).to.eq(expectedString);  
      //   }); //Company Address Name Sales
      // cy.wait(4000);
      // cy.get('#sales-order-contact_info > :nth-child(4) > .section-body > :nth-child(2) > form > [data-fieldtype="Small Text"] > .form-group > .control-input-wrapper > .control-value')
      //   .invoke('text')  
      //   .then((text) => {
      //       const actualText = text.replace(/\s+/g, ' ').trim(); 
      //       const expectedText = testdata[36].Value.replace(/\s+/g, ' ').trim(); 
      //       expect(actualText).to.include(expectedText); 
      //     }); // Company Address Sales
      // cy.get('#page-Sales\\ Order > .page-head > .container > .row > .col > .standard-actions > .primary-action > .alt-underline').click({force:true}); // Save the Sales Order
      // cy.get('#page-Sales\\ Order > .page-head > .container > .row > .col > .standard-actions > .primary-action').click(); // Submit the Sales Order
      // cy.get('.modal-footer > .standard-actions > .btn-primary').click({force:true}); //permanently Submit the Sales Order
      // cy.wait(10000);

     
      // // Create Delivery Note
      // cy.get('[data-label="Delivery%20Note"]').click({force:true}); // create delivery note
      // cy.wait(2000);
      // cy.get('#delivery-note-__details > :nth-child(1) > .section-body > :nth-child(1) > form > div[data-fieldtype="Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .invoke('val')  
      //   .then((value) => {
      //     const cleanedValue = value.replace(/\u00A0/g, ' ').trim();  
      //     const expectedString = String(testdata[5].Value).trim();  
      //     cy.log('Cleaned value:', cleanedValue);  
      //     cy.log('Expected string:', expectedString); 
      //     expect(cleanedValue).to.eq(expectedString);
      //   }); // Customer Delivery Note
      // cy.get(':nth-child(1) > .section-body > :nth-child(1) > form > [data-fieldname="customer_name"] > .form-group > .control-input-wrapper > .control-value')
      //   .should('have.text',testdata[31].Value); //Customer name Delivery Note
      // cy.get('#delivery-note-__details > :nth-child(4) > .section-body > :nth-child(1) > form > div[data-fieldtype="Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .should('have.value', testdata[6].Value); // Currency Delivery Note
      // cy.get('#delivery-note-__details > :nth-child(4) > .section-body > :nth-child(2) > form > div[data-fieldname="selling_price_list"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .should('have.value', testdata[7].Value); // Price List Delivery Note
      // cy.get('#delivery-note-__details > :nth-child(6) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > .col-xs-3')
      //   .invoke('text')
      //   .then((text) => {
      //     const trimmedText = text.trim(); 
      //     expect(trimmedText).to.eq(testdata[14].Value); 
      //   }); // Item Code Delivery Note
      // cy.get('#delivery-note-__details > :nth-child(6) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > .text-right.bold > .static-area > div')
      //   .invoke('text')   
      //   .then((text) => {
      //       const expectedString = String(testdata[18].Value);  
      //       expect(text.trim()).to.eq(expectedString);  
      //   }); // Item quqntity Delivery Note
      // cy.get('#delivery-note-__details > :nth-child(6) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > .col-xs-2.text-right > .static-area > div')
      //   .invoke('text') 
      //   .then((text) => {
      //     cy.log('Retrieved text:', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim();
      //     const expectedValue = testdata[16].Value;
      //     cy.log('Trimmed value:', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);
      //   }); // Rate in Delivery Note Item
      // cy.get(':nth-child(8) > .section-body > :nth-child(3) > form > [data-fieldname="total"] > .form-group > .control-input-wrapper > .control-value')
      //   .invoke('text')  
      //   .then((text) => {
      //     cy.log('Retrieved text: ', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim(); 
      //     const expectedValue = testdata[19].Value;  
      //     cy.log('Trimmed value: ', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);  
      // }); // Total in Del Note

      // // Sales taxes and charges in Del Note
      // cy.get(':nth-child(10) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > [data-fieldname="charge_type"] > .static-area')
      //   .invoke('text')
      //   .then((text) => {
      //     const expectedString = String(testdata[21].Value);  
      //     expect(text.trim()).to.eq(expectedString);  
      //   }); // Tax type in  Del Note
      // cy.get(':nth-child(10) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > [data-fieldname="account_head"] > .static-area > a')        .invoke('text')
      //   .then((text) => {
      //     const expectedString = String(testdata[22].Value);  
      //     expect(text.trim()).to.eq(expectedString);  
      //   }); // Account head in del note
      // cy.get(':nth-child(10) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > [data-fieldname="rate"] > .static-area > div')        .invoke('text')   
      //   .then((text) => {
      //     const expectedString = String(testdata[23].Value);  
      //     expect(text.trim()).to.eq(expectedString);  
      //   }); //Rate Sales in Del note
      // cy.get(':nth-child(10) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > [data-fieldname="tax_amount"] > .static-area > div')        .invoke('text')  
      //   .then((text) => {
      //     cy.log('Retrieved text: ', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim(); 
      //     const expectedValue = testdata[24].Value;  
      //     cy.log('Trimmed value: ', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);  
      //  }); // Amount Tax in Del note
      // cy.get(':nth-child(10) > .section-body > .form-column > form > .frappe-control > .grid-field > .form-grid-container > .form-grid > .grid-body > .rows > .grid-row > .data-row > [data-fieldname="total"] > .static-area > div')        .invoke('text')  
      //   .then((text) => {
      //     cy.log('Retrieved text: ', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim(); 
      //     const expectedValue = testdata[25].Value;  
      //     cy.log('Trimmed value: ', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);  
      //   }); // Total Tax in Del note
      // cy.get('#delivery-note-__details > :nth-child(11) > .section-body > :nth-child(2) > form > .frappe-control > .form-group > .control-input-wrapper > .control-value')        .invoke('text')  
      //   .then((text) => {
      //     cy.log('Retrieved text: ', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim(); 
      //     const expectedValue = testdata[26].Value;  
      //     cy.log('Trimmed value: ', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);  
      //  }); // Total Taxes and Charges (EUR) Del note
      // cy.get(':nth-child(12) > .section-body > :nth-child(2) > form > [data-fieldname="grand_total"] > .form-group > .control-input-wrapper > .control-value')        .invoke('text')  
      //   .then((text) => {
      //     cy.log('Retrieved text: ', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim(); 
      //     const expectedValue = testdata[27].Value;  
      //     cy.log('Trimmed value: ', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);  
      //  }); // Grand Total in Del note
      // cy.get(':nth-child(12) > .section-body > :nth-child(2) > form > [data-fieldname="rounded_total"] > .form-group > .control-input-wrapper > .control-value')        .invoke('text')  
      //   .then((text) => {
      //     cy.log('Retrieved text: ', text);  
      //     const trimmedValue = text.replace(/,/g, '').trim(); 
      //     const expectedValue = testdata[28].Value;  
      //     cy.log('Trimmed value: ', trimmedValue);  
      //     expect(trimmedValue).to.eq(expectedValue);  
      //  }); //Rounded Total in del note

      // //Address and contact
      // cy.get('#delivery-note-address_and_contact_tab-tab').click({force:true});
      // cy.get('#delivery-note-address_and_contact_tab > :nth-child(2) > .section-body > :nth-child(1) > form > .input-max-width > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .should('have.value', testdata[8].Value); // Customer Address Del
      // cy.get('#delivery-note-address_and_contact_tab > :nth-child(2) > .section-body > :nth-child(2) > form > div[data-fieldtype="Link"] > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .should('have.value', testdata[29].Value); // Contact Person Del
      // cy.get('#delivery-note-address_and_contact_tab > :nth-child(2) > .section-body > :nth-child(1) > form > [data-fieldtype="Small Text"] > .form-group > .control-input-wrapper > .control-value')        .invoke('text')  
      //   .then((text) => {
      //     const actualText = text.replace(/\s+/g, ' ').trim(); 
      //     const expectedText = testdata[9].Value.replace(/\s+/g, ' ').trim(); 
      //     expect(actualText).to.eq(expectedText); 
      //   });// Address Del
      // cy.get('#delivery-note-address_and_contact_tab > :nth-child(2) > .section-body > :nth-child(2) > form > [data-fieldname="contact_display"] > .form-group > .control-input-wrapper > .control-value')        .invoke('text')  
      //   .then((text) => {
      //     const actualText = text.replace(/\s+/g, ' ').trim(); 
      //     const expectedText = testdata[30].Value.replace(/\s+/g, ' ').trim(); 
      //     expect(actualText).to.eq(expectedText); 
      //   }); //contact Del
      // cy.get('#delivery-note-address_and_contact_tab > :nth-child(3) > .section-body > :nth-child(1) > form > .input-max-width > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')
      //   .should('have.value', testdata[10].Value); // Shipping Address Name Del
      // cy.get('#delivery-note-address_and_contact_tab > :nth-child(3) > .section-body > :nth-child(1) > form > [data-fieldtype="Small Text"] > .form-group > .control-input-wrapper > .control-value')        .invoke('text')  
      //   .then((text) => {
      //     const actualText = text.replace(/\s+/g, ' ').trim(); 
      //     const expectedText = testdata[9].Value.replace(/\s+/g, ' ').trim(); 
      //     expect(actualText).to.eq(expectedText); 
      //   }); // Shipping Address Del
      // cy.get('#delivery-note-address_and_contact_tab > :nth-child(4) > .section-body > :nth-child(1) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .link-field > .awesomplete > .input-with-feedback')        .invoke('val')  
      //   .then((value) => {
      //     const expectedString = String(testdata[35].Value);  
      //     expect(value.trim()).to.eq(expectedString);  
      //   }); //Company Address Name Del
      // cy.wait(4000);
      // cy.get('#delivery-note-address_and_contact_tab > :nth-child(4) > .section-body > :nth-child(2) > form > .frappe-control > .form-group > .control-input-wrapper > .control-value')        
      //   .invoke('text')  
      //   .then((text) => {
      //       const actualText = text.replace(/\s+/g, ' ').trim(); 
      //       const expectedText = testdata[36].Value.replace(/\s+/g, ' ').trim(); 
      //       expect(actualText).to.include(expectedText); 
      //     }); // Company Address Del

      // // Save Cancel and Delete the Delivery Note
      // cy.get('#page-Delivery\\ Note > .page-head > .container > .row > .col > .standard-actions > .primary-action > .alt-underline').click({force:true}) // Save del
      // cy.get('#page-Delivery\\ Note > .page-head > .container > .row > .col > .standard-actions > .menu-btn-group > .btn > :nth-child(1)').click({force:true}); // Select the dropdown
      // cy.get('#page-Delivery\\ Note > .page-head > .container > .row > .col > .standard-actions > .menu-btn-group > .dropdown-menu > :nth-child(14) > .grey-link').click({force:true}); // Delete Delivery Note
      // cy.get('.modal.show > .modal-dialog > .modal-content > .modal-footer > .standard-actions > .btn-primary').click({force:true}); // Delete the Delivery Note
      
      // // Cancel and Delete the Sales order
      // cy.wait(3000);
      // cy.get('#page-Sales\\ Order > .page-head > .container > .row > .col > .standard-actions > .btn-secondary').click({force:true}); // Cancel the Sales Order
      // cy.wait(4000);
      // cy.get('.modal.show > .modal-dialog > .modal-content > .modal-footer > .standard-actions > .btn-primary').click({force:true}); // permanemtly Cancel the Sales order
      // cy.get('#page-Sales\\ Order > .page-head > .container > .row > .col > .standard-actions > .menu-btn-group > .btn').click({force:true});
      // cy.get('#page-Sales\\ Order > .page-head > .container > .row > .col > .standard-actions > .menu-btn-group > .dropdown-menu > :nth-child(9) > .grey-link').click({force:true}); // Delete the Sales Order       
     

      
        });
    });
})
