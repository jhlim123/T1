import { getInterpretation, getCurrentLuckInterpretation } from '../utils/sajuLogic';
import { getPersonalityAnalysis } from '../utils/personalityLogic';

export default function SajuInterpretation({ sajuData, userInfo, selectedSewunYear, onReset }) {
  if (!sajuData || !userInfo) return null;

  let interpretation = null;
  let luck = null;
  let personality = null;

  try { interpretation = getInterpretation(sajuData); } catch (e) { console.error('격국 해설 오류:', e); }
  try { luck = getCurrentLuckInterpretation(sajuData, userInfo, selectedSewunYear || new Date().getFullYear()); } catch (e) { console.error('운세 해설 오류:', e); }
  try { personality = getPersonalityAnalysis(sajuData); } catch (e) { console.error('성격 해설 오류:', e); }

  if (!interpretation && !luck && !personality) return null;

  return (
    <div className="interpretation-container" style={{ padding: '20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', paddingBottom: '60px' }}>
      <h3 className="section-title" style={{ fontSize: '1.3rem', fontWeight: 'bold', borderLeft: '5px solid #3b82f6', paddingLeft: '12px', marginBottom: '20px', color: '#1e293b' }}>
        사주 심층 해설
      </h3>

      {/* ① 성격 풀이 - 일간 + 월지 + 조후 */}
      {personality && (
        <div style={{ marginBottom: '20px', padding: '20px', background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', borderRadius: '16px', color: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.5rem' }}>🌟</span>
            <h4 style={{ fontWeight: 'bold', fontSize: '1.15rem', margin: 0 }}>나의 성격 풀이</h4>
            <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>
              {personality.keyword}
            </span>
          </div>
          <div style={{ marginBottom: '14px', padding: '14px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', borderLeft: '3px solid #60a5fa' }}>
            <div style={{ fontSize: '0.8rem', color: '#93c5fd', fontWeight: 'bold', marginBottom: '6px' }}>☯ 일간({personality.dayStem}) — 타고난 본성</div>
            <p style={{ margin: 0, lineHeight: '1.7', fontSize: '0.95rem', color: '#e2e8f0', wordBreak: 'keep-all' }}>{personality.core}</p>
          </div>
          <div style={{ marginBottom: '14px', padding: '14px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', borderLeft: '3px solid #34d399' }}>
            <div style={{ fontSize: '0.8rem', color: '#6ee7b7', fontWeight: 'bold', marginBottom: '6px' }}>🌿 월지({personality.monthBranch} · {personality.season}) — 사회적 성격</div>
            <p style={{ margin: 0, lineHeight: '1.7', fontSize: '0.95rem', color: '#e2e8f0', wordBreak: 'keep-all' }}>{personality.social}</p>
          </div>
          <div style={{ marginBottom: '14px', padding: '14px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', borderLeft: '3px solid #f59e0b' }}>
            <div style={{ fontSize: '0.8rem', color: '#fcd34d', fontWeight: 'bold', marginBottom: '6px' }}>🌤 조후(調候) — 계절의 기운 (궁통보감)</div>
            <p style={{ margin: 0, lineHeight: '1.7', fontSize: '0.95rem', color: '#e2e8f0', wordBreak: 'keep-all' }}>{personality.johu}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px', padding: '12px', background: 'rgba(96,165,250,0.15)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: '#93c5fd', fontWeight: 'bold', marginBottom: '6px' }}>✨ 핵심 강점</div>
              <ul style={{ margin: 0, paddingLeft: '16px', color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.8' }}>
                {personality.traits.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div style={{ flex: '1 1 200px', padding: '12px', background: 'rgba(251,113,133,0.15)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: '#fca5a5', fontWeight: 'bold', marginBottom: '6px' }}>🌒 그림자 (주의 성향)</div>
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.7', wordBreak: 'keep-all' }}>{personality.shadow}</p>
            </div>
          </div>
        </div>
      )}

      {/* ② 자평진전 해설 */}
      {interpretation && (
        <>
          <div className="interpretation-card" style={{ marginBottom: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
            <h4 style={{ color: '#2563eb', marginBottom: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}>
              <span style={{ marginRight: '8px' }}>📜</span> 자평진전(子平眞詮) 기준 격국론
            </h4>
            <p className="interpretation-text" style={{ lineHeight: '1.8', color: '#475569', fontSize: '1rem', wordBreak: 'keep-all' }}>
              <strong>[{interpretation.gyeok}격]</strong>: {interpretation.japyung}
            </p>
          </div>

          <div className="interpretation-card" style={{ marginBottom: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
            <h4 style={{ color: '#0891b2', marginBottom: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}>
              <span style={{ marginRight: '8px' }}>🌊</span> 연해자평(淵海子平) 기준 성정 및 운세
            </h4>
            <p className="interpretation-text" style={{ lineHeight: '1.8', color: '#475569', fontSize: '1rem', wordBreak: 'keep-all' }}>
              {interpretation.yeonhae}
            </p>
          </div>
        </>
      )}

      {/* ③ 운세 흐름 해설 (luck null 체크) */}
      {luck && luck.daewun && (
        <div className="luck-flow-card" style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
          <h4 style={{ color: '#1d4ed8', marginBottom: '15px', fontWeight: 'bold', fontSize: '1.1rem' }}>
            🔮 대운 해설 — {luck.daewun.age}세 ({luck.daewun.pillar} {luck.daewun.god}운)
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #dbeafe' }}>
              <strong style={{ color: '#2563eb', fontSize: '0.95rem' }}>📜 자평진전 관점</strong>
              <p className="luck-desc" style={{ marginTop: '6px', color: '#334155', lineHeight: '1.7', wordBreak: 'keep-all' }}>{luck.daewun.japyung}</p>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #dbeafe' }}>
              <strong style={{ color: '#0891b2', fontSize: '0.95rem' }}>🌊 연해자평 관점</strong>
              <p className="luck-desc" style={{ marginTop: '6px', color: '#334155', lineHeight: '1.7', wordBreak: 'keep-all' }}>{luck.daewun.yeonhae}</p>
            </div>
          </div>
        </div>
      )}

      {luck && luck.sewun && (
        <div className="luck-flow-card" style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
          <h4 style={{ color: '#15803d', marginBottom: '15px', fontWeight: 'bold', fontSize: '1.1rem' }}>
            📅 세운 해설 — {luck.sewun.year}년 ({luck.sewun.pillar} {luck.sewun.god}운)
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d1fae5' }}>
              <strong style={{ color: '#2563eb', fontSize: '0.95rem' }}>📜 자평진전 관점</strong>
              <p className="luck-desc" style={{ marginTop: '6px', color: '#334155', lineHeight: '1.7', wordBreak: 'keep-all' }}>{luck.sewun.japyung}</p>
            </div>
            <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d1fae5' }}>
              <strong style={{ color: '#0891b2', fontSize: '0.95rem' }}>🌊 연해자평 관점</strong>
              <p className="luck-desc" style={{ marginTop: '6px', color: '#334155', lineHeight: '1.7', wordBreak: 'keep-all' }}>{luck.sewun.yeonhae}</p>
            </div>
          </div>
        </div>
      )}

      {luck && luck.monthlyLuck && luck.monthlyLuck.length > 0 && (
        <div className="luck-flow-card" style={{ marginBottom: '25px', padding: '20px', backgroundColor: '#fefce8', borderRadius: '12px', border: '1px solid #fde68a' }}>
          <h4 style={{ color: '#a16207', marginBottom: '15px', fontWeight: 'bold', fontSize: '1.1rem' }}>
            🌙 절운(월운) 상세 해설
          </h4>
          <div className="monthly-grid" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto', paddingRight: '5px' }}>
            {luck.monthlyLuck.map((ml, idx) => (
              <div key={idx} style={{ padding: '12px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #fde68a' }}>
                <strong style={{ color: '#a16207', fontSize: '0.95rem' }}>{ml.month}월 ({ml.pillar} {ml.god}운)</strong>
                <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <p style={{ color: '#475569', lineHeight: '1.5', fontSize: '0.9rem', margin: 0 }}>
                    <span style={{ color: '#2563eb', fontWeight: 'bold' }}>📜</span> {ml.japyung}
                  </p>
                  <p style={{ color: '#475569', lineHeight: '1.5', fontSize: '0.9rem', margin: 0 }}>
                    <span style={{ color: '#0891b2', fontWeight: 'bold' }}>🌊</span> {ml.yeonhae}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
