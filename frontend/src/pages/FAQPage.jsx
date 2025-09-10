import { useState } from 'react'
import { ChevronDown, Search, HelpCircle } from 'lucide-react'

const FAQPage = () => {
   const [searchQuery, setSearchQuery] = useState('')
   const [activeCategory, setActiveCategory] = useState('general')
   const [openFAQ, setOpenFAQ] = useState(null)

   const categories = [
      { id: 'general', label: '계정 관리' },
      { id: 'trading', label: '거래 및 수수료' },
      { id: 'wallet', label: '이용 안내' },
      { id: 'security', label: '보안 및 개인정보' },
   ]

   const faqs = {
      general: [
         {
            question: '계정을 생성하는 방법은 무엇인가요?',
            answer: '홈페이지에서 가입하기 버튼을 클릭하여 이메일과 비밀번호를 입력하여 계정을 생성할 수 있습니다.',
         },
         {
            question: '계정 정보를 변경하는 방법은?',
            answer: '프로필 페이지에서 개인정보를 수정할 수 있습니다.',
         },
         {
            question: '회원 탈퇴는 어떻게 하나요?',
            answer: '고객지원팀에 문의하시면 탈퇴 절차를 안내해드립니다.',
         },
      ],
   }

   const toggleFAQ = (index) => {
      setOpenFAQ(openFAQ === index ? null : index)
   }

   return (
      <div style={{ padding: '40px 0', minHeight: '100vh' }}>
         <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
               <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>고객 지원 및 FAQ</h1>
               <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>웹사이트 이용 중 궁금한 문제이나 궁금증에 대한 안내</p>
            </div>

            <div style={{ marginBottom: '40px' }}>
               <h2 style={{ marginBottom: '20px' }}>FAQ</h2>
               <div style={{ position: 'relative', marginBottom: '32px', maxWidth: '500px' }}>
                  <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input
                     type="text"
                     placeholder="Search FAQ..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     style={{
                        width: '100%',
                        padding: '12px 16px 12px 50px',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                     }}
                  />
               </div>

               <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                  {categories.map((category) => (
                     <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        style={{
                           padding: '8px 16px',
                           background: activeCategory === category.id ? 'var(--primary-color)' : 'var(--card-bg)',
                           color: activeCategory === category.id ? '#000' : 'var(--text-secondary)',
                           border: '1px solid var(--border-color)',
                           borderRadius: '20px',
                           cursor: 'pointer',
                           fontSize: '14px',
                        }}
                     >
                        {category.label}
                     </button>
                  ))}
               </div>

               <div style={{ maxWidth: '800px' }}>
                  {(faqs[activeCategory] || []).map((faq, index) => (
                     <div key={index} style={{ marginBottom: '16px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                        <button
                           onClick={() => toggleFAQ(index)}
                           style={{
                              width: '100%',
                              padding: '20px',
                              background: 'none',
                              border: 'none',
                              color: 'var(--text-primary)',
                              textAlign: 'left',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '1rem',
                              fontWeight: '600',
                           }}
                        >
                           {faq.question}
                           <ChevronDown size={20} style={{ transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
                        </button>
                        {openFAQ === index && <div style={{ padding: '0 20px 20px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{faq.answer}</div>}
                     </div>
                  ))}
               </div>
            </div>

            <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--card-bg)', borderRadius: '12px' }}>
               <HelpCircle size={48} style={{ marginBottom: '16px', color: 'var(--primary-color)' }} />
               <h3 style={{ marginBottom: '8px' }}>도움이 더 필요하신가요?</h3>
               <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>원하는 답변을 찾지 못하셨다면 고객지원팀에 직접 문의해주세요.</p>
               <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                     <p style={{ fontWeight: '600', marginBottom: '4px' }}>이메일 주소</p>
                     <p style={{ color: 'var(--primary-color)' }}>support@coinswap.com</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                     <p style={{ fontWeight: '600', marginBottom: '4px' }}>고객센터 전화번호</p>
                     <p style={{ color: 'var(--primary-color)' }}>02-1234-5678</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FAQPage
