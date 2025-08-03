# Cash Cue - Personal Expense Tracker

A modern, feature-rich expense tracking application built with React and Vite. Cash Cue helps users manage their personal finances by tracking income, expenses, and providing detailed analytics with beautiful visualizations.

## 🚀 Features

### 📊 Dashboard Analytics
- **Overview Cards**: Display balance, total income, and total expenses
- **Weekly & Daily Analytics**: Interactive pie charts showing spending patterns
- **Time-based Analysis**: Bar charts and line graphs for weekly and daily trends
- **Recent Transactions**: Quick view of latest financial activities

### 💰 Financial Management
- **Income Tracking**: Add and manage income sources
- **Expense Tracking**: Detailed expense logging with categories
- **Real-time Balance**: Automatic balance calculation
- **Transaction History**: Complete transaction list with filtering options

### 📈 Data Visualization
- **Interactive Charts**: Built with Chart.js and react-chartjs-2
- **Multiple Chart Types**: Pie charts, bar graphs, and line charts
- **Time-based Analytics**: Hourly, daily, and weekly expense patterns
- **Visual Insights**: Easy-to-understand financial trends

### 🔐 Authentication & Security
- **User Registration**: Secure signup with email verification
- **OTP Verification**: Two-factor authentication for enhanced security
- **Password Recovery**: Forgot password functionality with email reset
- **JWT Authentication**: Secure token-based authentication
- **Session Management**: Automatic token refresh and logout

### 🎨 User Interface
- **Modern Design**: Clean and intuitive user interface
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Fixed Sidebar Navigation**: Easy access to all features
- **Real-time Updates**: Instant feedback with toast notifications
- **Loading States**: Smooth user experience with loading indicators

### 👤 User Profile Management
- **Profile Information**: View and manage user details
- **Account Balance**: Add funds to account balance
- **Settings**: Personalized user preferences

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and context
- **Vite 6.2.2** - Fast build tool and development server
- **React Router DOM 7.0.1** - Client-side routing
- **Axios 1.7.8** - HTTP client for API communication
- **Chart.js 4.4.7** - Data visualization library
- **React-ChartJS-2 5.2.0** - React wrapper for Chart.js

### UI/UX Libraries
- **React Toastify 11.0.5** - Toast notifications
- **React Scroll Parallax 3.4.5** - Smooth scrolling effects

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript definitions** - Type safety for React components

## 📱 Application Structure

```
src/
├── Components/
│   ├── Auth/                 # Authentication components
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Forgot1.jsx
│   │   ├── otp.jsx
│   │   ├── otp2.jsx
│   │   └── Resetpass.jsx
│   ├── Charts/               # Data visualization components
│   │   ├── WeeklyGraph.jsx
│   │   ├── WeeklyPieChart.jsx
│   │   ├── WeeklyLineChart.jsx
│   │   ├── DailyAnalysischart.jsx
│   │   ├── DailyAnalysisChart1.jsx
│   │   └── DailyPieChart.jsx
│   ├── Expenses/             # Expense management
│   │   ├── Expense.jsx
│   │   ├── ExpenseTracker.jsx
│   │   └── Recentexpense.jsx
│   ├── Transactions/         # Transaction management
│   │   ├── Transactions.jsx
│   │   ├── TransactionContext.jsx
│   │   └── Usetransaction.jsx
│   ├── Dashboard.jsx         # Main dashboard
│   ├── Sidebar.jsx           # Navigation sidebar
│   ├── UserProfile.jsx       # User profile management
│   ├── Spinner.jsx           # Loading component
│   └── App.jsx               # Main app component
├── income/
│   └── ExpenseIncome.jsx     # Income management
├── layouts/
│   └── DashboardLayout.jsx   # Dashboard layout wrapper
├── Styles/                   # CSS styling files
└── assets/                   # Images and static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your API configuration:
   ```env
   VITE_API_BASE_URL=https://cash-cue-web.onrender.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📋 Usage

### Getting Started
1. **Sign Up**: Create a new account with email verification
2. **Login**: Access your dashboard with secure authentication
3. **Add Balance**: Set up your initial account balance
4. **Track Expenses**: Start logging your daily expenses and income
5. **View Analytics**: Monitor your spending patterns with interactive charts

### Key Features Usage

#### Adding Transactions
- Navigate to the "Expense/Income" section
- Toggle between Expense and Income
- Enter amount, description, and date/time
- Submit to automatically update your balance

#### Viewing Analytics
- Dashboard provides overview cards with key financial metrics
- Weekly and daily pie charts show spending distribution
- Bar and line charts reveal spending trends over time
- Filter transactions by date ranges and categories

#### Managing Profile
- Access user profile to view account information
- Add funds to your account balance
- Update personal settings and preferences

## 🔧 API Integration

The application integrates with a backend API hosted at `https://cash-cue-web.onrender.com` with the following main endpoints:

- **Authentication**: `/user/signup`, `/user/signin`, `/user/verify-otp`
- **User Management**: `/homepage/name`, `/settings/balance`
- **Transactions**: `/transaction/add`, `/transaction/list`
- **Analytics**: `/transaction/graph1`, `/transaction/graph2`

## 🎨 Styling

The application uses custom CSS with a modern design approach:
- **Color Scheme**: Purple and blue gradients with clean whites
- **Typography**: Poppins font family for modern readability
- **Responsive Design**: Mobile-first approach with breakpoints
- **Animations**: Smooth transitions and loading states

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

## 🔮 Future Enhancements

- **Categories**: Advanced expense categorization
- **Budgeting**: Set and track monthly budgets
- **Reports**: Generate detailed financial reports
- **Export**: Export data to CSV/PDF formats
- **Mobile App**: Native mobile application
- **Dark Mode**: Theme customization options

---

Made with ❤️ by the Cash Cue Team
