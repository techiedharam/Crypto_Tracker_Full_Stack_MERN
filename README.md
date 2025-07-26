# 🚀 CryptoTracker - Full Stack MERN Application

A real-time cryptocurrency tracking dashboard built with the MERN stack (MongoDB, Express.js, React, Node.js) and powered by the CoinGecko API.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![API](https://img.shields.io/badge/API-CoinGecko-orange)

## 🎯 Features

### 📊 Core Functionality
- **Real-time Crypto Data** - Track top 10 cryptocurrencies with live prices
- **Market Analytics** - View market cap, 24h price changes, and trends
- **Auto-refresh** - Data updates automatically every 30 minutes
- **Historical Data** - Store and retrieve historical price snapshots
- **Rate Limit Protection** - Smart caching to handle API rate limits

### 🔐 User Management
- **User Authentication** - Secure JWT-based login/signup system
- **Protected Routes** - Dashboard access only for authenticated users
- **Session Management** - Automatic token handling and logout

### 🎨 User Interface
- **Responsive Design** - Mobile-friendly interface with Tailwind CSS
- **Real-time Updates** - Live data refresh with loading indicators
- **Clean Dashboard** - Professional layout with sidebar navigation
- **Junior Developer Friendly** - Simple, maintainable CSS classes

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with TypeScript support
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing

### API Integration
- **CoinGecko API** - Real-time cryptocurrency data
- **Axios** - HTTP client for API requests
- **Rate Limiting** - Smart caching to prevent API overuse

## 📁 Project Structure

```
Crypto_Tracker_Full_Stack_MERN/
├── client/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx      # Landing page
│   │   │   ├── login/        # Login page  
│   │   │   ├── signup/       # Signup page
│   │   │   └── dashboard/    # Main dashboard
│   │   └── components/       # Reusable components
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                   # Express.js Backend
│   ├── controllers/
│   │   ├── AuthController.js    # User authentication
│   │   └── CoinDataController.js # Crypto data handling
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── CurrentData.js      # Current crypto data
│   │   └── HistoryData.js      # Historical data
│   ├── routes/
│   │   ├── AuthRouter.js       # Auth routes
│   │   └── CoinDataRouter.js   # Crypto data routes
│   ├── middleware/
│   │   └── Auth.js             # JWT middleware
│   ├── config/
│   │   └── db.js               # Database connection
│   ├── package.json
│   └── server.js               # Entry point
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/techiedharam/Crypto_Tracker_Full_Stack_MERN.git
cd Crypto_Tracker_Full_Stack_MERN
```

### 2. Backend Setup
```bash
cd server
npm install

# Create .env file
echo "MONGO_URI=mongodb://localhost:27017/cryptotracker" > .env
echo "JWT_SECRET=your-jwt-secret-key" >> .env

# Start server
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install

# Start development server
npm run dev
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080

## 🔧 Environment Variables

### Server (.env)
```env
MONGO_URI=mongodb://localhost:27017/cryptotracker
JWT_SECRET=your-super-secret-jwt-key
PORT=8080
```

### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 📊 API Endpoints

### Authentication
```
POST /auth/signup    - Create new user account
POST /auth/login     - User login with JWT token
```

### Crypto Data
```
GET  /api/coindata   - Get current top 10 cryptocurrencies
POST /api/history    - Store historical data snapshot
GET  /api/history/:coinId - Get historical data for specific coin
```

## 🎨 UI Features

### Landing Page
- Hero section with crypto theme
- Feature highlights
- Call-to-action buttons
- Tech stack showcase

### Authentication Pages
- Clean login/signup forms
- Form validation
- Success/error notifications
- Responsive design

### Dashboard
- Fixed sidebar navigation
- Real-time crypto data table
- Refresh functionality
- User profile section
- Logout option

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt password encryption
- **Protected Routes** - Middleware validation
- **Input Validation** - Joi schema validation
- **CORS Protection** - Cross-origin request handling

## 🔄 Data Management

### Caching Strategy
- **5-minute cache** - Recent data served from database
- **Rate limit protection** - 30-second cooldown between API calls
- **Graceful fallback** - Cached data on API failures
- **Smart refresh** - Only fetch when necessary

### Database Schema
```javascript
// User Model
{ name, email, password, createdAt }

// Current Data Model  
{ coinId, name, symbol, price, marketCap, priceChangePercentage, lastUpdated }

// History Data Model
{ coinId, name, symbol, price, marketCap, priceChangePercentage, timestamp }
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
vercel --prod
```

### Backend (Railway/Heroku)
```bash
cd server
# Set environment variables on platform
# Deploy using platform-specific method
```

### Database (MongoDB Atlas)
- Create cluster on MongoDB Atlas
- Update MONGO_URI in environment variables
- Whitelist deployment IP addresses

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 🐛 Known Issues & Solutions

### Rate Limiting (429 Error)
- **Problem**: CoinGecko API rate limits
- **Solution**: Implemented caching and rate limiting
- **Result**: Smooth user experience with cached data

### CORS Issues
- **Problem**: Cross-origin requests blocked
- **Solution**: Configured CORS middleware
- **Result**: Frontend-backend communication working

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dharmender**
- GitHub: [@techiedharam](https://github.com/techiedharam)
- Project: [Crypto_Tracker_Full_Stack_MERN](https://github.com/techiedharam/Crypto_Tracker_Full_Stack_MERN)

## 🙏 Acknowledgments

- [CoinGecko API](https://coingecko.com/api) - Cryptocurrency data
- [Tailwind CSS](https://tailwindcss.com) - Styling framework
- [Lucide React](https://lucide.dev) - Icon library
- [MongoDB](https://mongodb.com) - Database platform

---

⭐ **Star this repo if you found it helpful!**