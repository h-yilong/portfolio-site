import React from "react";
import { Button } from "./button";

describe("<Input />", () => {
  it("renders button correctly", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button id="btn">Button Text</Button>);
    cy.get("button#btn").should("contains.text", "Button Text");
  });
});
