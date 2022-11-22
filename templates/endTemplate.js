/**
 * Creates the html template for the end of the html document
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
 function endTemplate(config) {
  return `
    <script type="module" src="/static/utils/showContent.js"></script>
    <script type="module" src="/static/utils/sendEmails.js"></script>
    <script src="https://kit.fontawesome.com/fc3d033d28.js" crossorigin="anonymous"></script>
  `
 }

 module.exports = endTemplate