describe("contact section", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Contact section", () => {
    it("Contact form should display correctly", () => {
      cy.get("#contact form").within(() => {
        cy.get("input[name='name']")
          .should("have.attr", "placeholder", "Your full name...")
          .should("have.attr", "autocomplete", "name")
          // .parent()
          .prev()
          .contains("Full Name");
        cy.get("input[name='email']")
          .should("have.attr", "placeholder", "Your email address...")
          .should("have.attr", "autocomplete", "email")
          // .parent()
          .prev()
          .contains("Email");
        cy.get("textarea[name='message']")
          .should("have.attr", "placeholder", "Please leave your message here...")
          .should("have.attr", "autocomplete", "off")
          // .parent()
          .prev()
          .contains("Message");
        cy.get("button[type='submit']")
          // .should("have.attr", "disabled", "disabled")
          .contains("Submit");
        cy.get("button[type='reset']").contains("Reset");
      });
    });

    // ! see: https://docs.cypress.io/faq/questions/using-cypress-faq#Can-I-check-that-a-forms-HTML-form-validation-is-shown-when-an-input-is-invalid
    // it("Contact form (built-in)validation", () => {
    //   cy.get("#contact form").within(() => {
    //     cy.get("button[type='submit']").click();
    //     cy.get("input:invalid").should("have.length", 3);
    //     cy.get("input[name='name']")
    //       .should("have.focus") // equivalent to should('be.focused')
    //       .then(($input) => {
    //         // ! see: https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
    //         // expect(($input[0] as HTMLInputElement).validationMessage).to.eq("Please fill in this field.");
    //         expect(($input[0] as HTMLInputElement).validationMessage).to.match(/please fill/gim);
    //       });
    //     cy.get("input[name='name']").type("John Doe");
    //     cy.get("input[name='email']").type("johndoe");
    //     cy.get("input:invalid").should("have.length", 2);
    //     cy.get("input[name='email']")
    //       .should("have.focus") // equivalent to should('be.focused')
    //       .then(($input) => {
    //         // ! see: https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
    //         expect(($input[0] as HTMLInputElement).validationMessage).to.match(/include an \'@\'/);
    //       });
    //   });
    // });

    it.skip("Contact form should return and display error state & message if submitted invalid values", () => {
      cy.get("input[name='name']").type("John");
      const email = cy.get("input[name='email']");
      email.type("John@g.c");
      email.next().contains(/^$/);
      cy.get("textarea[name='message']")
        .type("Invalid message{enter}")
        .next()
        .contains(/20 or more characters/);

      // x email.next().contains(/valid email address/);
      cy.get("input[name='email']")
        .next()
        .contains(/valid email address/);
    });

    it.skip("Contact form should show success message and reset form values when submitted successfully", () => {
      cy.get("input[name='name']").type("John");
      cy.get("input[name='email']").type("John@google.com");
      cy.get("input[name='email']")
        .next()
        .contains(/valid email address/);
      cy.get("textarea[name='message']").type("Some messages to send to the owner of the site, i.e. Yilong");
      cy.get("button[type='submit']").click();
      cy.getByData("success-msg").contains(/success/);
    });
  });
});
