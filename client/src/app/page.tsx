import { TrendingUp, BarChart3, Coins, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-600">
      {/* Navigation */}
      <nav className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Coins className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">CryptoTracker</h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 cursor-pointer"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <Coins className="h-16 w-16 text-white mx-auto mb-4" />
        </div>

        <h1 className="text-5xl font-bold text-white mb-4">
          Crypto Tracker
        </h1>

        <h2 className="text-2xl text-blue-100 mb-6">
          Real-time Cryptocurrency Dashboard
        </h2>

        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Track the top 10 cryptocurrencies with live prices, market cap, and 24h changes. Built with MERN stack and powered by CoinGecko API.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-orange-500 text-white text-lg font-medium rounded hover:bg-orange-600 cursor-pointer"
          >
            View Dashboard
          </Link>

          <Link
            href="/login"
            className="px-8 py-3 bg-white text-blue-600 text-lg font-medium rounded hover:bg-gray-100 cursor-pointer"
          >
            Login to Account
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Live Price Tracking</h3>
            <p className="text-gray-600">
              Track real-time prices of top 10 cryptocurrencies with market cap and 24h changes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Historical Data</h3>
            <p className="text-gray-600">
              Store and visualize historical price data with automated hourly snapshots.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
              <Coins className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Real-time Updates</h3>
            <p className="text-gray-600">
              Powered by CoinGecko API with automated updates every 30 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Built with MERN Stack</h2>
            <p className="text-lg text-gray-600">Modern technologies for reliable performance</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-2xl mb-2">⚛️</div>
              <h3 className="font-semibold text-gray-800">React</h3>
              <p className="text-gray-600 text-sm">Frontend</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-2xl mb-2">🟢</div>
              <h3 className="font-semibold text-gray-800">Node.js</h3>
              <p className="text-gray-600 text-sm">Backend</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-2xl mb-2">🍃</div>
              <h3 className="font-semibold text-gray-800">MongoDB</h3>
              <p className="text-gray-600 text-sm">Database</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="font-semibold text-gray-800">Express</h3>
              <p className="text-gray-600 text-sm">API</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-lg p-12 shadow">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Track Crypto?
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Start tracking cryptocurrency prices and market data today.
          </p>

          <Link
            href="/dashboard"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded hover:bg-blue-700 cursor-pointer"
          >
            <Coins className="h-5 w-5 mr-2" />
            Start Tracking Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
