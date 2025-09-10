import { useState } from 'react'
import { Search, MessageCircle, Heart, Bookmark, Share2, TrendingUp, Users, Star } from 'lucide-react'
import './CommunityPage.css'

const CommunityPage = () => {
   const [activeTab, setActiveTab] = useState('all')
   const [searchQuery, setSearchQuery] = useState('')

   const tabs = [
      { id: 'all', label: 'All', icon: <MessageCircle size={16} /> },
      { id: 'stocks', label: 'Stocks', icon: <TrendingUp size={16} /> },
      { id: 'crypto', label: 'Crypto', icon: '₿' },
      { id: 'forex', label: 'Forex', icon: '💱' },
   ]

   const trendingPosts = [
      {
         id: 1,
         author: 'Min-jun Kim',
         avatar: 'M',
         time: '2d',
         content: "The market is down today, but I'm not worried. I'm in it for the long haul.",
         likes: 23,
         comments: 15,
         bookmarks: 5,
      },
      {
         id: 2,
         author: 'Ji-woo Lee',
         avatar: 'J',
         time: '1d',
         content: "Is now the right time to buy Bitcoin? Let's discuss.",
         likes: 18,
         comments: 27,
         bookmarks: 8,
      },
      {
         id: 3,
         author: 'Hyun-woo Park',
         avatar: 'H',
         time: '3d',
         content: "I'm bullish on renewable energy stocks. What are your thoughts?",
         likes: 31,
         comments: 19,
         bookmarks: 12,
      },
   ]

   const latestPosts = [
      {
         id: 4,
         author: 'Soo-ah Choi',
         avatar: 'S',
         time: '1h',
         content: 'Just made a big profit on my forex trade! Feeling good.',
         likes: 8,
         comments: 4,
         bookmarks: 2,
      },
      {
         id: 5,
         author: 'Tae-hyun Kang',
         avatar: 'T',
         time: '2h',
         content: 'Anyone else following the new tech stock IPO? Looks promising.',
         likes: 15,
         comments: 8,
         bookmarks: 3,
      },
      {
         id: 6,
         author: 'Ha-eun Kim',
         avatar: 'H',
         time: '3h',
         content: 'Thinking about investing in Ethereum. Any advice for a beginner?',
         likes: 12,
         comments: 22,
         bookmarks: 6,
      },
      {
         id: 7,
         author: 'Woo-jin Lee',
         avatar: 'W',
         time: '4h',
         content: 'The stock market is unpredictable. Diversification is key.',
         likes: 25,
         comments: 11,
         bookmarks: 9,
      },
      {
         id: 8,
         author: 'Seo-yeon Park',
         avatar: 'S',
         time: '5h',
         content: 'What are your favorite resources for learning about finance?',
         likes: 19,
         comments: 31,
         bookmarks: 14,
      },
      {
         id: 9,
         author: 'Joon-ho Choi',
         avatar: 'J',
         time: '6h',
         content: "I'm new to crypto trading. Any tips for avoiding common mistakes?",
         likes: 22,
         comments: 18,
         bookmarks: 7,
      },
      {
         id: 10,
         author: 'Na-kyung Kang',
         avatar: 'N',
         time: '7h',
         content: 'The future of finance is decentralized. Are you ready?',
         likes: 28,
         comments: 20,
         bookmarks: 11,
      },
   ]

   return (
      <div className="community-page">
         <div className="container">
            {/* Header */}
            <div className="community-header">
               <h1>Community</h1>
               <div className="search-wrapper">
                  <Search size={20} className="search-icon" />
                  <input type="text" placeholder="Search discussions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
               </div>
            </div>

            {/* Tabs */}
            <div className="community-tabs">
               {tabs.map((tab) => (
                  <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                     {tab.icon}
                     {tab.label}
                  </button>
               ))}
            </div>

            <div className="community-content">
               <div className="main-content">
                  {/* Trending Posts */}
                  <section className="trending-section">
                     <h2>Trending Posts</h2>
                     <div className="posts-list">
                        {trendingPosts.map((post) => (
                           <article key={post.id} className="post-card trending">
                              <div className="post-header">
                                 <div className="author-info">
                                    <div className="avatar">{post.avatar}</div>
                                    <div>
                                       <div className="author-name">By {post.author}</div>
                                       <div className="post-time">{post.time}</div>
                                    </div>
                                 </div>
                                 <div className="trending-badge">
                                    <Star size={14} fill="currentColor" />
                                 </div>
                              </div>
                              <div className="post-content">
                                 <p>{post.content}</p>
                              </div>
                              <div className="post-actions">
                                 <button className="action-btn">
                                    <Heart size={16} />
                                    {post.likes}
                                 </button>
                                 <button className="action-btn">
                                    <MessageCircle size={16} />
                                    {post.comments}
                                 </button>
                                 <button className="action-btn">
                                    <Bookmark size={16} />
                                    {post.bookmarks}
                                 </button>
                                 <button className="action-btn">
                                    <Share2 size={16} />
                                 </button>
                              </div>
                           </article>
                        ))}
                     </div>
                  </section>

                  {/* Latest Posts */}
                  <section className="latest-section">
                     <h2>Latest Posts</h2>
                     <div className="posts-list">
                        {latestPosts.map((post) => (
                           <article key={post.id} className="post-card">
                              <div className="post-header">
                                 <div className="author-info">
                                    <div className="avatar">{post.avatar}</div>
                                    <div>
                                       <div className="author-name">By {post.author}</div>
                                       <div className="post-time">{post.time}</div>
                                    </div>
                                 </div>
                              </div>
                              <div className="post-content">
                                 <p>{post.content}</p>
                              </div>
                              <div className="post-actions">
                                 <button className="action-btn">
                                    <Heart size={16} />
                                    {post.likes}
                                 </button>
                                 <button className="action-btn">
                                    <MessageCircle size={16} />
                                    {post.comments}
                                 </button>
                                 <button className="action-btn">
                                    <Bookmark size={16} />
                                    {post.bookmarks}
                                 </button>
                                 <button className="action-btn">
                                    <Share2 size={16} />
                                 </button>
                              </div>
                           </article>
                        ))}
                     </div>
                  </section>
               </div>

               {/* Sidebar */}
               <aside className="community-sidebar">
                  <div className="sidebar-card">
                     <h3>Community Stats</h3>
                     <div className="stats-list">
                        <div className="stat-item">
                           <Users size={20} />
                           <div>
                              <div className="stat-value">12,345</div>
                              <div className="stat-label">Members</div>
                           </div>
                        </div>
                        <div className="stat-item">
                           <MessageCircle size={20} />
                           <div>
                              <div className="stat-value">5,432</div>
                              <div className="stat-label">Posts</div>
                           </div>
                        </div>
                        <div className="stat-item">
                           <TrendingUp size={20} />
                           <div>
                              <div className="stat-value">8,765</div>
                              <div className="stat-label">Active Users</div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="sidebar-card">
                     <h3>Popular Topics</h3>
                     <div className="topics-list">
                        <div className="topic-item">
                           <span className="topic-name">Bitcoin Discussion</span>
                           <span className="topic-count">1,234 posts</span>
                        </div>
                        <div className="topic-item">
                           <span className="topic-name">Stock Analysis</span>
                           <span className="topic-count">987 posts</span>
                        </div>
                        <div className="topic-item">
                           <span className="topic-name">Trading Tips</span>
                           <span className="topic-count">756 posts</span>
                        </div>
                        <div className="topic-item">
                           <span className="topic-name">Market News</span>
                           <span className="topic-count">643 posts</span>
                        </div>
                     </div>
                  </div>
               </aside>
            </div>
         </div>
      </div>
   )
}

export default CommunityPage
