import { getTenGods, calculateDaewun, getTwelveStagesMock, getShenshaMock, calculateInternationalAge } from '../utils/sajuLogic';

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

export default function ManseryeokDisplay({ sajuData, userInfo, selectedDaewunAge, onSelectDaewun }) {
  if (!sajuData || !userInfo) return null;

  const yearStem = sajuData.yearPillarHanja?.[0] || '';
  const yearBranch = sajuData.yearPillarHanja?.[1] || '';
  const monthStem = sajuData.monthPillarHanja?.[0] || '';
  const monthBranch = sajuData.monthPillarHanja?.[1] || '';
  const dayStem = sajuData.dayPillarHanja?.[0] || '';
  const dayBranch = sajuData.dayPillarHanja?.[1] || '';
  const hourStem = sajuData.hourPillarHanja?.[0] || '';
  const hourBranch = sajuData.hourPillarHanja?.[1] || '';

  const currentYear = new Date().getFullYear();
  const birthYear = parseInt(userInfo.birthDate.substring(0, 4)) || currentYear;
  const age = calculateInternationalAge(userInfo.birthDate);

  const formattedDate = `${userInfo.birthDate.substring(0,4)}년${userInfo.birthDate.substring(4,6)}월${userInfo.birthDate.substring(6,8)}일`;
  const formattedTime = userInfo.knowTime && userInfo.birthTime ? `${userInfo.birthTime.substring(0,2)}:${userInfo.birthTime.substring(2,4)}` : '';

  // Calculate Ten Gods
  const yearStemGod = getTenGods(dayStem, yearStem);
  const yearBranchGod = getTenGods(dayStem, yearBranch);
  const monthStemGod = getTenGods(dayStem, monthStem);
  const monthBranchGod = getTenGods(dayStem, monthBranch);
  const hourStemGod = getTenGods(dayStem, hourStem);
  const hourBranchGod = getTenGods(dayStem, hourBranch);
  const dayBranchGod = getTenGods(dayStem, dayBranch);

  // Calculate Daewun
  const daewunList = calculateDaewun(yearStem, sajuData.monthPillarHanja, userInfo.gender);
  const yearInfo = ['甲','丙','戊','庚','壬'].includes(yearStem) ? 1 : 0;
  const isMale = userInfo.gender === 'male';
  const isForward = (yearInfo === 1 && isMale) || (yearInfo === 0 && !isMale);

  return (
    <div>
      {/* Header Profile Area */}
      <div style={{ backgroundColor: '#3b82f6', padding: '15px 20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '56px', height: '56px', backgroundColor: '#e5e7eb', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', border: '2px solid white' }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#fcd34d', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '40%', backgroundColor: '#fbbf24' }}></div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{userInfo.name || '이름없음'} (만 {age}세)</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              ({userInfo.calendarType === 'solar' ? '양력' : '음력'}) {formattedDate} {formattedTime}
            </div>
          </div>
        </div>
        <div style={{ width: '32px', height: '32px', border: '2px solid white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}>i</div>
      </div>

      {/* Main Saju Grid (Four Pillars) */}
      <div style={{ padding: '0' }}>
        <table className="saju-table">
          <thead>
            <tr style={{ backgroundColor: '#d1d5db', borderBottom: '2px solid white' }}>
              <th style={{ borderRight: '2px solid white' }}>시 주</th>
              <th style={{ borderRight: '2px solid white' }}>일 주</th>
              <th style={{ borderRight: '2px solid white' }}>월 주</th>
              <th>년 주</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: '#f3f4f6', fontSize: '0.9rem', borderBottom: '4px solid white' }}>
              <td style={{ padding: '8px 5px', borderRight: '2px solid white' }}>{sajuData.hourPillar || '모름'}<br/>{hourStemGod}</td>
              <td style={{ padding: '8px 5px', borderRight: '2px solid white' }}>{sajuData.dayPillar}<br/><span style={{color: '#3b82f6', fontWeight: 'bold'}}>일간(나)</span></td>
              <td style={{ padding: '8px 5px', borderRight: '2px solid white' }}>{sajuData.monthPillar}<br/>{monthStemGod}</td>
              <td style={{ padding: '8px 5px' }}>{sajuData.yearPillar}<br/>{yearStemGod}</td>
            </tr>
            <tr>
              <td>{hourStem && <div className={`saju-box ${getElementClass(hourStem)}`}>{hourStem}</div>}</td>
              <td><div className={`saju-box ${getElementClass(dayStem)}`}>{dayStem}</div></td>
              <td><div className={`saju-box ${getElementClass(monthStem)}`}>{monthStem}</div></td>
              <td><div className={`saju-box ${getElementClass(yearStem)}`}>{yearStem}</div></td>
            </tr>
            <tr>
              <td>{hourBranch && <div className={`saju-box ${getElementClass(hourBranch)}`}>{hourBranch}</div>}</td>
              <td><div className={`saju-box ${getElementClass(dayBranch)}`}>{dayBranch}</div></td>
              <td><div className={`saju-box ${getElementClass(monthBranch)}`}>{monthBranch}</div></td>
              <td><div className={`saju-box ${getElementClass(yearBranch)}`}>{yearBranch}</div></td>
            </tr>
            <tr style={{ fontSize: '0.9rem', color: '#4b5563' }}>
              <td style={{ padding: '8px 0 15px' }}>{hourBranchGod}</td>
              <td style={{ padding: '8px 0 15px' }}>{dayBranchGod}</td>
              <td style={{ padding: '8px 0 15px' }}>{monthBranchGod}</td>
              <td style={{ padding: '8px 0 15px' }}>{yearBranchGod}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Daewun Header */}
      <div style={{ textAlign: 'center', margin: '15px 0 10px', fontSize: '1.1rem', fontWeight: 'bold', lineHeight: '1.5' }}>
        만나이 (대운수 : 9 , {isForward ? '순행' : '역행'}) 생후9년2개월11일<br/>
        첫대운: {birthYear + 9}년 04월 14일경
      </div>

      {/* Daewun Grid */}
      <div className="horizontal-scroll" style={{ padding: '0 5px' }}>
        <table className="saju-table" style={{ minWidth: '650px' }}>
          <thead>
            <tr style={{ fontSize: '0.9rem' }}>
              {daewunList.map((dw, idx) => (
                <th key={idx} 
                    onClick={() => onSelectDaewun(dw.age)}
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: dw.age === selectedDaewunAge ? '#ebf5ff' : 'transparent',
                      borderBottom: dw.age === selectedDaewunAge ? '3px solid #3b82f6' : 'none'
                    }}>
                  {dw.age}<br/>{getTenGods(dayStem, dw.stem)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {daewunList.map((dw, idx) => (
                <td key={idx} 
                    onClick={() => onSelectDaewun(dw.age)}
                    style={{ cursor: 'pointer', backgroundColor: dw.age === selectedDaewunAge ? '#ebf5ff' : 'transparent' }}>
                  <div className={`saju-box ${getElementClass(dw.stem)}`}>{dw.stem}</div>
                </td>
              ))}
            </tr>
            <tr>
              {daewunList.map((dw, idx) => (
                <td key={idx} 
                    onClick={() => onSelectDaewun(dw.age)}
                    style={{ cursor: 'pointer', backgroundColor: dw.age === selectedDaewunAge ? '#ebf5ff' : 'transparent' }}>
                  <div className={`saju-box ${getElementClass(dw.branch)}`}>{dw.branch}</div>
                </td>
              ))}
            </tr>
            <tr style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.4' }}>
              {daewunList.map((dw, idx) => (
                <td key={idx} 
                    onClick={() => onSelectDaewun(dw.age)}
                    style={{ paddingTop: '8px', cursor: 'pointer', backgroundColor: dw.age === selectedDaewunAge ? '#ebf5ff' : 'transparent' }}>
                  {getTenGods(dayStem, dw.branch)}<br/>{getTwelveStagesMock()}<br/>{getShenshaMock()}<br/>{getShenshaMock()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
