const headTemplate = require('./headTemplate')
const headerTemplate = require('./headerTemplate')
const landscapeBackgroundTemplate = require('./landscapeBackgroundTemplate')

/**
 * Creates the html template for the test page of the site
 * @param {*} an object containing the test configuration
 * @returns an html template
 */
function testTemplate(config) {
    const head = headTemplate(config, config.ogImage)
    const header = headerTemplate(config)
    const landscapeBackground = landscapeBackgroundTemplate('width: 100%')
    const addressRequired = config.isAddressRequired ? config.isAddressRequired : true

    return `
        <!DOCTYPE html>
        <html lang="en">
        ${head}
        <style>
            .results {
                max-width: 400px;
            }

            .remindMeContainer {
                position: relative;
                max-width: 320px;
                height: 48px;
                border: 1px solid #323A46;
                border-radius: 4px;
                padding: auto;
            }

            .remindMeContainer input{
                font-weight: 400;
                font-size: 16px;
                line-height: 24px;
                color: #4B5768;
                display: flex;
                justify-content: center;
            }

            .buttonRemindMe {
                position: absolute;
                right: 0;
                top: 0;
                height: 48px;
                padding: 12px 24px;
                background: var(--color-4);
                border: 2px solid var(--color-4);
                border-radius: 4px;
                color: #FFFFFF;
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;
                cursor: pointer;
            }
            .buttonRemindMe:hover{
                background: var(--color-4);
                border: 2px solid var(--color-4);
                color:#E6F1FF;
            }
            
            .remindMeContainer .buttonRemindMe:focus{
                outline: none;
            }
            .remindMeContainer .buttonRemindMe:focus{
                outline: none;
            }

            .remind-email {
                margin-left: 8px;
                margin-top: 12px;
            }

            @media all and (max-width: 355px) {
                .buttonRemindMe {
                    padding: 12px 12px;
                    font-size: 12px;
                }

                .remindMeContainer input{
                    font-size: 12px;
                }
            }
        </style>
        <body style="background-color: var(--color-gray-1)">
            ${header}
            <section class="main-container min-fixed-height" id="main-section">
                <div class="shadow-container" id="checklist">
                    <h1 class="section-blur-title hero-title">Before We Begin...</h1>
                    <h2 class="section-description">For best results, we recommend taking the following steps. Please select a step if it has been done. Hover over underlined terms for additional information.</h2>
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
                        <div class="progress-step">
                            <div class="checklist-dash"></div>
                            <div class="checklist-circle" id="step-5">5</div>
                        </div>
                    </div>
                    <div class="checklist">
                        <div id="item-1">
                            <input type="checkbox" id="ethernet" name="ethernet">
                            <label for="ethernet">My device is connected to the internet using an 
                                <div class="tooltip">Ethernet cable
                                    <span class="tooltiptext">
                                         <span id="ethernet-definition"></span>
                                        <span><br><img style="margin-left: 140px; margin-top=10px;" src="/static/assets/ethernet.png" alt='ethernet image'></span>
                                        <a href="https://www.wikihow.com/Connect-to-Ethernet-on-PC-or-Mac" target="_blank"><br>See here for more details &#8594;</a>
                                    </span>
                                </div> 
                            (preferred)</label>
                        </div>
                        <div id="item-2" style="display: none;">
                            <input type="checkbox" id="close-to-router" name="close-to-router">
                            <label for="close-to-router">My device is not connected by Ethernet but is as close as possible to my 
                                <div class="tooltip">Wi-Fi router
                                    <span class="tooltiptext">
                                        <span id="router-definition"></span>
                                        <span><br><img style="margin-left: 140px;" src="/static/assets/router.png" alt='router image'></span>
                                    </span>
                                </div> 
                            </label>
                        </div>
                        <div id="item-3" style="display: none;">
                            <input type="checkbox" id="vpn" name="vpn">
                            <label for="vpn">I am not currently connected to any 
                                <div class="tooltip">VPNs
                                    <span class="tooltiptext">VPN stands for "Virtual Private Network." If you are unaware of what this means then you are ready to take the test.</span>
                                </div> 
                            </label>
                        </div>
                        <div id="item-4" style="display: none;">
                            <input type="checkbox" id="no-other-devices" name="no-other-devices">
                            <label for="no-other-devices">No one in my household is currently on a video call, streaming videos, or gaming</label>
                        </div>
                        <div id="item-5" style="display: none;">
                            <input type="checkbox" id="grabbed-bill" name="grabbed-bill">
                            <label for="grabbed-bill">I know information about my tier of internet service such as monthly cost and speed in order to complete survey questions</label>
                        </div>
                    </div>
                    <button class="button begin-test-button top-margin" id="next-btn">Next</button>
                </div>

                <div class="shadow-container" id="address" address-required=${addressRequired}>
                    <h1 class="section-blur-title hero-title">One Last Step</h1>
                    <h2 class="section-description" id="address-entry-message">Your location is required to help your community get better internet. Please enter your address below. It will not be shared with the public. </h2>
                    <div class="address">
                        <input type="text" name="address" id="autocomplete" class="pac-target-input" placeholder="Enter a location" aria-label="Enter location">
                        <section id="address-warning">* This field is required to continue </section>
                    </div>
                    <button class="top-margin do-it-for-me-button" id="geolocation">Current location <i style="margin-left: 4px" class="fas fa-map-marker-alt"></i></button>
                    <button class="button begin-test-button top-margin" id="begin-test">Start test</button>
                </div>

                <div class="section-container" id="test">
                    <div class="section hero-section left-right-section fixed-height">
                        <div class="section-left" id="instructions">
                            <div class="section-blur">
                                <h1 class="section-blur-title hero-title center">Test in Progress…</h1>
                                <h2 id="survey-instructions" class="s-heading center bottom-margin">
                                    While you're waiting, answer a few questions.
                                    <img id="arrow" src="/static/assets/icons/arrow-right.svg" class="arrow" alt="arrow right">
                                </h2>
                            </div>
                            <div class="row-container full-width justify-content-center">
                                <div class="row-item row-item-center">
                                    <h2 id="test-source" class="m-heading center bottom-margin"></h2>
                                    <img id="ookla-loading" class="bottom-margin" src="/static/assets/ookla-load.svg" alt='loading icon'/>
                                    <h2 id="test-type" class="s-heading center bottom-margin hidden">-</h2>
                                    <h2 id="test-progress" class="l-heading center hidden">-</h2>
                                    <h2 id="isp-name" class="s-heading center top-margin bottom-margin"></h2>
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
                        </div>
                        <div class="section-right" id="survey-container">
                            <div class="row-item row-item-center">
                                <div class="shadow-container">
                                    <h3 id="survey-question" class="survey-label">Question</h3>
                                    <div id ="answers" class="list"></div>
                                    <button id="nav-btn" class="survey-button" alt="next button">Next</button>
                                    <div class="progress-row">
                                        <div class="s-text"><span id="questions-answered"></span> / <span id="question-total"></span></div>
                                        <progress id="survey-progress-bar" max="100" value="0"></progress>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="shadow-container" id="error">
                    <h1 class="section-blur-title hero-title">Something went wrong...</h1>
                    <h2 class="section-description">Please check your internet connection and try again</h2>
                </div>
                <div class="section-container hero-section-container" id="results">
                    <div class="section hero-section left-right-section">
                        <div class="section-left small-left" id="instructions">
                            <div class="section-blur">
                                <h1 id="heading" class="section-blur-title hero-title">Thank you!</h1>
                                <p id="blurb" class="section-description results">Here are your results. If you weren't able to complete the survey, please take the test again. <br><br> For best results, take the test once per day for the next 7 days.</br>Enter your email below to receive a reminder:</p>
                                <div class='remindMeContainer'>
                                    <input
                                        type='email'
                                        id='remind-email'
                                        class="remind-email"
                                        placeholder='Your email'
                                    />
                                    <button class='buttonRemindMe' onclick="window.sendEmailReminder()">Remind Me</button>
                                </div>
                            </div>
                        </div>

                        <div class="section-right large-right" id="historic-results">
                            <div class="column-container">
                                <div class="section center-margin" style="padding: 0.5em; align-items: center; justify-content: flex-end; width: 90%;" id="end-links">
                                    <div class="share-buttons">
                                        <div class="xs-heading" style="margin-right: 10px; color: var(--color-3);">Share Your Results</div>
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
                                </div>
                                <div class="border-container bottom-margin">
                                    <h3 class="m-heading" style="margin-bottom: 16px">You are <span class='large-result-tag' id="service-status">test</span></h3>
                                    <p class="xs-heading bottom-margin">Following NTIA grant guidelines, reliable broadband connections should have at least 100 Mbps download and 20 Mbps upload.</p>
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

                                    <div class="more-results" id="more-results">
                                        <div class="test-title">
                                          <h3 class="s-heading" style="margin-bottom: 16px">M-Lab</h3>
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
                                          <h3 class="s-heading" style="margin-bottom: 16px">Speedtest.net</h3>
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
                                          <h3 class="s-heading" style="margin-bottom: 16px">WiFi.wtf <sup class="beta">beta</sup></h3>
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
                                <div class="section center-margin" style="padding: 0; align-items: center;" id="end-links">
                                    <a class="button test-button test-again-button" id="retry-button" href="/test/">Test Again</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="ookla-test"></div>
                ${landscapeBackground}
            </section>
            <script>
                const organizationId = ${config.organization.id}
            </script>
            <script src="/static/test/m-lab/src/ndt7.min.js" type="text/javascript"></script>
            <script type="module" src="/static/measure/setup.js"></script>
            <script type="module" src="/static/utils/sendEmails.js"></script>
            <script type="module" src="/static/utils/showContent.js"></script>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFSRcqE5mWaypizwTElZzYQA3x3IiCiaQ&libraries=places"></script>
            <script src="https://kit.fontawesome.com/fc3d033d28.js" crossorigin="anonymous"></script>
        </body>
        </html>
    `
}

module.exports = testTemplate