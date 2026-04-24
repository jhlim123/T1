import { useState, useEffect } from 'react';

export default function SajuHistory({ onSelect, onBack }) {
  const [history, setHistory] = useState([]);

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
    if (window.confirm('전체 기록을 삭제하시겠습니까?')) {
      localStorage.removeItem('saju_history');
      setHistory([]);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>사주 저장 목록</h2>
        <button onClick={onBack} style={{ padding: '8px 16px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>뒤로가기</button>
      </div>

      {history.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
          저장된 사주 정보가 없습니다.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {history.map((item) => (
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
                  {item.name} <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#64748b' }}>({item.gender === 'male' ? '남' : '여'})</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                  {item.birthDate.substring(0,4)}년 {item.birthDate.substring(4,6)}월 {item.birthDate.substring(6,8)}일 ({item.calendarType === 'solar' ? '양력' : '음력'})
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
                삭제
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
            기록 전체 삭제
          </button>
        </div>
      )}
    </div>
  );
}
