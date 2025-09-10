import { useState } from 'react'
import { Gift, Star, Clock } from 'lucide-react'

const RewardsPage = () => {
   const [selectedCategory, setSelectedCategory] = useState('gift_cards')

   const categories = [
      { id: 'gift_cards', label: 'Gift Cards' },
      { id: 'service_vouchers', label: 'Service Vouchers' },
      { id: 'physical_goods', label: 'Physical Goods' },
   ]

   const rewards = [
      {
         name: 'Coffee Shop Gift Card',
         coins: 500,
         category: 'gift_cards',
         image: true,
      },
      {
         name: 'Movie Ticket',
         coins: 300,
         category: 'gift_cards',
         image: true,
      },
      {
         name: 'Online Store Voucher',
         coins: 700,
         category: 'service_vouchers',
         image: true,
      },
      {
         name: 'Restaurant Gift Card',
         coins: 400,
         category: 'gift_cards',
         image: true,
      },
      {
         name: 'Bookstore Voucher',
         coins: 200,
         category: 'physical_goods',
         image: true,
      },
      {
         name: 'Concert Ticket',
         coins: 600,
         category: 'physical_goods',
         image: true,
      },
   ]

   const filteredRewards = rewards.filter((reward) => reward.category === selectedCategory)

   return (
      <div style={{ padding: '40px 0', minHeight: '100vh' }}>
         <div className="container">
            <div style={{ marginBottom: '40px' }}>
               <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Rewards</h1>
               <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Use your earned coins to redeem various rewards.</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', padding: '20px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontWeight: '600' }}>
                  <span>🪙</span>
                  <span>1,500 Coins</span>
               </div>
               <p style={{ color: 'var(--text-secondary)' }}>Your Coin Balance</p>
            </div>

            <div style={{ marginBottom: '40px' }}>
               <h2 style={{ marginBottom: '20px' }}>Redeem Rewards</h2>
               <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  {categories.map((category) => (
                     <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        style={{
                           padding: '10px 20px',
                           background: selectedCategory === category.id ? 'var(--primary-color)' : 'var(--card-bg)',
                           color: selectedCategory === category.id ? '#000' : 'var(--text-secondary)',
                           border: '1px solid var(--border-color)',
                           borderRadius: '8px',
                           cursor: 'pointer',
                           fontSize: '14px',
                           fontWeight: '500',
                        }}
                     >
                        {category.label}
                     </button>
                  ))}
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                  {filteredRewards.map((reward, index) => (
                     <div key={index} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', transition: 'all 0.3s ease' }} className="card">
                        <div style={{ height: '160px', background: 'var(--dark-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                           <Gift size={48} />
                        </div>
                        <div style={{ padding: '20px' }}>
                           <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>{reward.name}</h3>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--primary-color)', fontWeight: '600' }}>
                              <span>🪙</span>
                              <span>{reward.coins} Coins</span>
                           </div>
                           <button
                              style={{
                                 width: '100%',
                                 padding: '10px',
                                 background: 'var(--primary-color)',
                                 color: '#000',
                                 border: 'none',
                                 borderRadius: '8px',
                                 fontWeight: '600',
                                 cursor: 'pointer',
                                 transition: 'all 0.3s ease',
                              }}
                           >
                              Redeem
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div style={{ padding: '20px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
               <p style={{ color: 'var(--text-secondary)' }}>Upon successful redemption, you will receive a confirmation message and the reward details will be sent to your registered email address.</p>
            </div>

            <div style={{ marginTop: '40px' }}>
               <h2 style={{ marginBottom: '20px' }}>Redemption History</h2>
               <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
                  <Clock size={48} style={{ marginBottom: '16px', color: 'var(--text-secondary)', opacity: 0.5 }} />
                  <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>No redemption history</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Your reward redemptions will appear here once you start redeeming.</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default RewardsPage
