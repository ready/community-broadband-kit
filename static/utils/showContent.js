'use strict'

// Document selectors
const readMethodology = document.getElementById('read-methodology')
const methodology = document.getElementById('methodology')
const moreResults = document.getElementById('more-results')
const seeMoreResults = document.getElementById('see-more-results')
const instructions = document.getElementById('instructions')
const testElement = document.getElementById('test')
const ethernetDefinitionElement = document.getElementById('ethernet-definition')
const routerDefinitionElement = document.getElementById('router-definition')
const facebookBtn = document.querySelectorAll(".facebook-btn-header")
const twitterBtn = document.querySelectorAll(".twitter-btn-header")
const linkedInBtn = document.querySelectorAll(".linkedin-btn-header")
const emailBtn = document.querySelectorAll(".email-btn-header")
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

/**
 * Displays methodology paragraph in "How does it work?" section
 */
function displayMethodology() {
  methodology.style.display = 'block'
  readMethodology.style.display = 'None'
}

/**
 * Displays test results breakdown by specific speed test
 */
function seeMore() {
  moreResults.style.display = 'block'
  seeMoreResults.style.display = 'none'
}

/**
 * Gets the text content of an html str
 * @param {*} htmlStr 
 * @returns the text content
 */
function extractContent(htmlStr) {
  let span = document.createElement('span')
  span.innerHTML = htmlStr
  return span.textContent || span.innerText
}

/**
 * Fetches the strapi defintion for a keyword and sets its definition
 * @param {*} termUID the UID of the strapi term
 * @param {*} element the html text element to set
 */
async function fetchStrapiDefinition(termUID, element) {
  const res = await fetch(
    `https://api.broadband.money/api/broadband-grant-terms?populate=*&filters[slugUID][$eq]=${termUID}`
  )
  const term = await res.json()

  if (element) {
    element.textContent = extractContent(term.data[0].attributes.definition)
  }
}

/**
 * Sets share buttons on the landing page with links to the test instance
 */
function setShareButtons() {
  let testUrl = `${window.location.origin}`
  let postUrl = encodeURI(testUrl)
  let postTitle = encodeURI("Help our community in winning broadband grants by taking this internet speed test")

  facebookBtn.forEach((button) => button.setAttribute(
      "href",
      `https://www.facebook.com/sharer.php?u=${postUrl}`
  ))
  
  twitterBtn.forEach((button) => button.setAttribute(
      "href",
      `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
  ))

  linkedInBtn.forEach((button) => button.setAttribute(
      "href", 
      `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`
  ))

  emailBtn.forEach((button) => button.setAttribute(
      "href",
      `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${postTitle}&body=${postUrl}+&ui=2&tf=1&pli=1`
  )) 
}

/**
 * Toggles the menu on smaller screens
 */
function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

if (routerDefinitionElement && ethernetDefinitionElement) {
  fetchStrapiDefinition('wifi-router', routerDefinitionElement)
  fetchStrapiDefinition('ethernet-cable', ethernetDefinitionElement)
}

if (facebookBtn && twitterBtn && linkedInBtn && emailBtn) {
  setShareButtons()
}

if (hamburger) {
  hamburger.addEventListener("click", toggleMenu);
}

if (menuItems) {
  menuItems.forEach( 
    function(menuItem) { 
      menuItem.addEventListener("click", toggleMenu);
    }
  )
}

window.displayMethodology = displayMethodology
window.seeMore = seeMore
window.fetchStrapiDefinition = fetchStrapiDefinition