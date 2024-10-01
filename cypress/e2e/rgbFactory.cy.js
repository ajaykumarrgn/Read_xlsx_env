/// <reference types="cypress" />


Cypress.Commands.add('waitForFormToLoad', () => {
    cy.get('.layout-main > .col') 
      .should('be.visible');  
  });
   
  //Excel file data fetching
  
  describe('Toggle field Testing', () => {
    beforeEach(() => {
      cy.task('readExcelFile', { filePath:'/home/tyro24001/Desktop/cypress/cypress/e2e/variables/design.xlsx', sheetName: 'Sheet1' }).then((data) => {   
      Cypress.log({ message: 'Excel data loaded', log: false });
      cy.wrap(data).as('testdata');   
      });
  });
  
  
  // login for each section by using env values
  
      // beforeEach(() => {
      //     cy.softErrors = [];
          // const username = Cypress.env('username');
          // const password = Cypress.env('password');
  
          // cy.get('@testdata').then((testdata) => {
          // const source = testdata[0].Value;
          
          // cy.visit(source);
          // cy.get('#login_email').type(username);
          // cy.get('#login_password').type(password);
          // cy.get('.form-signin > :nth-child(1) > .page-card-actions > .btn').click();
          // cy.location('pathname', { timeout: 10000 }).should('include', '/app');
          //});

      //});
  
      // afterEach(() => {
      //     if (cy.softErrors.length > 0) {
      //         cy.log('Soft assertion errors:');
      //         cy.softErrors.forEach(err => {
      //             cy.log(err.message);
      //         });
      //     }
      // });
      // Cypress.on('uncaught:exception', (err, runnable) => {
      //   return false;
      // });
    
  
      it('RGB Factory', () => {
  
        cy.get('@testdata').then((testdata) => {
          const username = Cypress.env('username');
          const password = Cypress.env('password');

          const source = testdata[0].Value;
          
          cy.visit(source);
          cy.get('#login_email').type(username);
          cy.get('#login_password').type(password);
          cy.get('.form-signin > :nth-child(1) > .page-card-actions > .btn').click();
          cy.location('pathname', { timeout: 10000 }).should('include', '/app');

          const target = testdata[1].Value;
          cy.visit(target);
  
          const factory3 = testdata[4].Value;
          const factory2 = testdata[5].Value;
          const factory1 = testdata[3].Value;
  
  
  //rgb factory select and check  
  
      cy.get('div[data-fieldname="factory"] > .form-group > .control-input-wrapper > .control-input > select') 
        .find('option') 
        .then((options) => {
              const values = [factory1, factory2,factory3]; 
              options.each((index, option) => {
                expect(option.value).to.equal(values[index]); 
          });
        });
  
      cy.wait(3000);
  
            cy.get('div[data-fieldname="factory"] > .form-group > .control-input-wrapper > .control-input > select')
              .should('be.visible') 
              .select(factory2)
              .should('have.value', factory2); 

      cy.wait(3000);

  
  // transformer type select and check
       
  cy.get('div[data-fieldname="transformer_type"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')              
     .find('option')
    .then((options) => {
      const expectedValues = ['DTTH2N', 'DTTH2NG', 'DTTHDG', 'DTTHK2NG']; 
      expect(options.length).to.equal(expectedValues.length);
      options.each((index, option) => {
        expect(option.value.trim()).to.equal(expectedValues[index]);
      });
    });
  
  
            const rating = testdata[10].Value;
            
            cy.get('.awesomplete > .input-with-feedback')
              .should('have.value', rating);


              
            const Hv_min = String(testdata[11].Value);
cy.get(':nth-child(3) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .type(Hv_min +'{enter}');
              
  
              cy.get('.btn-modal-close')
                .wait(2000)
                .click({ force: true });
      
              cy.wait(2000);
  
              const HV_max = String(testdata[12].Value);
              cy.get(':nth-child(3) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .clear({ force: true })
                .type(HV_max+'{enter}');
  
              cy.wait(4000);
  
              cy.get('.btn-modal-close') 
                .wait(4000)         
                .click({ force: true });
  
              cy.wait(2000);
              
  
              const HV1 = String(testdata[13].Value);
              cy.get(':nth-child(3) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .clear({force:true})
                .type(HV1+'{enter}');
  
  
  
                const Hv_HOV1 = String(testdata[16].Value); 
                const Hv_HOV2 = String(testdata[17].Value); 
  
                
                cy.wait(2000);
                
                cy.get(':nth-child(3) > .section-body > :nth-child(2) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                  .find('option') 
                  .then((options) => {
                    const values = [Hv_HOV1, Hv_HOV2]; 
                    options.each((index, option) => {
                      expect(option.value.trim()).to.equal(values[index]); 
                    });
                  });
                
            
                cy.get(':nth-child(3) > .section-body > :nth-child(2) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                  .should('have.value', Hv_HOV1); 
                
  
  
            
              const HV_AC_phase = String(testdata[18].Value);  
              cy.wait(2000);
              cy.get(':nth-child(3) > .section-body > :nth-child(3) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .find('option') 
                .then((options) => {
                const values = [HV_AC_phase]; 
                options.each((index, option) => {
                  expect(option.value).to.equal(values[index]); 
                });
              });
  
              cy.get(':nth-child(3) > .section-body > :nth-child(3) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .should('have.value',HV_AC_phase);
  
              cy.wait(2000);
  
              const HV_LI_phase = String(testdata[19].Value);  
  
              cy.get(':nth-child(3) > .section-body > :nth-child(4) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .find('option') 
                .then((options) => {
                  const values = [HV_LI_phase]; 
                  options.each((index, option) => {
                    expect(option.value).to.equal(values[index]); 
                  });
                });
  
              cy.get(':nth-child(3) > .section-body > :nth-child(4) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .should('have.value',HV_LI_phase);
  
              cy.wait(2000);       
              
              const LV_min = String(testdata[20].Value);
              const LV_max = String(testdata[21].Value);  
              cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')            
                .type(LV_min+'{enter}', { force: true });
            
              cy.get('.btn-modal-close')
                .wait(3000)
                .click({ force: true });
      
              cy.wait(3000);
      
              cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .clear({ force: true })
                .type(LV_max +'{enter}');
  
              cy.wait(3000);
  
              cy.get('.btn-modal-close') 
                .wait(3000)         
                .click({ force: true });
  
              const LV1 = String(testdata[22].Value);
              cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .clear({ force: true })
                .type(LV1+'{enter}')
  
              cy.wait(3000);          
  
              const Lv_HOV1 = String(testdata[25].Value);
              const Lv_HOV2 = String(testdata[26].Value);
              const Lv_HOV3 = String(testdata[27].Value);
  
              cy.get(':nth-child(4) > .section-body > :nth-child(2) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .find('option') 
                .then((options) => {
                  const values = [Lv_HOV1,Lv_HOV2,Lv_HOV3]; 
                  options.each((index, option) => {
                    expect(option.value).to.equal(values[index]); 
                  });
                });
  
              cy.get(':nth-child(4) > .section-body > :nth-child(2) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .should('have.value',Lv_HOV1);
  
              cy.wait(2000);          
  
              const Lv_AC_phase1 = String(testdata[28].Value);
              const Lv_AC_phase2 = String(testdata[29].Value);
  
              cy.get(':nth-child(4) > .section-body > :nth-child(3) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .find('option') 
                .then((options) => {
                  const values = [Lv_AC_phase1,Lv_AC_phase2]; 
                  options.each((index, option) => {
                    expect(option.value).to.equal(values[index]); 
                  });
                });
  
              cy.get(':nth-child(4) > .section-body > :nth-child(3) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .should('have.value', Lv_AC_phase1);
  
              cy.wait(2000);          
  
              const Lv_LI_phase1 = String(testdata[30].Value);
              const Lv_LI_phase2 = String(testdata[31].Value);
  
              cy.get(':nth-child(4) > .section-body > :nth-child(4) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .find('option') 
                .then((options) => {
                  const values = [Lv_LI_phase1,Lv_LI_phase2]; 
                  options.each((index, option) => {
                    expect(option.value).to.equal(values[index]); 
                  });
                });
              
              
              cy.get(':nth-child(4) > .section-body > :nth-child(4) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .should('have.value', Lv_LI_phase1);
  
              const Lv_type1 = String(testdata[32].Value);
              const Lv_type2 = String(testdata[33].Value);
  
              cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .find('option') 
                .then((options) => {
                  const values = ['',Lv_type1,Lv_type2]; 
                  options.each((index, option) => {
                    expect(option.value).to.equal(values[index]); 
                  });
                });
  
              cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .should('have.value', Lv_type1);
  
  
              cy.get('div[data-fieldname="vector_group"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .find('option') 
                .then((options) => {
                  const values = ['Dyn1','Dyn5','Dyn7','Dyn11','Yy0','Yd1','Yd5','Yd7','Yd11','YD1','Yz1','Yz5','YZ5','Yz7','Yz11','Dzn0']; // Expected values
                  options.each((index, option) => {
                    expect(option.value).to.equal(values[index]); 
                  });
                });
  
              cy.get('div[data-fieldname="vector_group"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .should('have.value', 'Dyn1');
  
              const THDi = testdata[34].Value;
              cy.get(':nth-child(2) > form > div[data-fieldtype="Int"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .should('have.value',THDi);
  
  
  
                const IP_protection1 = testdata[35].Value;
                const IP_protection2 = testdata[36].Value;
                const IP_protection3 = testdata[37].Value;
                const IP_protection4 = testdata[38].Value;
                const IP_protection5 = testdata[39].Value;
                const IP_protection6 = testdata[40].Value;
                const IP_protection7 = testdata[41].Value;
  
  
              cy.get('div[data-fieldname="ip_protection"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .find('option') 
                .then((options) => {
                  const values = [IP_protection1,IP_protection2,IP_protection3,IP_protection4,IP_protection5,IP_protection6,IP_protection7]; 
                  options.each((index, option) => {
                    expect(option.value).to.equal(values[index]); 
                  });
                });
  
  
              const Uk = testdata[42].Value;
              cy.get(':nth-child(5) > .section-body > :nth-child(4) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
                .should('have.value',Uk);
  
              const Insulation_class1 = testdata[43].Value;
              const Insulation_class2 = testdata[44].Value;
  
              cy.get(':nth-child(6) > .section-body > :nth-child(1) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
               .should('have.value', Insulation_class1);
  
  
              const Winding_material1 = testdata[45].Value;
              //const Winding_material2 = testdata[46].Value;
              cy.get(':nth-child(6) > .section-body > :nth-child(2) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
               .should('have.value',Winding_material1);
  
  
  cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .clear({ force: true })
    .type(`${LV1}/${LV_max}{enter}`)
  
  cy.wait(3000);
  
  cy.get('.btn-modal-close') 
    .wait(3000)         
    .click({ force: true });
  
  const LV2 = String(testdata[23].Value);
  
  cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .clear({ force: true })
    .type(`${LV1}/${LV2}{enter}`)
  
  cy.wait(3000);
  
  // rating lv
  const RGB_rating_lv1 = String(testdata[81].Value);
  const RGB_rating_lv2 = String(testdata[82].Value);
  const RGB_rating_lv3 = String(testdata[83].Value);

  

  cy.get(':nth-child(2) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')    .type(`${RGB_rating_lv1}/${RGB_rating_lv2}`,{force:true})
    .wait(3000)
    .type('{enter}');

  cy.get('.btn-modal-close')
    .wait(3000)         
    .click({ force: true });

  cy.get(':nth-child(2) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .clear({ force: true })
    .wait(3000)
    .type(`${RGB_rating_lv1}/${RGB_rating_lv3}` ,{force:true})
    .wait(3000)
    .type('{enter}');
  
  // //uk %
  const RGB_uk_lv1 = String(testdata[84].Value);
  const RGB_uk_lv2 = String(testdata[85].Value);
  const RGB_uk_lv3 = String(testdata[86].Value);

  cy.get('[data-fieldtype="HTML"][data-fieldname="uk_lv"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .type(`${RGB_uk_lv1}/${RGB_uk_lv2}`, { force: true })
    .type('{enter}');

  cy.get('.btn-modal-close')
    .wait(3000)         
    .click({ force: true });

  cy.get('[data-fieldtype="HTML"][data-fieldname="uk_lv"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .clear({ force: true })
    .wait(3000)         
    .type(`${RGB_uk_lv1}/${RGB_uk_lv3}`, { force: true })
    .wait(3000)         
    .type('{enter}');

  //verctor group 1 
  cy.get('.row > :nth-child(1) > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .find('option')  
    .then((options) => {
                  const values = ['Dyn1','Dyn5','Dyn7','Dyn11','Yy0','Yd1','Yd5','Yd7','Yd11','YD1','Yz1','Yz5','YZ5','Yz7','Yz11','Dzn0'];   
                  options.each((index, option) => {
                    expect(option.value).to.equal(values[index]);  
                  });
                });
  
  cy.get('.row > :nth-child(1) > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .should('have.value', 'Dyn1');
  
  //verctor group 2
  cy.get('.row > :nth-child(1) > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
    .find('option')  
    .then((options) => {
                  const values = ['Dyn1','Dyn5','Dyn7','Dyn11','Yy0','Yd1','Yd5','Yd7','Yd11','YD1','Yz1','Yz5','YZ5','Yz7','Yz11','Dzn0'];   
                  options.each((index, option) => {
                    expect(option.value).to.equal(values[index]);  
                  });
                });
  
  
  cy.get('.row > :nth-child(1) > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')  
    .should('have.value', 'Dyn1');
  

//High volgtage tab

cy.get('#design-high_voltage_tab-tab')
  .click({ force: true });

cy.get('div[data-fieldname="tapping_plus"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .find('option')  
  .then((options) => {
    const values = ['1','2','3','4','5','6','7','8'];   
    options.each((index, option) => {
      expect(option.value).to.equal(values[index]);  
    });
  });

cy.get('div[data-fieldname="tapping_plus"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', '2');

cy.get('div[data-fieldname="tapping_minus"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .find('option')  
  .then((options) => {
    const values = ['1','2','3','4','5','6','7','8'];   
    options.each((index, option) => {
      expect(option.value).to.equal(values[index]);  
    });
  });


cy.get('div[data-fieldname="tapping_minus"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', '2');


cy.get('div[data-fieldname="tapping_plus_step"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', '2,5');


cy.get('[data-fieldname="tapping_minus_step"] > .form-group > .control-input-wrapper > .control-value')
  .should('have.text', '2.5%');

//Transformer environment

cy.get('#design-transformer_environment_tab-tab')
  .click({ force: true });


cy.get('div[data-fieldname="temperature_rise"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', '100,0');


cy.get('div[data-fieldname="ambient_max_temperature"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', '40,0');



cy.get(':nth-child(3) > form > div[data-fieldtype="Float"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', '20,0');


cy.get('#design-transformer_environment_tab > .row > .section-body > :nth-child(4) > form > [data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-value')
  .should('have.text', 'max 1000 m above see level');


cy.get('div[data-fieldname="max_average_temperature_per_month"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', '30,0');



cy.get('#design-transformer_environment_tab > .row > .section-body > :nth-child(2) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .find('option')  
  .then((options) => {
    const values = ['C2','C3','C4','C5'];   
    options.each((index, option) => {
      expect(option.value).to.equal(values[index]);  
    });
  });

cy.get('#design-transformer_environment_tab > .row > .section-body > :nth-child(2) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', 'C2');



cy.get('#design-transformer_environment_tab > .row > .section-body > :nth-child(3) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .find('option')  
  .then((options) => {
    const values = ['E2','E3','E4','E5'];   
    options.each((index, option) => {
      expect(option.value).to.equal(values[index]);   
    });
  });


cy.get('#design-transformer_environment_tab > .row > .section-body > :nth-child(3) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', 'E2');


// Guaranties values

cy.get('#design-guaranties_values_tab-tab')
  .click({ force: true });


cy.get(':nth-child(1) > form > [data-fieldtype="Percent"] > .form-group > .control-input-wrapper > .control-value')
  .should('have.text', '10%');

cy.get('div[data-fieldname="no_load_loss_guarantee"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', '1395');

cy.get('div[data-fieldname="load_loss_guarantee"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', '9000');

cy.get('#design-guaranties_values_tab > .row > .section-body > :nth-child(4) > form > [data-fieldtype="Float"] > .form-group > .control-input-wrapper > .control-value')
  .should('have.text', '120');

cy.get('#design-guaranties_values_tab > .row > .section-body > :nth-child(1) > form > div[data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', '64');

cy.get('div[data-fieldname="lpa"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', '0');

cy.get('div[data-fieldname="lpa_distance"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
  .should('have.value', '0');

cy.get('#design-guaranties_values_tab > .row > .section-body > :nth-child(4) > form > [data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-value')
  .should('have.text', '0');






    });
  
  });
  
//   it('NEU Factory', () => {

//     cy.get('@testdata').then((testdata) => {

//       const username = Cypress.env('username');
//       const password = Cypress.env('password');

//       const source = testdata[0].Value;
          
//       cy.visit(source);
//       cy.get('#login_email').type(username);
//       cy.get('#login_password').type(password);
//       cy.get('.form-signin > :nth-child(1) > .page-card-actions > .btn').click();
//       cy.location('pathname', { timeout: 10000 }).should('include', '/app');
      
//       const target = testdata[1].Value;
//       cy.visit(target);

//       const factory3 = testdata[4].Value;
//       const factory2 = testdata[5].Value;
//       const factory1 = testdata[3].Value;


// //NEU factory select and check  

//   cy.get('div[data-fieldname="factory"] > .form-group > .control-input-wrapper > .control-input > select') 
//     .find('option') 
//     .then((options) => {
//           const values = [factory1, factory2,factory3]; 
//           options.each((index, option) => {
//             expect(option.value).to.equal(values[index]); 
//       });
//     });

//   cy.wait(3000);

//         cy.get('div[data-fieldname="factory"] > .form-group > .control-input-wrapper > .control-input > select')
//           .should('be.visible') 
//           .select(factory3)
//           .should('have.value', factory3); 

//   cy.wait(3000);


// // transformer type select and check
   
// // cy.get('div[data-fieldname="transformer_type"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')              
// //    .find('option')
// //   .then((options) => {
// //     const expectedValues = ['DTTH2N', 'DTTH2NG', 'DTTHDG', 'DTTHK2NG']; 
// //     expect(options.length).to.equal(expectedValues.length);
// //     options.each((index, option) => {
// //       expect(option.value.trim()).to.equal(expectedValues[index]);
// //     });
// //   });


//         const rating = testdata[10].Value;
        
//         cy.get('.awesomplete > .input-with-feedback')
//           .should('have.value', rating);


          
// const Hv_min = String(testdata[11].Value);
// cy.get(':nth-child(3) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .type(Hv_min +'{enter}');
          

//           cy.get('.btn-modal-close')
//             .wait(2000)
//             .click({ force: true });
  
//           cy.wait(2000);

//           const HV_max = String(testdata[12].Value);
//           cy.get(':nth-child(3) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .clear({ force: true })
//             .type(HV_max+'{enter}');

//           cy.wait(4000);

//           cy.get('.btn-modal-close') 
//             .wait(4000)         
//             .click({ force: true });

//           cy.wait(2000);
          

// const HV1 = String(testdata[13].Value);
// cy.get(':nth-child(3) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .clear({force:true})
// .type(HV1+'{enter}');



// const NEU_Hv_HOV1 = String(testdata[48].Value); 
// const NEU_Hv_HOV2 = String(testdata[49].Value); 

            
//             cy.wait(2000);
            
//             cy.get(':nth-child(3) > .section-body > :nth-child(2) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//               .find('option') 
//               .then((options) => {
//                 const values = [NEU_Hv_HOV1, NEU_Hv_HOV2]; 
//                 options.each((index, option) => {
//                   expect(option.value.trim()).to.equal(values[index]); 
//                 });
//               });
            
        
//             cy.get(':nth-child(3) > .section-body > :nth-child(2) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//               .should('have.value', NEU_Hv_HOV1); 
            


        
//           const NEU_HV_AC_phase1 = String(testdata[50].Value);  
//           const NEU_HV_AC_phase2 = String(testdata[51].Value);  
//           cy.wait(2000);
//           cy.get(':nth-child(3) > .section-body > :nth-child(3) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .find('option') 
//             .then((options) => {
//             const values = [NEU_HV_AC_phase1,NEU_HV_AC_phase2]; 
//             options.each((index, option) => {
//               expect(option.value).to.equal(values[index]); 
//             });
//           });

//           cy.get(':nth-child(3) > .section-body > :nth-child(3) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .should('have.value',NEU_HV_AC_phase1);

//           cy.wait(2000);

// const NEU_HV_LI_phase1 = String(testdata[52].Value);  
// const NEU_HV_LI_phase2 = String(testdata[53].Value);  
// const NEU_HV_LI_phase3 = String(testdata[54].Value);  

// cy.get(':nth-child(3) > .section-body > :nth-child(4) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .find('option') 
// .then((options) => {
// const values = [NEU_HV_LI_phase1,NEU_HV_LI_phase2,NEU_HV_LI_phase3]; 
// options.each((index, option) => {
// expect(option.value).to.equal(values[index]); 
//               });
//             });

//           cy.get(':nth-child(3) > .section-body > :nth-child(4) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .should('have.value',NEU_HV_LI_phase1);

//           cy.wait(2000);       
          
//           const LV_min = String(testdata[20].Value);
//           const LV_max = String(testdata[21].Value);  
//           cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')            
//             .type(LV_min+'{enter}', { force: true });
        
//           cy.get('.btn-modal-close')
//             .wait(3000)
//             .click({ force: true });
  
//           cy.wait(3000);
  
//           cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .clear({ force: true })
//             .type(LV_max +'{enter}');

//           cy.wait(3000);

//           cy.get('.btn-modal-close') 
//             .wait(3000)         
//             .click({ force: true });

//           const LV1 = String(testdata[22].Value);
//           cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .clear({ force: true })
//             .type(LV1+'{enter}')

//           cy.wait(3000);          

//           const NEU_Lv_HOV1 = String(testdata[25].Value);
//           const NEU_Lv_HOV2 = String(testdata[26].Value);
//           const NEU_Lv_HOV3 = String(testdata[27].Value);

//           cy.get(':nth-child(4) > .section-body > :nth-child(2) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .find('option') 
//             .then((options) => {
//               const values = [NEU_Lv_HOV1,NEU_Lv_HOV2,NEU_Lv_HOV3]; 
//               options.each((index, option) => {
//                 expect(option.value).to.equal(values[index]); 
//               });
//             });

//           cy.get(':nth-child(4) > .section-body > :nth-child(2) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .should('have.value',NEU_Lv_HOV1);

//           cy.wait(2000);          

//           const NEU_Lv_AC_phase1 = String(testdata[60].Value);
//           const NEU_Lv_AC_phase2 = String(testdata[61].Value);

//           cy.get(':nth-child(4) > .section-body > :nth-child(3) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .find('option') 
//             .then((options) => {
//               const values = [NEU_Lv_AC_phase1,NEU_Lv_AC_phase2]; 
//               options.each((index, option) => {
//                 expect(option.value).to.equal(values[index]); 
//               });
//             });

//           cy.get(':nth-child(4) > .section-body > :nth-child(3) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .should('have.value', NEU_Lv_AC_phase1);

//           cy.wait(2000);          

//           const NEU_Lv_LI_phase1 = String(testdata[62].Value);
//           const NEU_Lv_LI_phase2 = String(testdata[63].Value);

//           cy.get(':nth-child(4) > .section-body > :nth-child(4) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .find('option') 
//             .then((options) => {
//               const values = [NEU_Lv_LI_phase1,NEU_Lv_LI_phase2]; 
//               options.each((index, option) => {
//                 expect(option.value).to.equal(values[index]); 
//               });
//             });
          
          
//           cy.get(':nth-child(4) > .section-body > :nth-child(4) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .should('have.value', NEU_Lv_LI_phase1);

//           // const Lv_type1 = String(testdata[32].Value);
//           // const Lv_type2 = String(testdata[33].Value);

//           // cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//           //   .find('option') 
//           //   .then((options) => {
//           //     const values = ['',Lv_type1,Lv_type2]; 
//           //     options.each((index, option) => {
//           //       expect(option.value).to.equal(values[index]); 
//           //     });
//           //   });

// //             cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// //               .should('have.value', Lv_type1);


//           cy.get('div[data-fieldname="vector_group"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .find('option') 
//             .then((options) => {
//               const values = ['Dyn1','Dyn5','Dyn7','Dyn11','Yy0','Yd1','Yd5','Yd7','Yd11','YD1','Yz1','Yz5','YZ5','Yz7','Yz11','Dzn0']; // Expected values
//               options.each((index, option) => {
//                 expect(option.value).to.equal(values[index]); 
//               });
//             });

//           cy.get('div[data-fieldname="vector_group"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .should('have.value', 'Dyn1');

//           const NEU_THDi = testdata[34].Value;
//           cy.get(':nth-child(2) > form > div[data-fieldtype="Int"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .should('have.value',NEU_THDi);



// //               const IP_protection1 = testdata[35].Value;
// //               const IP_protection2 = testdata[36].Value;
// //               const IP_protection3 = testdata[37].Value;
// //               const IP_protection4 = testdata[38].Value;
// //               const IP_protection5 = testdata[39].Value;
// //               const IP_protection6 = testdata[40].Value;
// //               const IP_protection7 = testdata[41].Value;


// //             cy.get('div[data-fieldname="ip_protection"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// //               .find('option') 
// //               .then((options) => {
// //                 const values = [IP_protection1,IP_protection2,IP_protection3,IP_protection4,IP_protection5,IP_protection6,IP_protection7]; 
// //                 options.each((index, option) => {
// //                   expect(option.value).to.equal(values[index]); 
// //                 });
// //               });


//           const NEU_Uk = testdata[42].Value;
//           cy.get(':nth-child(5) > .section-body > :nth-child(4) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .should('have.value',NEU_Uk);

//           const NEU_Insulation_class1 = testdata[66].Value;
//           const NEU_Insulation_class2 = testdata[67].Value;
//           const NEU_Insulation_class3 = testdata[68].Value;
//           const NEU_Insulation_class4 = testdata[69].Value;
//           const NEU_Insulation_class5 = testdata[70].Value;


//           cy.get(':nth-child(6) > .section-body > :nth-child(1) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//            .should('have.value', NEU_Insulation_class1);


//           const NEU_Winding_material1 = testdata[45].Value;
//           //const Winding_material2 = testdata[46].Value;
//           cy.get(':nth-child(6) > .section-body > :nth-child(2) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//            .should('have.value',NEU_Winding_material1);


//           const NEU_cooling = testdata[75].Value;
//           cy.get(':nth-child(6) > .section-body > :nth-child(3) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .should('have.value',NEU_cooling);


//           const NEU_cooling_medium = testdata[80].Value;
//           cy.get(':nth-child(6) > .section-body > :nth-child(4) > form > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
//             .should('have.value',NEU_cooling_medium);


// const NEU_LV_max = testdata[21].Value;
// cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .clear({ force: true })
// .type(`${LV1}/${NEU_LV_max}{enter}`)

// cy.wait(3000);

// cy.get('.btn-modal-close') 
// .wait(3000)         
// .click({ force: true });

// const LV2 = String(testdata[23].Value);

// cy.get(':nth-child(4) > .section-body > :nth-child(1) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .clear({ force: true })
// .type(`${LV1}/${LV2}{enter}`)

// cy.wait(3000);

// // // rating lv
// const NEU_rating_lv1 = String(testdata[81].Value);
// const NEU_rating_lv2 = String(testdata[82].Value);
// const NEU_rating_lv3 = String(testdata[83].Value);



// cy.get(':nth-child(2) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .type(`${NEU_rating_lv1}/${NEU_rating_lv2}{enter}`);


// cy.get('.btn-modal-close')
// .wait(3000)         
// .click({ force: true });

// cy.get(':nth-child(2) > form > [data-fieldtype="HTML"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .type(`${NEU_rating_lv1}/${NEU_rating_lv3}{enter}`);

// // // //uk %
// const NEU_uk_lv1 = String(testdata[84].Value);
// const NEU_uk_lv2 = String(testdata[85].Value);
// const NEU_uk_lv3 = String(testdata[86].Value);

// cy.get('[data-fieldtype="HTML"][data-fieldname="uk_hv_lv"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .type(`${NEU_uk_lv2}/${NEU_uk_lv3}{enter}`);

// cy.get('.btn-modal-close')
// .wait(3000)         
// .click({ force: true });

// cy.get('[data-fieldtype="HTML"][data-fieldname="uk_hv_lv"] > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .clear({ force: true })
// .type(`${NEU_uk_lv1}/${NEU_uk_lv3}{enter}`);

// //verctor group 1 
// cy.get('.row > :nth-child(1) > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .find('option')  
// .then((options) => {
//               const values = ['Dyn1','Dyn5','Dyn7','Dyn11','Yy0','Yd1','Yd5','Yd7','Yd11','YD1','Yz1','Yz5','YZ5','Yz7','Yz11','Dzn0'];   
//               options.each((index, option) => {
//                 expect(option.value).to.equal(values[index]);  
//               });
//             });

// cy.get('.row > :nth-child(1) > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', 'Dyn1');

// //verctor group 2
// cy.get('.row > :nth-child(1) > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .find('option')  
// .then((options) => {
//               const values = ['Dyn1','Dyn5','Dyn7','Dyn11','Yy0','Yd1','Yd5','Yd7','Yd11','YD1','Yz1','Yz5','YZ5','Yz7','Yz11','Dzn0'];   
//               options.each((index, option) => {
//                 expect(option.value).to.equal(values[index]);  
//               });
//             });


// cy.get('.row > :nth-child(1) > .frappe-control > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')  
// .should('have.value', 'Dyn1');


// // //High volgtage tab

// cy.get('#design-high_voltage_tab-tab')
// .click({ force: true });

// cy.get('div[data-fieldname="tapping_plus"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .find('option')  
// .then((options) => {
// const values = ['1','2','3','4','5','6','7','8'];   
// options.each((index, option) => {
//   expect(option.value).to.equal(values[index]);  
// });
// });

// cy.get('div[data-fieldname="tapping_plus"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', '2');

// cy.get('div[data-fieldname="tapping_minus"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .find('option')  
// .then((options) => {
// const values = ['1','2','3','4','5','6','7','8'];   
// options.each((index, option) => {
//   expect(option.value).to.equal(values[index]);  
// });
// });


// cy.get('div[data-fieldname="tapping_minus"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', '2');


// cy.get('div[data-fieldname="tapping_plus_step"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', '2,5');


// cy.get('[data-fieldname="tapping_minus_step"] > .form-group > .control-input-wrapper > .control-value')
// .should('have.text', '2.5%');

// //Transformer environment

// cy.get('#design-transformer_environment_tab-tab')
// .click({ force: true });


// cy.get('div[data-fieldname="temperature_rise"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', '100,0');


// cy.get('div[data-fieldname="ambient_max_temperature"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', '40,0');



// cy.get(':nth-child(3) > form > div[data-fieldtype="Float"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', '20,0');


// cy.get('#design-transformer_environment_tab > .row > .section-body > :nth-child(4) > form > [data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-value')
// .should('have.text', 'max 1000 m above see level');


// cy.get('div[data-fieldname="max_average_temperature_per_month"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', '30,0');



// cy.get('#design-transformer_environment_tab > .row > .section-body > :nth-child(2) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .find('option')  
// .then((options) => {
// const values = ['C2','C3','C4','C5'];   
// options.each((index, option) => {
//   expect(option.value).to.equal(values[index]);  
// });
// });

// cy.get('#design-transformer_environment_tab > .row > .section-body > :nth-child(2) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', 'C2');



// cy.get('#design-transformer_environment_tab > .row > .section-body > :nth-child(3) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .find('option')  
// .then((options) => {
// const values = ['E2','E3','E4','E5'];   
// options.each((index, option) => {
//   expect(option.value).to.equal(values[index]);   
// });
// });


// cy.get('#design-transformer_environment_tab > .row > .section-body > :nth-child(3) > form > div[data-fieldtype="Select"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', 'E2');


// // Guaranties values

// cy.get('#design-guaranties_values_tab-tab')
// .click({ force: true });


// cy.get(':nth-child(1) > form > [data-fieldtype="Percent"] > .form-group > .control-input-wrapper > .control-value')
// .should('have.text', '10%');

// cy.get('div[data-fieldname="no_load_loss_guarantee"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', '693');

// cy.get('div[data-fieldname="load_loss_guarantee"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', '7600');

// cy.get('#design-guaranties_values_tab > .row > .section-body > :nth-child(4) > form > [data-fieldtype="Float"] > .form-group > .control-input-wrapper > .control-value')
// .should('have.text', '75');

// cy.get('#design-guaranties_values_tab > .row > .section-body > :nth-child(1) > form > div[data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', '54');

// cy.get('div[data-fieldname="lpa"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', '46');

// cy.get('div[data-fieldname="lpa_distance"] > .form-group > .control-input-wrapper > .control-input > .input-with-feedback')
// .should('have.value', '0');

// cy.get('#design-guaranties_values_tab > .row > .section-body > :nth-child(4) > form > [data-fieldtype="Data"] > .form-group > .control-input-wrapper > .control-value')
// .should('have.text', '0');

//   });

// });    
  
});
  
  
  
  
  // example syntax for dropdown element checking
  
  // cy.get('div[data-fieldname="factory"] > .form-group > .control-input-wrapper > .control-input > select') // Target the <select> element
  //           .find('option')  
  //           .then((options) => {
  //             const values = [factory3, factory1, factory2]; // Expected values
  //             options.each((index, option) => {
  //               expect(option.value).to.equal(values[index]);   
  //             });
  //           });