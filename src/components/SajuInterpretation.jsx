import { getInterpretation, getCurrentLuckInterpretation } from '../utils/sajuLogic';

export default function SajuInterpretation({ sajuData, userInfo, selectedSewunYear, onReset }) {
  if (!sajuData || !userInfo) return null;
  const interpretation = getInterpretation(sajuData);
  const luck = getCurrentLuckInterpretation(sajuData, userInfo, selectedSewunYear || new Date().getFullYear());

  if (!interpretation) return null;

  return (
    <div className="interpretation-container" style={{ padding: '20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', paddingBottom: '60px' }}>
      <h3 className="section-title" style={{ 
        fontSize: '1.3rem', 
        fontWeight: 'bold', 
        borderLeft: '5px solid #3b82f6', 
        paddingLeft: '12px', 
        marginBottom: '20px',
        color: '#1e293b'
      }}>
        사주 심층 해설
      </h3>
      
      {/* 자평진전 해설 */}
      <div className="interpretation-card" style={{ 
        marginBottom: '20px', 
        padding: '20px', 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #f1f5f9'
      }}>
        <h4 style={{ 
          color: '#2563eb', 
          marginBottom: '12px', 
          fontWeight: 'bold', 
          display: 'flex', 
          alignItems: 'center',
          fontSize: '1.1rem'
        }}>
          <span style={{ marginRight: '8px' }}>📜</span> 자평진전(子平眞詮) 기준 격국론
        </h4>
        <p className="interpretation-text" style={{ lineHeight: '1.8', color: '#475569', fontSize: '1rem', wordBreak: 'keep-all' }}>
          <strong>[{interpretation.gyeok}격]</strong>: {interpretation.japyung}
        </p>
      </div>

      {/* 연해자평 해설 */}
      <div className="interpretation-card" style={{ 
        marginBottom: '20px', 
        padding: '20px', 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #f1f5f9'
      }}>
        <h4 style={{ 
          color: '#0891b2', 
          marginBottom: '12px', 
          fontWeight: 'bold', 
          display: 'flex', 
          alignItems: 'center',
          fontSize: '1.1rem'
        }}>
          <span style={{ marginRight: '8px' }}>🌊</span> 연해자평(淵海子平) 기준 성정 및 운세
        </h4>
        <p className="interpretation-text" style={{ lineHeight: '1.8', color: '#475569', fontSize: '1rem', wordBreak: 'keep-all' }}>
          {interpretation.yeonhae}
        </p>
      </div>

      {/* 운세 흐름 분석 */}
      <div className="luck-flow-card" style={{ 
        marginBottom: '25px', 
        padding: '20px', 
        backgroundColor: '#eff6ff', 
        borderRadius: '12px', 
        border: '1px solid #bfdbfe'
      }}>
        <h4 style={{ color: '#1d4ed8', marginBottom: '15px', fontWeight: 'bold', fontSize: '1.1rem' }}>
          ✨ 현재 운세 흐름 (대운 & 세운)
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <strong style={{ color: '#1e40af' }}>[대운] {luck.daewun.age}세 대운 ({luck.daewun.pillar} {luck.daewun.god}운)</strong>
            <p className="luck-desc" style={{ marginTop: '5px', color: '#334155', lineHeight: '1.6' }}>{luck.daewun.desc}</p>
          </div>
          <div>
            <strong style={{ color: '#1e40af' }}>[세운] {luck.sewun.year}년 세운 ({luck.sewun.pillar} {luck.sewun.god}운)</strong>
            <p className="luck-desc" style={{ marginTop: '5px', color: '#334155', lineHeight: '1.6' }}>{luck.sewun.desc}</p>
          </div>
        </div>

        {/* 월별 상세 해설 */}
        <div style={{ marginTop: '20px', borderTop: '1px solid #bfdbfe', paddingTop: '15px' }}>
          <h5 style={{ color: '#1e40af', marginBottom: '10px', fontWeight: 'bold' }}>📅 월별 상세 해설</h5>
          <div className="monthly-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '12px',
            maxHeight: '400px',
            overflowY: 'auto',
            paddingRight: '5px'
          }}>
            {luck.monthlyLuck.map((ml, idx) => (
              <div key={idx} style={{ 
                padding: '12px', 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0',
                fontSize: '0.9rem'
              }}>
                <strong style={{ color: '#2563eb' }}>{ml.month}월 ({ml.pillar} {ml.god}운)</strong>
                <p style={{ marginTop: '4px', color: '#475569', lineHeight: '1.5' }}>{ml.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
        <button 
          className="reset-button"
          onClick={onReset}
          style={{ 
            padding: '15px 40px', 
            fontSize: '1.1rem', 
            fontWeight: 'bold', 
            color: 'white', 
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          새로운 사주입력
        </button>
      </div>

      <div style={{ marginTop: '30px', fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', padding: '10px' }}>
        ※ 위 해설은 고전 문헌의 내용을 바탕으로 한 인공지능 분석 결과입니다.
      </div>
    </div>
  );
}
