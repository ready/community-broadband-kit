import { getCookie, setCookie } from './cookie.js'

/**
 * Generates a uuidv4.
 * @returns A uuidv4
 */
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

/**
 * Gets a uuid from a cookie if such a cookie exists. Else creates a uuid, stores it in a cookie, and returns it.
 * @returns A uuid
 */
function getUuid() {
    let uuid = getCookie('uuid');
    if (uuid !== '') {
        return uuid

    } else {
        let newUuid = uuidv4()
        setCookie('uuid', newUuid)
        return newUuid
    }
}

export { getUuid }