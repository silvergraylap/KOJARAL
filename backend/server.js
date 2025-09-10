const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const upbitService = require('./services/upbitService')
const newsService = require('./services/newsService')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// 미들웨어
app.use(cors())
app.use(express.json())

// 라우트
app.get('/api/health', (req, res) => {
   res.json({ message: 'KOJARAL API Server is running!' })
})

// 업비트 API 라우트
app.get('/api/coins', async (req, res) => {
   try {
      const coins = await upbitService.getAllCoins()
      res.json(coins)
   } catch (error) {
      console.error('Error fetching coins:', error)
      res.status(500).json({ error: 'Failed to fetch coins' })
   }
})

app.get('/api/coins/:market', async (req, res) => {
   try {
      const { market } = req.params
      const coinData = await upbitService.getCoinData(market)
      res.json(coinData)
   } catch (error) {
      console.error('Error fetching coin data:', error)
      res.status(500).json({ error: 'Failed to fetch coin data' })
   }
})

app.get('/api/coins/:market/candles/:timeframe', async (req, res) => {
   try {
      const { market, timeframe } = req.params
      const { count = 200 } = req.query
      const candles = await upbitService.getCandles(market, timeframe, count)
      res.json(candles)
   } catch (error) {
      console.error('Error fetching candles:', error)
      res.status(500).json({ error: 'Failed to fetch candles' })
   }
})

// 뉴스 API 라우트
app.get('/api/news', async (req, res) => {
   try {
      const { category = 'all', page = 1 } = req.query
      const news = await newsService.getNews(category, page)
      res.json(news)
   } catch (error) {
      console.error('Error fetching news:', error)
      res.status(500).json({ error: 'Failed to fetch news' })
   }
})

app.get('/api/news/crypto', async (req, res) => {
   try {
      const news = await newsService.getCryptoNews()
      res.json(news)
   } catch (error) {
      console.error('Error fetching crypto news:', error)
      res.status(500).json({ error: 'Failed to fetch crypto news' })
   }
})

// 서버 시작
app.listen(PORT, () => {
   console.log(`🚀 KOJARAL API Server running on port ${PORT}`)
   console.log(`📊 Upbit API integration ready`)
   console.log(`📰 News API integration ready`)
})
