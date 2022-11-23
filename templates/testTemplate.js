const headTemplate = require('./headTemplate')
const headerTemplate = require('./headerTemplate')
const landscapeBackgroundTemplate = require('./landscapeBackgroundTemplate')
const endTemplate = require('./endTemplate')

/**
 * Creates the html template for the test page of the site
 * @param {*} an object containing the test configuration
 * @returns an html template
 */
function testTemplate(config) {
    const head = headTemplate(config, config.ogImage)
    const header = headerTemplate(config)
    const landscapeBackground = landscapeBackgroundTemplate()
    const end = endTemplate(config)
    const addressRequired = config.isAddressRequired ? config.isAddressRequired : true

  return `
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body onload="displaySameSetupOrAddress()">
      <section id="test-section" class="section-container" style="padding-top:0;">
        ${header}
        <div class="hero-section-container center-content">

          <div class="background-container" id="error">
            <h1 class="main-heading">Something went wrong...</h1>
            <h2 class="section-description">Please check your internet connection and try again</h2>
          </div>

          <div class="row-container" id="test">
            <div class="section-left" id="instructions">
              <div class="column-container center-content">
                <h2 id="test-source" class="test-heading"></h2>
                <div id="ookla-loading">
                  <div class="wifi-symbol">
                    <div class="wifi-circle first"></div>
                    <div class="wifi-circle second"></div>
                    <div class="wifi-circle third"></div>	
                    <div class="wifi-circle fourth"></div>
                  </div>
                </div>
                <h2 id="test-type" class="test-subheading hidden" style="font-weight: bold;">-</h2>
                <h2 id="test-progress" class="test-speed hidden">-</h2>
                <h2 id="isp-name" class="test-subheading"></h2>
                <div id="load-bar">
                  <div class="load-bar-shape load-bar-not-started" id="mlab-load-bar">
                    <a href="https://speed.measurementlab.net/#/" target="_blank" class="load-label">M-Lab</a>
                  </div>
                  <div class="load-bar-shape load-bar-not-started" id="ookla-load-bar">
                    <a href="https://www.speedtest.net/" target="_blank" class="load-label">Speedtest</a>
                  </div>
                  <div class="load-bar-shape load-bar-not-started" id="rst-load-bar">
                    <a href="https://wifi.wtf/" target="_blank" class="load-label">WiFi.wtf</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="section-right" id="survey-container">
              <div class="background-container">
                <h3 id="survey-question" class="survey-question">Question</h3>
                <div id ="answers" class="list"></div>
                <button id="nav-btn" class="button" alt="next button">Next</button>
                <div class="progress-row">
                  <div class="s-text default-color"><span id="questions-answered"></span> / <span id="question-total"></span></div>
                  <progress id="survey-progress-bar" max="100" value="0"></progress>
                </div>
              </div>
            </div>
          </div>

          <div class="row-container" id="results">
            <div class="section-left" id="instructions">
              <h1 class="main-heading">Thank you!</h1>
              <p class="section-description">Here are your results. If you weren't able to complete the survey, please take the test again.<br><br>For best results, take the test once per day for the next 7 days.</br>Enter your email below to receive a reminder:</p>
              <div class='remind-me-container'>
                <input
                  type='email'
                  id='remind-email'
                  class="remind-email"
                  placeholder='Your email'
                />
                <button class='remind-me-button' onclick="window.sendEmailReminder()">Remind Me</button>
              </div>
            </div>
            <div class="section-right" id="historic-results">
              <div class="share-buttons" id="end-links" style="align-self: flex-end">
                <div style="color: var(--color-3);">Share Your Results</div>
                <a href="#" target="_blank" class="facebook-btn">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" target="_blank" class="twitter-btn">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" target="_blank" class="linkedin-btn">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#" target="_blank" class="email-btn">
                  <i class="fas fa-envelope"></i>
                </a>
              </div>
              <div class="wide-background-container">
                <h3 class="small-heading">You are <span class='large-result-tag' id="service-status">test</span></h3>
                <p class="default-color">Following NTIA grant guidelines, reliable broadband connections should have at least 100 Mbps download and 20 Mbps upload.</p>
                <div class="results-cards-container">
                  <div class="results-card">
                    <div class="results-card-title">
                      <img src="/static/assets/icons/vertical-align-down.svg" width="14" alt='download icon'>
                      <h4>Download</h4>
                    </div>
                    <div class="speed-result">
                      <p class="result" id="download-rollup">test</p>
                      <span class="units"> Mbps</span>
                    </div>
                    <p class="result-tag" id="download-service"></p>
                  </div>
                  <div class="results-card">
                    <div class="results-card-title">
                      <img src="/static/assets/icons/vertical-align-top.svg" width="14" alt='upload icon'>
                      <h4>Upload</h4>
                    </div>
                    <div class="speed-result">
                      <p class="result" id="upload-rollup">test</p>
                      <span class="units"> Mbps</span>
                    </div>
                    <p class="result-tag" id="upload-service"></p>
                  </div>                     
                  <div class="results-card">
                    <div class="results-card-title">
                      <img src="/static/assets/icons/dashboard.svg" width="14" alt='latency icon'>
                      <h4>Latency</h4>
                    </div>
                    <div class="speed-result">
                      <p class="result" id="latency-rollup">test</p>
                      <span class="units"> ms</span>
                    </div>
                    <p class="service-status" id="latency-service"></p>
                  </div>
                  <div class="results-card">
                    <div class="results-card-title">
                      <img src="/static/assets/icons/build.svg" width="14" alt='jitter icon'>
                      <h4>Jitter</h4>
                    </div>
                    <div class="speed-result">
                      <p class="result" id="jitter-rollup">test</p>
                      <span class="units"> ms</span>
                    </div>
                  </div>
                </div>
                <a class="see-more-button" id="see-more-results" onclick="seeMore()">See breakdown by test &#8594;</a>
                <div class="column-container" id="more-results" style="gap: 2em">
                  <div class="test-title">
                    <h3>M-Lab</h3>
                    <p class="result-tag" id="mlab-service-status"></p>
                  </div>
                  <div class="results-cards-container">
                    <div class="results-card">
                      <div class="results-card-title">
                        <img src="/static/assets/icons/vertical-align-down.svg" width="14" alt='download icon'>
                        <h4>Download</h4>
                      </div>
                      <div class="speed-result">
                        <p class="result" id="mlab-download">test</p>
                        <span class="units"> Mbps</span>
                      </div>
                      <p class="result-tag" id="mlab-download-service"></p>
                    </div>
                    <div class="results-card">
                      <div class="results-card-title">
                        <img src="/static/assets/icons/vertical-align-top.svg" width="14" alt='upload icon'>
                        <h4>Upload</h4>
                      </div>
                      <div class="speed-result">
                        <p class="result" id="mlab-upload">test</p>
                        <span class="units"> Mbps</span>
                      </div>
                      <p class="result-tag" id="mlab-upload-service"></p>
                    </div>                      
                    <div class="results-card">
                      <div class="results-card-title">
                        <img src="/static/assets/icons/dashboard.svg" width="14" alt='latency icon'>
                        <h4>Latency</h4>
                      </div>
                      <div class="speed-result">
                        <p class="result" id="mlab-latency">test</p>
                        <span class="units"> ms</span>
                      </div>
                      <p class="result-tag" id="mlab-latency-service"></p>
                    </div>
                    <div class="results-card">
                      <div class="results-card-title">
                        <img src="/static/assets/icons/build.svg" width="14" alt='jitter icon'>
                        <h4>Jitter</h4>
                      </div>
                      <div class="speed-result">
                        <p class="result" id="mlab-jitter">test</p>
                        <span class="units"> ms</span>
                      </div>
                    </div>
                  </div>
                  <div class="test-title">
                    <h3>Speedtest.net</h3>
                    <p class="result-tag" id="ookla-service-status"></p>
                  </div>
                  <div class="results-cards-container">
                    <div class="results-card">
                      <div class="results-card-title">
                        <img src="/static/assets/icons/vertical-align-down.svg" width="14" alt='download icon'>
                        <h4>Download</h4>
                      </div>
                      <div class="speed-result">
                        <p class="result" id="ookla-download">test</p>
                        <span class="units"> Mbps</span>
                      </div>
                      <p class="result-tag" id="ookla-download-service"></p>
                    </div>
                    <div class="results-card">
                      <div class="results-card-title">
                        <img src="/static/assets/icons/vertical-align-top.svg" width="14" alt='upload icon'>
                        <h4>Upload</h4>
                      </div>
                      <div class="speed-result">
                        <p class="result" id="ookla-upload">test</p>
                        <span class="units"> Mbps</span>
                      </div>
                      <p class="result-tag" id="ookla-upload-service"></p>
                    </div>                      
                    <div class="results-card">
                      <div class="results-card-title">
                        <img src="/static/assets/icons/dashboard.svg" width="14" alt='latency icon'>
                        <h4>Latency</h4>
                      </div>
                      <div class="speed-result">
                        <p class="result" id="ookla-latency">test</p>
                        <span class="units"> ms</span>
                      </div>
                      <p class="service-status" id="ookla-latency-service"></p>
                    </div>
                    <div class="results-card">
                      <div class="results-card-title">
                        <img src="/static/assets/icons/build.svg" width="14" alt='jitter icon'>
                        <h4>Jitter</h4>
                      </div>
                      <div class="speed-result">
                        <p class="result" id="ookla-jitter">test</p>
                        <span class="units">ms</span>
                      </div>
                    </div>
                  </div>
                  <div class="test-title">
                    <h3>WiFi.wtf <sup class="beta">beta</sup></h3>
                    <p class="result-tag" id="rst-service-status"></p>
                  </div>
                  <div class="results-cards-container">
                    <div class="results-card">
                      <div class="results-card-title">
                        <img src="/static/assets/icons/vertical-align-down.svg" width="14" alt='download icon'>
                        <h4>Download</h4>
                      </div>
                      <div class="speed-result">
                        <p class="result" id="rst-download">test</p>
                        <span class="units"> Mbps</span>
                      </div>
                      <p class="result-tag" id="rst-download-service"></p>
                    </div>
                    <div class="results-card">
                      <div class="results-card-title">
                        <img src="/static/assets/icons/vertical-align-top.svg" width="14" alt='upload icon'>
                        <h4>Upload</h4>
                      </div>
                      <div class="speed-result">
                        <p class="result" id="rst-upload">test</p>
                        <span class="units"> Mbps</span>
                      </div>
                      <p class="result-tag" id="rst-upload-service"></p>
                    </div>
                    <div class="results-card">
                      <div class="results-card-title">
                        <img src="/static/assets/icons/dashboard.svg" width="14" alt='latency icon'>
                        <h4>Latency</h4>
                      </div>
                      <div class="speed-result">
                        <p class="result" id="rst-latency">test</p>
                        <span class="units"> ms</span>
                      </div>
                      <p class="service-status" id="rst-latency-service"></p>
                    </div>
                    <div class="results-card">
                      <div class="results-card-title">
                        <img src="/static/assets/icons/build.svg" width="14" alt='jitter icon'>
                        <h4>Jitter</h4>
                      </div>
                      <div class="speed-result">
                        <p class="result" id="rst-jitter">test</p>
                        <span class="units"> ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a class="button" style="align-self: flex-end;" href="/test/">Test Again</a>
            </div>
          </div>

          <div class="background-container" id="same-setup">
            <h1 class="main-heading">Is your setup the same as last time?</h1>
            <h2 class="section-description"> If your set up has changed from the previous time, for example you are now using WiFi instead of a wired connection, select "No". </h2>
            <div class="checklist-answer-row">
              <div class="answer-option" id="same" onMouseOver="toggleSelected('same')" onClick="sameSetup()">
                  <img class="checklist-icon" src="/static/assets/checkmark_icon.png" width="32px" height="32px" alt="checkmark-icon">
                  <div class="icon-text">Yes</div>
              </div>
              <div class="answer-option" id="different" onMouseOver="toggleSelected('different')" onClick="differentSetup()">
                  <img class="checklist-icon" src="/static/assets/cross_icon.png" width="32px" height="32px" alt="cross-icon">
                  <div class="icon-text">No</div>
              </div>
            </div>
          </div>

          <div class="background-container" id="checklist" style="gap: 1em;">
            <h1 class="main-heading" id="checklist-heading">Before we begin...</h1>
            <h2 class="section-description">For best results, we recommend answering the following questions. Hover over underlined terms for additional information.</h2>
            <div class="checklist-progress-bar">
              <div class="progress-step">
                <div class="checklist-circle checklist-colored-circle" id="step-1" >1</div>
              </div>
              <div class="progress-step">
                <div class="checklist-dash"></div>
                <div class="checklist-circle" id="step-2">2</div>  
              </div>
              <div class="progress-step">
                <div class="checklist-dash"></div>
                <div class="checklist-circle" id="step-3">3</div>
              </div>
              <div class="progress-step">
                <div class="checklist-dash"></div>
                <div class="checklist-circle" id="step-4">4</div>
              </div>
            </div>
            <div class="checklist">
                <div id="item-1">
                    <div class="checklist-question">
                        <p class="checklist-header">How are you connected to the Internet?</p>
                        <label class="checklist-subheader">A
                            <div class="tooltip"> wired
                                <span class="tooltiptext">
                                    <span id="ethernet-definition" style="color: var(--color-gray-0)"></span>
                                    <span><br><img class="ethernet-image" src="/static/assets/ethernet.png" alt="ethernet image"></span>
                                    <a href="https://www.wikihow.com/Connect-to-Ethernet-on-PC-or-Mac" target="_blank" style="color: var(--color-gray-0)"><br>See here for more details →</a>
                                </span>
                            </div> connection is preferred.
                        </label>
                    </div>      
                    <div class="checklist-answer-row">
                        <div class="answer-option" id="using-ethernet" onclick="getElementById('router-warning').style.display = 'none', toggleSelected('using-ethernet')">
                            <img class="checklist-icon" src="/static/assets/wired_icon.png" width="32px" height="32px" alt="Wired-icon">
                            <div class="icon-text">Wired</div>
                        </div>
                        <div class="answer-option" id="wifi" onclick="getElementById('router-warning').style.display = 'flex', toggleSelected('wifi')">
                            <img class="checklist-icon" src="/static/assets/wifi_icon.png" width="32px" height="32px" alt="Wifi-icon">
                            <div class="icon-text">WiFi</div>
                        </div>
                    </div>
                    <div id="router-warning" style="margin: 0 auto; max-width: fit-content; align-items: center">
                        <input type="checkbox" id="close-to-router" name="close-to-router">
                        <label for="close-to-router" class="default-color">I am as close as possible to my 
                            <div class="tooltip">Wi-Fi router
                                <span class="tooltiptext">
                                    <span id="router-definition" style="color: var(--color-gray-0)"></span>
                                    <span><br><img class="router-image" src="/static/assets/router.png" alt='router image'></span>
                                </span>
                            </div> 
                        </label>
                    </div>
                </div>
                <div id="item-2" style="display: none;">
                    <div class="checklist-question">
                        <label class="checklist-header">Are you connected to a 
                            <div class="tooltip">VPN?
                                <span class="tooltiptext" style="font-size: 16px">VPN stands for "Virtual Private Network." If you are unaware of what this means then you are ready to take the test.</span>
                            </div> 
                        </label>
                        <p class="checklist-subheader">If so, please disconnect.</p>
                    </div>
                    <div class="checklist-answer-row">
                        <div class="answer-option" id="vpn-on" onclick="toggleSelected('vpn-on')">
                            <img class="checklist-icon" src="/static/assets/vpn_icon.png" width="32px" height="32px" alt="Wired-icon">
                            <div class="icon-text">Yes</div>
                        </div>
                        <div class="answer-option" id="vpn-off" onclick="toggleSelected('vpn-off')">
                            <img class="checklist-icon" src="/static/assets/cross_icon.png" width="32px" height="32px" alt="Wifi-icon">
                            <div class="icon-text">No</div>
                        </div>
                    </div>
                </div>
                <div id="item-3" style="display: none;">
                    <div class="checklist-question">
                        <p class="checklist-header">Is anyone on your network currently on a video call, streaming videos, or gaming?</p>
                    </div>
                    <div class="checklist-answer-row">
                        <div class="answer-option" id="interruption" onclick="toggleSelected('interruption')">
                            <img class="checklist-icon" src="/static/assets/streaming_icon.png" width="32px" height="32px" alt="Wired-icon">
                            <div class="icon-text">Yes</div>
                        </div>
                        <div class="answer-option" id="no-interruption" onclick="toggleSelected('no-interruption')">
                            <img  class="checklist-icon" src="/static/assets/cross_icon.png" width="32px" height="32px" alt="Wifi-icon">
                            <div class="icon-text">No</div>
                        </div>
                    </div>
                </div>
                <div id="item-4" style="display: none;">
                    <div class="checklist-question">
                        <p class="checklist-header">Please have information about your tier of internet service in order to complete survey questions...</p>
                    </div>
                </div>
            </div>
            <button class="button" id="next-btn">Next</button>
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
          <div id="ookla-test"></div>
          ${landscapeBackground}
        </div>
      </section>
      ${end}
      <script>
        const organizationId = ${config.organization.id}
      </script>
      <script>
          function toggleSelected(element) {
            const selected = document.querySelectorAll('.selected-answer');
            selected.forEach(select => {
              select.classList.remove("selected-answer");
            });
            let elem = document.getElementById(element);
            elem.classList.add("selected-answer"); 
        }
      </script>
      <script src="/static/test/m-lab/src/ndt7.min.js" type="text/javascript"></script>
      <script type="module" src="/static/measure/setup.js"></script>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFSRcqE5mWaypizwTElZzYQA3x3IiCiaQ&libraries=places"></script>
    </body>
    </html>
  `
}

module.exports = testTemplate