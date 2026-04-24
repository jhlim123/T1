import { useState } from 'react';
import SajuInputForm from './components/SajuInputForm';
import ManseryeokDisplay from './components/ManseryeokDisplay';
import DaewunSewunDisplay from './components/DaewunSewunDisplay';
import SajuInterpretation from './components/SajuInterpretation';
import { calculateSaju, lunarToSolar } from '@fullstackfamily/manseryeok';
import { calculateInternationalAge } from './utils/sajuLogic';
import './index.css';

function App() {
  const [sajuData, setSajuData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedDaewunAge, setSelectedDaewunAge] = useState(null);
  const [selectedSewunYear, setSelectedSewunYear] = useState(null);

  const handleLookup = (formData) => {
    if (!formData.birthDate || formData.birthDate.length !== 8) {
      alert("생년월일 8자리를 입력해주세요. (예: 19881230)");
      return;
    }
    
    let year = parseInt(formData.birthDate.substring(0, 4));
    let month = parseInt(formData.birthDate.substring(4, 6));
    let day = parseInt(formData.birthDate.substring(6, 8));
    
    if (formData.calendarType === 'lunar') {
      try {
        const result = lunarToSolar(year, month, day, formData.leapMonth === 'leap');
        year = result.solar.year;
        month = result.solar.month;
        day = result.solar.day;
      } catch {
        alert("유효하지 않은 음력 날짜입니다.");
        return;
      }
    }
    
    let hour = undefined;
    let minute = undefined;
    
    if (formData.knowTime && formData.birthTime && formData.birthTime.length >= 4) {
      hour = parseInt(formData.birthTime.substring(0, 2));
      minute = parseInt(formData.birthTime.substring(2, 4));
    } else if (!formData.knowTime && formData.birthBranch) {
      // 12지시에 따른 시간 설정 (중간값 기준)
      const branchTimeMap = {
        '자': { h: 0, m: 0 },
        '축': { h: 2, m: 0 },
        '인': { h: 4, m: 0 },
        '묘': { h: 6, m: 0 },
        '진': { h: 8, m: 0 },
        '사': { h: 10, m: 0 },
        '오': { h: 12, m: 0 },
        '미': { h: 14, m: 0 },
        '신': { h: 16, m: 0 },
        '유': { h: 18, m: 0 },
        '술': { h: 20, m: 0 },
        '해': { h: 22, m: 0 }
      };
      const time = branchTimeMap[formData.birthBranch];
      if (time) {
        hour = time.h;
        minute = time.m;
      }
    }

    try {
      const saju = calculateSaju(year, month, day, hour, minute);
      setSajuData(saju);
      
      const currentYear = new Date().getFullYear();
      const currentAge = calculateInternationalAge(formData.birthDate);
      
      // 초기 선택 대운을 현재 나이에 맞는 대운으로 설정 (대운수 9 기준 예시)
      const initialDaewun = Math.floor((currentAge - 9) / 10) * 10 + 9;
      const finalDaewun = initialDaewun < 9 ? 9 : initialDaewun;
      setSelectedDaewunAge(finalDaewun);
      setSelectedSewunYear(currentYear); // 처음엔 현재 연도 선택

      setUserInfo({ ...formData, solarYear: year, solarMonth: month, solarDay: day });
    } catch (e) {
      alert("사주 계산 중 오류가 발생했습니다: " + e.message);
    }
  };

  const handleSelectDaewun = (age) => {
    setSelectedDaewunAge(age);
    // 대운 선택 시 해당 대운의 시작 연도를 세운으로 자동 선택
    if (userInfo) {
      const birthYear = parseInt(userInfo.birthDate.substring(0, 4));
      setSelectedSewunYear(birthYear + age);
    }
  };

  const handleReset = () => {
    setSajuData(null);
    setUserInfo(null);
    setSelectedDaewunAge(null);
    setSelectedSewunYear(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <SajuInputForm onSubmit={handleLookup} />
      
      {sajuData && (
        <>
          <hr style={{ border: 'none', borderTop: '8px solid #f3f4f6', margin: '0' }} />
          <ManseryeokDisplay 
            sajuData={sajuData} 
            userInfo={userInfo} 
            selectedDaewunAge={selectedDaewunAge}
            onSelectDaewun={handleSelectDaewun}
          />
          <hr style={{ border: 'none', borderTop: '2px dashed #e5e7eb', margin: '20px' }} />
          <DaewunSewunDisplay 
            sajuData={sajuData} 
            userInfo={userInfo} 
            selectedDaewunAge={selectedDaewunAge}
            selectedSewunYear={selectedSewunYear}
            onSelectSewun={setSelectedSewunYear}
          />
          <SajuInterpretation 
            sajuData={sajuData} 
            userInfo={userInfo} 
            selectedSewunYear={selectedSewunYear}
            onReset={handleReset}
          />
        </>
      )}
    </div>
  );
}

export default App;
