const headTemplate = require('./headTemplate')
const headerTemplate = require('./headerTemplate')
const endTemplate = require('./endTemplate')
const landscapeBackgroundTemplate = require('./landscapeBackgroundTemplate')

/**
 * Creates the html template for the test page of the site
 * @param {*} an object containing the test configuration
 * @returns an html template
 */
 function surveyTemplate(config) {
    const head = headTemplate(config, config.ogImage)
    const header = headerTemplate(config)
    const end = endTemplate(config)
    const addressRequired =  config.isAddressRequired ? config.isAddressRequired : true
    const communityName = config.communityName
    const landscapeBackground = landscapeBackgroundTemplate()
  
    return `
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body>
        <section id="test-section" class="section-container" style="padding-top:0;">
            ${header}
            <div class="hero-section-container center-content" id="take-survey-container">
                <div id="survey-instruction" class="background-container">
                    <h1 class="main-heading">${communityName} Survey</h1>
                    <h2 class="section-description">Please enter your phone number and have information about the internet speeds you are subscribed to in order to complete the following survey questions.</h2>
                    <div class="phone-number-container">
                        <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Enter a phone number">
                    </div>
                <section id="phone-warning">* This field is required to continue </section>
                    <button class="button" id="start-survey-btn">Begin</button>
                </div>
                <div class="background-container" id="address" address-required=${addressRequired}>
                    <h1 class="main-heading">Before we begin...</h1>
                    <h2 class="section-description" id="address-entry-message">Your location is required to help your community get better internet. Please enter your address below. It will not be shared with the public. </h2>
                    <div class="address">
                    <input type="text" name="address" id="autocomplete" class="pac-target-input" placeholder="Enter a location" aria-label="Enter location">
                    <section id="address-warning">* This field is required to continue </section>
                    </div>
                    <button class="button" id="geolocation" style="align-self: flex-start">Current location <i style="margin-left: 4px" class="fas fa-map-marker-alt"></i></button>
                    <div>
                    <input type="checkbox" id="servicable-location" name="servicable-location">
                    <label for="servicable-location">I do not have internet service at this location </label>
                    </div>
                    <button class="button" id="submit-address">Next</button>
                </div>
                <div class="section-left background-container" id="no-service">
                    <h1 class="main-heading">Thank you for reporting your status at this location. </h1>
                    <h2 class="section-description">We have successfully recorded your response.</h2>
                </div>     
                <div id="end-of-survey-message" class="background-container">
                    <h1 class="main-heading">Thank you for completing the survey. </h1>
                    <h2 class="section-description">We have successfully recorded your response.</h2>
                </div>
                <div class="section-right" id="individual-survey-container">
                    <div class="background-container">
                    <h3 id="individual-survey-question" class="survey-question">Question</h3>
                    <div id ="stand-alone-survey-answers" class="list"></div>
                    <button id="stand-alone-survey-nav-btn" class="button" alt="next button">Next</button>
                    <div class="progress-row">
                        <div class="s-text default-color"><span id="individual-questions-answered"></span> / <span id="individual-question-total"></span></div>
                        <progress id="stand-alone-survey-progress-bar" max="100" value="0"></progress>
                    </div>
                    </div>
                </div>
            </div>
        </section>
        ${landscapeBackground}
      <script>
        const organizationId = ${config.organization.id}
      </script>
      ${end}
      <script type="module" src="/static/measure/surveySetup.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFSRcqE5mWaypizwTElZzYQA3x3IiCiaQ&libraries=places"></script>
      </body>
      </html>
    `
  }
  
  module.exports = surveyTemplate