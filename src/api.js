const BASE = 'http://localhost:8080/api';

export async function getCategories() {
  const r = await fetch(`${BASE}/categories`);
  return r.json();
}

export async function getDishesBySlug(slug) {
  const r = await fetch(`${BASE}/categories/${slug}/dishes`);
  return r.json();
}

function getSessionId() {
  let id = localStorage.getItem('sessionId');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('sessionId', id);
  }
  return id;
}

export async function addToCart(dishId, quantity = 1) {
  const r = await fetch(`${BASE}/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Id': getSessionId(),
    },
    body: JSON.stringify({ dishId, quantity }),
  });
  return r.json();
}

export async function getCart() {
  const r = await fetch(`${BASE}/cart`, {
    headers: { 'X-Session-Id': getSessionId() },
  });
  return r.json();
}
