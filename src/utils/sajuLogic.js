export const stems = [
  { char: '甲', element: 0, yinYang: 1 },
  { char: '乙', element: 0, yinYang: 0 },
  { char: '丙', element: 1, yinYang: 1 },
  { char: '丁', element: 1, yinYang: 0 },
  { char: '戊', element: 2, yinYang: 1 },
  { char: '己', element: 2, yinYang: 0 },
  { char: '庚', element: 3, yinYang: 1 },
  { char: '辛', element: 3, yinYang: 0 },
  { char: '壬', element: 4, yinYang: 1 },
  { char: '癸', element: 4, yinYang: 0 },
];

export const branches = [
  { char: '子', element: 4, yinYang: 0 },
  { char: '丑', element: 2, yinYang: 0 },
  { char: '寅', element: 0, yinYang: 1 },
  { char: '卯', element: 0, yinYang: 0 },
  { char: '辰', element: 2, yinYang: 1 },
  { char: '巳', element: 1, yinYang: 1 },
  { char: '午', element: 1, yinYang: 0 },
  { char: '未', element: 2, yinYang: 0 },
  { char: '申', element: 3, yinYang: 1 },
  { char: '酉', element: 3, yinYang: 0 },
  { char: '戌', element: 2, yinYang: 1 },
  { char: '亥', element: 4, yinYang: 1 },
];

export const getCharInfo = (char) => {
  const stemInfo = stems.find(s => s.char === char);
  if (stemInfo) return { ...stemInfo, type: 'stem' };
  const branchInfo = branches.find(b => b.char === char);
  if (branchInfo) return { ...branchInfo, type: 'branch' };
  return null;
};

// 십성 계산 로직
export const getTenGods = (dayStemChar, targetChar) => {
  if (dayStemChar === targetChar) return '비견'; // 일간 자신은 표기법에 따라 다름, 외부에서는 '일간(나)'로 덮어씌움
  if (!dayStemChar || !targetChar) return '';
  
  const dayInfo = getCharInfo(dayStemChar);
  const targetInfo = getCharInfo(targetChar);
  
  if (!dayInfo || !targetInfo) return '';
  
  const diff = (targetInfo.element - dayInfo.element + 5) % 5;
  const sameYinYang = dayInfo.yinYang === targetInfo.yinYang;
  
  switch (diff) {
    case 0: return sameYinYang ? '비견' : '겁재';
    case 1: return sameYinYang ? '식신' : '상관';
    case 2: return sameYinYang ? '편재' : '정재';
    case 3: return sameYinYang ? '편관' : '정관';
    case 4: return sameYinYang ? '편인' : '정인';
    default: return '';
  }
};

// 60갑자
export const gapjaArray = [];
for (let i = 0; i < 60; i++) {
  gapjaArray.push(stems[i % 10].char + branches[i % 12].char);
}

// 대운 계산 (정확한 대운수는 입절일시로 계산해야 하나 여기서는 9로 임의 고정 처리, 방향만 계산)
export const calculateDaewun = (yearStemChar, monthPillar, gender) => {
  if (!yearStemChar || !monthPillar) return [];
  
  const yearInfo = getCharInfo(yearStemChar);
  if (!yearInfo) return [];
  
  const isYangYear = yearInfo.yinYang === 1;
  const isMale = gender === 'male';
  const isForward = (isYangYear && isMale) || (!isYangYear && !isMale);
  
  let monthIndex = gapjaArray.indexOf(monthPillar);
  if (monthIndex === -1) return [];
  
  const daewuns = [];
  // 110세 정도까지 커버하기 위해 11개 대운 생성
  for (let i = 1; i <= 11; i++) {
    monthIndex = isForward ? (monthIndex + 1) % 60 : (monthIndex - 1 + 60) % 60;
    const pillar = gapjaArray[monthIndex];
    daewuns.push({
      age: i * 10 - 1, // 대운수 임의 적용 (9, 19, 29...)
      pillar: pillar,
      stem: pillar[0],
      branch: pillar[1]
    });
  }
  return daewuns.reverse(); // 화면에 우측부터(큰나이->작은나이) 배치하기 위해 뒤집음
};

// 세운 계산 (특정 시작년도부터 10년치 계산)
export const calculateSewun = (startYear) => {
  const baseYear = 1984; // 갑자년
  const sewuns = [];
  for (let i = 9; i >= 0; i--) {
    const year = startYear + i;
    const diff = (year - baseYear) % 60;
    const index = diff >= 0 ? diff : diff + 60;
    const pillar = gapjaArray[index];
    sewuns.push({
      year: year,
      pillar: pillar,
      stem: pillar[0],
      branch: pillar[1]
    });
  }
  return sewuns;
};

// 월운 계산 (오호둔법 적용)
export const calculateWolun = (yearStemChar) => {
  if (!yearStemChar) return [];

  let startStemIdx = 0;
  if (['甲', '己'].includes(yearStemChar)) startStemIdx = 2;
  else if (['乙', '庚'].includes(yearStemChar)) startStemIdx = 4;
  else if (['丙', '辛'].includes(yearStemChar)) startStemIdx = 6;
  else if (['丁', '壬'].includes(yearStemChar)) startStemIdx = 8;
  else if (['戊', '癸'].includes(yearStemChar)) startStemIdx = 0;

  let currentStemIdx = startStemIdx;
  let currentBranchIdx = 2; // 인(寅)월부터

  const woluns = [];
  for (let month = 1; month <= 12; month++) {
    // 1월은 인월, 2월은 묘월에 매핑된다고 가정
    woluns.push({
      month: month,
      pillar: stems[currentStemIdx].char + branches[currentBranchIdx].char,
      stem: stems[currentStemIdx].char,
      branch: branches[currentBranchIdx].char
    });
    currentStemIdx = (currentStemIdx + 1) % 10;
    currentBranchIdx = (currentBranchIdx + 1) % 12;
  }
  
  return woluns;
};

export const getTwelveStagesMock = () => {
  const arr = ['건록', '관대', '목욕', '장생', '양', '태', '절', '묘', '사', '병', '쇠', '제왕'];
  return arr[0];
};

export const getJapyungInterpretation = (gyeokName) => {
  const japyungTexts = {
    '비견': '월지 비견은 건록격(建祿格)에 해당합니다. 자평진전에서는 "건록은 관성을 귀하게 여기며, 재성과 인성이 뒤를 받쳐주어야 성격(成格)된다"고 보았습니다. 본신의 기운이 매우 강하므로 스스로의 힘으로 가문을 일으킬 수 있는 자수성가형 명조입니다. 다만 관성이 없으면 기운이 흩어지기 쉬우니 사회적인 틀을 잘 활용해야 하며, 재성을 만날 때 비로소 큰 부를 이룰 수 있는 잠재력이 큽니다.',
    '겁재': '월지 겁재는 양인격(陽刃格) 또는 월겁격으로, 기운의 강렬함이 극치에 달한 명입니다. 자평진전에서는 "양인은 반드시 관성으로 제어하거나 상관으로 설기해야 대귀한다"고 강조했습니다. 성격이 매우 과단성 있고 강하며 추진력이 독보적입니다. 경쟁 사회에서 남다른 승부사 기질을 발휘하여 큰 조직의 수장이 되거나, 고난을 뚫고 성공하는 영웅적인 면모를 지니고 있습니다.',
    '식신': '식신격(食神格)은 4길신 중 으뜸으로, "재성을 생하거나 편관을 제어하는 공이 매우 크다"고 평합니다. 자평진전 관점에서는 일간이 강하고 식신이 수려할 때 이를 식신생재(食神生財)라 하여 평생 부유하고 안락한 삶을 보장받는 격으로 봅니다. 성품이 원만하고 창의적이며, 타인에게 베푸는 마음이 깊어 주변의 존경을 한 몸에 받는 복이 많은 사주입니다.',
    '상관': '상관격(傷官格)은 기운이 밖으로 뿜어져 나오는 수려함의 상징입니다. 자평진전에서는 "정관을 보면 화가 되나, 재성을 보거나 인성을 보면 귀하게 된다"고 하였습니다. 머리 회전이 매우 빠르고 예술적, 기술적 재능이 타의 추종을 불허합니다. 기존의 틀을 깨고 새로운 가치를 창출하는 혁신가적 기질이 강하며, 적절한 인성의 제어가 있다면 문학이나 예술 분야에서 이름을 널리 떨칠 대귀격입니다.',
    '편재': '편재격(偏財格)은 큰 재물과 넓은 무대를 다루는 통제력의 격입니다. 자평진전에서는 "재성은 일간이 강할 때 비로소 내 것이 된다"고 하여 신강함을 중시했습니다. 고정된 수입보다는 유동적인 큰 재물을 운용하는 능력이 탁월하며, 사회적 수완이 좋아 대인관계에서 이득을 취하는 기술이 뛰어납니다. 활동 범위가 전 세계를 무대로 할 만큼 넓고 호탕한 성격을 지니고 있습니다.',
    '정재': '정재격(正財格)은 가장 안정적이고 정당한 결실을 상징합니다. 자평진전에서는 "재성은 관성을 생하거나 식상의 생조를 받는 것을 좋아한다"고 보았습니다. 성실함과 꼼꼼함을 바탕으로 한 단계씩 자산을 쌓아 올리는 능력이 일품이며, 가정적이고 책임감이 강합니다. 일확천금보다는 확실한 결과를 추구하여 사회적으로 신용을 얻고, 노후가 매우 안정되고 평안한 전형적인 복록의 명입니다.',
    '편관': '편관격(偏官格)은 칠살격이라고도 하며, 다듬어지지 않은 원석과 같은 강력한 권위의 기운입니다. 자평진전에서는 "칠살은 제복(制伏)되면 대귀하고, 제복되지 않으면 흉이 된다"고 하하였습니다. 삶의 굴곡과 고난이 있을 수 있으나 이를 인내와 지략으로 극복해 낼 때 장군이나 고위 관직과 같은 강력한 리더십을 발휘하게 됩니다. 의리가 깊고 정의감이 투철하여 약자를 돕는 대장부 기질을 지닙니다.',
    '정관': '정관격(正官格)은 명리학에서 가장 귀하게 여기는 길격 중의 길격입니다. 자평진전에서는 "정관은 형충파해를 꺼리며, 재인(財印)이 보좌하면 만인이 우러러보는 지위에 오른다"고 보았습니다. 원칙과 도덕을 중시하며 사회적 규범 안에서 최고의 명예를 얻는 공직자나 지도자의 명입니다. 품위가 있고 단정하며, 합리적인 판단력으로 조직을 안정적으로 이끌어가는 능력이 탁월합니다.',
    '편인': '편인격(偏印格)은 남들이 보지 못하는 이면을 꿰뚫어 보는 통찰력과 기발한 지략의 격입니다. 자평진전에서는 "편인은 식신을 극하는 도식(倒食)을 경계해야 하나, 편재로 제어하면 오히려 큰 재능이 된다"고 보았습니다. 예술, 종교, 심리, 철학 등 특수 분야에서 독보적인 전문성을 발휘하며, 직관력이 예리하여 위기 상황에서 빛을 발하는 기획력과 아이디어가 매우 돋보이는 명입니다.',
    '정인': '정인격(正인格)은 학문과 자비, 그리고 윗사람의 덕을 상징하는 고결한 격입니다. 자평진전에서는 "정인은 관성을 만나 관인상생(官印상생)하는 것을 최상으로 치며, 평생 학덕을 쌓는다"고 하였습니다. 성품이 온화하고 지적 호기심이 강하며, 주변으로부터 끊임없는 도움과 지지를 받는 복이 있습니다. 교육자나 학자로서 명성을 쌓기에 적합하며, 정신적인 풍요로움이 가득한 삶을 영위하게 됩니다.'
  };

  const yeonhaeTexts = {
    '비견': '연해자평에서는 비견이 많은 자는 독립심이 강하고 동료와의 의리가 깊다고 보았습니다. 일상에서는 경쟁을 즐기며 자기 주관대로 일을 추진하는 힘이 강합니다. 특히 천월귀인이 임하면 주변의 시샘 속에서도 결국 자신의 자리를 지켜내는 굳건함이 돋보입니다. 성격은 다소 고집스러울 수 있으나 한 번 믿은 사람은 끝까지 책임지는 인간미가 있습니다.',
    '겁재': '연해자평의 관점에서 겁재는 투쟁과 쟁취의 기운입니다. "양인이 겹치면 성정이 강포할 수 있으나 큰 그릇을 채우는 힘이 된다"고 평했습니다. 남에게 지기 싫어하는 자존심이 성공의 원동력이 되며, 위기에 처했을 때 더욱 강해지는 면모를 보입니다. 재물의 출입이 잦으나 그만큼 베푸는 통도 커서 주변에 사람이 모이는 기질이 있습니다.',
    '식신': '연해자평에서 식신은 낙천성과 풍요를 상징합니다. "식신이 하나만 있고 잘 보존되면 평생 의식주 걱정이 없다"고 하였습니다. 미식가적인 기질이 있고 예술과 유희를 즐길 줄 아는 멋쟁이입니다. 성품이 원만하여 적을 만들지 않으며, 자녀 복이 많고 노년에 이를수록 삶의 질이 높아지는 평안한 운세를 타고났습니다.',
    '상관': '연해자평에서는 상관의 재능을 매우 높게 평가하면서도 구설수를 경계했습니다. "총명함이 세상에 드러나니 문장과 기술로 이름을 떨친다"고 하였습니다. 언변이 화려하고 임기응변에 능하여 어떤 어려운 질문에도 막힘이 없습니다. 다소 냉소적일 수 있으나 자신의 재능을 인정받을 때 최고의 성과를 내는 스타일로, 현대 사회에서 가장 빛나는 천재적 기질을 가졌습니다.',
    '편재': '연해자평에서 편재는 "천하의 재물을 논하는 호탕한 운"으로 묘사됩니다. 고향을 떠나 타지나 해외에서 자수성가하는 경우가 많으며, 재물을 다루는 감각이 타고났습니다. 대인관계에서 큰 손으로 통하며, 호기심이 많아 새로운 사업이나 모험에 주저함이 없습니다. 연애운도 화려하여 주변에 이성이 따르며 활동적인 삶을 즐깁니다.',
    '정재': '연해자평의 정재는 "성실과 신용의 화신"입니다. 정당하지 않은 이득은 쳐다보지도 않으며, 약속을 목숨처럼 아낍니다. 아내의 내조를 잘 받거나 남편으로서 책임을 다하는 가정적인 명입니다. 절약 정신이 투철하여 티끌 모아 태산을 이루는 끈기가 있으며, 중년 이후에는 반드시 지역 사회의 유지나 안정적인 자산가로 자리 잡게 되는 실속 있는 운입니다.',
    '편관': '연해자평에서 편관은 의리와 명예를 중시하는 카리스마의 상징입니다. "칠살이 칼을 차고 있는 것과 같으니 다스리면 영웅이요, 다스리지 못하면 화근이다"라고 하였습니다. 성격이 불같으나 뒤끝이 없고 약자의 고통을 외면하지 못하는 협객의 기질이 있습니다. 큰 어려움을 겪을수록 그 이름값이 높아지며, 사회 정의를 구현하는 분야에서 대성할 수 있는 기운입니다.',
    '정관': '연해자평의 정관은 품격 있는 귀족의 기운입니다. "정관은 단정한 복장을 하고 대궐에 서 있는 선비와 같다"고 표현했습니다. 원칙을 지키는 정직함이 최고의 자산이며, 부모의 명예를 드높이고 자손까지 번창하게 하는 힘이 있습니다. 사회적 지위가 안정적이며, 누구에게나 신뢰를 주는 성품 덕분에 큰 다툼 없이 순탄하게 부귀를 누리는 명입니다.',
    '편인': '연해자평에서 편인은 신비로움과 비범한 재주의 상징입니다. "한 가지 재주로 세상을 놀라게 하니 전문 기술이 남다르다"고 하였습니다. 직관력이 매우 뛰어나 남들이 보지 못하는 기회를 포착하는 능력이 일품입니다. 고독을 즐기며 사색에 잠기는 것을 좋아하고, 종교나 철학, 고차원적 예술 분야에서 일반인은 도저히 따라올 수 없는 깊은 경지를 보여주는 예술가적 혼이 있습니다.',
    '정인': '연해자평의 정인은 자비로운 어머니와 같은 따뜻한 인품을 상징합니다. "인성이 임하면 평생 학문에 힘쓰고 귀인의 도움을 받는다"고 하였습니다. 문서운이 매우 강력하여 부동산이나 저술 활동으로 큰 성과를 거두며, 정신적인 지도자로서 많은 이들의 귀감이 되는 품격 있는 삶을 삽니다.'
  };

  return {
    gyeok: gyeokName,
    japyung: japyungTexts[gyeokName] || '격국 분석을 진행 중입니다.',
    yeonhae: yeonhaeTexts[gyeokName] || '성향 분석을 진행 중입니다.'
  };
};

export const getInterpretation = (sajuData) => {
  const dayStem = sajuData.dayPillarHanja?.[0];
  const monthBranch = sajuData.monthPillarHanja?.[1];
  if (!dayStem || !monthBranch) return null;
  const gyeokName = getTenGods(dayStem, monthBranch);
  return getJapyungInterpretation(gyeokName);
};

export const getShenshaMock = () => {
  const arr = ['천을귀인', '문창귀인', '월덕귀인', '천덕귀인', '장성살', '역마살', '화개살', '도화살'];
  return arr[Math.floor(Math.random() * arr.length)];
};

export const calculateInternationalAge = (birthDateStr) => {
  if (!birthDateStr || birthDateStr.length !== 8) return 0;
  const birthYear = parseInt(birthDateStr.substring(0, 4));
  const birthMonth = parseInt(birthDateStr.substring(4, 6));
  const birthDay = parseInt(birthDateStr.substring(6, 8));

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  let age = currentYear - birthYear;
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }
  return age;
};

// 선택된 운세 해설 로직 (대운, 세운, 월운)
export const getCurrentLuckInterpretation = (sajuData, userInfo, targetYear) => {
  const dayStem = sajuData.dayPillarHanja?.[0];
  const yearStem = sajuData.yearPillarHanja?.[0];
  const birthYear = parseInt(userInfo.birthDate.substring(0, 4));
  const birthMonth = parseInt(userInfo.birthDate.substring(4, 6));
  const birthDay = parseInt(userInfo.birthDate.substring(6, 8));
  
  // 해당 연도의 생일 기준으로 만나이 계산
  let age = targetYear - birthYear;
  // targetYear의 생일이 지나지 않았으면 -1 (여기서는 단순 비교를 위해 월/일만 체크)
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  
  // 만약 targetYear가 현재 연도라면 실제 만나이 적용, 아니면 연도 차이만 적용 (또는 정밀 계산)
  if (targetYear === today.getFullYear()) {
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }
  }

  if (!dayStem || !yearStem) return null;

  // 1. 현재 대운 찾기
  const daewunList = calculateDaewun(yearStem, sajuData.monthPillarHanja, userInfo.gender);
  // daewunList는 [79, 69, ... 9] 순서임
  const currentDaewun = daewunList.find(dw => age >= dw.age) || daewunList[daewunList.length - 1];
  
  // 2. 선택된 세운 계산
  const baseYear = 1984; // 갑자년
  const diff = (targetYear - baseYear) % 60;
  const index = diff >= 0 ? diff : diff + 60;
  const sewunPillar = gapjaArray[index];
  const sewunStem = sewunPillar[0];

  // 3. 현재 월운(절운) 계산 - 실제 현재 월 기준이거나 연운의 전반적 흐름
  const allWoluns = calculateWolun(sewunStem); 
  
  const daewunGod = getTenGods(dayStem, currentDaewun.stem);
  const sewunGod = getTenGods(dayStem, sewunStem);

  const luckTexts = {
    '비견': '나의 주관과 독립심이 강해지는 시기입니다. 동료와의 협력이나 경쟁이 동시에 발생할 수 있습니다.',
    '겁재': '재물의 출입이 잦고 경쟁심이 극에 달하는 시기입니다. 지출 관리에 유의하되 과감한 추진력이 필요한 때입니다.',
    '식신': '의식주가 풍족해지고 새로운 아이디어가 샘솟는 시기입니다. 전문성을 키우거나 창작 활동에 길합니다.',
    '상관': '재능을 마음껏 발휘하나 구설수를 조심해야 합니다. 변화와 개혁의 기운이 강하게 들어옵니다.',
    '편재': '횡재수나 큰 규모의 사업적 기회가 따릅니다. 활동 범위가 넓어지고 대인관계가 활발해집니다.',
    '정재': '성실한 노력의 결실을 맺는 시기입니다. 안정적인 수입과 가정이 평안해지는 기운이 있습니다.',
    '편관': '책임감이 무겁고 스트레스가 있을 수 있으나, 이를 극복하면 명예와 권위가 크게 상승합니다.',
    '정관': '사회적으로 인정받고 지위가 안정되는 시기입니다. 시험 합격이나 승진 등의 경사가 따르며 안정적인 삶을 삽니다.',
    '편인': '직관력과 기획력이 돋보이는 시기입니다. 특수 분야의 공부나 기술 습득에 매우 유리합니다.',
    '정인': '문서운이 좋고 윗사람의 도움을 받는 시기입니다. 계약, 학업, 자격증 취득에 최적의 시기입니다.'
  };

  const monthlyLuck = allWoluns.map(w => {
    const god = getTenGods(dayStem, w.stem);
    return {
      month: w.month,
      pillar: w.pillar,
      god: god,
      desc: luckTexts[god] || '이달의 운세 흐름입니다.'
    };
  }); 

  return {
    daewun: {
      age: currentDaewun.age,
      pillar: currentDaewun.pillar,
      god: daewunGod,
      desc: luckTexts[daewunGod] || '장기적인 환경의 변화가 예상됩니다.'
    },
    sewun: {
      year: targetYear,
      pillar: sewunPillar,
      god: sewunGod,
      desc: luckTexts[sewunGod] || '올해의 주요 흐름을 나타냅니다.'
    },
    monthlyLuck: monthlyLuck
  };
};
