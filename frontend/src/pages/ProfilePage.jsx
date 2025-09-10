import { useState } from 'react'
import { User, BarChart3, Bookmark, Bell, Settings, TrendingUp } from 'lucide-react'
import './ProfilePage.css'

const ProfilePage = () => {
   const [activeTab, setActiveTab] = useState('posts')

   const tabs = [
      { id: 'posts', label: '게시물', icon: <BarChart3 size={16} /> },
      { id: 'bookmarks', label: '북마크', icon: <Bookmark size={16} /> },
      { id: 'liked', label: '좋아요', icon: '❤️' },
   ]

   return (
      <div className="profile-page">
         <div className="container">
            <div className="profile-content">
               {/* Sidebar */}
               <aside className="profile-sidebar">
                  <div className="profile-card">
                     <div className="profile-avatar">
                        <User size={48} />
                     </div>
                     <h2>포트폴리오</h2>
                     <div className="profile-stats">
                        <div className="stat-item">
                           <div className="stat-number">12</div>
                           <div className="stat-label">Posts</div>
                        </div>
                        <div className="stat-item">
                           <div className="stat-number">34</div>
                           <div className="stat-label">Followers</div>
                        </div>
                        <div className="stat-item">
                           <div className="stat-number">56</div>
                           <div className="stat-label">Following</div>
                        </div>
                     </div>
                  </div>

                  <nav className="profile-nav">
                     <a href="#" className="nav-item active">
                        <User size={18} />홈
                     </a>
                     <a href="#" className="nav-item">
                        <BarChart3 size={18} />
                        탐색
                     </a>
                     <a href="#" className="nav-item">
                        <Bookmark size={18} />
                        관심 목록
                     </a>
                     <a href="#" className="nav-item">
                        <Bell size={18} />
                        포트폴리오
                     </a>
                     <a href="#" className="nav-item">
                        <Bell size={18} />
                        알림
                     </a>
                     <a href="#" className="nav-item">
                        <Settings size={18} />
                        프로필
                     </a>
                  </nav>
               </aside>

               {/* Main Content */}
               <main className="profile-main">
                  {/* Profile Header */}
                  <div className="profile-header">
                     <div className="profile-info">
                        <div className="profile-avatar-large">E</div>
                        <div className="profile-details">
                           <h1>Emily Carter</h1>
                           <p>@emily.carter</p>
                           <div className="profile-stats-inline">
                              <span>
                                 <strong>12</strong> posts
                              </span>
                              <span>
                                 <strong>34</strong> followers
                              </span>
                              <span>
                                 <strong>56</strong> following
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Activity Tabs */}
                  <div className="activity-tabs">
                     {tabs.map((tab) => (
                        <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                           {tab.icon}
                           {tab.label}
                        </button>
                     ))}
                  </div>

                  {/* Content Area */}
                  <div className="activity-content">
                     {activeTab === 'posts' && (
                        <div className="posts-section">
                           <div className="empty-state">
                              <BarChart3 size={48} />
                              <h3>게시물이 없습니다</h3>
                              <p>아직 게시물을 작성하지 않았습니다. 첫 게시물을 작성해보세요.</p>
                           </div>
                        </div>
                     )}

                     {activeTab === 'bookmarks' && (
                        <div className="bookmarks-section">
                           <div className="empty-state">
                              <Bookmark size={48} />
                              <h3>북마크가 없습니다</h3>
                              <p>관심 있는 게시물을 북마크해보세요.</p>
                           </div>
                        </div>
                     )}

                     {activeTab === 'liked' && (
                        <div className="liked-section">
                           <div className="empty-state">
                              <span style={{ fontSize: '48px' }}>❤️</span>
                              <h3>좋아요한 게시물이 없습니다</h3>
                              <p>마음에 드는 게시물에 좋아요를 눌러보세요.</p>
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Account Info */}
                  <div className="account-info">
                     <h3>회원 정보 수정</h3>
                     <form className="info-form">
                        <div className="form-group">
                           <label>닉네임</label>
                           <input type="text" defaultValue="Emily Carter" />
                        </div>
                        <div className="form-group">
                           <label>비밀번호</label>
                           <input type="password" placeholder="새 비밀번호 입력" />
                        </div>
                        <div className="form-group">
                           <label>프로필 사진</label>
                           <input type="file" />
                        </div>
                        <button type="submit" className="save-btn">
                           저장
                        </button>
                     </form>
                  </div>
               </main>

               {/* Right Sidebar */}
               <aside className="right-sidebar">
                  <div className="sidebar-card">
                     <h3>투자 현황</h3>
                     <div className="investment-stats">
                        <div className="investment-item">
                           <span className="investment-label">총 가치</span>
                           <span className="investment-value">$1,234.56</span>
                           <span className="investment-change positive">+2.34%</span>
                        </div>
                        <div className="investment-item">
                           <span className="investment-label">수익</span>
                           <span className="investment-value">$123.45</span>
                           <span className="investment-change positive">+1.23%</span>
                        </div>
                     </div>
                  </div>

                  <div className="sidebar-card">
                     <h3>알림 설정</h3>
                     <div className="notification-settings">
                        <div className="setting-item">
                           <span>앱 푸시</span>
                           <label className="toggle">
                              <input type="checkbox" defaultChecked />
                              <span className="slider"></span>
                           </label>
                        </div>
                        <div className="setting-item">
                           <span>이메일</span>
                           <label className="toggle">
                              <input type="checkbox" defaultChecked />
                              <span className="slider"></span>
                           </label>
                        </div>
                        <div className="setting-item">
                           <span>새로운 게시글 알림</span>
                           <label className="toggle">
                              <input type="checkbox" defaultChecked />
                              <span className="slider"></span>
                           </label>
                        </div>
                        <div className="setting-item">
                           <span>댓글 알림</span>
                           <label className="toggle">
                              <input type="checkbox" />
                              <span className="slider"></span>
                           </label>
                        </div>
                        <div className="setting-item">
                           <span>코인 학독 알림</span>
                           <label className="toggle">
                              <input type="checkbox" defaultChecked />
                              <span className="slider"></span>
                           </label>
                        </div>
                        <div className="setting-item">
                           <span>중요 뉴스 알림</span>
                           <label className="toggle">
                              <input type="checkbox" defaultChecked />
                              <span className="slider"></span>
                           </label>
                        </div>
                     </div>
                  </div>
               </aside>
            </div>
         </div>
      </div>
   )
}

export default ProfilePage
