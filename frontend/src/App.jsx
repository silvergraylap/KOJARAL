import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import MarketsPage from './pages/MarketsPage'
import CoinDetailPage from './pages/CoinDetailPage'
import NewsPage from './pages/NewsPage'
import CommunityPage from './pages/CommunityPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import SearchPage from './pages/SearchPage'
import FAQPage from './pages/FAQPage'
import RewardsPage from './pages/RewardsPage'

function App() {
   return (
      <Router>
         <div className="App">
            <Header />
            <main className="main-content">
               <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/markets" element={<MarketsPage />} />
                  <Route path="/coin/:symbol" element={<CoinDetailPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/rewards" element={<RewardsPage />} />
               </Routes>
            </main>
            <Footer />
         </div>
      </Router>
   )
}

export default App
