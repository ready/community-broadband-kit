import { SERVERLESS_TESTING_CONFIG } from "./utils/constants"

const LocalTestingStyle = () => {
  const colors = SERVERLESS_TESTING_CONFIG?.themeColor.map(color => `#${color}`)
  const style = document.createElement('style');
  style.innerHTML = `
    :root {
      --color-heading: ${colors?.[1]};
      --color-subheading: ${colors?.[2]};
      --color-text: ${colors?.[3]};
      --color-button: ${colors?.[4]};
      --color-button-hover: ${colors?.[5]};
      --color-background1: ${colors?.[6]};
      --color-background2: ${colors?.[7]};
      --color-background3: ${colors?.[8]};
      --color-footer: ${colors?.[9]};
      --color-nav-text: ${colors?.[10]};
      --color-accent: ${colors?.[11]};
      --color-light-accent: ${colors?.[12]};
    }
  `
  document.head.appendChild(style);
}

export default LocalTestingStyle