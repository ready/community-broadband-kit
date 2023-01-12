'use strict'

/**
 * Generates a uuidv4.
 * @returns A uuidv4
 */
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

/**
 * Sets a cookie.
 * @param {*} cname The name of the cookie
 * @param {*} cvalue The value of the cookie
 */
function setCookie(cname, cvalue) {
  const d = new Date();
  d.setTime(d.getTime() + 2147483647);
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Gets a cookie.
 * @param {*} cname The name of the cookie ot get
 * @returns The value of the cookie
 */
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
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