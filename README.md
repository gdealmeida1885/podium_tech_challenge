# Podium QA Tech Challenge
This repository is used to store Podium's QA Tech Challenge.

---

### Project Configuration :gear:
To manually configure this project, do the following:

Clone this repo

```shell
git clone  https://github.com/gdealmeida1885/podium_tech_challenge
```
Move to the main folder and install it's node dependencies
```shell
cd podium_tech_challenge/
yarn install 
```
To run the tests headless run
```shell
yarn cypress run
```
To run it on browser run 
```shell
yarn cypress open
```
After Cypress opening, click on _"E2E Testing"_, choose the desired browser and click on _"Start E2E Testing in BrowserName"_ 

---
### Identified Test Cases :male_detective:
While doing some exploratory testing on the application, I've identified a few potential tests cases to guarantee the application's overall Quality. I also prioritized these test cases into Smoke, Regression and Health Check.
* Smoke Tests: 
  * They are the ones that should run in every new Pull Request from Engineers. The tests are the ones related to the business core or the ones that if start failling may bring financial/reputational damage to Podium. Smoke Tests have a **High Priority** when testing.
* Regression Tests: 
  * They are the ones that should run everyday, preferably at night. These tests cases are related to bad paths, tests that consumes too much time/money when running on CI, tests for features rarely used by consumers, etc. Smoke Tests have a **Low Priority** when testing.
* Health Check Tests:
  * The Health Check Tests are the ones that should run on production from time to time, everyday. Theses tests are essential to identify bugs happening on production early and to notify the team, sometimes even before customers realizing that something is happening. Usually, Health Check Tests are also Smoke Tests (but not the other way around). 
  * To define which smoke tests should turn into Health Check, we should understand which feature is ultra essential to the business and should never ( if possibly ) fail or when it fails, we should fix ASAP.
  * Also, is worth mentioning that Health Check should focus on the user journey through your application, instead of feature testing.

The manual test cases with Gherking Syntax are stored in the [specs/chat.feature folder](https://github.com/gdealmeida1885/podium_tech_challenge/blob/main/specs/chat.feature)).
These test cases are: 

* Health Check
  * Submit a valid form
* Smoke Tests
  * Submit a valid form
  * Search business by address
  * Search business by postal code
* Regression
  *  Attempt to start a new chat with invalid phone number
  *  Attempt to start a new chat with invalid name
  *  Attempt to start a new chat with phone number too long
  *  Attempt to start a new chat with message size bigger than message limit
  *  Attempt to start a new chat with empty name
  *  Attempt to start a new chat with empty phone number
  *  Attempt to start a new chat with empty message
  *  Attempt to start a new chat with empty form

---

### Bugs :bug:
While doing the manual testing for this application, I came across a few bugs and potential bugs in the software. All executions were video recorded and stored in a Google Drive. Click on the links to watch them :slightly_smiling_face:

1. After selecting a business, the user is unable to return to the business list, making the user close and opening the app again, in order to select another company. [Video evidence](https://drive.google.com/file/d/1W_vUJFAQv0qoAekdwk7uLGWGom_9Fzhr/view?usp=share_link).
2. The input field "Name" is not doing any validation. The user can type special characteres and symbols. [Video evidence.](https://drive.google.com/file/d/1QSrddRvc56e1G2NU0TibPNzupMbKTclH/view?usp=share_link)
3. When selecting a business, its full address is not shown. Theres a micro scroll bar besides the address, but the user is not able to scroll down. [Video evidence](https://drive.google.com/file/d/17MmxkSom958ySGgX0xNgWDVUQNvVTreu/view?usp=share_link).
4. The input field "Mobile Phone" is not doing the country validation. If a user types an country code, such as +1, the US flag should be loaded, but there's none instead. If the user types any other number, without country code, then the brazilian flag is loaded. [Video evidence](https://drive.google.com/file/d/1n3KbcSoJjpGYH1FVaYk6z4leb5heJZlt/view?usp=share_link).
5. There's not an assertive digit validation for the phone number. For example, if the user types the country code +1 (US), the application should expect at least a 10 digit number but is considering valid a 7 digit phone number. The same behaviour happens when using a +55 (BR) or +61 (AUS) country code. I believe this is happening because the digit validation algorithm is counting the country code as part of the phone number, instead of an identifier. [Video evidence](https://drive.google.com/file/d/1mDBeXgGNh3Fin0gd3mIb00UVVj7md2TP/view?usp=share_link)
6. The application is considering valid a phone number up to 24 digits, but according to the 1984's [E.164](https://en.wikipedia.org/wiki/E.164), a valid phone number should have a maximum of 15 digits. [Video evidence](https://drive.google.com/file/d/1XVGBOn3km93PV-cmfeiFMEKoIrpuwUmK/view?usp=share_link)
7. The input Phone Number accepts up to three plus signs, but if there's already one and the user tries to add more than one, everything on the right from this input sign will be deleted. [Video evidence](https://drive.google.com/file/d/1ozWA6Z37zf5Q5vSrj7ZCPfKx93FK1EK7/view?usp=share_link).
8. If the user types a valid Brazilian phone number with country code included with no plus sign, then there won't be applied a input mask on this phone number. If the user removes the plus sign, the input mask is removed. The same behaviour occurs with a valid US phone number. [Video evidence.](https://drive.google.com/file/d/1fXOpxvIx0d6gtslJiVhCX2OlGtsncD3m/view?usp=sharing)

---
### Github Actions & Cypress Clound Integration :octocat:
This project is configured to run tests in the Github Actions as CI and is already integrated with Cypress Cloud, so you can run it remotely and checki its behaviour and test results.

To see it in action, simply create a new branch from this project, do a small modification, for instance, add a new blank line on this file or correct any mispelling found here. After that, open a new pull request and watch the CI running on the Actions Tab > Pull Request name.

You can access the project's Cypress Dashboard runs [here](https://cloud.cypress.io/projects/yfwf5a/runs). 