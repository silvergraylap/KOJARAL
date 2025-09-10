const axios = require('axios')
const cheerio = require('cheerio')

class NewsService {
   constructor() {
      this.baseUrl = 'https://search.naver.com/search.naver'
   }

   // 일반 뉴스 가져오기
   async getNews(category = 'all', page = 1) {
      try {
         const queries = {
            all: '코인 암호화폐 비트코인',
            crypto: '비트코인 이더리움 암호화폐',
            stock: '주식 증권 투자',
            forex: '환율 달러 유로',
         }

         const query = queries[category] || queries.all
         const start = (page - 1) * 10 + 1

         const response = await axios.get(this.baseUrl, {
            params: {
               where: 'news',
               query: query,
               start: start,
               sort: 1, // 최신순
            },
            headers: {
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
         })

         const $ = cheerio.load(response.data)
         const newsItems = []

         $('.news_area').each((index, element) => {
            if (index >= 10) return false // 최대 10개

            const $el = $(element)
            const title = $el.find('.news_tit').text().trim()
            const link = $el.find('.news_tit').attr('href')
            const description = $el.find('.news_dsc').text().trim()
            const source = $el.find('.info_group .press').text().trim()
            const time = $el.find('.info_group .info').text().trim()

            if (title && link) {
               newsItems.push({
                  title,
                  link,
                  description,
                  source,
                  time,
                  category,
               })
            }
         })

         return {
            news: newsItems,
            page,
            total: newsItems.length,
         }
      } catch (error) {
         console.error('Error fetching news:', error)
         throw error
      }
   }

   // 암호화폐 뉴스
   async getCryptoNews() {
      try {
         const response = await axios.get(this.baseUrl, {
            params: {
               where: 'news',
               query: '비트코인 이더리움 암호화폐 코인',
               start: 1,
               sort: 1,
            },
            headers: {
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
         })

         const $ = cheerio.load(response.data)
         const newsItems = []

         $('.news_area').each((index, element) => {
            if (index >= 15) return false

            const $el = $(element)
            const title = $el.find('.news_tit').text().trim()
            const link = $el.find('.news_tit').attr('href')
            const description = $el.find('.news_dsc').text().trim()
            const source = $el.find('.info_group .press').text().trim()
            const time = $el.find('.info_group .info').text().trim()

            if (title && link) {
               newsItems.push({
                  title,
                  link,
                  description,
                  source,
                  time,
                  category: 'crypto',
               })
            }
         })

         return newsItems
      } catch (error) {
         console.error('Error fetching crypto news:', error)
         throw error
      }
   }

   // 주식 뉴스
   async getStockNews() {
      try {
         const response = await axios.get(this.baseUrl, {
            params: {
               where: 'news',
               query: '주식 증권 투자 삼성전자',
               start: 1,
               sort: 1,
            },
            headers: {
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
         })

         const $ = cheerio.load(response.data)
         const newsItems = []

         $('.news_area').each((index, element) => {
            if (index >= 10) return false

            const $el = $(element)
            const title = $el.find('.news_tit').text().trim()
            const link = $el.find('.news_tit').attr('href')
            const description = $el.find('.news_dsc').text().trim()
            const source = $el.find('.info_group .press').text().trim()
            const time = $el.find('.info_group .info').text().trim()

            if (title && link) {
               newsItems.push({
                  title,
                  link,
                  description,
                  source,
                  time,
                  category: 'stock',
               })
            }
         })

         return newsItems
      } catch (error) {
         console.error('Error fetching stock news:', error)
         throw error
      }
   }

   // 환율 뉴스
   async getForexNews() {
      try {
         const response = await axios.get(this.baseUrl, {
            params: {
               where: 'news',
               query: '환율 달러 유로 엔화',
               start: 1,
               sort: 1,
            },
            headers: {
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
         })

         const $ = cheerio.load(response.data)
         const newsItems = []

         $('.news_area').each((index, element) => {
            if (index >= 10) return false

            const $el = $(element)
            const title = $el.find('.news_tit').text().trim()
            const link = $el.find('.news_tit').attr('href')
            const description = $el.find('.news_dsc').text().trim()
            const source = $el.find('.info_group .press').text().trim()
            const time = $el.find('.info_group .info').text().trim()

            if (title && link) {
               newsItems.push({
                  title,
                  link,
                  description,
                  source,
                  time,
                  category: 'forex',
               })
            }
         })

         return newsItems
      } catch (error) {
         console.error('Error fetching forex news:', error)
         throw error
      }
   }
}

module.exports = new NewsService()
