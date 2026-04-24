import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

export default function SajuHistory({ onSelect, onBack }) {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = 최신순, 'asc' = 오래된순
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('saju_history') || '[]');
    setHistory(saved);
  }, []);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem('saju_history', JSON.stringify(updated));
    setHistory(updated);
  };

  const handleClear = () => {
    if (window.confirm(language === 'ko' ? '전체 기록을 삭제하시겠습니까?' : 'Are you sure you want to delete all records?')) {
      localStorage.removeItem('saju_history');
      setHistory([]);
    }
  };

  const displayList = history
    .filter(item => item.name.includes(searchQuery))
    .sort((a, b) => sortOrder === 'desc' ? b.id - a.id : a.id - b.id);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{t.historyTitle}</h2>
        <button onClick={onBack} style={{ padding: '8px 16px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>{t.back}</button>
      </div>

      {history.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
          {t.noHistory}
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
            <button 
              onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
              style={{ padding: '0 15px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#475569', minWidth: '100px' }}
            >
              {sortOrder === 'desc' ? t.sortLatest : t.sortOldest}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {displayList.map((item) => (
              <div 
              key={item.id} 
              onClick={() => onSelect(item)}
              style={{ 
                padding: '15px', 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'transform 0.1s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1e293b' }}>
                  {item.name} <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#64748b' }}>({item.gender === 'male' ? (language === 'ko' ? '남' : 'M') : (language === 'ko' ? '여' : 'F')})</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                  {item.birthDate.substring(0,4)} {language === 'ko' ? '년' : '/'} {item.birthDate.substring(4,6)} {language === 'ko' ? '월' : '/'} {item.birthDate.substring(6,8)} {language === 'ko' ? '일' : ''} ({item.calendarType === 'solar' ? t.solar : t.lunar})
                </div>
              </div>
              <button 
                onClick={(e) => handleDelete(item.id, e)}
                style={{ 
                  padding: '6px 12px', 
                  background: '#fee2e2', 
                  color: '#ef4444', 
                  border: 'none', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {t.delete}
              </button>
            </div>
          ))}
          
          <button 
            onClick={handleClear}
            style={{ 
              marginTop: '20px', 
              padding: '12px', 
              background: 'transparent', 
              color: '#94a3b8', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            {t.deleteAll}
          </button>
        </div>
        </>
      )}
    </div>
  );
}
