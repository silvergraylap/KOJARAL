import { useState, useEffect } from 'react'
import { Search, Clock, ExternalLink, Filter, TrendingUp } from 'lucide-react'
import apiService from '../services/apiService'
import './NewsPage.css'

const NewsPage = () => {
   const [news, setNews] = useState([])
   const [filteredNews, setFilteredNews] = useState([])
   const [isLoading, setIsLoading] = useState(true)
   const [searchQuery, setSearchQuery] = useState('')
   const [selectedCategory, setSelectedCategory] = useState('all')

   const categories = [
      { id: 'all', label: 'All', icon: '📰' },
      { id: 'crypto', label: 'Crypto', icon: '₿' },
      { id: 'stock', label: 'Stocks', icon: '📈' },
      { id: 'forex', label: 'Forex', icon: '💱' },
   ]

   const topStories = [
      {
         title: 'Tech Stocks Surge as New Innovations Drive Market Optimism',
         category: 'Market Analysis',
         time: '2 hours ago',
         image: true,
      },
      {
         title: 'Bitcoin Reaches New All-Time High',
         category: 'Crypto News',
         time: '4 hours ago',
         image: true,
      },
      {
         title: 'Global Markets React to New Economic Policies',
         category: 'Economic Update',
         time: '6 hours ago',
         image: true,
      },
   ]

   useEffect(() => {
      const loadNews = async () => {
         try {
            setIsLoading(true)
            const newsData = await apiService.getNews(selectedCategory)
            setNews(newsData.news || [])
            setFilteredNews(newsData.news || [])
         } catch (error) {
            console.error('Error loading news:', error)
            // Mock data for demo
            const mockNews = [
               {
                  title: 'Tech Stocks Surge as Market Optimism Grows',
                  description: 'Technology sector experienced significant boost today with several key stocks reaching new highs.',
                  source: 'Financial Times',
                  time: '2 hours ago',
                  category: 'stock',
                  link: '#',
               },
               {
                  title: 'Bitcoin Price Surges Above $50,000',
                  description: "Bitcoin's value soared past $50,000 mark, fueled by increased institutional investment.",
                  source: 'Crypto News',
                  time: '4 hours ago',
                  category: 'crypto',
                  link: '#',
               },
            ]
            setNews(mockNews)
            setFilteredNews(mockNews)
         } finally {
            setIsLoading(false)
         }
      }

      loadNews()
   }, [selectedCategory])

   useEffect(() => {
      if (searchQuery) {
         const filtered = news.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.description.toLowerCase().includes(searchQuery.toLowerCase()))
         setFilteredNews(filtered)
      } else {
         setFilteredNews(news)
      }
   }, [searchQuery, news])

   return (
      <div className="news-page">
         <div className="container">
            {/* Header */}
            <div className="news-header">
               <h1>최근 뉴스</h1>
               <p>Stay informed with the latest updates from the financial world.</p>
            </div>

            {/* Search and Filters */}
            <div className="news-controls">
               <div className="search-wrapper">
                  <Search size={20} className="search-icon" />
                  <input type="text" placeholder="Search news..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
               </div>

               <div className="category-filters">
                  {categories.map((category) => (
                     <button key={category.id} className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`} onClick={() => setSelectedCategory(category.id)}>
                        <span className="category-icon">{category.icon}</span>
                        {category.label}
                     </button>
                  ))}
               </div>
            </div>

            {/* Top Stories */}
            <section className="top-stories">
               <h2>Top Stories</h2>
               <div className="stories-grid">
                  {topStories.map((story, index) => (
                     <article key={index} className="top-story-card">
                        <div className="story-image">
                           <div className="story-placeholder">
                              <TrendingUp size={32} />
                           </div>
                        </div>
                        <div className="story-content">
                           <span className="story-category">{story.category}</span>
                           <h3>{story.title}</h3>
                           <div className="story-meta">
                              <Clock size={16} />
                              <span>{story.time}</span>
                           </div>
                        </div>
                     </article>
                  ))}
               </div>
            </section>

            {/* Market Updates */}
            <section className="market-updates">
               <div className="section-header">
                  <h2>중요한 뉴스(주요소)</h2>
                  <div className="market-indicators">
                     <div className="indicator">
                        <span className="indicator-label">Stock Market Index</span>
                        <span className="indicator-value positive">+1.2%</span>
                        <span className="indicator-detail">Today +1.2%</span>
                     </div>
                     <div className="indicator">
                        <span className="indicator-label">Crypto Market Index</span>
                        <span className="indicator-value negative">-0.5%</span>
                        <span className="indicator-detail">Today -0.5%</span>
                     </div>
                     <div className="indicator">
                        <span className="indicator-label">Forex Market Index</span>
                        <span className="indicator-value positive">+0.8%</span>
                        <span className="indicator-detail">Today +0.8%</span>
                     </div>
                  </div>
               </div>
            </section>

            {/* Latest News */}
            <section className="latest-news">
               <h2>Latest News</h2>

               {isLoading ? (
                  <div className="loading">
                     <div className="spinner"></div>
                     <p>Loading news...</p>
                  </div>
               ) : (
                  <div className="news-list">
                     {filteredNews.length > 0 ? (
                        filteredNews.map((article, index) => (
                           <article key={index} className="news-item">
                              <div className="news-content">
                                 <div className="news-meta">
                                    <span className="news-source">{article.source}</span>
                                    <span className="news-time">
                                       <Clock size={14} />
                                       {article.time}
                                    </span>
                                 </div>
                                 <h3 className="news-title">{article.title}</h3>
                                 <p className="news-description">{article.description}</p>
                                 <div className="news-tags">
                                    <span className="news-tag">{article.category}</span>
                                 </div>
                              </div>
                              <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-link">
                                 <ExternalLink size={16} />
                              </a>
                           </article>
                        ))
                     ) : (
                        <div className="no-news">
                           <TrendingUp size={48} />
                           <h3>No news found</h3>
                           <p>Try adjusting your search or category filter.</p>
                        </div>
                     )}
                  </div>
               )}
            </section>
         </div>
      </div>
   )
}

export default NewsPage
