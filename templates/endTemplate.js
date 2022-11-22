/**
 * Creates the html template for the end of the html document
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
 function endTemplate(config) {
  return `
    <script type="text/javascript">
      const hamburgerTranslateContainer = document.querySelector('.menu .language-container')
      const navTranslateContainer = document.querySelector('.nav-container .language-container')

      let translateElement = document.createElement('div')
      translateElement.id = 'google_translate_element'
      let showHamburger

      function googleTranslateElementInit() {
        if (window.innerWidth < 1140) {
          hamburgerTranslateContainer.appendChild(translateElement)
          showHamburger = true
        } else {
          navTranslateContainer.appendChild(translateElement)
          showHamburger = false
        }

        new google.translate.TranslateElement(
          {pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL},
          'google_translate_element'
        )
      }

      window.onresize = () => {
        if (window.innerWidth < 1140 && !showHamburger) {
          hamburgerTranslateContainer.appendChild(translateElement)
          showHamburger = true
        } else if (window.innerWidth >= 1140 && showHamburger) {
          navTranslateContainer.appendChild(translateElement)
          showHamburger = false
        }
      }
    </script>
    <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    <script type="module" src="/static/utils/showContent.js"></script>
    <script type="module" src="/static/utils/sendEmails.js"></script>
    <script src="https://kit.fontawesome.com/fc3d033d28.js" crossorigin="anonymous"></script>
  `
 }

 module.exports = endTemplate