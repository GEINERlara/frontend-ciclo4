const url = 'http://localhost:4000/api/'

const options = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow', 
  referrerPolicy: 'no-referrer',
}

// products
const getProducts = () => {
  return fetch(`${url}products`)
}

const getProductById = (id) => {
  return fetch(`${url}products/show/${id}`)
}

const getProductBySlug = (slug) => {
  return fetch(`${url}products/show/slug/${slug}`)
}

const getProductsByCategory = (id) => {
  return fetch(`${url}products/category/${id}`)
}

const storeProduct = (data) => {
  return fetch(`${url}products/store`, {
    method: 'POST',
    ...options,
    body: JSON.stringify(data)
  })
}

const updateProduct = (id, data) => {
  return fetch(`${url}products/update/${id}`, {
    method: 'PUT',
    ...options,
    body: JSON.stringify(data)
  })
}

// Categories
const getCategories = () => {
  return fetch(`${url}categories/`)
}

module.exports = {
  // products
  getProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  storeProduct,
  updateProduct,
  // categories
  getCategories
}