import Cookies from "universal-cookie"

const COOKIE_PATH = "/"
const COOKIE_DOMAIN = "localhost"
const COOKIE_NAME = "Authentication"

const cookies = new Cookies()

export function getToken() {
  return cookies.get(COOKIE_NAME)
}

export function setToken(token) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 30)
  //cookies.set(COOKIE_NAME, token, {path: COOKIE_PATH, domain: COOKIE_DOMAIN, sameSite: "lax", expires: date})
}

export function logout() {
  cookies.remove(COOKIE_NAME, {path: COOKIE_PATH,domain: COOKIE_DOMAIN})
  localStorage.removeItem("role")
}
