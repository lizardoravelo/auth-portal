# Julio Portfolio Auth

A React + Vite authentication demo powered by **Auth0**, built to showcase modern login flows, secure token handling, and smooth UI/UX using Ant Design and Framer Motion.

---

## ✨ Features

- 🔐 Auth0 authentication with `@auth0/auth0-react`
- 🪪 Secure ID token (JWT) display with masking
- 📋 Copy-to-clipboard with animated feedback
- 🧑‍💼 User profile with roles, email, and metadata
- ✅ Protected routing via React Router v7
- 💅 Responsive and modern UI with Ant Design

---

## 🧠 Tech Stack

- [React 18](https://reactjs.org/)
- [Auth0 React SDK](https://auth0.com/docs/libraries/auth0-react)
- [Ant Design](https://ant.design/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/julio-auth-login.git
cd julio-auth-login
```

### 2. Install dependencies

```bash
yarn
```

### 3. Set up Auth0

Use `@config/constants.ts` to configure your:

- **Auth0 Domain**
- **Client ID**
- **Audience (optional)**
- **Namespace for custom claims**

Make sure the following URLs are configured in your [Auth0 dashboard](https://manage.auth0.com):

- ✅ Allowed Callback URL: `http://localhost:5173`
- ✅ Allowed Logout URL: `http://localhost:5173`
- ✅ Allowed Web Origins: `http://localhost:5173`

### 4. Run the app

```bash
yarn dev
```

Visit [http://localhost:5173](http://localhost:5173) to test the app.

---

## 🛡 Security Notes

- JWT is masked by default and copyable with a click
- Role-based claims pulled from a custom Auth0 namespace
- Logout is guarded to prevent multiple triggers
- Uses `localstorage` and refresh tokens for stable auth flow

---

## 📁 Project Structure

```
src/
  ├── components/         # Home, NavBar, Profile, Loading, etc.
  ├── config/             # Auth0 constants (domain, clientId, namespace)
  ├── main.tsx            # Entry point with Auth0Provider
  ├── App.tsx             # Layout, routes, and content
  ├── App.css             # Global styles
```

---

## 📄 License

This project is for demonstration and portfolio use only.
