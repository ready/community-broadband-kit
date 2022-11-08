const headTemplate = require('./headTemplate')
const headerTemplate = require('./headerTemplate')
const footerTemplate = require('./footerTemplate')
const landscapeBackgroundTemplate = require('./landscapeBackgroundTemplate')
const howTemplate = require('./howTemplate')
const mapTemplate = require('./mapTemplate')
const endTemplate = require('./endTemplate')

/**
 * Creates the html template for index page the site
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
function indexTemplate(config) {
    const head = headTemplate(config, config.ogImage)
    const header = headerTemplate(config)
    const footer = footerTemplate(config)
    const map = mapTemplate(config)
    const landscapeBackground = landscapeBackgroundTemplate('width: calc(100% + 64px)')
    const howBackground= howTemplate()
    const buttonText = config.buttonText ? config.buttonText : 'Take the Test'
    const end = endTemplate(config)

    return `
        <!DOCTYPE html>
        <html lang="en">
            ${head}
            <body style="background-color: var(--color-gray-1)">
                ${header}
                <section class="main-container">
                    <div class="section-container hero-section-container">
                        <div class="section hero-section">
                            <div class="section-left">
                                <div class="greeting section-blur">
                                    <h1 id="heading" class="section-blur-title hero-title">${config.heading}</h1>
                                    <p id="blurb" class="section-description">${config.description}</p>
                                    <a class="button test-button bottom-margin" href="/test/">${buttonText}</a>
                                    <a class="underline-button" href="#info" id="learn-more-btn">Learn More &#8594;</a>
                                </div>
                            </div>
                            <div class="section-right">
                            </div>
                        </div>
                        ${landscapeBackground}
                    </div>
                </section>
                <section id="info" class="main-container" style="background-color: var(--color-background2)">
                    <div class="section-container">
                        <div class="section column-container">
                        <h2 class="l-heading center" style="color: var(--color-gray-0)">Why should you take the test?</h2>
                            <div class="why-container center-section">
                                <div class="why">
                                    <div class="why-icon-verb">
                                        <img class="why-icon" src='/static/assets/icons/checked.svg' width="42" height="42" alt='report icon' />
                                        <h3 class="verb">It helps your community</h3>
                                    </div>
                                    <p class="blurb">Taking this test helps your community gather the empirical proof it needs to demonstrate unserved and underserved areas within it.</p>
                                </div>
                                <div class="why">
                                    <div class="why-icon-verb">
                                        <img class="why-icon" src='/static/assets/icons/checked.svg' width="42" height="42" alt='report icon' />
                                        <h3 class="verb">It’s Free</h3>
                                    </div>
                                    <p class="blurb">This test is 100% free in helping your community build its case for broadband funding.</p>
                                </div>
                                <div class="why">
                                    <div class="why-icon-verb">
                                        <img class="why-icon" src='/static/assets/icons/checked.svg' width="42" height="42" alt='report icon' />
                                        <h3 class="verb">It’s built for privacy</h3>
                                    </div>
                                    <p class="blurb">Apart from survey questions voluntarily taken by you, this test does not gather or disclose information about your community.</p>
                                </div>
                                <div class="why">
                                    <div class="why-icon-verb">
                                        <img class="why-icon" src='/static/assets/icons/checked.svg' width="42" height="42" alt='report icon' />
                                        <h3 class="verb">It takes 1 minute</h3>
                                    </div>
                                    <p class="blurb">It's fast! One minute out of your day can strengthen your community's case.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="main-container" style="background-color: var(--color-background1)">
                    <div class="section-container">
                        <div class="section column-container">
                            <h2 class="l-heading center white">Tips for great results</h2>
                            <div class="center-section start-align-items justify-space-between">
                                <div class="section-left">
                                    <div class="section-description-container">
                                        <p class="section-description white">For best results, please make sure to take the test once per day for 7 days.</p>
                                        <p class="section-description white">If you are able to do so, please connect your device to the Internet using an Ethernet cable plugged into the modem or router where you receive the primary connection from your provider.</p>
                                        <p class="section-description white">Please make sure that no one in your household is streaming videos or gaming while you take this test.</p>
                                    </div>
                                </div>
                                <div class="section-right">
                                    <div class="section-description-container">
                                        <p class="section-description white">If you are not able to connect by Ethernet, please bring your device as close as safely possible to the Wi-Fi enabled router. If you have multiple routers, please use the one where you receive the primary connection from your provider.</p>
                                        <p class="section-description white">If you are connected to school or work, please turn off your VPN during this test. If you don't know what a VPN is, then you are ready to take the test.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="main-container" style="background-color: var(--color-background2)"><div id="info" class="section-container">
                    <div class="section-container">
                        <div class="section column-container">
                            <h2 class="l-heading center white">Survey Tips</h2>
                            <div class="center-section start-align-items justify-space-between"> 
                                <div class="section-description-container">
                                    <p class="section-description white">A survey is conducted while speed tests run as a way to gather qualitative data in addition to the quantitative data gathered from the speed tests. Each time a test is taken, a new set of survey questions are asked. Answer as many questions as possible during the duration of the test. Keep in mind it takes an average of 3-4 tests to be run in order to finish the entire survey. To help your community in getting the qualitative data it needs, consider taking the test until all survey questions have been answered.</p>
                                    <p class="section-description white">To better prepare yourself for the survey, before taking the test it is helpful to know the answers to the following questions:</p>
                                    <ul class="section-description white">
                                        <li><em>How much do you pay for internet per month?</em></li>
                                        <br>
                                        <li><em>What download and upload speeds are you paying for? Is this the best speed offered by your provider? This may require you to look at your provider’s service plan that you are using.</em></li>
                                        <br>
                                        <li><em>What type of internet do you have? For example, do you have Cable or Fiber?</em></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="main-container" style="background-color: var(--color-background1)">
                    <div class="section-title">
                        <h2 class="white">How does it work?</h2>
                    </div>
                    <div class="section-container">
                        <div class="section">
                            <div class="section-left">
                                <div class="section-blur">
                                    <h1 class="section-blur-title white">ISP Monopolies don't want us to have freedom of choice.</h1>
                                    <p class="section-description white">Congress set aside $65 billion to help improve broadband in communities like ours. Our community is applying, but large ISPs will fight us.</p>
                                    <p class="section-description white">By taking the broadband test, you help our community build the empirical proof needed in order to prove eligibility for broadband grants, and to defend against incumbents who will challenge.</p>
                                    <a href="#methodology" class="underline-button white" id="read-methodology" onclick="displayMethodology()">Read about the methodology &#8594;</a>
                                    <p class="section-description white" id="methodology">This test is a tool used to help your community win broadband grants. The goal is to collect as much data as possible for your community to build a defensible case that can be explained and inspected by regulators. It includes a series of internet speed tests such as <a href="https://speed.measurementlab.net" target="_blank">M-Lab</a>, <a href="https://www.speedtest.net" target="_blank">Speedtest.net</a>, and <a href="https://wifi.wtf" target="_blank">WiFi.wtf</a> in order to create the strongest argument possible and help displace any bias that might occur from a single test source. While the speed tests are running, you are given the option to fill out a survey which helps your community gain a better understanding of the specifics of your circumstance beyond what is observable through the speed measurements alone.</p>
                                </div>
                            </div>
                            <div class="section-right">
                                ${howBackground}
                            </div>
                        </div>
                    </div>
                </section>
                ${map}
                ${footer}
                ${end}
            </body>
        </html>
       
    `
}

module.exports = indexTemplate