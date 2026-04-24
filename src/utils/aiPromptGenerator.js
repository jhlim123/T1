export const generateExpertPrompt = (sajuData, luckData) => {
  const dayStem = sajuData.dayPillarHanja?.[0] || 'O';
  const dayBranch = sajuData.dayPillarHanja?.[1] || 'O';
  const monthStem = sajuData.monthPillarHanja?.[0] || 'O';
  const monthBranch = sajuData.monthPillarHanja?.[1] || 'O';
  const yearStem = sajuData.yearPillarHanja?.[0] || 'O';
  const yearBranch = sajuData.yearPillarHanja?.[1] || 'O';
  const hourStem = sajuData.hourPillarHanja?.[0] || 'O';
  const hourBranch = sajuData.hourPillarHanja?.[1] || 'O';

  const wonguk = `[사주 원국]
시 일 월 년
${hourStem} ${dayStem} ${monthStem} ${yearStem}
${hourBranch} ${dayBranch} ${monthBranch} ${yearBranch}`;

  const dw = luckData.daewun;
  const sw = luckData.sewun;
  
  // 현재 월운을 가져오거나 기본으로 첫 번째 달을 사용
  const currentMonthIdx = new Date().getMonth();
  const mw = luckData.monthlyLuck.find(m => m.month === currentMonthIdx + 1) || luckData.monthlyLuck[0];

  return `명리학 전문가의 관점에서 다음 사주와 운세 흐름을 상세히 분석해 주십시오.

${wonguk}

[현재 운세 정보]
- 대운: ${dw.age}세 대운 ${dw.pillar} (${dw.god}, 12운성: ${dw.stage})
- 세운: ${sw.year}년 ${sw.pillar} (${sw.god}, 12운성: ${sw.stage})
- 절운: ${mw.month}월 ${mw.pillar} (${mw.god}, 12운성: ${mw.stage})

아래의 지침에 따라 상세하게 분석해 주십시오.

[대운 분석]
1. 현재 지나고 있는 '${dw.pillar}' 대운의 간지와 십성 정보를 바탕으로, 이 시기가 사주 원국에 가져오는 전반적인 운의 흐름과 환경 변화를 분석해 주십시오.
2. 제공된 대운의 십성(천간/지지)과 12운성 수치를 절대적 근거로 삼아, 이 시기에 나타날 사회적 성취 가능성과 심리적 변화를 심층 설명해 주십시오.
3. 이 대운 기간 동안의 직업 및 재물운, 그리고 건강과 대인관계를 포함한 개인적 삶의 영역에서 예상되는 주요 변화를 분석해 주십시오.
4. 명리학 전문가의 관점에서 이 시기에 반드시 잡아야 할 기회와, 특별히 주의하거나 보완해야 할 점을 구체적으로 조언해 주십시오.
5. 본 대운이 다음 대운으로 넘어가는 과정에서 이 사주가 가져야 할 마음가짐과 현실적인 행동 지침을 들려주십시오.

[세운 분석]
1. 세운 '${sw.pillar}' 정보를 바탕으로, 해당 해가 사주 원국 및 현재 대운과 상호작용하여 만들어내는 핵심 운의 흐름을 분석해 주십시오.
2. 제공된 세운의 십성과 12운성 기운을 절대적 근거로 하여, 직업, 재물, 대인관계, 건강 등 실생활 영역의 변화를 설명해 주십시오.
3. 해당 해 가장 주목해야 할 긍정적인 기회와 전문가적 관점에서 주의가 필요한 리스크를 짚어 주십시오.
4. 해당 해의 기운을 가장 현명하게 활용하기 위해 취해야 할 구체적인 태도와 행동 지침을 조언해 주십시오.

[절운(월운) 분석]
1. 월운 '${mw.pillar}' 간지와 십성, 12운성 정보를 바탕으로, 해당 달이 전체적인 세운 흐름 속에서 어떤 구체적인 변곡점이 되는지 분석해 주십시오.
2. 제공된 월운의 십성 기운을 절대적 기준으로 삼아, 해당 달 직업적 성과, 재물 흐름, 대인관계의 변화를 실질적인 관점에서 설명해 주십시오.
3. 해당 달에 특히 집중해야 할 긍정적인 기회와, 예기치 않게 발생할 수 있는 부정적인 변수를 관리하기 위한 현실적인 조언을 제시해 주십시오.
4. 해당 월의 12운성 기운이 시사하는 심리적 상태를 고려하여, 해당 한 달을 가장 후회 없이 보낼 수 있는 핵심 행동 지침을 들려주십시오.`;
};
