export const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
export const numberRegex = /^[0-9]*$/
export const letterRegex = /^[a-zA-Z\s.-]*$/
// export const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]? \d{3}[\s.-]?\d{4}$/
export const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
export const zipCodeRegex = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/
