# The Check Spark Store

## Current State
The store has a full backend with product management (addProduct, getAllProducts, getProductsByCategory), cart, and orders. The authorization system uses admin/user roles. The frontend has category pages, cart, about, and product detail pages. Currently there is no UI for the store owner to add or manage products.

## Requested Changes (Diff)

### Add
- Admin Product Management page (`/admin`) where the store owner can log in and manage products
- Form to add a new product: name, description, price (in INR), category (dropdown from all 10 categories), image URL, in-stock toggle
- Product listing table showing all existing products with name, category, price, stock status
- Delete/edit product support via backend calls
- Admin route in App.tsx
- Admin link in Sidebar (visible to all, but restricted on the page)

### Modify
- App.tsx: add `/admin` route
- Sidebar: add "Admin Panel" link at the bottom

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/AdminPage.tsx` with:
   - Login prompt if not admin
   - Add product form (name, description, price, category select, imageUrl, inStock switch)
   - Products table listing all products with delete button
   - Uses `actor.addProduct`, `actor.getAllProducts` from backend
2. Add admin route to App.tsx
3. Add Admin Panel link to Sidebar component
