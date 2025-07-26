'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Coins,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  RefreshCw,
  Clock,
  User,
  X,
  DollarSign,
  Activity,
  Menu
} from 'lucide-react'

interface CoinData {
  coinId: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  priceChangePercentage: number;
  lastUpdated: string;
}

const Dashboard = () => {
  const [userName, setUserName] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false) // For mobile toggle
  const [activeNavItem, setActiveNavItem] = useState('dashboard')
  const [coinData, setCoinData] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [error, setError] = useState('')
  const router = useRouter()

  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Coins },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'history', name: 'History', icon: Activity },
    { id: 'settings', name: 'Settings', icon: Settings },
  ]

  // Fetch cryptocurrency data
  const fetchCoinData = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      // Get the token from localStorage
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Authentication required. Please login again.')
        router.push('/login')
        return
      }

      const response = await fetch('https://crypto-tracker-full-stack-mern.onrender.com/coins/current', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })

      console.log(response)
      const result = await response.json()

      if (result.success) {
        setCoinData(result.data)
        setLastRefresh(new Date())
      } else {
        setError('Failed to fetch cryptocurrency data')
      }
    } catch (err) {
      setError('Error connecting to server')
      console.error('Error fetching coin data:', err)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    // Get user name from localStorage
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setUserName(loggedInUser)
    } else {
      // If no user is logged in, redirect to login
      router.push('/login')
      return
    }

    // Initial data fetch
    fetchCoinData()

    // Auto-refresh every 30 minutes (1800000 ms)
    const interval = setInterval(fetchCoinData, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [router, fetchCoinData])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    router.push('/')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price)
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`
    }
    return `$${marketCap.toLocaleString()}`
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 w-64 bg-white shadow border-r fixed left-0 top-0 h-full flex flex-col z-50 lg:z-auto transition-transform duration-300 ease-in-out`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded">
                <Coins className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">CryptoTracker</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNavItem(item.id)
                // Close sidebar on mobile after selection
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false)
                }
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-colors ${activeNavItem === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* User Section - Fixed at bottom */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3 p-3 rounded bg-gray-50">
            <div className="p-2 bg-green-500 rounded-full">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 truncate">{userName}</p>
              <p className="text-xs text-gray-500">Active User</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center space-x-3 px-4 py-2 rounded text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen lg:ml-64">
        {/* Top Header - Fixed */}
        <header className="bg-white shadow border-b px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded hover:bg-gray-100"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>

              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                  Crypto Dashboard
                </h1>
                <p className="text-sm sm:text-base text-gray-600">Welcome back, {userName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* User Info in Header - Hidden on small screens */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded">
                <User className="h-4 w-4 text-gray-500" />
                <div className="text-sm">
                  <p className="font-medium text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500">Active User</p>
                </div>
              </div>

              {/* Refresh Button */}
              <button
                onClick={fetchCoinData}
                disabled={loading}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer text-sm sm:text-base"
              >
                <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              {/* Last Update - Hidden on mobile */}
              <div className="hidden lg:block text-sm text-gray-500">
                Last updated: {formatTimeAgo(lastRefresh)}
              </div>

              {/* Logout Button in Header */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-red-600 hover:bg-red-50 rounded cursor-pointer text-sm sm:text-base"
                title="Logout"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          {activeNavItem === 'dashboard' && (
            <>
              {/* Error Message */}
              {error && (
                <div className="mb-4 sm:mb-6 bg-red-50 border border-red-200 rounded p-3 sm:p-4">
                  <p className="text-red-700 text-sm sm:text-base">{error}</p>
                </div>
              )}

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="p-2 sm:p-3 bg-blue-500 rounded">
                      <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Total Coins</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{coinData.length}</p>
                      <p className="text-xs sm:text-sm text-blue-600">Top 10 by Market Cap</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="p-2 sm:p-3 bg-green-500 rounded">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Gainers</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">
                        {coinData.filter(coin => coin.priceChangePercentage > 0).length}
                      </p>
                      <p className="text-xs sm:text-sm text-green-600">24h Positive</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="p-2 sm:p-3 bg-red-500 rounded">
                      <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Losers</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">
                        {coinData.filter(coin => coin.priceChangePercentage < 0).length}
                      </p>
                      <p className="text-xs sm:text-sm text-red-600">24h Negative</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="p-2 sm:p-3 bg-purple-500 rounded">
                      <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Total Market Cap</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">
                        {formatMarketCap(coinData.reduce((sum, coin) => sum + coin.marketCap, 0))}
                      </p>
                      <p className="text-xs sm:text-sm text-purple-600">Combined Value</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cryptocurrency Table */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 sm:p-6 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Top 10 Cryptocurrencies</h2>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Auto-refresh: 30 min</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="p-6 sm:p-8 text-center">
                      <RefreshCw className="h-6 w-6 sm:h-8 sm:w-8 animate-spin mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500 text-sm sm:text-base">Loading cryptocurrency data...</p>
                    </div>
                  ) : coinData.length === 0 ? (
                    <div className="p-6 sm:p-8 text-center">
                      <p className="text-gray-500 text-sm sm:text-base">No cryptocurrency data available.</p>
                    </div>
                  ) : (
                    <>
                      {/* Mobile Card View */}
                      <div className="block sm:hidden p-4 space-y-4">
                        {coinData.map((coin, index) => (
                          <div key={coin.coinId} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 text-xs font-bold">
                                    {coin.symbol.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{coin.name}</div>
                                  <div className="text-xs text-gray-500">{coin.symbol}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-gray-900">#{index + 1}</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-gray-500 text-xs">Price</p>
                                <p className="font-medium text-gray-900">{formatPrice(coin.price)}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">24h Change</p>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${coin.priceChangePercentage >= 0
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                                  }`}>
                                  {coin.priceChangePercentage >= 0 ? (
                                    <TrendingUp className="h-2 w-2 mr-1" />
                                  ) : (
                                    <TrendingDown className="h-2 w-2 mr-1" />
                                  )}
                                  {coin.priceChangePercentage.toFixed(2)}%
                                </span>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Market Cap</p>
                                <p className="font-medium text-gray-900">{formatMarketCap(coin.marketCap)}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Updated</p>
                                <p className="text-gray-600 text-xs">{formatTimeAgo(new Date(coin.lastUpdated))}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Desktop Table View */}
                      <table className="w-full hidden sm:table">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Coin</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Symbol</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">24h Change</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Market Cap</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">Last Updated</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {coinData.map((coin, index) => (
                            <tr key={coin.coinId} className="hover:bg-gray-50">
                              <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">
                                {index + 1}
                              </td>
                              <td className="px-4 sm:px-6 py-4">
                                <div className="flex items-center">
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                                    <span className="text-blue-600 text-xs font-bold">
                                      {coin.symbol.charAt(0)}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{coin.name}</div>
                                    <div className="text-xs text-gray-500 md:hidden">{coin.symbol}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 hidden md:table-cell">
                                {coin.symbol}
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">
                                {formatPrice(coin.price)}
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-sm">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${coin.priceChangePercentage >= 0
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                                  }`}>
                                  {coin.priceChangePercentage >= 0 ? (
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3 mr-1" />
                                  )}
                                  {coin.priceChangePercentage.toFixed(2)}%
                                </span>
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 hidden lg:table-cell">
                                {formatMarketCap(coin.marketCap)}
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 hidden xl:table-cell">
                                {formatTimeAgo(new Date(coin.lastUpdated))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Other navigation content placeholders */}
          {activeNavItem === 'analytics' && (
            <div className="bg-white rounded-lg shadow p-6 sm:p-8 text-center">
              <BarChart3 className="h-12 w-12 sm:h-16 sm:w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h3>
              <p className="text-sm sm:text-base text-gray-600">Analytics features coming soon.</p>
            </div>
          )}

          {activeNavItem === 'history' && (
            <div className="bg-white rounded-lg shadow p-6 sm:p-8 text-center">
              <Activity className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Historical Data</h3>
              <p className="text-sm sm:text-base text-gray-600">Historical data features coming soon.</p>
            </div>
          )}

          {activeNavItem === 'settings' && (
            <div className="bg-white rounded-lg shadow p-6 sm:p-8 text-center">
              <Settings className="h-12 w-12 sm:h-16 sm:w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Settings</h3>
              <p className="text-sm sm:text-base text-gray-600">Settings panel coming soon.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
