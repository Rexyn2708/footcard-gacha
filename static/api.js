const API_URL = "https://riot-landscape-uncut.ngrok-free.dev/api"

function getToken() {
  return localStorage.getItem("fcg_token")
}

function setToken(token) {
  localStorage.setItem("fcg_token", token)
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`
  }
}

async function register(username, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  })
  return await res.json()
}

async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (data.token) setToken(data.token)
  return data
}

function logout() {
  localStorage.removeItem("fcg_token")
  window.location.href = "/login.html"
}

async function pullGacha() {
  const res = await fetch(`${API_URL}/gacha/pull`, {
    method: "POST",
    headers: authHeaders()
  })
  return await res.json()
}

async function getCards(rarity = "", search = "", sort = "terbaru") {
  const params = new URLSearchParams({ rarity, search, sort })
  const res = await fetch(`${API_URL}/cards/?${params}`, {
    method: "GET",
    headers: authHeaders()
  })
  return await res.json()
}

async function redeemCode(code) {
  const res = await fetch(`${API_URL}/redeem/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ code })
  })
  return await res.json()
}

function checkAuth() {
  const token = getToken()
  if (!token) {
    window.location.href = "/login.html"
  }
}