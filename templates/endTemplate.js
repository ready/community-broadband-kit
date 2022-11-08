/**
 * Creates the html template for the end of the html document
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
 function endTemplate(config) {
  return `
    <script>
      const logo = document.createElement('img');
      logo.src = "${config.logo}"
      const aspect = logo.width / logo.height

      let newHeight
      if (aspect < 1.5) {
        newHeight = 100
      } else {
        newHeight = 50
      }

      document.querySelectorAll('.logo-img').forEach((el) => {
        el.height = newHeight
      })
    </script>
    <script type="module" src="/static/utils/showContent.js"></script>
    <script type="module" src="/static/utils/sendEmails.js"></script>
    <script src="https://kit.fontawesome.com/fc3d033d28.js" crossorigin="anonymous"></script>
  `
 }

 module.exports = endTemplate