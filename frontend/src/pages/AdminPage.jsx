import { useState } from 'react'
import { BarChart3, Users, MessageCircle, TrendingUp, Settings, Bell } from 'lucide-react'
import './AdminPage.css'

const AdminPage = () => {
   const [activeTab, setActiveTab] = useState('overview')

   const tabs = [
      { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
      { id: 'users', label: 'Users', icon: <Users size={16} /> },
      { id: 'posts', label: 'Posts', icon: <MessageCircle size={16} /> },
      { id: 'comments', label: 'Comments', icon: <MessageCircle size={16} /> },
      { id: 'coins', label: 'Coins', icon: <TrendingUp size={16} /> },
      { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
      { id: 'announcements', label: 'Announcements', icon: <Bell size={16} /> },
   ]

   const stats = [
      { label: 'Total Users', value: '12,345', change: '+8%' },
      { label: 'Active Users', value: '8,765', change: '+15%' },
      { label: 'Total Posts', value: '5,432', change: '+12%' },
      { label: 'Total Comments', value: '9,876', change: '+6%' },
      { label: 'Coin Supply', value: '1,000,000', change: '+0%' },
   ]

   return (
      <div className="admin-page">
         <div className="container">
            <div className="admin-layout">
               {/* Sidebar */}
               <aside className="admin-sidebar">
                  <div className="admin-logo">
                     <h2>Admin Panel</h2>
                  </div>
                  <nav className="admin-nav">
                     {tabs.map((tab) => (
                        <button key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                           {tab.icon}
                           {tab.label}
                        </button>
                     ))}
                  </nav>
               </aside>

               {/* Main Content */}
               <main className="admin-main">
                  <div className="admin-header">
                     <h1>{tabs.find((tab) => tab.id === activeTab)?.label || 'Overview'}</h1>
                  </div>

                  {activeTab === 'overview' && (
                     <div className="overview-content">
                        {/* Stats Grid */}
                        <div className="stats-grid">
                           {stats.map((stat, index) => (
                              <div key={index} className="stat-card">
                                 <div className="stat-header">
                                    <span className="stat-label">{stat.label}</span>
                                 </div>
                                 <div className="stat-value">{stat.value}</div>
                                 <div className="stat-change positive">{stat.change}</div>
                              </div>
                           ))}
                        </div>

                        {/* Charts */}
                        <div className="charts-section">
                           <div className="chart-card">
                              <h3>Recent Activity</h3>
                              <div className="chart-container">
                                 <div className="chart-placeholder">
                                    <BarChart3 size={48} />
                                    <p>User Growth Chart</p>
                                    <div className="mock-data">
                                       <span>Last 30 Days: +2%</span>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="chart-card">
                              <h3>Post Engagement</h3>
                              <div className="chart-container">
                                 <div className="chart-placeholder">
                                    <TrendingUp size={48} />
                                    <p>Post Engagement Chart</p>
                                    <div className="mock-data">
                                       <span>Last 7 Days: -1%</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Recent Posts */}
                        <div className="recent-section">
                           <h3>Recent Posts</h3>
                           <div className="recent-posts">
                              <div className="post-item">
                                 <div className="post-content">
                                    <span className="post-title">New crypto trading strategies</span>
                                    <span className="post-author">by John Doe</span>
                                 </div>
                                 <span className="post-status approved">Approved</span>
                              </div>
                              <div className="post-item">
                                 <div className="post-content">
                                    <span className="post-title">Market analysis update</span>
                                    <span className="post-author">by Jane Smith</span>
                                 </div>
                                 <span className="post-status pending">Pending</span>
                              </div>
                           </div>
                        </div>

                        {/* Recent Comments */}
                        <div className="recent-section">
                           <h3>Recent Comments</h3>
                           <div className="recent-comments">
                              <div className="comment-item">
                                 <div className="comment-content">
                                    <span className="comment-text">Great analysis! Thanks for sharing.</span>
                                    <span className="comment-author">by Mike Johnson</span>
                                 </div>
                                 <span className="comment-status approved">Approved</span>
                              </div>
                              <div className="comment-item">
                                 <div className="comment-content">
                                    <span className="comment-text">I disagree with this perspective...</span>
                                    <span className="comment-author">by Sarah Wilson</span>
                                 </div>
                                 <span className="comment-status pending">Pending</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab !== 'overview' && (
                     <div className="placeholder-content">
                        <div className="placeholder">
                           {tabs.find((tab) => tab.id === activeTab)?.icon}
                           <h2>{tabs.find((tab) => tab.id === activeTab)?.label} Management</h2>
                           <p>This section is under development.</p>
                        </div>
                     </div>
                  )}
               </main>
            </div>
         </div>
      </div>
   )
}

export default AdminPage
