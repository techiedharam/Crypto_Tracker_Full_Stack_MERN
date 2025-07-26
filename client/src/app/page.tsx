import { TrendingUp, BarChart3, Coins, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-600">
      {/* Navigation */}
      <nav className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Coins className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">CryptoTracker</h1>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Link
              href="/login"
              className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 cursor-pointer text-sm sm:text-base"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer text-sm sm:text-base"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16 text-center">
        <div className="mb-6 sm:mb-8">
          <Coins className="h-12 w-12 sm:h-16 sm:w-16 text-white mx-auto mb-4" />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Crypto Tracker
        </h1>

        <h2 className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-4 sm:mb-6">
          Real-time Cryptocurrency Dashboard
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Track the top 10 cryptocurrencies with live prices, market cap, and 24h changes. Built with MERN stack and powered by CoinGecko API.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 sm:px-8 sm:py-3 bg-orange-500 text-white text-base sm:text-lg font-medium rounded hover:bg-orange-600 cursor-pointer"
          >
            View Dashboard
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 sm:px-8 sm:py-3 bg-white text-blue-600 text-base sm:text-lg font-medium rounded hover:bg-gray-100 cursor-pointer"
          >
            Login to Account
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Live Price Tracking</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Track real-time prices of top 10 cryptocurrencies with market cap and 24h changes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Historical Data</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Store and visualize historical price data with automated hourly snapshots.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Real-time Updates</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Powered by CoinGecko API with automated updates every 30 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="bg-white py-8 sm:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Built with MERN Stack</h2>
            <p className="text-base sm:text-lg text-gray-600">Modern technologies for reliable performance</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl mb-2">⚛️</div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">React</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Frontend</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl mb-2">🟢</div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Node.js</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Backend</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl mb-2">🍃</div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">MongoDB</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Database</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl mb-2">🚀</div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Express</h3>
              <p className="text-gray-600 text-xs sm:text-sm">API</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16 text-center">
        <div className="bg-white rounded-lg p-6 sm:p-12 shadow">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
            Ready to Track Crypto?
          </h2>

          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Start tracking cryptocurrency prices and market data today.
          </p>

          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-3 bg-blue-600 text-white text-base sm:text-lg font-medium rounded hover:bg-blue-700 cursor-pointer"
          >
            <Coins className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Start Tracking Now
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
