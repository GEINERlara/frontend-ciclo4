const url = "https://ciclo4-utp.herokuapp.com/api/";

const options = {
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

// products
const getProducts = () => {
  return fetch(`${url}products`);
};

const getProductById = (id) => {
  return fetch(`${url}products/show/${id}`);
};

const getProductBySlug = (slug) => {
  return fetch(`${url}products/show/slug/${slug}`);
};

const getProductsByCategory = (id) => {
  return fetch(`${url}products/category/${id}`);
};

const getProductsByQuery = (query) => {
  return fetch(`${url}products/search/${query}`);
};

const storeProduct = (data) => {
  return fetch(`${url}products/store`, {
    method: "POST",
    ...options,
    body: JSON.stringify(data),
  });
};

const updateProduct = (id, data) => {
  return fetch(`${url}products/update/${id}`, {
    method: "PUT",
    ...options,
    body: JSON.stringify(data),
  });
};

const deleteProduct = (id) => {
  return fetch(`${url}products/delete/${id}`, {
    method: "DELETE",
    ...options,
  });
};

// Categories
const getCategories = () => {
  return fetch(`${url}categories/`);
};

const addCategory = (data) => {
  return fetch(`${url}categories/store`, {
    method: "POST",
    ...options,
    body: JSON.stringify(data),
  });
};

const deleteCategory = (id) => {
  return fetch(`${url}categories/destroy/${id}`, {
    method: "DELETE",
    ...options,
    body: JSON.stringify(),
  });
};

const updateCategory = (data, id) => {
  return fetch(`${url}categories/update/${id}`, {
    method: "PUT",
    ...options,
    body: JSON.stringify(data),
  });
};

const getUsers = () => {
  return fetch(`${url}users/`);
};

const loginUser = (data) => {
  return fetch(`${url}users/login`, {
    method: "POST",
    ...options,
    body: JSON.stringify(data),
  });
};

const postUser = (data = {}) => {
  return fetch(`${url}users/add`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //TODO: Check this
  //.then(res => res.json())
  //.catch(error => console.error('Error:', error))
  //.then(response => console.log('Success:', response));
};

const updateUser = (data = {}, id = "") => {
  return fetch(`${url}users/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const storeSubscriber = (data) => {
  return fetch(`${url}subscribers/store`, {
    method: "POST",
    ...options,
    body: JSON.stringify(data),
  });
};

module.exports = {
  // products
  getProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getProductsByQuery,
  storeProduct,
  updateProduct,
  deleteProduct,
  // categories
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  // users
  getUsers,
  loginUser,
  postUser,
  updateUser,
  // subscriber
  storeSubscriber,
};
