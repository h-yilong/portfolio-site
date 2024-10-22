import React from "react";
import Input from "./Input";

describe("<Input />", () => {
  it("renders text correctly", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Input
        id="msg"
        disabled={false}
        isError={false}
        label="Message"
        name="msg"
        placeholder="Enter your message..."
        required
      />,
    );
    cy.get("label").should("contains.text", "Message");
    cy.get("input#msg").type("input some text").should("have.value", "input some text");
    cy.get("p").contains(/^$/);
  });

  it("click on label will focus the input", () => {});

  it("renders email correctly", () => {
    cy.mount(
      <Input
        id="email"
        disabled={false}
        isError={false}
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email address..."
        required
      />,
    );
    cy.get("label").should("contains.text", "Email");
    cy.get("input#email").type("account@google.com").should("have.value", "account@google.com");
  });

  it("renders error message correctly", () => {
    const msg = "This is an intended error message.";
    cy.mount(
      <Input
        id="msg"
        disabled={false}
        isError
        label="Message"
        name="msg"
        placeholder="Enter your message..."
        errorMessage={msg}
        required
      />,
    );
    cy.get("p").contains(msg);
  });
});
