
/**
 * Creates the html template for the styling of the site
 * @param {*} config an object containing the test configuration
 * @returns an html template
 */
function styleTemplate(config) {
  config.themeColor = config.themeColor.map((color) => '#' + color)
  
  return `
      <style>
        :root {
          --color-heading: ${config.themeColor[1]};
          --color-subheading: ${config.themeColor[2]};
          --color-text: ${config.themeColor[3]};
          --color-button: ${config.themeColor[4]};
          --color-button-hover: ${config.themeColor[5]};
          --color-background1: ${config.themeColor[6]};
          --color-background2: ${config.themeColor[7]};
          --color-background3: ${config.themeColor[8]};
          --color-footer: ${config.themeColor[9]};
          --color-nav-text: ${config.themeColor[10]};
          --color-accent: ${config.themeColor[11]};
          --color-light-accent: ${config.themeColor[12]};
        }
      </style>
  `

  /*
  return `
      <style>
        :root {
          --color-0: ${config.themeColor[0]};
          --color-1: ${config.themeColor[1]};
          --color-2: ${config.themeColor[2]};
          --color-3: ${config.themeColor[3]};
          --color-4: ${config.themeColor[4]};
          --color-5: ${config.themeColor[5]};
          --hover-color: ${config.themeColor[6]};
          --light-color: ${config.themeColor[7]};
        }
      </style>
  `
  */
}
  
  module.exports = styleTemplate
