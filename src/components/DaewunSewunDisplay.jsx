import { calculateSewun, calculateWolun, getTenGods, getTwelveStages, getShenshaMock } from '../utils/sajuLogic';

const getElementClass = (char) => {
  const wood = ['甲', '乙', '寅', '卯'];
  const fire = ['丙', '丁', '巳', '午'];
  const earth = ['戊', '己', '辰', '戌', '丑', '未'];
  const metal = ['庚', '辛', '申', '酉'];
  const water = ['壬', '癸', '亥', '子'];
  
  if (wood.includes(char)) return 'wood';
  if (fire.includes(char)) return 'fire';
  if (earth.includes(char)) return 'earth';
  if (metal.includes(char)) return 'metal';
  if (water.includes(char)) return 'water';
  return '';
};

export default function DaewunSewunDisplay({ sajuData, userInfo, selectedDaewunAge, selectedSewunYear, onSelectSewun }) {
  if (!sajuData || !userInfo) return null;

  const currentYear = new Date().getFullYear();
  const birthYear = parseInt(userInfo.birthDate.substring(0, 4)) || currentYear;
  
  // 대운이 선택되었을 때 보여줄 세운 리스트의 기준년도
  const sewunStartYear = selectedDaewunAge ? (birthYear + selectedDaewunAge) : (currentYear - 3);
  const sewunList = calculateSewun(sewunStartYear);
  
  // 선택된 세운 연도의 천간 찾기
  const targetSewun = sewunList.find(sw => sw.year === selectedSewunYear) || sewunList[sewunList.length - 1];
  const wolunList = [...calculateWolun(targetSewun?.stem || '甲')].reverse(); 
  
  const dayStem = sajuData.dayPillarHanja?.[0] || '';

  return (
    <div style={{ padding: '0 5px' }}>
      {/* Sewun Section */}
      <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '20px 0 15px' }}>
        세운 ({selectedDaewunAge ? `${selectedDaewunAge}세 대운` : '현재'})
      </div>
      <div className="horizontal-scroll" style={{ paddingBottom: '10px' }}>
        <table className="saju-table" style={{ minWidth: '650px' }}>
          <thead>
            <tr style={{ fontSize: '0.9rem' }}>
              {sewunList.map((sw, i) => (
                <th key={i} 
                    onClick={() => onSelectSewun(sw.year)}
                    style={{ 
                      cursor: 'pointer', 
                      backgroundColor: sw.year === selectedSewunYear ? '#ecfdf5' : 'transparent',
                      borderBottom: sw.year === selectedSewunYear ? '3px solid #10b981' : 'none'
                    }}>
                  {sw.year}<br/>{getTenGods(dayStem, sw.stem)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {sewunList.map((sw, i) => (
                <td key={i} 
                    onClick={() => onSelectSewun(sw.year)}
                    style={{ cursor: 'pointer', backgroundColor: sw.year === selectedSewunYear ? '#ecfdf5' : 'transparent' }}>
                  <div className={`saju-box ${getElementClass(sw.stem)}`}>{sw.stem}</div>
                </td>
              ))}
            </tr>
            <tr>
              {sewunList.map((sw, i) => (
                <td key={i} 
                    onClick={() => onSelectSewun(sw.year)}
                    style={{ cursor: 'pointer', backgroundColor: sw.year === selectedSewunYear ? '#ecfdf5' : 'transparent' }}>
                  <div className={`saju-box ${getElementClass(sw.branch)}`}>{sw.branch}</div>
                </td>
              ))}
            </tr>
            <tr style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.4' }}>
              {sewunList.map((sw, i) => (
                <td key={i} 
                    onClick={() => onSelectSewun(sw.year)}
                    style={{ paddingTop: '8px', cursor: 'pointer', backgroundColor: sw.year === selectedSewunYear ? '#ecfdf5' : 'transparent' }}>
                  {getTenGods(dayStem, sw.branch)}<br/>{getTwelveStages(dayStem, sw.branch)}<br/>{getShenshaMock()}<br/>{getShenshaMock()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <hr style={{ margin: '30px 20px', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      {/* Wolun Section */}
      <div style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '20px 0 15px' }}>
        {selectedSewunYear}년 월운
      </div>
      <div className="horizontal-scroll" style={{ paddingBottom: '10px' }}>
        <table className="saju-table" style={{ minWidth: '850px' }}>
          <thead>
            <tr style={{ fontSize: '0.9rem' }}>
              {wolunList.map((ww, i) => (
                <th key={i}>{ww.month}월<br/>{getTenGods(dayStem, ww.stem)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {wolunList.map((ww, i) => (
                <td key={i}><div className={`saju-box ${getElementClass(ww.stem)}`}>{ww.stem}</div></td>
              ))}
            </tr>
            <tr>
              {wolunList.map((ww, i) => (
                <td key={i}><div className={`saju-box ${getElementClass(ww.branch)}`}>{ww.branch}</div></td>
              ))}
            </tr>
            <tr style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.4' }}>
              {wolunList.map((ww, i) => (
                <td key={i} style={{ paddingTop: '8px' }}>
                  {getTenGods(dayStem, ww.branch)}<br/>{getTwelveStages(dayStem, ww.branch)}<br/>{getShenshaMock()}<br/>{getShenshaMock()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
