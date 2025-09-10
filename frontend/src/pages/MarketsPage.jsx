import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, TrendingUp, TrendingDown, BarChart3, Filter } from 'lucide-react'
import apiService from '../services/apiService'
import './MarketsPage.css'

const MarketsPage = () => {
   const [searchParams] = useSearchParams()
   const [coins, setCoins] = useState([])
   const [filteredCoins, setFilteredCoins] = useState([])
   const [isLoading, setIsLoading] = useState(true)
   const [searchQuery, setSearchQuery] = useState('')
   const [selectedTab, setSelectedTab] = useState(searchParams.get('type') || 'stocks')
   const [sortBy, setSortBy] = useState('market_cap')
   const [sortOrder, setSortOrder] = useState('desc')

   useEffect(() => {
      const loadCoins = async () => {
         try {
            setIsLoading(true)
            const data = await apiService.getAllCoins()
            setCoins(data)
            filterCoins(data, selectedTab, searchQuery)
         } catch (error) {
            console.error('Error loading coins:', error)
         } finally {
            setIsLoading(false)
         }
      }

      loadCoins()
   }, [])

   useEffect(() => {
      filterCoins(coins, selectedTab, searchQuery)
   }, [coins, selectedTab, searchQuery, sortBy, sortOrder])

   const filterCoins = (coinList, tab, query) => {
      let filtered = coinList

      // 탭별 필터링
      if (tab === 'crypto') {
         filtered = filtered.filter((coin) => coin.market.startsWith('KRW-'))
      } else if (tab === 'forex') {
         filtered = filtered.filter((coin) => coin.market.includes('USD') || coin.market.includes('JPY') || coin.market.includes('EUR'))
      } else {
         // stocks - KRW 코인들을 주식처럼 표시
         filtered = filtered.filter((coin) => coin.market.startsWith('KRW-'))
      }

      // 검색어 필터링
      if (query) {
         filtered = filtered.filter((coin) => coin.korean_name.toLowerCase().includes(query.toLowerCase()) || coin.english_name.toLowerCase().includes(query.toLowerCase()) || coin.market.toLowerCase().includes(query.toLowerCase()))
      }

      // 정렬
      filtered.sort((a, b) => {
         switch (sortBy) {
            case 'name':
               return sortOrder === 'asc' ? a.korean_name.localeCompare(b.korean_name) : b.korean_name.localeCompare(a.korean_name)
            case 'market':
               return sortOrder === 'asc' ? a.market.localeCompare(b.market) : b.market.localeCompare(a.market)
            default:
               return 0
         }
      })

      setFilteredCoins(filtered)
   }

   const handleTabChange = (tab) => {
      setSelectedTab(tab)
   }

   const handleSort = (field) => {
      if (sortBy === field) {
         setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
      } else {
         setSortBy(field)
         setSortOrder('desc')
      }
   }

   const tabs = [
      { id: 'stocks', label: 'Stocks', icon: <BarChart3 size={16} /> },
      { id: 'crypto', label: 'Crypto', icon: <TrendingUp size={16} /> },
      { id: 'forex', label: 'Forex', icon: <TrendingDown size={16} /> },
   ]

   return (
      <div className="markets-page">
         <div className="container">
            {/* Header */}
            <div className="markets-header">
               <div className="header-content">
                  <h1>Markets</h1>
                  <p>Stay updated with the latest market trends and stock performance</p>
               </div>

               {/* Search */}
               <div className="search-section">
                  <div className="search-wrapper">
                     <Search size={20} className="search-icon" />
                     <input type="text" placeholder="Search coins, stocks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
                  </div>
               </div>
            </div>

            {/* Tabs */}
            <div className="market-tabs">
               {tabs.map((tab) => (
                  <button key={tab.id} className={`tab-btn ${selectedTab === tab.id ? 'active' : ''}`} onClick={() => handleTabChange(tab.id)}>
                     {tab.icon}
                     {tab.label}
                  </button>
               ))}
            </div>

            {/* Market Overview Cards */}
            <div className="market-overview">
               <div className="overview-card">
                  <h3>Top Stocks</h3>
                  <div className="overview-placeholder">
                     <BarChart3 size={48} />
                     <p>Stock market data will be displayed here</p>
                  </div>
               </div>

               <div className="overview-card">
                  <h3>Top Cryptocurrencies</h3>
                  <div className="overview-placeholder">
                     <TrendingUp size={48} />
                     <p>Cryptocurrency market data will be displayed here</p>
                  </div>
               </div>

               <div className="overview-card">
                  <h3>Top Currencies</h3>
                  <div className="overview-placeholder">
                     <TrendingDown size={48} />
                     <p>Currency exchange data will be displayed here</p>
                  </div>
               </div>
            </div>

            {/* Market Table */}
            <div className="market-table-container">
               <div className="table-header">
                  <h2>{selectedTab === 'crypto' ? 'Cryptocurrencies' : selectedTab === 'forex' ? 'Currencies' : 'Stocks'}</h2>
                  <div className="table-controls">
                     <button className="filter-btn">
                        <Filter size={16} />
                        Filter
                     </button>
                  </div>
               </div>

               {isLoading ? (
                  <div className="loading">
                     <div className="spinner"></div>
                     <p>Loading market data...</p>
                  </div>
               ) : (
                  <div className="market-table">
                     <div className="table-header-row">
                        <div className="table-header-cell sortable" onClick={() => handleSort('name')}>
                           Name
                           {sortBy === 'name' && <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                        </div>
                        <div className="table-header-cell sortable" onClick={() => handleSort('market')}>
                           Symbol
                           {sortBy === 'market' && <span className="sort-indicator">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                        </div>
                        <div className="table-header-cell">Price</div>
                        <div className="table-header-cell">24h Change</div>
                        <div className="table-header-cell">Chart</div>
                     </div>

                     <div className="table-body">
                        {filteredCoins.map((coin) => (
                           <Link key={coin.market} to={`/coin/${coin.market}`} className="table-row">
                              <div className="table-cell">
                                 <div className="coin-info">
                                    <div className="coin-icon">{coin.korean_name.charAt(0)}</div>
                                    <div>
                                       <div className="coin-name">{coin.korean_name}</div>
                                       <div className="coin-english">{coin.english_name}</div>
                                    </div>
                                 </div>
                              </div>
                              <div className="table-cell">
                                 <span className="coin-symbol">{coin.market}</span>
                              </div>
                              <div className="table-cell">
                                 <span className="coin-price">-</span>
                              </div>
                              <div className="table-cell">
                                 <span className="coin-change">-</span>
                              </div>
                              <div className="table-cell">
                                 <div className="mini-chart">
                                    <BarChart3 size={16} />
                                 </div>
                              </div>
                           </Link>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default MarketsPage
