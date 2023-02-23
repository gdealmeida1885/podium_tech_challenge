/// <reference types='cypress' />
import BasePage from "../pages/basePage.cy";
import ChatWidget from "../pages/chatWidget.cy";
import { faker } from '@faker-js/faker'

describe("Chat Feature", () => {
  const basePage = new BasePage();
  const chatWidget = new ChatWidget();
  let chatData;

  before(() => {
    cy.fixture("chat_info").then((chatJson) => {
      chatData = chatJson;
    });
  });

  beforeEach(() => {
    cy.visit("/");
    basePage.openChat();
  });

  context('Smoke Tests', () => { 
    
    it("Submit a valid form", () => {
      chatWidget.selectBusiness('Scoreboard Sports - Bountiful');
      chatWidget.fillChatForm(chatData.validForm);
      chatWidget.checkSubmitButtonState(false);
      //chatWidget.submitChatForm();
      //Remove the comment above to submit a valid form;
    });

    it('Search Business By Address', () => { 
      chatWidget.searchBusiness('Rua Adalberto Pereira Gomes, 88');
      chatWidget.selectBusiness('Scoreboard Sports - Narnia');
    });

    it('Search Business By Postal Code', () => {
      chatWidget.searchBusiness('06856-790');;
      chatWidget.selectBusiness('Scoreboard Sports - Orem');
    });

  });
  
  context('Regression Tests', () => { 

    it('Attempt to submit form with invalid phone number', () => {
      chatWidget.selectBusiness('Scoreboard Sports - Narnia');
      chatWidget.fillChatForm(chatData.invalidNumber);
      chatWidget.checkSubmitButtonState(false);
      // chatWidget.submitChatForm();
      // chatWidget.checkInvalidPhoneMessage();
      
      // I ran this scenario only once, when trying to submit an invalid phone
      // I've commented the last two commands, because it attempts to
      // start a new chat. Even though the phone number is invalid and no one would be
      // receiving a sms message, I believe that this service has a cost for each attempt, since 
      // it's trying to send a sms message. 
      // There's a bug on the validation on the input field that allows an invalid phone 
      // beign submited.
    });

    it('Attempt to submit form with too long phone number', () => { 
      chatWidget.selectBusiness('Scoreboard Sports - Narnia');
      chatWidget.fillChatForm(chatData.phoneNumberTooLong);
      chatWidget.checkSubmitButtonState(false);
      chatWidget.submitChatForm();
      chatWidget.checkFormErrorMessage("Mobile phone is too long");
    });

    it('Attempt to submit form with an invalid Name', () => {
      chatWidget.searchBusiness('Rua Adalberto Pereira Gomes, 88');
      chatWidget.selectBusiness('Scoreboard Sports - Narnia');
      chatWidget.fillChatForm(chatData.invalidName);
      chatWidget.checkSubmitButtonState(false);
      //chatWidget.submitChatForm();
    });
    
    it('Attempt to submit form with invalid message size', () => {
      chatData.invalidName.message = faker.lorem.paragraphs(3);
      
      chatWidget.selectBusiness('Scoreboard Sports - Narnia');
      chatWidget.fillChatForm(chatData.invalidName);
      chatWidget.checkSubmitButtonState(false);
      chatWidget.submitChatForm()
      chatWidget.checkFormErrorMessage("Message limit of 300 characters");
    });

    it('Attempt to submit form with empty name', () => {
      chatWidget.selectBusiness('Scoreboard Sports - Narnia');
      chatWidget.fillChatForm(chatData.emptyName);
      chatWidget.checkSubmitButtonState(true);
    });

    it('Attempt to submit form with empty phone', () => {
      chatWidget.selectBusiness('Scoreboard Sports - Narnia');
      chatWidget.fillChatForm(chatData.emptyPhone);
      chatWidget.checkSubmitButtonState(true);
    });

    it('Attempt to submit form with empty message', () => {
      chatWidget.selectBusiness('Scoreboard Sports - Narnia');
      chatWidget.fillChatForm(chatData.emptyMessage);
      chatWidget.checkSubmitButtonState(true);
    });

    it('Attempt to submit a blank form', () => {
      chatWidget.selectBusiness('Scoreboard Sports - Narnia');
      chatWidget.fillChatForm(chatData.emptyFields);
      chatWidget.checkSubmitButtonState(true);
    });
  });

});
