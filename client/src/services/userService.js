import { authHeader } from "../utility";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  return fetch("http://localhost:8000/users/authenticate", requestOptions)
    .then(handleResponse)
    .then((user) => {
      // Store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  // Remove user from local storage
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch("http://localhost:8000/users", requestOptions).then(
    handleResponse
  );
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`http://localhost:8000/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };
  return fetch("http://localhost:8000/users/register", requestOptions).then(
    handleResponse
  );
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };
  return fetch(`http://localhost:8000/users/${user.id}`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // Update store user details and jwt token in local storage if not super admin
      if (!user.sa) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    });
}

// Prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };
  return fetch(`http://localhost:8000/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // Auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
