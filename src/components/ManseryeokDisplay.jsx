import { useState, useEffect, useRef } from 'react';
import { getTenGods, calculateDaewun, getTwelveStages, getShenshaMock, calculateInternationalAge } from '../utils/sajuLogic';
import { useLanguage } from '../contexts/LanguageContext';
import { translations, translateTenGods, translateTwelveStages } from '../utils/translations';

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

export default function ManseryeokDisplay({ sajuData, userInfo, selectedDaewunAge, onSelectDaewun, onShowCreatorInfo }) {
  const { language } = useLanguage();
  const t = translations[language];
  const activeDaewunRef = useRef(null);

  useEffect(() => {
    if (activeDaewunRef.current) {
      activeDaewunRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [userInfo.birthDate]);

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
  const formattedDateEn = `${userInfo.birthDate.substring(0,4)}.${userInfo.birthDate.substring(4,6)}.${userInfo.birthDate.substring(6,8)}`;
  const formattedTime = userInfo.knowTime && userInfo.birthTime ? `${userInfo.birthTime.substring(0,2)}:${userInfo.birthTime.substring(2,4)}` : '';

  // Calculate Ten Gods (Do not translate Saju terms as requested)
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
      <div className="profile-area" style={{ backgroundColor: 'var(--bg-color)', padding: '24px 20px', borderRadius: '24px', margin: '20px 20px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 auto' }}>
          <div>
            <div className="profile-name" style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {userInfo.name || t.unknown} <span style={{fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-secondary)'}}>{userInfo.gender === 'male' ? (language === 'ko' ? '남(乾命)' : 'Male') : (language === 'ko' ? '여(坤命)' : 'Female')}</span> ({t.age} {age}{t.ageSuffix})
            </div>
            <div className="profile-date" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              ({userInfo.calendarType === 'solar' ? t.solar : t.lunar}) {language === 'ko' ? formattedDate : formattedDateEn} {formattedTime}
            </div>
          </div>
        </div>
        <div 
          onClick={onShowCreatorInfo}
          title={t.creatorInfo}
          style={{ width: '28px', height: '28px', border: '1px solid var(--border-color)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '500', fontSize: '1rem', cursor: 'pointer', flexShrink: 0, transition: 'background-color 0.2s', backgroundColor: 'transparent', color: 'var(--text-secondary)' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-color)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          i
        </div>
      </div>

      {/* Main Saju Grid (Four Pillars) */}
      <div className="horizontal-scroll" style={{ width: '100%', padding: '0' }}>
        <table className="saju-table" style={{ minWidth: '350px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ borderRight: '1px solid var(--border-color)', paddingBottom: '8px' }}>{t.hourPillar}</th>
              <th style={{ borderRight: '1px solid var(--border-color)', paddingBottom: '8px' }}>{t.dayPillar}</th>
              <th style={{ borderRight: '1px solid var(--border-color)', paddingBottom: '8px' }}>{t.monthPillar}</th>
              <th style={{ paddingBottom: '8px' }}>{t.yearPillar}</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: 'var(--bg-color)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <td style={{ padding: '12px 5px', borderRight: '1px solid var(--border-color)' }}>{sajuData.hourPillar || t.unknown}<br/><span style={{color: 'var(--text-primary)'}}>{hourStemGod}</span></td>
              <td style={{ padding: '12px 5px', borderRight: '1px solid var(--border-color)' }}>{sajuData.dayPillar}<br/><span style={{color: 'var(--text-primary)', fontWeight: '600'}}>{t.dayMaster}</span></td>
              <td style={{ padding: '12px 5px', borderRight: '1px solid var(--border-color)' }}>{sajuData.monthPillar}<br/><span style={{color: 'var(--text-primary)'}}>{monthStemGod}</span></td>
              <td style={{ padding: '12px 5px' }}>{sajuData.yearPillar}<br/><span style={{color: 'var(--text-primary)'}}>{yearStemGod}</span></td>
            </tr>
            <tr>
              <td style={{ paddingTop: '15px' }}>{hourStem && <div className={`saju-box ${getElementClass(hourStem)}`}>{hourStem}</div>}</td>
              <td style={{ paddingTop: '15px' }}><div className={`saju-box ${getElementClass(dayStem)}`}>{dayStem}</div></td>
              <td style={{ paddingTop: '15px' }}><div className={`saju-box ${getElementClass(monthStem)}`}>{monthStem}</div></td>
              <td style={{ paddingTop: '15px' }}><div className={`saju-box ${getElementClass(yearStem)}`}>{yearStem}</div></td>
            </tr>
            <tr>
              <td>{hourBranch && <div className={`saju-box ${getElementClass(hourBranch)}`}>{hourBranch}</div>}</td>
              <td><div className={`saju-box ${getElementClass(dayBranch)}`}>{dayBranch}</div></td>
              <td><div className={`saju-box ${getElementClass(monthBranch)}`}>{monthBranch}</div></td>
              <td><div className={`saju-box ${getElementClass(yearBranch)}`}>{yearBranch}</div></td>
            </tr>
            <tr style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <td style={{ padding: '8px 0 15px' }}>{hourBranchGod}</td>
              <td style={{ padding: '8px 0 15px' }}>{dayBranchGod}</td>
              <td style={{ padding: '8px 0 15px' }}>{monthBranchGod}</td>
              <td style={{ padding: '8px 0 15px' }}>{yearBranchGod}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Daewun Header */}
      <div className="daewun-header" style={{ textAlign: 'center', margin: '15px 0 10px', fontSize: '1.1rem', fontWeight: 'bold', lineHeight: '1.5' }}>
        {t.age} ({t.daewunTitle} : 9 , {isForward ? (language === 'ko' ? '순행' : 'Forward') : (language === 'ko' ? '역행' : 'Reverse')})<br/>
        {language === 'ko' ? `첫대운: ${birthYear + 9}년 04월 14일경` : `First Daewun: Around Apr 14, ${birthYear + 9}`}
      </div>

      {/* Daewun Grid */}
      <div className="horizontal-scroll" style={{ padding: '0 5px' }}>
        <table className="saju-table" style={{ minWidth: '650px' }}>
          <thead>
            <tr style={{ fontSize: '0.9rem' }}>
              {daewunList.map((dw, idx) => (
                <th key={idx} 
                    onClick={() => onSelectDaewun(dw.age)}
                    ref={age >= dw.age && age < dw.age + 10 ? activeDaewunRef : null}
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
                  {getTenGods(dayStem, dw.branch)}<br/>{getTwelveStages(dayStem, dw.branch)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
