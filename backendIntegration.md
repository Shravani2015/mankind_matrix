## Accessing Backend Endpoints in React

### 1. Test the Backend Endpoint
Before integrating with the frontend, make sure the backend endpoint works for you. Make sure that your DB is not empty.

Example (GET by ID):
```
GET http://localhost:8080/api/v1/products/1
Accept: application/json
```

Test this using:
- Postman
- Or just your browser (for GET)

---

### 2. Expose It in the React API Layer

Edit the file: `src/api/productService.js` or the service you are working on

Add the endpoint function like this:

```js
export const getProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};
```

Use this pattern for other endpoints (POST, PUT, DELETE, etc).

---

### 3.  Access It in a React Component

Refer to:  `src/features/products/ProductPage.jsx` in the codebase as an example implementation

Use the function created in the API layer and render the data with proper error and loading handling.

---

### 4. Register the Route in React if needed

Add your path to `AppRouter.jsx` :

```jsx
<Route path="/product/:id" element={<ProductPage />} />
```

---

### 5. Test It in the Browser

Once everything is wired up:
```
http://localhost:3000/product/1
```

In this case you will see the product details page.

---

## Currently available Backend Endpoints

These are the currently implemented backend endpoints in product service:

| Method | Endpoint                          | Description                  |
|--------|-----------------------------------|------------------------------|
| GET    | `/api/v1/products`                | Get all products (paginated)|
| GET    | `/api/v1/products/{id}`           | Get product by ID           |
| GET    | `/api/v1/products/category/{name}`| Get products by category     |
| POST   | `/api/v1/products`                | Create a new product        |

