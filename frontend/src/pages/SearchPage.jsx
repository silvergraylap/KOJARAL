import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, TrendingUp } from 'lucide-react'

const SearchPage = () => {
   const [searchParams] = useSearchParams()
   const [query, setQuery] = useState(searchParams.get('q') || '')
   const [results, setResults] = useState([])
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      if (query) {
         performSearch(query)
      }
   }, [query])

   const performSearch = async (searchQuery) => {
      setIsLoading(true)
      // Mock search results
      setTimeout(() => {
         setResults([
            { type: 'coin', name: 'Bitcoin', symbol: 'BTC', description: 'The first cryptocurrency' },
            { type: 'news', title: 'Bitcoin reaches new highs', source: 'CryptoNews' },
         ])
         setIsLoading(false)
      }, 500)
   }

   return (
      <div className="search-page" style={{ padding: '40px 0', minHeight: '100vh' }}>
         <div className="container">
            <h1>Search Results</h1>
            <p>Results for: "{query}"</p>

            {isLoading ? (
               <div className="loading">
                  <div className="spinner"></div>
                  <p>Searching...</p>
               </div>
            ) : (
               <div className="search-results">
                  {results.length > 0 ? (
                     results.map((result, index) => (
                        <div key={index} className="result-item card" style={{ padding: '20px', marginBottom: '16px' }}>
                           <h3>{result.name || result.title}</h3>
                           <p>{result.description || result.source}</p>
                        </div>
                     ))
                  ) : (
                     <div className="no-results" style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <Search size={48} style={{ opacity: 0.5, marginBottom: '16px' }} />
                        <h3>No results found</h3>
                        <p>Try adjusting your search terms.</p>
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   )
}

export default SearchPage
