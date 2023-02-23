export default class BasePage {
  constructor() {
    this.podiumWidgetIframe = "#podium-bubble";
    this.podiumWidgetButton = "#podium-website-widget-button";
  }

  openChat() {
    cy.iframe(this.podiumWidgetIframe)
      .should("be.visible")
      .find(this.podiumWidgetButton)
      .click();
  }

  //This Gandalf quote is too good to not have a
  // function dedicated to assert it.
  // (even though I won't be using this function)
  isGandalfPhraseLoaded() {
    cy.get("h1").contains(
      "All we have to decide is what to do with the time that is given us."
    );
  }
}
