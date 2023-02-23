import BasePage from "../pages/basePage.cy";

export default class ChatWidget extends BasePage {
  constructor() {
    super();
    this.searchInput = "#search-input";
    this.nameInput = "#Name";
    this.phoneInput = "input[id='Mobile Phone']";
    this.messageInput = "#Message";
    this.sendButton = 'button[data-e2e="send-message-btn"]';
    this.modalIframe = "#podium-modal";
    this.alertMessage = 'div[role="alert"]';
    this.submitedFormErrorMessage = 'p '
  }

  fillChatForm(chatData) {
    cy.enter(this.modalIframe).then((iframeBody) => {
      iframeBody()
        .find(this.nameInput)
        .should("be.visible")
        .type(chatData.name);

      iframeBody()
        .find(this.phoneInput)
        .should("be.visible")
        .type(chatData.phone);

      iframeBody()
        .find(this.messageInput)
        .should("be.visible")
        .type(chatData.message);
    });
  }

  searchBusiness(businessInfo) {
    cy.enter(this.modalIframe).then((iframeBody) => {
      iframeBody()
        .find(this.searchInput)
        .should("be.visible")
        .clear()
        .type(businessInfo);
    });
  }

  selectBusiness(businessName) {
    cy.enter(this.modalIframe).then((iframeBody) => {
      iframeBody().find("button").contains(businessName).click();
    });
  }

  submitChatForm() {
    cy.enter(this.modalIframe).then((iframeBody) => {
      iframeBody().find(this.sendButton).click();
    });
  }

  checkSubmitButtonState(disabled = true) {
    cy.enter(this.modalIframe).then((iframeBody) => {
      if (disabled) {
        iframeBody().find(this.sendButton).should("have.attr", "disabled");
      } else {
        iframeBody().find(this.sendButton).should("not.have.attr", "disabled");
      }
    });
  }

  checkInvalidPhoneMessage() {
    cy.enter(this.modalIframe).then((iframeBody) => {
      iframeBody()
        .find('p')
        .contains("Please enter a phone number that can receive texts.");
    });
  }

  checkFormErrorMessage(errorMessage) {
    cy.enter(this.modalIframe).then((iframeBody) => {
        iframeBody()
          .find(this.alertMessage)
          .contains(errorMessage);
      });
  }
}
