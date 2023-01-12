// import identify from '../utils/identify'
import {
  USER_KEY,
  TOKEN_KEY,
  SELECTED_ORGANIZATION_KEY
} from './constants.js'

export function signIn ({ token, user }) {
  setUser(user)
  setToken(token)
}

export function signOut () {
  removeUser()
  removeToken()
}

export function isSignedIn () {
  const user = getUser()
  if (!user) return false
  // identify()
  return true
}

export function getUser () {
  const userObj = localStorage.getItem(USER_KEY)
  return userObj ? JSON.parse(userObj) : undefined
}

export function setUser (user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  // identify()
}

export function getToken () {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken (token) {
  localStorage.setItem(TOKEN_KEY, token)
}

function removeUser () {
  localStorage.removeItem(USER_KEY)
}

function removeToken () {
  localStorage.removeItem(TOKEN_KEY)
}

export function setSelectedOrganization (value) {
  localStorage.setItem(SELECTED_ORGANIZATION_KEY, JSON.stringify(value))
}

export function getSelectedOrganization () {
  const selectedOrganizationJson = localStorage.getItem(SELECTED_ORGANIZATION_KEY)
  return selectedOrganizationJson ? JSON.parse(selectedOrganizationJson) : undefined
}

export function removeSelectedOrganization () {
  localStorage.removeItem(SELECTED_ORGANIZATION_KEY)
}
