# Full Stack Open - Part 7: React Router, Custom Hooks, Styling App & Webpack

Student: **Arshia Nekoonam** (<arshia.nekoonam@gmail.com>)  
University of Helsinki - Department of Computer Science

This repository contains the complete solutions for all **21 exercises** of Part 7 (Exercises 7.1 – 7.21).

---

## 📁 Repository Structure

### 1. `routed-anecdotes/` (Exercises 7.1 – 7.6)
- **7.1 - 7.3**: React Router v6 navigation (`/`, `/anecdotes/:id`, `/create`, `/about`). Individual anecdote view with `useMatch`, automated redirection to the anecdote list after creation with a 5-second notification message.
- **7.4 - 7.6**: Form input management abstracted into `useField` custom hook. Added a `reset` button that resets all input fields. Fixed DOM attribute warnings by destructuring out `reset` before spreading into `<input>` tags.
- **Run project**:
  ```bash
  cd routed-anecdotes
  npm run dev
  ```

### 2. `country-hook/` (Exercise 7.7)
- **7.7**: Custom hook `useCountry` fetching detailed country data from `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`. Handles null initial query, successful query, and not-found states gracefully.
- **Run project**:
  ```bash
  cd country-hook
  npm run dev
  ```

### 3. `ultimate-hooks/` (Exercise 7.8)
- **7.8**: Reusable custom hook `useResource` managing asynchronous data-fetching and resource creation for multiple RESTful resources (`notes` and `persons`).
- **Run project**:
  ```bash
  cd ultimate-hooks
  npm run server  # JSON Server running on http://localhost:3005
  npm run dev     # Vite dev server running on http://localhost:5174
  ```

### 4. `bloglist-backend/` & `bloglist-frontend/` (Exercises 7.9 – 7.21)
- **7.9 - 7.12**: State management refactored to **Redux Toolkit**:
  - `notificationSlice`: Color-coded notification banners with automatic dismissal.
  - `blogSlice`: Centralized blogs state (fetching, adding, liking, deleting, commenting).
  - `userSlice`: Authentication, `localStorage` persistence, token handling.
  - `usersSlice`: User directory state.
- **7.13 - 7.14**: Users view at `/users` with blog count table and individual user views at `/users/:id` listing added blogs.
- **7.15**: Dedicated blog view at `/blogs/:id` with like counter, interactive like button, and creator-only delete button.
- **7.16**: Sleek top navigation bar with routing links, user status badge, and logout action.
- **7.17**: Backend comments API endpoint (`POST /api/blogs/:id/comments`) with schema validation.
- **7.18 - 7.19**: Frontend comments display and real-time comment submission form on `/blogs/:id`.
- **7.20 - 7.21**: Modern responsive UI design with card containers, badges, responsive tables, and typography.
- **Run project**:
  ```bash
  # Start Backend:
  cd bloglist-backend
  npm run dev

  # Start Frontend:
  cd bloglist-frontend
  npm run dev
  ```

---

## ✅ Exercise Checklist
- [x] 7.1: routed anecdotes, step1
- [x] 7.2: routed anecdotes, step2
- [x] 7.3: routed anecdotes, step3
- [x] 7.4: anecdotes and hooks, step1
- [x] 7.5: anecdotes and hooks, step2
- [x] 7.6: anecdotes and hooks, step3
- [x] 7.7: country hook
- [x] 7.8: ultimate hooks
- [x] 7.9: automatic code formatting & state management with Redux
- [x] 7.10: redux, step2 (blogs list and creation)
- [x] 7.11: redux, step3 (likes and delete)
- [x] 7.12: redux, step4 (user authentication)
- [x] 7.13: users view
- [x] 7.14: individual user view
- [x] 7.15: blog view
- [x] 7.16: navigation menu
- [x] 7.17: comments, step1 (backend POST endpoint)
- [x] 7.18: comments, step2 (frontend comments display)
- [x] 7.19: comments, step3 (frontend comment creation)
- [x] 7.20: styles, step1
- [x] 7.21: styles, step2