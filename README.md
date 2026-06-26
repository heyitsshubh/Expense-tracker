# Cash Cue – Personal Expense Tracker

A modern, feature-rich expense tracking web app built with **React** and **Vite**. Track income and expenses, view analytics, and manage your balance with a clean, responsive UI.

> Note: The main project lives in the **`Expence app/`** folder (frontend).

## ✨ Features

- **Dashboard analytics** (balance, income, expenses, recent transactions)
- **Expense & income tracking** with history
- **Interactive charts** (daily/weekly insights)
- **Authentication**: signup/login, OTP verification, password reset
- **Profile & settings**: manage user details and account balance
- **Responsive UI** with toast notifications and loading states

## 🧰 Tech Stack

- **React**
- **Vite**
- **React Router**
- **Axios**
- **Chart.js** + **react-chartjs-2**
- **ESLint**

## 📁 Project Structure

The main app code is inside `Expence app/`:

```
Expence app/
└── src/
    ├── Components/
    │   ├── Auth/
    │   ├── Charts/
    │   ├── Expenses/
    │   └── Transactions/
    ├── income/
    ├── layouts/
    ├── Styles/
    └── assets/
```

## 🚀 Getting Started

### Prerequisites

- Node.js **16+**
- npm or yarn

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/heyitsshubh/Expense-tracker.git
   cd Expense-tracker
   ```

2. **Install dependencies**
   ```bash
   cd "Expence app"
   npm install
   # or
   yarn
   ```

3. **Environment variables**

   Create `Expence app/.env`:
   ```env
   VITE_API_BASE_URL=https://cash-cue-web.onrender.com
   ```

4. **Run locally**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**

   Vite will print the local URL (commonly `http://localhost:5173`).

### Build

```bash
npm run build
# or
yarn build
```

## 🔌 API (Backend)

The frontend talks to the backend configured in `VITE_API_BASE_URL`. Common endpoints used:

- Auth: `/user/signup`, `/user/signin`, `/user/verify-otp`
- User/settings: `/homepage/name`, `/settings/balance`
- Transactions: `/transaction/add`, `/transaction/list`
- Analytics: `/transaction/graph1`, `/transaction/graph2`

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

## 📄 License

MIT (see `LICENSE` if included).
