const BASE = import.meta.env.VITE_API_URL

export async function fetchMenu() {
  const res = await fetch(`${BASE}/api/menu`)
  if (!res.ok) throw new Error('Failed to fetch menu')
  return res.json()
}

export async function syncCart(sessionId, items) {
  return fetch(`${BASE}/api/cart/${sessionId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  })
}

export async function fetchCart(sessionId) {
  const res = await fetch(`${BASE}/api/cart/${sessionId}`)
  return res.json()
}

export async function clearCartOnServer(sessionId) {
  return fetch(`${BASE}/api/cart/${sessionId}`, { method: 'DELETE' })
}

export async function placeOrder(sessionId, items, total) {
  const res = await fetch(`${BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, items, total }),
  })
  if (!res.ok) throw new Error('Failed to place order')
  return res.json()
}
