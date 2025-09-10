const axios = require('axios')

const UPBIT_API_BASE = 'https://api.upbit.com/v1'

class UpbitService {
   // 모든 코인 정보 가져오기
   async getAllCoins() {
      try {
         const response = await axios.get(`${UPBIT_API_BASE}/market/all`)
         return response.data
      } catch (error) {
         console.error('Error fetching all coins:', error)
         throw error
      }
   }

   // 특정 코인 현재가 정보
   async getCoinData(market) {
      try {
         const response = await axios.get(`${UPBIT_API_BASE}/ticker`, {
            params: { markets: market },
         })
         return response.data[0]
      } catch (error) {
         console.error('Error fetching coin data:', error)
         throw error
      }
   }

   // 캔들 데이터 (차트용)
   async getCandles(market, timeframe, count = 200) {
      try {
         const response = await axios.get(`${UPBIT_API_BASE}/candles/${timeframe}`, {
            params: {
               market: market,
               count: count,
            },
         })
         return response.data
      } catch (error) {
         console.error('Error fetching candles:', error)
         throw error
      }
   }

   // 실시간 웹소켓 데이터 (향후 구현)
   async getWebSocketData() {
      // WebSocket 연결 로직은 클라이언트에서 직접 구현
      return null
   }

   // 인기 코인들 (거래량 기준)
   async getPopularCoins() {
      try {
         const response = await axios.get(`${UPBIT_API_BASE}/market/all`)
         const coins = response.data.filter((coin) => coin.market.startsWith('KRW-'))

         // 거래량 기준으로 정렬 (실제로는 ticker API를 호출해야 함)
         return coins.slice(0, 20)
      } catch (error) {
         console.error('Error fetching popular coins:', error)
         throw error
      }
   }

   // 코인 검색
   async searchCoins(query) {
      try {
         const response = await axios.get(`${UPBIT_API_BASE}/market/all`)
         const coins = response.data.filter((coin) => coin.korean_name.toLowerCase().includes(query.toLowerCase()) || coin.english_name.toLowerCase().includes(query.toLowerCase()) || coin.market.toLowerCase().includes(query.toLowerCase()))
         return coins
      } catch (error) {
         console.error('Error searching coins:', error)
         throw error
      }
   }
}

module.exports = new UpbitService()
