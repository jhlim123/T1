import { useState } from 'react';

export default function SajuInputForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male');
  const [calendarType, setCalendarType] = useState('solar');
  const [leapMonth, setLeapMonth] = useState('normal');
  const [knowTime, setKnowTime] = useState(true);
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthBranch, setBirthBranch] = useState('');

  const branches = [
    { name: '자시 (23:30~01:30)', value: '자' },
    { name: '축시 (01:30~03:30)', value: '축' },
    { name: '인시 (03:30~05:30)', value: '인' },
    { name: '묘시 (05:30~07:30)', value: '묘' },
    { name: '진시 (07:30~09:30)', value: '진' },
    { name: '사시 (09:30~11:30)', value: '사' },
    { name: '오시 (11:30~13:30)', value: '오' },
    { name: '미시 (13:30~15:30)', value: '미' },
    { name: '신시 (15:30~17:30)', value: '신' },
    { name: '유시 (17:30~19:30)', value: '유' },
    { name: '술시 (19:30~21:30)', value: '술' },
    { name: '해시 (21:30~23:30)', value: '해' },
  ];

  const handleSubmit = () => {
    onSubmit({ name, gender, calendarType, leapMonth, knowTime, birthDate, birthTime, birthBranch });
  };

  return (
    <div className="saju-form-container" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>새로운 사주를 입력하세요</h2>
      </div>

      <div className="toggle-group" style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {/* Gender Toggle */}
        <div style={{ display: 'flex', background: '#e0e7ff', borderRadius: '20px', overflow: 'hidden', flex: '1 1 45%', minWidth: '120px' }}>
          <button onClick={() => setGender('male')} style={{ flex: 1, cursor: 'pointer', padding: '8px 12px', background: gender === 'male' ? 'white' : 'transparent', borderRadius: '20px', border: gender==='male'?'1px solid #6366f1':'none', color: '#111827', fontWeight: 'bold', fontSize: '0.9rem' }}>남자</button>
          <button onClick={() => setGender('female')} style={{ flex: 1, cursor: 'pointer', padding: '8px 12px', background: gender === 'female' ? '#6366f1' : 'transparent', borderRadius: '20px', border: gender==='female'?'1px solid #6366f1':'none', color: gender === 'female' ? 'white' : '#111827', fontWeight: 'bold', fontSize: '0.9rem' }}>여자</button>
        </div>

        {/* Calendar Toggle */}
        <div style={{ display: 'flex', background: '#ccfbf1', borderRadius: '20px', overflow: 'hidden', flex: '1 1 45%', minWidth: '120px' }}>
          <button onClick={() => setCalendarType('solar')} style={{ flex: 1, cursor: 'pointer', padding: '8px 12px', background: calendarType === 'solar' ? 'white' : 'transparent', borderRadius: '20px', border: calendarType==='solar'?'1px solid #14b8a6':'none', color: '#111827', fontWeight: 'bold', fontSize: '0.9rem' }}>양력</button>
          <button onClick={() => setCalendarType('lunar')} style={{ flex: 1, cursor: 'pointer', padding: '8px 12px', background: calendarType === 'lunar' ? '#14b8a6' : 'transparent', borderRadius: '20px', border: calendarType==='lunar'?'1px solid #14b8a6':'none', color: calendarType === 'lunar' ? 'white' : '#111827', fontWeight: 'bold', fontSize: '0.9rem' }}>음력</button>
        </div>

        {/* Leap Month Toggle */}
        <div style={{ display: 'flex', background: '#ffedd5', borderRadius: '20px', overflow: 'hidden', flex: '1 1 45%', minWidth: '120px' }}>
          <button onClick={() => setLeapMonth('normal')} style={{ flex: 1, cursor: 'pointer', padding: '8px 12px', background: leapMonth === 'normal' ? 'white' : 'transparent', borderRadius: '20px', border: leapMonth==='normal'?'1px solid #f59e0b':'none', color: '#111827', fontWeight: 'bold', fontSize: '0.9rem' }}>평달</button>
          <button onClick={() => setLeapMonth('leap')} style={{ flex: 1, cursor: 'pointer', padding: '8px 12px', background: leapMonth === 'leap' ? '#f59e0b' : 'transparent', borderRadius: '20px', border: leapMonth==='leap'?'1px solid #f59e0b':'none', color: leapMonth === 'leap' ? 'white' : '#111827', fontWeight: 'bold', fontSize: '0.9rem' }}>윤달</button>
        </div>
      </div>

      <div className="form-fields" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div className="form-row" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <label style={{ minWidth: '80px', fontSize: '1rem', fontWeight: 'bold' }}>이름 :</label>
          <input type="text" placeholder="홍길동" value={name} onChange={e => setName(e.target.value)} style={{ flex: '1 1 200px', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} />
        </div>
        <div className="form-row" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <label style={{ minWidth: '80px', fontSize: '1rem', fontWeight: 'bold' }}>생년월일 :</label>
          <input 
            type="text" 
            placeholder="19881230" 
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={{ flex: '1 1 200px', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} 
          />
        </div>
        <div className="form-row" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <label style={{ minWidth: '80px', fontSize: '1rem', fontWeight: 'bold' }}>출생시간 :</label>
          <div style={{ display: 'flex', flex: '1 1 200px', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {knowTime ? (
              <input type="text" placeholder="1459" value={birthTime} onChange={e => setBirthTime(e.target.value)} style={{ flex: '1 1 100px', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', background: 'white', outline: 'none' }} />
            ) : (
              <select value={birthBranch} onChange={e => setBirthBranch(e.target.value)} style={{ flex: '1 1 100px', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', background: 'white', outline: 'none' }}>
                <option value="">시간모름 (선택)</option>
                {branches.map(b => (
                  <option key={b.value} value={b.value}>{b.name}</option>
                ))}
              </select>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '80px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{knowTime ? '직접입력' : '12지시'}</span>
              <div onClick={() => { setKnowTime(!knowTime); }} style={{ width: '44px', height: '24px', background: '#3b82f6', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: '0.2s' }}>
                <div style={{ position: 'absolute', top: '2px', left: knowTime ? '22px' : '2px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', transition: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleSubmit}
          style={{
            marginTop: '10px',
            padding: '15px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
          }}>
          사주조회
        </button>
      </div>
    </div>
  );
}
