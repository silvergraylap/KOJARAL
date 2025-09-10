import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TrendingUp, TrendingDown, Activity, Volume2, Clock } from 'lucide-react'
import './CoinDetailPage.css'

const CoinDetailPage = () => {
   const { symbol } = useParams()
   const [coinData, setCoinData] = useState(null)
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      // Mock data for demo
      const loadCoinData = () => {
         setIsLoading(true)
         setTimeout(() => {
            setCoinData({
               market: symbol,
               korean_name: symbol?.includes('BTC') ? '비트코인' : '이더리움',
               english_name: symbol?.includes('BTC') ? 'Bitcoin' : 'Ethereum',
               current_price: symbol?.includes('BTC') ? 45234000 : 3456000,
               change_rate: 2.34,
               change_price: 1023400,
               high_price: 46000000,
               low_price: 44500000,
               volume: 12345.67,
            })
            setIsLoading(false)
         }, 1000)
      }

      loadCoinData()
   }, [symbol])

   if (isLoading) {
      return (
         <div className="coin-detail-page">
            <div className="container">
               <div className="loading">
                  <div className="spinner"></div>
                  <p>Loading coin data...</p>
               </div>
            </div>
         </div>
      )
   }

   if (!coinData) {
      return (
         <div className="coin-detail-page">
            <div className="container">
               <div className="error">
                  <h2>Coin not found</h2>
                  <p>The requested coin could not be found.</p>
               </div>
            </div>
         </div>
      )
   }

   const formatPrice = (price) => {
      return new Intl.NumberFormat('ko-KR', {
         style: 'currency',
         currency: 'KRW',
      }).format(price)
   }

   const formatChange = (rate) => {
      return `${rate > 0 ? '+' : ''}${rate.toFixed(2)}%`
   }

   return (
      <div className="coin-detail-page">
         <div className="container">
            {/* Header */}
            <div className="coin-header">
               <div className="coin-info">
                  <div className="coin-icon">{coinData.korean_name.charAt(0)}</div>
                  <div>
                     <h1>{coinData.korean_name}</h1>
                     <p>
                        {coinData.english_name} ({coinData.market})
                     </p>
                  </div>
               </div>

               <div className="price-info">
                  <div className="current-price">{formatPrice(coinData.current_price)}</div>
                  <div className={`price-change ${coinData.change_rate > 0 ? 'positive' : 'negative'}`}>
                     {coinData.change_rate > 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                     {formatChange(coinData.change_rate)}
                     <span className="change-amount">({formatPrice(Math.abs(coinData.change_price))})</span>
                  </div>
               </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
               <div className="stat-card">
                  <div className="stat-icon">
                     <TrendingUp className="icon-success" />
                  </div>
                  <div className="stat-content">
                     <div className="stat-label">24h High</div>
                     <div className="stat-value">{formatPrice(coinData.high_price)}</div>
                  </div>
               </div>

               <div className="stat-card">
                  <div className="stat-icon">
                     <TrendingDown className="icon-danger" />
                  </div>
                  <div className="stat-content">
                     <div className="stat-label">24h Low</div>
                     <div className="stat-value">{formatPrice(coinData.low_price)}</div>
                  </div>
               </div>

               <div className="stat-card">
                  <div className="stat-icon">
                     <Volume2 className="icon-primary" />
                  </div>
                  <div className="stat-content">
                     <div className="stat-label">24h Volume</div>
                     <div className="stat-value">{coinData.volume.toLocaleString()}</div>
                  </div>
               </div>

               <div className="stat-card">
                  <div className="stat-icon">
                     <Activity className="icon-warning" />
                  </div>
                  <div className="stat-content">
                     <div className="stat-label">Market Cap</div>
                     <div className="stat-value">₩1,234.56조</div>
                  </div>
               </div>
            </div>

            {/* Chart Section */}
            <div className="chart-section">
               <div className="chart-header">
                  <h2>차트</h2>
                  <div className="chart-controls">
                     <button className="chart-btn active">1D</button>
                     <button className="chart-btn">1W</button>
                     <button className="chart-btn">1M</button>
                     <button className="chart-btn">3M</button>
                     <button className="chart-btn">1Y</button>
                  </div>
               </div>

               <div className="chart-container">
                  <div className="chart-placeholder">
                     <Activity size={64} />
                     <p>Chart will be displayed here</p>
                     <p className="chart-note">Real-time price chart with technical indicators</p>
                  </div>
               </div>
            </div>

            {/* News Section */}
            <div className="coin-news-section">
               <h2>Related News</h2>
               <div className="news-grid">
                  <article className="news-item">
                     <div className="news-content">
                        <div className="news-meta">
                           <span className="news-source">CoinDesk</span>
                           <span className="news-time">
                              <Clock size={14} />2 hours ago
                           </span>
                        </div>
                        <h3>Bitcoin Price Analysis: Key Support Levels</h3>
                        <p>Technical analysis suggests strong support at current levels...</p>
                     </div>
                  </article>

                  <article className="news-item">
                     <div className="news-content">
                        <div className="news-meta">
                           <span className="news-source">CryptoNews</span>
                           <span className="news-time">
                              <Clock size={14} />4 hours ago
                           </span>
                        </div>
                        <h3>Institutional Investment in Crypto Continues</h3>
                        <p>Major financial institutions are increasing their crypto exposure...</p>
                     </div>
                  </article>
               </div>
            </div>

            {/* Community Discussion */}
            <div className="community-discussion">
               <h2>Community Discussion</h2>
               <div className="discussion-placeholder">
                  <div className="discussion-item">
                     <div className="user-avatar">A</div>
                     <div className="discussion-content">
                        <div className="user-name">Anonymous User</div>
                        <div className="discussion-text">Great buying opportunity at this level!</div>
                        <div className="discussion-time">5 minutes ago</div>
                     </div>
                  </div>

                  <div className="discussion-item">
                     <div className="user-avatar">B</div>
                     <div className="discussion-content">
                        <div className="user-name">Bitcoin Believer</div>
                        <div className="discussion-text">I'm holding long term. Market volatility doesn't worry me.</div>
                        <div className="discussion-time">15 minutes ago</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CoinDetailPage
