#### First modify Product Schema:
- set color and size to Array
- Go to thunderClient and create 8 product (remember first upload file to google drive get link and set image link while adding new product)


#### Use react-router-dom to route the component based on diffrent route:
- here __Redirect__ is decrecated now, we use Navigate to 
```js
    <Route  path='/login' element={user ? <Navigate to= "/" /> : <Login />}/>
```
#### Add link to CategoryItem:
- in order when we click to any of them it should open productList page.

#### Add filter and sort funcitonality:
- we use `useLocation` hook for getting category form the pathname.
- we use useState for filter (in filter we take value as an object and )
- and then we pass and take all these values in Product as a props to use it.
- here we use three useEffects hook to create each filter features.
- In the landing page we won't see products so for that we use conditoinal inside `<Container>` see Products.jsx at the end.

#### On click to any product add link to product page using their id
- first create two instance of axios 
    1. for public request (which do not require to be user or admin)
    2. for which require token or admin.

- here we use 1. one.
- same way as we do earlier we find id this time using useHistroy hook, and then add link to Product.jsx at pages.
- Also use useState it is simple just go through code you will get it.
