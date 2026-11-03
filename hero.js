// 캐릭터 그림 (SVG). 성장 단계 1~10을 옷 단계(0~4)와 무기 단계로 나눠서 그림
// 홀수 단계에서 옷이 바뀌고, 짝수 단계에서 무기가 먼저 좋아짐. 10단계는 날개(또는 빛)
// 사람 직업은 떠돌이 거지에서 시작하고, 종족 직업(엘프·오우거 등)은 그 종족의 약한 모습(WEAK)에서 시작함
const SKIN = '#f2c9a0';
const BONE = '#ece6d6';
const HAIR = '#4a2c17';

const CLASSES = {
  warrior: { name: '전사', icon: '⚔️', color: '#e4572e',
    stages: ['떠돌이 거지', '녹슨 칼 주운 떠돌이', '견습 전사', '용병', '전사', '기사', '기사단장', '성기사', '검성', '전설의 검신'] },
  mage: { name: '마법사', icon: '🔮', color: '#8b5cf6',
    stages: ['떠돌이 거지', '지팡이 주운 떠돌이', '견습 마법사', '마법 학도', '마법사', '상급 마법사', '대마법사', '현자', '대현자', '전설의 마도왕'] },
  archer: { name: '궁수', icon: '🏹', color: '#22a35a',
    stages: ['떠돌이 거지', '활 주운 떠돌이', '견습 궁수', '사냥꾼', '레인저', '정예 레인저', '명사수', '숲의 수호자', '신궁', '전설의 바람궁수'] },
  rogue: { name: '도적', icon: '🗡️', color: '#64748b',
    stages: ['떠돌이 거지', '녹슨 단검 든 떠돌이', '좀도둑', '소매치기', '도적', '도적 두목', '암살자', '그림자 추적자', '그림자 군주', '전설의 그림자'] },
  pirate: { name: '해적', icon: '🏴‍☠️', color: '#1e88e5',
    stages: ['떠돌이 거지', '칼 주운 떠돌이', '견습 선원', '갑판장', '해적', '항해사', '해적 선장', '바다의 무법자', '해적 제독', '전설의 해적왕'] },
  elf: { name: '엘프', icon: '🧝', color: '#86efac',
    stages: ['어린 엘프', '나뭇가지 활 든 어린 엘프', '숲의 견습생', '엘프 방랑자', '엘프 정찰병', '엘프 마법궁수', '엘프 수호기사', '숲의 대현자', '엘프 군주', '전설의 하이엘프'] },
  ogre: { name: '오우거', icon: '👹', color: '#65a30d',
    stages: ['꼬마 오우거', '몽둥이 주운 꼬마 오우거', '덩치 큰 오우거', '오우거 싸움꾼', '오우거 전사', '오우거 파괴자', '오우거 족장', '오우거 대족장', '산악의 폭군', '전설의 오우거 왕'] },
  fairy: { name: '페어리', icon: '🧚', color: '#f472b6',
    stages: ['꽃봉오리 요정', '별 지팡이 주운 요정', '꽃잎 요정', '꽃의 정령', '페어리', '숲의 페어리', '달빛 페어리', '페어리 기사', '요정 여왕의 기사', '전설의 요정왕'] },
  centaur: { name: '켄타우로스', icon: '🐎', color: '#f59e0b',
    stages: ['어린 망아지', '창 주운 망아지', '반인반마 견습생', '초원의 방랑자', '켄타우로스 전사', '초원의 궁기병', '켄타우로스 대장', '별을 읽는 현자', '초원의 군주', '전설의 켄타우로스 왕'] },
  lich: { name: '리치', icon: '💀', color: '#22d3ee',
    stages: ['떠도는 해골', '낡은 책 주운 해골', '해골 견습 마법사', '해골 흑마법사', '강령술사', '언데드 강령술사', '리치', '고대 리치', '리치 군주', '전설의 불멸왕'] },
  skeleton: { name: '해골기사', icon: '☠️', color: '#cbd5e1',
    stages: ['덜그럭 해골', '뼈칼 주운 해골', '무덤 해골', '저주받은 해골', '해골 병사', '해골 기사', '망령 기사', '죽음의 기사', '해골 군단장', '전설의 망자 군주'] },
  dryad: { name: '드라이어드', icon: '🌿', color: '#bef264',
    stages: ['작은 새싹 정령', '새싹 지팡이 든 정령', '숲지기 견습생', '나무의 친구', '드라이어드', '꽃의 드라이어드', '고목의 수호자', '세계수의 무녀', '숲의 여왕', '전설의 세계수 정령'] },
  dwarf: { name: '드워프', icon: '⛏️', color: '#c2410c',
    stages: ['꼬마 드워프', '곡괭이 주운 꼬마 드워프', '광부 견습생', '광부', '드워프 대장장이', '드워프 전사', '룬 대장장이', '산의 수호자', '드워프 왕', '전설의 대지의 왕'] },
  berserker: { name: '광전사', icon: '🪓', color: '#b91c1c',
    stages: ['떠돌이 거지', '도끼 주운 떠돌이', '나무꾼', '투사', '광전사', '피의 광전사', '전쟁광', '분노의 화신', '광전사 대족장', '전설의 전쟁신'] },
  vampire: { name: '뱀파이어', icon: '🧛', color: '#be185d',
    stages: ['갓 깨어난 뱀파이어', '녹슨 검 주운 뱀파이어', '밤의 방랑자', '피에 굶주린 자', '뱀파이어', '뱀파이어 귀족', '뱀파이어 백작', '밤의 공작', '뱀파이어 군주', '전설의 진조'] },
  werewolf: { name: '늑대인간', icon: '🐺', color: '#a8a29e',
    stages: ['떠돌이 늑대 소년', '발톱 돋은 늑대 소년', '숲의 늑대 사냥꾼', '달빛 늑대', '늑대인간', '은빛 늑대인간', '달의 포식자', '무리의 우두머리', '늑대 군주', '전설의 달늑대'] },
  naga: { name: '나가', icon: '🐍', color: '#14b8a6',
    stages: ['어린 물뱀', '삼지창 주운 물뱀', '물가의 견습생', '비늘 돋은 자', '나가 전사', '나가 수호자', '바다뱀 기사', '심해의 무녀', '나가 왕의 검', '전설의 나가 왕'] },
  golem: { name: '골렘', icon: '🗿', color: '#eab308',
    stages: ['진흙 인형', '돌망치 든 진흙 인형', '진흙 골렘', '단단한 흙 골렘', '돌 골렘', '강철 골렘', '룬 골렘', '수정 골렘', '고대 골렘', '전설의 타이탄'] },
  blacksmith: { name: '대장장이', icon: '🔨', color: '#fb923c',
    stages: ['떠돌이 거지', '망치 주운 떠돌이', '대장간 심부름꾼', '견습 대장장이', '대장장이', '무기 장인', '갑옷 장인', '명장', '왕실 대장장이', '전설의 신기 장인'] },
  nomad: { name: '유목민', icon: '🏇', color: '#d4a373',
    stages: ['떠돌이 거지', '올가미 주운 떠돌이', '망아지 타는 목동', '초원의 목동', '유목 기마병', '초원의 궁기수', '유목 부족 전사', '기마 부족장', '대초원의 칸', '전설의 대칸'] },
  knight: { name: '중세기사', icon: '⚜️', color: '#94a3b8',
    stages: ['떠돌이 거지', '낡은 창 주운 떠돌이', '시동', '종자', '견습 기사', '중기병', '왕국 기사', '기사단 수호자', '왕의 기사', '전설의 성전 기사'] },
  reaper: { name: '사신', icon: '⚰️', color: '#7c3aed',
    stages: ['길 잃은 영혼', '낫 주운 영혼', '저승 심부름꾼', '견습 사신', '사신', '영혼 수확자', '저승의 집행자', '죽음의 그림자', '저승의 군주', '전설의 사신왕'] },
  duke: { name: '북부대공', icon: '❄️', color: '#93c5fd',
    stages: ['떠돌이 거지', '낡은 검 주운 떠돌이', '북부 견습 기사', '북부 기사', '설원의 기사단장', '국경의 수호자', '북부 백작', '북부 공작', '북부대공', '전설의 얼음 대공'] },
  monk: { name: '무도가', icon: '🥋', color: '#fb7185',
    stages: ['떠돌이 거지', '붕대 감은 떠돌이', '도장 수련생', '흰 띠 무도가', '검은 띠 무도가', '사범', '권법가', '무술 고수', '무신', '전설의 권왕'] },
  cleric: { name: '성직자', icon: '✝️', color: '#fde68a',
    stages: ['떠돌이 거지', '낡은 경전 주운 떠돌이', '수도원 견습생', '수도사', '사제', '치유 사제', '주교', '대주교', '성인', '전설의 대성인'] },
  bard: { name: '음유시인', icon: '🎻', color: '#e879f9',
    stages: ['떠돌이 거지', '낡은 피리 주운 떠돌이', '거리의 악사', '견습 음유시인', '음유시인', '궁정 악사', '이야기꾼', '명가수', '왕실 음유시인', '전설의 노래꾼'] },
  catfolk: { name: '고양이 수인', icon: '🐱', color: '#fca5a5',
    stages: ['길고양이 수인', '생선뼈 주운 고양이', '골목대장 고양이', '고양이 모험가', '고양이 검사', '날쌘 고양이 기사', '그림자 고양이', '은빛 고양이 영웅', '고양이 왕', '전설의 고양이 신'] },
  angel: { name: '천사', icon: '😇', color: '#bae6fd',
    stages: ['아기 천사', '나팔 주운 아기 천사', '견습 천사', '수호천사', '빛의 천사', '구름 위의 천사', '대천사', '치천사', '천사장', '전설의 대천사장'] },
  demon: { name: '악마', icon: '😈', color: '#ef4444',
    stages: ['꼬마 임프', '삼지창 주운 임프', '말썽꾸러기 악마', '하급 악마', '불꽃 악마', '악마 기사', '대악마', '지옥의 공작', '마계 군주', '전설의 마왕'] },
  slime: { name: '슬라임', icon: '🟢', color: '#4ade80',
    stages: ['아기 슬라임', '물방울 슬라임', '말랑 슬라임', '초록 슬라임', '큰 슬라임', '강철 슬라임', '황금 슬라임', '슬라임 기사', '슬라임 대장', '전설의 킹 슬라임'] },
};

// 직업별 단계 색상 [단계1, 단계2, 단계3, 단계4]
const PAL = {
  warrior: [
    { tunic: '#a0522d', pants: '#5d4037', sleeve: '#a0522d', belt: '#4e342e', trim: '#bcaaa4', boots: '#4e342e', armor: '#8d6e63' },
    { tunic: '#455a64', pants: '#37474f', sleeve: '#90a4ae', cape: '#9f1d1d', belt: '#3e2723', trim: '#cfd8dc', boots: '#263238', armor: '#b0bec5', helm: '#90a4ae' },
    { tunic: '#37474f', pants: '#263238', sleeve: '#cfd8dc', cape: '#c62828', belt: '#5d4037', trim: '#f1c40f', boots: '#212121', armor: '#eceff1', helm: '#cfd8dc' },
    { tunic: '#1a237e', pants: '#121858', sleeve: '#fff3c4', cape: '#b71c1c', belt: '#f1c40f', trim: '#f1c40f', boots: '#c9a00c', armor: '#fff3c4', helm: '#f1c40f' },
  ],
  mage: [
    { tunic: '#795548', sleeve: '#795548', trim: '#a1887f', hat: '#6d4c41', boots: '#4e342e' },
    { tunic: '#1e40af', sleeve: '#1e40af', trim: '#93c5fd', hat: '#1e3a8a', cape: '#172554', boots: '#1e293b' },
    { tunic: '#6b21a8', sleeve: '#6b21a8', trim: '#f1c40f', hat: '#581c87', cape: '#3b0764', boots: '#1e1b4b' },
    { tunic: '#1e1b4b', sleeve: '#1e1b4b', trim: '#f1c40f', hat: '#0f0a3c', cape: '#4c1d95', boots: '#f1c40f' },
  ],
  archer: [
    { tunic: '#689f38', pants: '#5d4037', sleeve: '#689f38', belt: '#4e342e', trim: '#c5e1a5', boots: '#5d4037' },
    { tunic: '#33691e', pants: '#4e342e', sleeve: '#33691e', belt: '#3e2723', trim: '#aed581', boots: '#3e2723', hood: '#2e7d32', cape: '#1b5e20' },
    { tunic: '#1b5e20', pants: '#3e2723', sleeve: '#2e7d32', belt: '#3e2723', trim: '#f1c40f', boots: '#212121', hood: '#2e7d32', cape: '#14532d' },
    { tunic: '#004d40', pants: '#263238', sleeve: '#00695c', belt: '#f1c40f', trim: '#f1c40f', boots: '#c9a00c', hood: '#00695c', cape: '#064e3b' },
  ],
  rogue: [
    { tunic: '#6d4c41', pants: '#4e342e', sleeve: '#6d4c41', belt: '#3e2723', trim: '#8d6e63', boots: '#3e2723' },
    { tunic: '#37474f', pants: '#263238', sleeve: '#37474f', belt: '#212121', trim: '#90a4ae', boots: '#212121', hood: '#263238', cape: '#1f2937' },
    { tunic: '#212121', pants: '#111', sleeve: '#2b2b2b', belt: '#111', trim: '#c62828', boots: '#111', hood: '#1f1f1f', cape: '#111827' },
    { tunic: '#1a1a2e', pants: '#0f0f1e', sleeve: '#1a1a2e', belt: '#4c1d95', trim: '#a78bfa', boots: '#0f0f1e', hood: '#2e1065', cape: '#1e1b4b' },
  ],
  pirate: [
    { tunic: '#eeeeee', pants: '#5d4037', sleeve: '#eeeeee', belt: '#c62828', trim: '#795548', boots: '#4e342e', vest: '#795548' },
    { tunic: '#eeeeee', pants: '#3e2723', sleeve: '#eeeeee', belt: '#c62828', trim: '#4e342e', boots: '#212121', vest: '#4e342e', cape: '#3e2723' },
    { tunic: '#eeeeee', pants: '#212121', sleeve: '#7f0000', belt: '#c62828', trim: '#f1c40f', boots: '#111', vest: '#7f0000', cape: '#4a0000' },
    { tunic: '#eeeeee', pants: '#111', sleeve: '#1a237e', belt: '#c62828', trim: '#f1c40f', boots: '#111', vest: '#1a237e', cape: '#0d1442' },
  ],
  elf: [
    { tunic: '#4d7c0f', pants: '#3f3f2f', sleeve: '#65a30d', belt: '#78350f', trim: '#d9f99d', boots: '#78350f' },
    { tunic: '#166534', pants: '#3f3f46', sleeve: '#15803d', belt: '#713f12', trim: '#e5e7eb', boots: '#44403c', cape: '#14532d' },
    { tunic: '#f0fdf4', pants: '#166534', sleeve: '#dcfce7', belt: '#ca8a04', trim: '#facc15', boots: '#14532d', cape: '#15803d' },
    { tunic: '#ffffff', pants: '#e5e7eb', sleeve: '#f8fafc', belt: '#facc15', trim: '#facc15', boots: '#facc15', cape: '#6ee7b7' },
  ],
  ogre: [
    { tunic: '#795548', pants: '#5d4037', sleeve: '#d4b98e', belt: '#3e2723', trim: '#a1887f', boots: '#4e342e' },
    { tunic: '#5d4037', pants: '#4e342e', sleeve: '#aab36a', belt: '#3e2723', trim: '#d7ccc8', boots: '#3e2723', cape: '#6d4c41' },
    { tunic: '#4e342e', pants: '#3e2723', sleeve: '#8ba24f', belt: '#212121', trim: '#bdbdbd', boots: '#212121', cape: '#7f1d1d' },
    { tunic: '#3e2723', pants: '#212121', sleeve: '#6d8a3a', belt: '#facc15', trim: '#facc15', boots: '#111', cape: '#991b1b' },
  ],
  fairy: [
    { tunic: '#f9a8d4', sleeve: '#f9a8d4', trim: '#fce7f3', boots: '#be185d', wing: '#fbcfe8' },
    { tunic: '#f472b6', sleeve: '#f472b6', trim: '#fdf2f8', boots: '#9d174d', wing: '#c4b5fd' },
    { tunic: '#c084fc', sleeve: '#e9d5ff', trim: '#fde68a', boots: '#6b21a8', wing: '#a5f3fc' },
    { tunic: '#fdf4ff', sleeve: '#fdf4ff', trim: '#facc15', boots: '#facc15', wing: '#fde68a' },
  ],
  centaur: [
    { tunic: '#a16207', sleeve: '#a16207', belt: '#713f12', trim: '#fde68a', coat: '#8b5a2b', coat2: '#6b4423' },
    { tunic: '#92400e', sleeve: '#92400e', belt: '#451a03', trim: '#fcd34d', coat: '#7c4a1e', coat2: '#5c3515', cape: '#b45309' },
    { tunic: '#e7e5e4', sleeve: '#d6d3d1', belt: '#b45309', trim: '#f59e0b', coat: '#e7e5e4', coat2: '#a8a29e', cape: '#b45309', barding: '#b45309' },
    { tunic: '#fef3c7', sleeve: '#fde68a', belt: '#facc15', trim: '#facc15', coat: '#f5f5f4', coat2: '#d6d3d1', cape: '#f59e0b', barding: '#1e3a8a' },
  ],
  lich: [
    { tunic: '#3f3f46', sleeve: '#3f3f46', trim: '#71717a', hood: '#27272a', boots: '#18181b' },
    { tunic: '#1e1b4b', sleeve: '#1e1b4b', trim: '#5eead4', hood: '#1e1b4b', boots: '#0f0f1e', cape: '#0f172a' },
    { tunic: '#042f2e', sleeve: '#134e4a', trim: '#5eead4', boots: '#020617', cape: '#020617' },
    { tunic: '#0f0f1e', sleeve: '#1e1b4b', trim: '#facc15', boots: '#facc15', cape: '#3b0764' },
  ],
  skeleton: [
    { tunic: '#57534e', pants: '#44403c', sleeve: '#57534e', belt: '#292524', trim: '#a8a29e', boots: '#292524', armor: '#78716c' },
    { tunic: '#3f3f46', pants: '#27272a', sleeve: '#52525b', belt: '#18181b', trim: '#a1a1aa', boots: '#18181b', armor: '#71717a', helm: '#71717a', cape: '#3f3f46' },
    { tunic: '#18181b', pants: '#09090b', sleeve: '#27272a', belt: '#7f1d1d', trim: '#7dd3fc', boots: '#09090b', armor: '#3f3f46', helm: '#3f3f46', cape: '#1e1b4b' },
    { tunic: '#0c0a09', pants: '#000', sleeve: '#1c1917', belt: '#facc15', trim: '#38bdf8', boots: '#0c0a09', armor: '#1e293b', helm: '#1e293b', cape: '#172554' },
  ],
  dryad: [
    { tunic: '#84cc16', sleeve: '#84cc16', trim: '#d9f99d', boots: '#3f6212' },
    { tunic: '#4d7c0f', sleeve: '#65a30d', trim: '#f9a8d4', boots: '#365314', cape: '#3f6212' },
    { tunic: '#166534', sleeve: '#15803d', trim: '#fbcfe8', boots: '#14532d', cape: '#14532d' },
    { tunic: '#065f46', sleeve: '#047857', trim: '#fde68a', boots: '#78350f', cape: '#064e3b' },
  ],
  dwarf: [
    { tunic: '#78716c', pants: '#57534e', sleeve: '#78716c', belt: '#44403c', trim: '#a8a29e', boots: '#44403c', apron: '#92400e' },
    { tunic: '#7c2d12', pants: '#44403c', sleeve: '#9a3412', belt: '#292524', trim: '#d6d3d1', boots: '#292524', apron: '#78350f', helm: '#9ca3af' },
    { tunic: '#9ca3af', pants: '#44403c', sleeve: '#6b7280', belt: '#78350f', trim: '#facc15', boots: '#1c1917', helm: '#d1d5db', cape: '#7f1d1d' },
    { tunic: '#e5e7eb', pants: '#1c1917', sleeve: '#9ca3af', belt: '#facc15', trim: '#facc15', boots: '#facc15', helm: '#facc15', cape: '#1e3a8a' },
  ],
  berserker: [
    { tunic: '#efc196', pants: '#57534e', sleeve: '#efc196', belt: '#44403c', trim: '#78716c', boots: '#44403c', fur: '#a8a29e' },
    { tunic: '#e8b386', pants: '#44403c', sleeve: '#e8b386', belt: '#292524', trim: '#a8a29e', boots: '#292524', fur: '#78716c', cape: '#57534e' },
    { tunic: '#e0a878', pants: '#292524', sleeve: '#e0a878', belt: '#7f1d1d', trim: '#d6d3d1', boots: '#1c1917', fur: '#e7e5e4', cape: '#7f1d1d', helm: '#9ca3af' },
    { tunic: '#d89c6c', pants: '#1c1917', sleeve: '#d89c6c', belt: '#facc15', trim: '#facc15', boots: '#1c1917', fur: '#fafaf9', cape: '#991b1b', helm: '#facc15' },
  ],
  vampire: [
    { tunic: '#e5e7eb', pants: '#27272a', sleeve: '#3f3f46', belt: '#18181b', trim: '#9f1239', boots: '#18181b', vest: '#3f3f46', cape: '#18181b', lining: '#7f1d1d' },
    { tunic: '#f5f5f5', pants: '#18181b', sleeve: '#27272a', belt: '#0a0a0a', trim: '#be123c', boots: '#0a0a0a', vest: '#4c0519', cape: '#0a0a0a', lining: '#9f1239' },
    { tunic: '#fafafa', pants: '#0a0a0a', sleeve: '#4c0519', belt: '#0a0a0a', trim: '#facc15', boots: '#0a0a0a', vest: '#881337', cape: '#0a0a0a', lining: '#be123c' },
    { tunic: '#fafafa', pants: '#000', sleeve: '#0a0a0a', belt: '#facc15', trim: '#facc15', boots: '#0a0a0a', vest: '#1c1917', cape: '#000', lining: '#e11d48' },
  ],
  werewolf: [
    { tunic: '#7c5c3e', pants: '#4b3a2a', sleeve: '#7a6a5e', belt: '#3b2a1a', trim: '#a8a29e', boots: '#3b2a1a', muzzle: '#c8bfb5' },
    { tunic: '#57534e', pants: '#3f3a36', sleeve: '#8d8178', belt: '#292524', trim: '#d6d3d1', boots: '#8d8178', muzzle: '#d6cfc7' },
    { tunic: '#44403c', pants: '#292524', sleeve: '#b8b2ab', belt: '#1c1917', trim: '#e7e5e4', boots: '#b8b2ab', muzzle: '#f5f5f4', cape: '#1c1917' },
    { tunic: '#1e293b', pants: '#0f172a', sleeve: '#e7e5e4', belt: '#cbd5e1', trim: '#e0f2fe', boots: '#e7e5e4', muzzle: '#ffffff', cape: '#0f172a' },
  ],
  naga: [
    { tunic: '#0f766e', sleeve: '#0f766e', belt: '#134e4a', trim: '#99f6e4', scale: '#5eaa8f', belly: '#e7d9a8', fin: '#2dd4bf' },
    { tunic: '#115e59', sleeve: '#14b8a6', belt: '#042f2e', trim: '#ccfbf1', scale: '#0d9488', belly: '#d9f99d', fin: '#2dd4bf', hood: '#0f766e' },
    { tunic: '#134e4a', sleeve: '#0f766e', belt: '#facc15', trim: '#facc15', scale: '#0f766e', belly: '#fde68a', fin: '#5eead4', hood: '#115e59', cape: '#042f2e' },
    { tunic: '#1e3a8a', sleeve: '#1e40af', belt: '#facc15', trim: '#facc15', scale: '#1d4ed8', belly: '#fde68a', fin: '#93c5fd', hood: '#1e3a8a', cape: '#172554' },
  ],
  golem: [
    { tunic: '#8d7b68', pants: '#6b5d4f', sleeve: '#c9b9a6', belt: '#4b3f33', trim: '#a8a29e', boots: '#57534e' },
    { tunic: '#78716c', pants: '#57534e', sleeve: '#a8a29e', belt: '#44403c', trim: '#7dd3fc', boots: '#57534e' },
    { tunic: '#64748b', pants: '#475569', sleeve: '#94a3b8', belt: '#334155', trim: '#38bdf8', boots: '#475569' },
    { tunic: '#7dd3fc', pants: '#38bdf8', sleeve: '#bae6fd', belt: '#0ea5e9', trim: '#f0f9ff', boots: '#0284c7' },
  ],
  blacksmith: [
    { tunic: '#a1887f', pants: '#5d4037', sleeve: SKIN, belt: '#3e2723', trim: '#bcaaa4', boots: '#3e2723', apron: '#6d4c41' },
    { tunic: '#8d6e63', pants: '#4e342e', sleeve: SKIN, belt: '#3e2723', trim: '#d7ccc8', boots: '#3e2723', apron: '#5d4037' },
    { tunic: '#455a64', pants: '#37474f', sleeve: SKIN, belt: '#212121', trim: '#ff9800', boots: '#212121', apron: '#4e342e', cape: '#bf360c' },
    { tunic: '#263238', pants: '#1c1917', sleeve: SKIN, belt: '#facc15', trim: '#facc15', boots: '#facc15', apron: '#3e2723', cape: '#b71c1c' },
  ],
  nomad: [
    { tunic: '#b45309', pants: '#57534e', sleeve: '#b45309', belt: '#facc15', trim: '#fde68a', boots: '#78350f', coat: '#8b5a2b', coat2: '#6b4423', mane: '#3b2412' },
    { tunic: '#1d4ed8', pants: '#44403c', sleeve: '#1d4ed8', belt: '#f59e0b', trim: '#fcd34d', boots: '#78350f', coat: '#a16207', coat2: '#713f12', mane: '#292524', cape: '#7c2d12' },
    { tunic: '#7f1d1d', pants: '#292524', sleeve: '#991b1b', belt: '#facc15', trim: '#facc15', boots: '#451a03', coat: '#f5f5f4', coat2: '#a8a29e', mane: '#e7e5e4', cape: '#78350f', barding: '#1d4ed8' },
    { tunic: '#1e3a8a', pants: '#172554', sleeve: '#1e40af', belt: '#facc15', trim: '#facc15', boots: '#facc15', coat: '#1c1917', coat2: '#0c0a09', mane: '#facc15', cape: '#b91c1c', barding: '#facc15' },
  ],
  knight: [
    { tunic: '#a8a29e', pants: '#57534e', sleeve: '#a8a29e', belt: '#44403c', trim: '#d6d3d1', boots: '#44403c', helm: '#78716c' },
    { tunic: '#9ca3af', pants: '#4b5563', sleeve: '#9ca3af', belt: '#7c2d12', trim: '#dc2626', boots: '#374151', helm: '#9ca3af', tabard: '#f5f5f4', cape: '#7f1d1d' },
    { tunic: '#cbd5e1', pants: '#94a3b8', sleeve: '#cbd5e1', belt: '#1e3a8a', trim: '#1d4ed8', boots: '#64748b', helm: '#e2e8f0', tabard: '#1e3a8a', cape: '#1e3a8a', armor: '#e2e8f0' },
    { tunic: '#f1f5f9', pants: '#cbd5e1', sleeve: '#f1f5f9', belt: '#facc15', trim: '#facc15', boots: '#facc15', helm: '#f8fafc', tabard: '#b91c1c', cape: '#b91c1c', armor: '#f8fafc' },
  ],
  duke: [
    { tunic: '#334155', pants: '#1e293b', sleeve: '#334155', belt: '#0f172a', trim: '#cbd5e1', boots: '#0f172a', fur: '#e2e8f0' },
    { tunic: '#1e293b', pants: '#0f172a', sleeve: '#1e293b', belt: '#0f172a', trim: '#e2e8f0', boots: '#020617', fur: '#f1f5f9', cape: '#0f172a' },
    { tunic: '#0f172a', pants: '#020617', sleeve: '#0f172a', belt: '#1e3a8a', trim: '#93c5fd', boots: '#020617', fur: '#ffffff', cape: '#111827' },
    { tunic: '#020617', pants: '#000', sleeve: '#0b1220', belt: '#facc15', trim: '#facc15', boots: '#000', fur: '#ffffff', cape: '#0c1a3a' },
  ],
  monk: [
    { tunic: '#f5f5f4', pants: '#f5f5f4', sleeve: '#f5f5f4', belt: '#f5f5f4', trim: '#d6d3d1', boots: SKIN },
    { tunic: '#fafaf9', pants: '#fafaf9', sleeve: '#fafaf9', belt: '#1c1917', trim: '#a8a29e', boots: SKIN },
    { tunic: '#1c1917', pants: '#1c1917', sleeve: '#1c1917', belt: '#b91c1c', trim: '#fca5a5', boots: SKIN, cape: '#7f1d1d' },
    { tunic: '#7c2d12', pants: '#431407', sleeve: '#7c2d12', belt: '#facc15', trim: '#facc15', boots: SKIN, cape: '#b45309' },
  ],
  cleric: [
    { tunic: '#a8a29e', sleeve: '#a8a29e', trim: '#78716c', boots: '#57534e', hood: '#78716c' },
    { tunic: '#f5f5f4', sleeve: '#f5f5f4', trim: '#a16207', boots: '#78716c' },
    { tunic: '#ffffff', sleeve: '#ffffff', trim: '#ca8a04', boots: '#a16207', cape: '#7f1d1d', hat: '#ffffff' },
    { tunic: '#fffbeb', sleeve: '#fffbeb', trim: '#facc15', boots: '#facc15', cape: '#b91c1c', hat: '#facc15' },
  ],
  bard: [
    { tunic: '#16a34a', pants: '#78350f', sleeve: '#fde68a', belt: '#78350f', trim: '#fde68a', boots: '#78350f', hat: '#15803d', vest: '#166534' },
    { tunic: '#2563eb', pants: '#1e3a8a', sleeve: '#fef3c7', belt: '#78350f', trim: '#fbbf24', boots: '#451a03', hat: '#1d4ed8', vest: '#1e40af', cape: '#7c3aed' },
    { tunic: '#9333ea', pants: '#3b0764', sleeve: '#fdf4ff', belt: '#facc15', trim: '#facc15', boots: '#3b0764', hat: '#7e22ce', vest: '#6b21a8', cape: '#be185d' },
    { tunic: '#be185d', pants: '#500724', sleeve: '#fff1f2', belt: '#facc15', trim: '#facc15', boots: '#facc15', hat: '#9d174d', vest: '#831843', cape: '#4c1d95' },
  ],
  catfolk: [
    { tunic: '#a16207', pants: '#57534e', sleeve: '#a16207', belt: '#451a03', trim: '#fde68a', boots: '#451a03' },
    { tunic: '#0f766e', pants: '#44403c', sleeve: '#0f766e', belt: '#292524', trim: '#fcd34d', boots: '#78350f', cape: '#7f1d1d' },
    { tunic: '#1f2937', pants: '#111827', sleeve: '#1f2937', belt: '#b91c1c', trim: '#facc15', boots: '#78350f', cape: '#991b1b' },
    { tunic: '#1e3a8a', pants: '#0f172a', sleeve: '#1e3a8a', belt: '#facc15', trim: '#facc15', boots: '#a16207', cape: '#b91c1c' },
  ],
  angel: [
    { tunic: '#f8fafc', sleeve: '#f8fafc', trim: '#bae6fd', boots: '#e2e8f0', wing: '#ffffff' },
    { tunic: '#ffffff', sleeve: '#ffffff', trim: '#fde68a', boots: '#fde68a', wing: '#ffffff', cape: '#bae6fd' },
    { tunic: '#ffffff', sleeve: '#f0f9ff', trim: '#facc15', boots: '#facc15', wing: '#ffffff', cape: '#93c5fd' },
    { tunic: '#fffbeb', sleeve: '#fffbeb', trim: '#facc15', boots: '#facc15', wing: '#fffbeb', cape: '#fde68a' },
  ],
  demon: [
    { tunic: '#3f3f46', pants: '#27272a', sleeve: '#3f3f46', belt: '#18181b', trim: '#ef4444', boots: '#18181b' },
    { tunic: '#1c1917', pants: '#0c0a09', sleeve: '#292524', belt: '#450a0a', trim: '#f97316', boots: '#0c0a09', cape: '#450a0a' },
    { tunic: '#0c0a09', pants: '#000', sleeve: '#1c1917', belt: '#7f1d1d', trim: '#facc15', boots: '#000', cape: '#7f1d1d', armor: '#27272a' },
    { tunic: '#000', pants: '#000', sleeve: '#0c0a09', belt: '#facc15', trim: '#facc15', boots: '#facc15', cape: '#4c0519', armor: '#18181b' },
  ],
  reaper: [
    { tunic: '#292524', sleeve: '#292524', trim: '#57534e', boots: '#1c1917', hood: '#292524' },
    { tunic: '#1c1917', sleeve: '#1c1917', trim: '#6b21a8', boots: '#0c0a09', hood: '#1c1917', cape: '#0c0a09' },
    { tunic: '#0c0a09', sleeve: '#0c0a09', trim: '#7c3aed', boots: '#000', hood: '#0c0a09', cape: '#1e1b4b' },
    { tunic: '#020617', sleeve: '#020617', trim: '#a78bfa', boots: '#000', hood: '#020617', cape: '#3b0764' },
  ],
};

// 종족 특징 (옷 단계 1~4별 피부·머리색 등). 없는 직업은 사람 모습 그대로
// skull: 이 단계부터 해골 얼굴 / glow: [이 단계부터, 눈 색] / lower: 하반신 모양
const RACE = {
  elf: { skin: ['#f5d3b0', '#f7dcc2', '#f9e5d2', '#fcefe4'], hair: ['#b98a4e', '#d9b36c', '#ecd9a4', '#f4efe0'], ears: 'point', longHair: 2 },
  ogre: { skin: ['#d4b98e', '#aab36a', '#8ba24f', '#6d8a3a'], hair: ['#3b2a1a', '#2f2416', '#241b10', '#111'], glow: [4, '#facc15'] },
  fairy: { skin: ['#f6d2b8', '#f9dccb', '#fbe4da', '#fdeee8'], hair: ['#e7a1c4', '#f0a6cf', '#c4b5fd', '#fde68a'], ears: 'point', longHair: 1 },
  centaur: { hair: ['#5a3a1c', '#4a2c17', '#3b2412', '#e8e3d6'], lower: 'horse' },
  lich: { skin: [BONE, BONE, BONE, BONE], skull: 1, glow: [1, '#5ef0ff'], noBlush: 1 },
  skeleton: { skin: [BONE, BONE, BONE, BONE], skull: 1, glow: [1, '#7dd3fc'], noBlush: 1 },
  dryad: { skin: ['#e9cf9f', '#cfd99a', '#b5d58c', '#a7e08a'], hair: ['#4d7c0f', '#3f6212', '#365314', '#65a30d'], ears: 'point', longHair: 1 },
  dwarf: { hair: ['#8b4513', '#7a3b10', '#9ca3af', '#e5e7eb'] },
  berserker: { skin: ['#efc196', '#e8b386', '#e0a878', '#d89c6c'], hair: ['#b45309', '#c2410c', '#9a3412', '#7f1d1d'], glow: [4, '#ef4444'] },
  vampire: { skin: ['#f3dfd6', '#efe2df', '#ece6ea', '#f3f0f5'], hair: ['#222', '#151515', '#0d0d0d', '#e5e7eb'], ears: 'point', glow: [2, '#dc2626'], noBlush: 1 },
  werewolf: { skin: ['#7a6a5e', '#8d8178', '#b8b2ab', '#e7e5e4'], hair: ['#5b4636', '#6b5d52', '#a8a29e', '#f5f5f4'], glow: [3, '#fde047'], noBlush: 1 },
  naga: { skin: ['#e7d0ae', '#b8d8c0', '#9fd3c0', '#8ee0cb'], hair: ['#134e4a', '#115e59', '#0f766e', '#1f2937'], ears: 'fin', glow: [3, '#fde047'], lower: 'snake', longHair: 1 },
  golem: { skin: ['#c9b9a6', '#a8a29e', '#94a3b8', '#bae6fd'], glow: [2, '#7dd3fc'], noBlush: 1, bald: 1 },
  nomad: { hair: ['#1c1917'], lower: 'mount' },
  duke: { hair: ['#111', '#111', '#0b1220', '#e2e8f0'], glow: [4, '#93c5fd'] },
  catfolk: { hair: ['#f59e0b', '#ea580c', '#e2e8f0', '#f8fafc'], ears: 'cat' },
  angel: { hair: ['#fde68a', '#fcd34d', '#fef3c7', '#fffbeb'] },
  demon: { skin: ['#f87171', '#ef4444', '#b91c1c', '#7f1d1d'], hair: ['#1c1917', '#1c1917', '#0c0a09', '#e2e8f0'], ears: 'point', glow: [2, '#facc15'], noBlush: 2 },
  reaper: { skin: ['#1c1917', '#0c0a09', '#000', '#000'], glow: [1, '#a78bfa'], noBlush: 1, bald: 1, noMouth: 1, lower: 'float', hands: BONE },
};
// 사람 직업: 1~2단계가 떠돌이 거지. 나머지(종족 직업)는 WEAK 옷차림의 약한 종족 모습
const HUMAN = ['warrior', 'mage', 'archer', 'rogue', 'pirate', 'berserker', 'blacksmith', 'nomad', 'knight', 'duke', 'monk', 'cleric', 'bard'];
const WEAK = {
  elf: { tunic: '#a3b18a', pants: '#6b705c', sleeve: '#a3b18a', belt: '#6b4f2a', trim: '#ccd5ae', boots: '#7f5539' },
  ogre: { tunic: '#8d6e63', pants: '#6d4c41', sleeve: '#d4b98e', belt: '#4e342e', trim: '#a1887f', boots: '#d4b98e' },
  fairy: { tunic: '#d9f99d', sleeve: '#d9f99d', trim: '#bef264', boots: '#65a30d', wing: '#e5e7eb' },
  centaur: { tunic: '#a8a29e', sleeve: '#a8a29e', belt: '#57534e', trim: '#d6d3d1', coat: '#a47148', coat2: '#7f5539' },
  lich: { tunic: '#57534e', sleeve: '#57534e', trim: '#78716c', hood: '#44403c', boots: '#292524' },
  skeleton: { tunic: '#78716c', pants: '#57534e', sleeve: BONE, belt: '#44403c', trim: '#a8a29e', boots: BONE, armor: '#78716c' },
  dryad: { tunic: '#a3a380', sleeve: '#a3a380', trim: '#d9f99d', boots: '#6b4f2a' },
  dwarf: { tunic: '#8d6e63', pants: '#6d4c41', sleeve: '#8d6e63', belt: '#4e342e', trim: '#a1887f', boots: '#4e342e', apron: '#8d6e63' },
  vampire: { tunic: '#d6d3d1', pants: '#3f3f46', sleeve: '#52525b', belt: '#27272a', trim: '#71717a', boots: '#27272a', vest: '#52525b', cape: '#27272a', lining: '#57534e' },
  werewolf: { tunic: '#6b5d52', pants: '#4b3a2a', sleeve: '#7a6a5e', belt: '#3b2a1a', trim: '#a8a29e', boots: '#7a6a5e', muzzle: '#c8bfb5' },
  naga: { tunic: '#5b8a72', sleeve: '#5b8a72', belt: '#365f4c', trim: '#a7d7c5', scale: '#7aa892', belly: '#e7d9a8', fin: '#6ee7b7', hood: '#5b8a72' },
  golem: { tunic: '#b08968', pants: '#9c6644', sleeve: '#c9b9a6', belt: '#7f5539', trim: '#ddb892', boots: '#9c6644' },
  reaper: { tunic: '#57534e', sleeve: '#57534e', trim: '#78716c', boots: '#44403c', hood: '#57534e' },
  catfolk: { tunic: '#a8a29e', pants: '#78716c', sleeve: '#a8a29e', belt: '#57534e', trim: '#d6d3d1', boots: '#d6a35c' },
  angel: { tunic: '#e2e8f0', sleeve: '#e2e8f0', trim: '#cbd5e1', boots: '#cbd5e1', wing: '#f1f5f9' },
  demon: { tunic: '#57534e', pants: '#44403c', sleeve: '#57534e', belt: '#292524', trim: '#a8a29e', boots: '#292524' },
};
const ROBES = ['mage', 'lich', 'dryad', 'fairy', 'reaper', 'cleric', 'angel'];
const CAPE_FROM = { vampire: 1 };
// 10단계 모습: angel(흰 날개) / bat(박쥐 날개) / rays(빛 기둥)
const WINGS10 = { lich: 'bat', skeleton: 'bat', vampire: 'bat', ogre: 'rays', fairy: 'rays', centaur: 'rays', dryad: 'rays',
  dwarf: 'rays', berserker: 'rays', werewolf: 'rays', naga: 'rays', golem: 'rays', blacksmith: 'rays', nomad: 'rays', reaper: 'bat',
  duke: 'snow', monk: 'rays', bard: 'rays', catfolk: 'rays', demon: 'bat' };

const BEGGAR = { tunic: '#8a6d4b', pants: '#6b5138', sleeve: '#8a6d4b' };
const AURA = { warrior: '#ff7043', mage: '#c084fc', archer: '#6ee7b7', rogue: '#a78bfa', pirate: '#60a5fa',
  elf: '#bbf7d0', ogre: '#a3e635', fairy: '#f9a8d4', centaur: '#fcd34d', lich: '#5eead4', skeleton: '#7dd3fc', dryad: '#d9f99d',
  dwarf: '#fb923c', berserker: '#f87171', vampire: '#f43f5e', werewolf: '#e0f2fe', naga: '#2dd4bf', golem: '#fde047',
  blacksmith: '#fdba74', nomad: '#fde68a', knight: '#e2e8f0', reaper: '#a78bfa',
  duke: '#bfdbfe', monk: '#fb923c', cleric: '#fef9c3', bard: '#f5d0fe', catfolk: '#fecaca', slime: '#86efac',
  angel: '#fef9c3', demon: '#f87171' };

// g: 'm' 남성 / 'f' 여성 (긴 머리·옆머리·속눈썹·입술색, 일부 직업은 옷·수염도 달라짐)
function heroSVG(cls, stage, g = 'm') {
  const fem = g === 'f';
  if (cls === 'slime') return slimeSVG(stage, fem);  // 슬라임은 사람 몸이 아니라 따로 그림
  const st = Math.floor((stage - 1) / 2), up = (stage - 1) % 2 === 1;
  const wt = up ? Math.min(st + 1, 4) : st;
  // weak: 종족 직업의 1~2단계. 종족 모습(fs=1)에 허름한 옷(WEAK)
  const weak = st === 0 && !HUMAN.includes(cls);
  const beggar = st === 0 && !weak;
  const fs = weak ? 1 : st;
  const p = weak ? WEAK[cls] : st ? PAL[cls][st - 1] : BEGGAR;
  const R = RACE[cls] || {};
  const sk = fs && R.skin ? R.skin[fs - 1] : SKIN;
  const hair = fs && R.hair ? R.hair[Math.min(fs, R.hair.length) - 1] : HAIR;
  const skull = fs > 0 && R.skull && fs >= R.skull;
  const lower = fs ? R.lower : null;
  const longRobe = fs > 0 && ROBES.includes(cls);
  const glow = fs && R.glow && fs >= R.glow[0] ? R.glow[1] : null;
  const o = [];
  o.push(`<svg viewBox="0 -14 120 164" xmlns="http://www.w3.org/2000/svg" class="hero-svg">`);
  o.push(`<defs><radialGradient id="aura-${cls}"><stop offset="0" stop-color="${AURA[cls]}" stop-opacity=".75"/><stop offset="1" stop-color="${AURA[cls]}" stop-opacity="0"/></radialGradient></defs>`);

  // 오라 / 반짝이
  if (st === 4) o.push(`<circle cx="60" cy="80" r="62" fill="url(#aura-${cls})"/>`);
  if (st >= 3) {
    for (const [x, y, s] of [[14, 30, 1], [106, 22, 1.3], [100, 96, .9], [18, 104, 1.1]])
      o.push(`<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z" fill="#fff6b0"/>`);
  }
  o.push(`<ellipse cx="60" cy="143" rx="${lower === 'horse' || lower === 'mount' ? 44 : lower === 'float' ? 18 : 30}" ry="5" fill="rgba(0,0,0,.25)"/>`);
  // 10단계: 날개
  if (stage === 10) o.push(wings10(WINGS10[cls] || 'angel'));

  // 망토 (단계 2부터)
  if (st >= (CAPE_FROM[cls] || 2) && p.cape) o.push(`<path d="M40 70 Q60 62 80 70 L90 136 Q60 128 30 136 Z" fill="${p.cape}"/>`);
  if (cls === 'vampire' && st >= 1) o.push(`<path d="M44 72 Q60 66 76 72 L84 130 Q60 124 36 130 Z" fill="${p.lining}"/>`);
  // 화살통 (궁수)
  if (cls === 'archer' && st >= 1) {
    o.push(`<g transform="rotate(22 76 76)"><rect x="70" y="54" width="11" height="36" rx="3" fill="#7a4a24"/>`);
    o.push(`<path d="M72 54 l2 -8 l2 8 M76 54 l2 -9 l2 9" fill="${st >= 3 ? '#f1c40f' : '#eee'}" stroke="${st >= 3 ? '#f1c40f' : '#ddd'}"/></g>`);
  }
  // 종족: 날개·꼬리·말 몸통·뱀 꼬리 (몸 뒤쪽)
  o.push(backParts(cls, fs, p, hair, weak));
  // 여성: 등 뒤로 내려오는 긴 머리 (해골은 흐릿한 유령 머리, 사신은 두건 밑 보라 머리, 골렘은 없음)
  if (fem && cls !== 'golem') {
    const fh = skull ? '#e2e8f0' : cls === 'reaper' ? '#4c1d95' : hair;
    o.push(`<path d="M35 44 Q27 86 38 100 L82 100 Q93 86 85 44 Z" fill="${fh}"${skull ? ' opacity=".7"' : ''}/>`);
  }

  // 다리 / 발
  if (!longRobe && !lower) {
    if (beggar) {
      o.push(`<rect x="48" y="106" width="10" height="20" fill="${p.pants}"/><rect x="62" y="106" width="10" height="20" fill="${p.pants}"/>`);
      o.push(`<path d="M48 126 l3 -3 l3 3 l4 -3 v-1 h-10 Z M62 126 l3 -3 l3 3 l4 -3 v-1 h-10 Z" fill="${p.pants}"/>`);
      o.push(`<rect x="49" y="124" width="8" height="10" fill="${SKIN}"/><rect x="63" y="124" width="8" height="10" fill="${SKIN}"/>`);
    } else {
      o.push(`<rect x="48" y="106" width="10" height="26" rx="2" fill="${p.pants}"/><rect x="62" y="106" width="10" height="26" rx="2" fill="${p.pants}"/>`);
    }
  }
  // 말 탄 유목민: 말 옆구리에 걸친 다리 하나
  if (lower === 'mount') o.push(`<path d="M50 104 L45 124 L53 126 L59 106 Z" fill="${p.pants}"/><rect x="38" y="121" width="17" height="9" rx="4" fill="${p.boots}"/>`);
  if (!lower) {
    if (beggar) o.push(`<ellipse cx="52" cy="136" rx="7" ry="3.5" fill="${SKIN}"/><ellipse cx="68" cy="136" rx="7" ry="3.5" fill="${SKIN}"/>`);
    else o.push(`<rect x="44" y="128" width="15" height="9" rx="4" fill="${p.boots}"/><rect x="61" y="128" width="15" height="9" rx="4" fill="${p.boots}"/>`);
  }

  // 몸통
  if (beggar) {
    o.push(`<path d="M42 72 Q60 66 78 72 L82 112 L77 107 L72 114 L66 108 L60 115 L54 108 L48 114 L43 107 L38 112 Z" fill="${p.tunic}"/>`);
    o.push(`<rect x="45" y="84" width="9" height="8" fill="#a5845d" stroke="#5a4330" stroke-dasharray="2 1.5"/>`);
    o.push(`<rect x="65" y="95" width="8" height="7" fill="#7a5c3d" stroke="#5a4330" stroke-dasharray="2 1.5"/>`);
    o.push(`<path d="M70 78 l-3 6 l3 4" stroke="#5a4330" stroke-width="1.2" fill="none"/>`);
    o.push(`<path d="M41 100 h38" stroke="#6b5138" stroke-width="2.5"/>`); // 끈 허리띠
  } else if (longRobe) {
    o.push(`<path d="M42 72 Q60 66 78 72 L88 134 L32 134 Z" fill="${p.tunic}"/>`);
    o.push(`<rect x="58" y="72" width="4" height="62" fill="${p.trim}"/>`);
    o.push(`<path d="M32 134 L88 134" stroke="${p.trim}" stroke-width="3"/>`);
    o.push(`<rect x="41" y="96" width="38" height="5" fill="${p.trim}" opacity=".85"/>`);
  } else {
    o.push(`<path d="M42 72 Q60 66 78 72 L82 112 L38 112 Z" fill="${p.tunic}"/>`);
    o.push(`<path d="M38 112 L82 112" stroke="${p.trim}" stroke-width="2"/>`);
  }
  // 약한 모습: 기운 자국
  if (weak && !longRobe) o.push(`<rect x="64" y="84" width="8" height="7" fill="${p.trim}" opacity=".6" stroke="#00000055" stroke-dasharray="2 1.5"/>`);

  // 직업별 몸 장식
  if (fs > 0) {
    if (cls === 'warrior') {
      o.push(`<path d="M46 74 Q60 70 74 74 L72 96 Q60 101 48 96 Z" fill="${p.armor}" stroke="${p.trim}" stroke-width="1.5"/>`);
      if (st >= 3) o.push(`<path d="M60 78 v14 M54 84 h12" stroke="${p.trim}" stroke-width="2.5"/>`);
    } else if (cls === 'archer') {
      o.push(`<path d="M44 72 L78 104" stroke="#5a3a1c" stroke-width="4"/>`);
    } else if (cls === 'rogue') {
      o.push(`<path d="M44 74 L76 100 M76 74 L44 100" stroke="${p.trim}" stroke-width="2.5"/>`);
      o.push(`<rect x="66" y="100" width="8" height="8" rx="2" fill="#5d4037"/>`);
    } else if (cls === 'pirate') {
      o.push(`<path d="M42 72 Q50 69 54 70 L52 112 L38 112 Z M78 72 Q70 69 66 70 L68 112 L82 112 Z" fill="${p.vest}"/>`);
      if (st >= 3) o.push(`<path d="M54 70 L52 112 M66 70 L68 112" stroke="${p.trim}" stroke-width="2"/>`);
    } else {
      o.push(bodyDecor(cls, fs, p, sk, fem));
    }
    if (!longRobe && cls !== 'golem') {
      o.push(`<rect x="39" y="98" width="42" height="6" fill="${p.belt}"/>`);
      o.push(`<rect x="56" y="97" width="8" height="8" rx="1" fill="${p.trim}"/>`);
    }
  }

  // 팔
  if (beggar) {
    o.push(`<path d="M31 74 h11 v18 l-3 -2 l-3 3 l-3 -2 l-2 2 Z" fill="${p.sleeve}"/><rect x="32" y="90" width="9" height="12" fill="${SKIN}"/>`);
    o.push(`<path d="M78 74 h11 v18 l-2 -2 l-3 3 l-3 -2 l-3 2 Z" fill="${p.sleeve}"/><rect x="79" y="90" width="9" height="12" fill="${SKIN}"/>`);
  } else {
    o.push(`<rect x="31" y="73" width="11" height="30" rx="5" fill="${p.sleeve}"/><rect x="78" y="73" width="11" height="30" rx="5" fill="${p.sleeve}"/>`);
  }
  if (cls === 'warrior' && st >= 2) o.push(`<circle cx="38" cy="75" r="8" fill="${p.armor}" stroke="${p.trim}" stroke-width="1.5"/><circle cx="82" cy="75" r="8" fill="${p.armor}" stroke="${p.trim}" stroke-width="1.5"/>`);
  if (cls === 'pirate' && st >= 3) o.push(`<path d="M31 72 h11 v5 h-11 Z M78 72 h11 v5 h-11 Z" fill="${p.trim}"/>`);
  if (st > 0) o.push(shoulders(cls, st, p));

  // 무기 (손 뒤쪽에 그리는 것)
  // 약한 모습 1단계는 맨손
  if (!(weak && wt === 0)) o.push(weapon(cls, wt, st ? p : PAL[cls][0]));

  // 손
  const hr = cls === 'golem' && st >= 2 ? 7.5 : cls === 'ogre' && st >= 2 ? 6.5 : 5.5;
  const hand = fs && R.hands ? R.hands : sk;
  o.push(`<circle cx="36.5" cy="104" r="${hr}" fill="${hand}"/><circle cx="83.5" cy="104" r="${hr}" fill="${hand}"/>`);
  if (cls === 'werewolf' && wt >= 1) o.push(claws(wt));
  // 무도가: 주먹에 감은 붕대 (단계마다 색이 바뀜)
  if (cls === 'monk' && wt >= 1) {
    const c = ['#f5f5f4', '#f5f5f4', '#dc2626', '#facc15'][wt - 1];
    o.push(`<path d="M31.5 101 h10 M31.5 104.5 h10 M31.5 108 h10 M78.5 101 h10 M78.5 104.5 h10 M78.5 108 h10" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/>`);
  }

  // 머리 뒤 (긴 머리, 코브라 후드, 높은 깃)
  if (fs && R.longHair && fs >= R.longHair) o.push(`<path d="M37 44 Q33 76 43 82 L77 82 Q87 76 83 44 Z" fill="${hair}"/>`);
  if (cls === 'naga' && st >= 2) o.push(`<path d="M60 16 Q22 22 28 74 L60 66 L92 74 Q98 22 60 16 Z" fill="${p.hood}"/><path d="M60 24 Q34 30 36 66 L60 62 L84 66 Q86 30 60 24 Z" fill="${p.belly}" opacity=".5"/>`);
  if (cls === 'vampire' && fs >= 1) o.push(`<path d="M42 72 L${30 - fs * 2} ${52 - fs * 3} L52 66 Z M78 72 L${90 + fs * 2} ${52 - fs * 3} L68 66 Z" fill="${p.cape}" stroke="${p.lining}" stroke-width="1.5"/>`);

  // 머리
  o.push(`<rect x="55" y="62" width="10" height="10" fill="${sk}"/>`);
  if (!skull) {
    if (fs && R.ears === 'point') {
      const e = cls === 'elf' ? (weak ? 2 : 6) : 0;
      o.push(`<path d="M41 42 L${24 - e} ${32 - e} L40 56 Z M79 42 L${96 + e} ${32 - e} L80 56 Z" fill="${sk}"/>`);
    } else if (fs && R.ears === 'cat') {
      // 고양이 귀는 머리 위에 (headTop)
    } else if (fs && R.ears === 'fin') {
      o.push(`<path d="M40 40 L24 34 L30 46 L24 56 L40 54 Z M80 40 L96 34 L90 46 L96 56 L80 54 Z" fill="${p.fin}"/>`);
    } else {
      o.push(`<circle cx="38.5" cy="48" r="4" fill="${sk}"/><circle cx="81.5" cy="48" r="4" fill="${sk}"/>`);
    }
  }
  o.push(`<circle cx="60" cy="46" r="22" fill="${skull ? BONE : sk}"/>`);
  if (beggar) o.push(`<path d="M38 44 Q36 22 60 22 Q84 22 82 44 L78 35 L74 42 L70 32 L64 40 L58 31 L52 40 L46 32 L42 41 Z" fill="${HAIR}"/>`);
  else if (skull || (R.bald && fs >= R.bald)) { /* 해골·돌 머리: 머리카락 없음 */ }
  else if (cls === 'werewolf') o.push(`<path d="M38 44 Q36 20 60 20 Q84 20 82 44 L80 34 L75 40 L72 28 L65 36 L60 26 L55 36 L48 28 L45 40 L40 34 Z" fill="${hair}"/>`);
  else if (cls === 'vampire') o.push(`<path d="M38 44 Q38 20 60 20 Q82 20 82 44 Q78 30 66 30 L60 37 L54 30 Q42 30 38 44 Z" fill="${hair}"/>`);
  else o.push(`<path d="M38 44 Q38 22 60 22 Q82 22 82 44 Q76 31 60 31 Q44 31 38 44 Z" fill="${hair}"/>`);
  if (fem && !skull && !(R.bald && fs >= R.bald)) o.push(`<path d="M38 42 Q35 58 40 68 L44 64 Q41 54 43 44 Z M82 42 Q85 58 80 68 L76 64 Q79 54 77 44 Z" fill="${hair}"/>`);

  // 얼굴
  const glowEyes = cls === 'rogue' && st === 4;
  const lip = fem ? '#d94a7a' : '#6b3b2a';
  const lashes = fem && !skull ? `<path d="M50.3 48.6 l-2.6 -1.8 M51 47.3 l-1.6 -2.6 M69.7 48.6 l2.6 -1.8 M69 47.3 l1.6 -2.6" stroke="#2b2b2b" stroke-width="1.1" stroke-linecap="round"/>` : '';
  if (skull) {
    o.push(skullFace(glow));
    if (weak) o.push(`<path d="M44 34 l6 4 M70 56 l5 3" stroke="#78716c" stroke-width="1.2"/>`);
  } else if (beggar && up) {
    o.push(`<circle cx="53" cy="50" r="2.6" fill="#2b2b2b"/><circle cx="67" cy="50" r="2.6" fill="#2b2b2b"/><circle cx="54" cy="49" r=".9" fill="#fff"/><circle cx="68" cy="49" r=".9" fill="#fff"/>`, lashes);
    o.push(`<path d="M55 59 Q60 62 65 59" stroke="${lip}" stroke-width="2" fill="none" stroke-linecap="round"/>`);
    o.push(`<ellipse cx="70" cy="57" rx="4" ry="2.5" fill="#7a5a3a" opacity=".45"/>`);
  } else if (beggar) {
    o.push(`<path d="M49 44 l6 2 M71 44 l-6 2" stroke="#4a2c17" stroke-width="1.8" stroke-linecap="round"/>`);
    o.push(`<path d="M50 51 h6 M64 51 h6" stroke="#2b2b2b" stroke-width="2.6" stroke-linecap="round"/>`, lashes);
    o.push(`<path d="M55 60 Q60 56.5 65 60" stroke="${lip}" stroke-width="2" fill="none" stroke-linecap="round"/>`);
    o.push(`<ellipse cx="70" cy="57" rx="4" ry="2.5" fill="#7a5a3a" opacity=".45"/><ellipse cx="48" cy="39" rx="3" ry="2" fill="#7a5a3a" opacity=".4"/>`);
    o.push(`<g transform="rotate(-20 70 36)"><rect x="64" y="33" width="13" height="6" rx="2" fill="#f3e2c0"/><path d="M69 35 v2 M72 35 v2" stroke="#c9b28a"/></g>`);
  } else {
    const eye = glowEyes ? '#c4b5fd' : glow || '#2b2b2b';
    if (glow) o.push(`<circle cx="53" cy="50" r="5" fill="${glow}" opacity=".3"/><circle cx="67" cy="50" r="5" fill="${glow}" opacity=".3"/>`);
    o.push(`<circle cx="53" cy="50" r="2.8" fill="${eye}"/><circle cx="67" cy="50" r="2.8" fill="${eye}"/>`);
    if (!glowEyes && !glow) o.push(`<circle cx="54" cy="49" r="1" fill="#fff"/><circle cx="68" cy="49" r="1" fill="#fff"/>`);
    if (!glow) o.push(lashes);
    if (!R.noBlush || fs < R.noBlush) o.push(`<ellipse cx="47" cy="56" rx="3.5" ry="2" fill="#f28b82" opacity="${fem ? .6 : .45}"/><ellipse cx="73" cy="56" rx="3.5" ry="2" fill="#f28b82" opacity="${fem ? .6 : .45}"/>`);
    if (!R.noMouth) o.push(st >= 3
      ? `<path d="M53 58 Q60 66 67 58 Z" fill="${fem ? '#b0305a' : '#7a2e2e'}"/>`
      : weak && !up ? `<path d="M55 61 Q60 57.5 65 61" stroke="${lip}" stroke-width="2" fill="none" stroke-linecap="round"/>`
      : `<path d="M55 59 Q60 63 65 59" stroke="${lip}" stroke-width="2" fill="none" stroke-linecap="round"/>`);
    o.push(faceExtra(cls, fs, p, hair, fem));
  }
  // 약한 모습 1단계: 식은땀
  if (weak && !up) o.push(`<path d="M80 34 q-3 5 0 7 q3 -2 0 -7 Z" fill="#7dd3fc" stroke="#38bdf8" stroke-width=".6"/>`);

  o.push(headTop(cls, fs, p, hair, sk));
  o.push(headgear(cls, st, p));
  o.push(`</svg>`);
  return o.join('');
}

function wings10(kind) {
  if (kind === 'snow') {
    // 눈송이 (북부대공)
    const flake = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="#e0f2fe" stroke-width="1.6" stroke-linecap="round"><path d="M0 -6 V6 M-5.2 -3 L5.2 3 M-5.2 3 L5.2 -3"/></g>`;
    return [[12, 20, 1.2], [104, 14, 1], [18, 70, .8], [108, 60, 1.3], [10, 118, 1], [110, 112, .9], [60, -8, .9], [34, 4, .7], [88, 0, .8]]
      .map(([x, y, s]) => flake(x, y, s)).join('') + `<circle cx="60" cy="70" r="58" fill="#bfdbfe" opacity=".18"/>`;
  }
  if (kind === 'bat') {
    const w = `<path d="M44 80 Q22 44 4 30 L12 48 L2 54 L14 62 L6 72 L22 74 Q30 86 44 88 Z" fill="#2a0a1f" stroke="#9f1239" stroke-width="1.5"/>`;
    return w + `<g transform="translate(120 0) scale(-1 1)">${w}</g>`;
  }
  if (kind === 'rays') {
    const r = [];
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6, x = (60 + Math.cos(a) * 64).toFixed(1), y = (70 + Math.sin(a) * 64).toFixed(1);
      r.push(`<path d="M60 70 L${x} ${y}" stroke="#fde68a" stroke-width="${i % 2 ? 3 : 6}" opacity=".35" stroke-linecap="round"/>`);
    }
    return r.join('') + `<circle cx="60" cy="46" r="30" fill="none" stroke="#facc15" stroke-width="2" opacity=".7"/>`;
  }
  return `<path d="M44 80 Q10 50 4 20 Q24 34 30 30 Q22 48 40 56 Q26 62 44 72 Z" fill="#fffbe6" stroke="#f1c40f" stroke-width="1.5"/>` +
    `<path d="M76 80 Q110 50 116 20 Q96 34 90 30 Q98 48 80 56 Q94 62 76 72 Z" fill="#fffbe6" stroke="#f1c40f" stroke-width="1.5"/>`;
}

// 몸 뒤: 페어리 날개, 늑대 꼬리, 켄타우로스 말 몸통, 나가 뱀 꼬리
function backParts(cls, st, p, hair, weak) {
  if (!st) return '';
  if (cls === 'fairy') {
    const s = weak ? .85 : 1 + st * .18, c = p.wing;
    return `<g opacity=".8" stroke="${p.trim}" stroke-width="1">
      <ellipse cx="34" cy="64" rx="${(11 * s).toFixed(1)}" ry="${(19 * s).toFixed(1)}" transform="rotate(-35 34 64)" fill="${c}"/>
      <ellipse cx="86" cy="64" rx="${(11 * s).toFixed(1)}" ry="${(19 * s).toFixed(1)}" transform="rotate(35 86 64)" fill="${c}"/>
      <ellipse cx="38" cy="94" rx="${(7 * s).toFixed(1)}" ry="${(12 * s).toFixed(1)}" transform="rotate(30 38 94)" fill="${c}"/>
      <ellipse cx="82" cy="94" rx="${(7 * s).toFixed(1)}" ry="${(12 * s).toFixed(1)}" transform="rotate(-30 82 94)" fill="${c}"/></g>`;
  }
  if (cls === 'werewolf') return `<path d="M74 106 Q104 112 110 84 Q102 98 86 98 Z" fill="${hair}"/>`;
  if (cls === 'centaur') {
    const o = [`<path d="M102 102 Q120 110 112 138 Q106 124 98 110 Z" fill="${hair}"/>`];
    for (const x of [86, 97]) o.push(`<rect x="${x}" y="112" width="8" height="26" rx="3" fill="${p.coat2}"/><rect x="${x - 1}" y="133" width="10" height="5" rx="2" fill="#292524"/>`);
    o.push(`<ellipse cx="76" cy="110" rx="31" ry="15" fill="${p.coat}"/>`);
    if (p.barding) o.push(`<path d="M58 98 Q78 92 100 100 L98 118 Q78 124 60 118 Z" fill="${p.barding}" stroke="${p.trim}" stroke-width="2"/>`);
    for (const x of [47, 59]) o.push(`<rect x="${x}" y="112" width="8" height="26" rx="3" fill="${p.coat}"/><rect x="${x - 1}" y="133" width="10" height="5" rx="2" fill="${st >= 4 ? '#facc15' : '#292524'}"/>`);
    return o.join('');
  }
  if (cls === 'catfolk') {
    return `<path d="M76 110 Q104 114 102 92 Q100 74 110 70" stroke="${hair}" stroke-width="${weak ? 5 : 6}" fill="none" stroke-linecap="round"/>` +
      (st >= 3 ? `<path d="M106 72 Q109 69 111 70" stroke="#fff" stroke-width="6" stroke-linecap="round"/>` : '');
  }
  if (cls === 'angel') {
    // 깃털 날개: 단계마다 커짐
    const s = weak ? .7 : .8 + st * .15, c = p.wing;
    const wing = `<path d="M44 82 Q${44 - 30 * s} ${78 - 28 * s} ${44 - 36 * s} ${70 - 44 * s} Q${44 - 22 * s} ${66 - 20 * s} ${44 - 18 * s} ${72 - 22 * s} Q${44 - 26 * s} ${80 - 8 * s} ${44 - 10 * s} ${82} Z" fill="${c}" stroke="#bae6fd" stroke-width="1.2"/>`;
    return wing + `<g transform="translate(120 0) scale(-1 1)">${wing}</g>`;
  }
  if (cls === 'demon') {
    const s = weak ? .55 : .7 + st * .15, c = st >= 3 ? '#450a0a' : '#7f1d1d';
    const wing = `<path d="M44 80 Q${44 - 22 * s} ${76 - 40 * s} ${44 - 34 * s} ${70 - 40 * s} L${44 - 30 * s} ${78 - 22 * s} L${44 - 38 * s} ${80 - 14 * s} L${44 - 26 * s} ${84 - 6 * s} L${44 - 30 * s} ${90} Q${44 - 14 * s} 86 44 90 Z" fill="${c}" stroke="#b91c1c" stroke-width="1"/>`;
    return wing + `<g transform="translate(120 0) scale(-1 1)">${wing}</g>` +
      `<path d="M74 110 Q100 118 100 98 Q99 88 106 84" stroke="${st >= 3 ? '#7f1d1d' : '#b91c1c'}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M103 80 L112 84 L104 90 Z" fill="${st >= 3 ? '#7f1d1d' : '#b91c1c'}"/>`;
  }
  if (cls === 'nomad') {
    // 오른쪽을 보는 말 (꼬리·뒷다리 → 몸통 → 안장 → 앞다리 → 목·머리)
    const o = [`<path d="M30 104 Q10 110 16 136 Q22 122 32 112 Z" fill="${p.mane}"/>`];
    for (const x of [32, 43]) o.push(`<rect x="${x}" y="112" width="8" height="26" rx="3" fill="${p.coat2}"/><rect x="${x - 1}" y="133" width="10" height="5" rx="2" fill="#292524"/>`);
    o.push(`<ellipse cx="58" cy="112" rx="32" ry="15" fill="${p.coat}"/>`);
    if (p.barding) o.push(`<path d="M34 104 Q58 96 84 104 L82 120 Q58 126 36 120 Z" fill="${p.barding}" opacity=".9"/><path d="M36 120 Q58 126 82 120" stroke="${p.trim}" stroke-width="2" fill="none"/>`);
    o.push(`<path d="M42 100 Q58 94 74 100 L72 110 Q58 105 44 110 Z" fill="${p.cape || '#7c2d12'}" stroke="${p.trim}" stroke-width="1"/>`);
    for (const x of [70, 81]) o.push(`<rect x="${x}" y="112" width="8" height="26" rx="3" fill="${p.coat}"/><rect x="${x - 1}" y="133" width="10" height="5" rx="2" fill="${st >= 4 ? '#facc15' : '#292524'}"/>`);
    o.push(`<path d="M78 110 Q84 88 96 78 L105 86 Q93 96 90 116 Z" fill="${p.coat}"/>`);
    o.push(`<path d="M94 74 Q105 68 114 77 L116 86 Q111 91 104 88 L97 84 Z" fill="${p.coat}"/>`);
    o.push(`<path d="M97 73 l2 -8 l4 7 Z" fill="${p.coat2}"/><circle cx="105" cy="78" r="1.4" fill="#111"/><circle cx="113" cy="84" r="1" fill="#44403c"/>`);
    o.push(`<path d="M81 106 Q86 86 96 74 L93 72 Q81 84 76 104 Z" fill="${p.mane}"/>`);
    if (st >= 2) o.push(`<path d="M96 78 L112 84" stroke="${p.trim}" stroke-width="1.5"/>`);
    return o.join('');
  }
  if (cls === 'naga') {
    return `<path d="M42 104 Q34 136 64 138 Q98 142 108 122 Q112 110 102 110 Q100 126 76 126 Q60 126 78 104 Z" fill="${p.scale}"/>
      <path d="M50 110 Q46 130 66 132 Q92 134 102 118" stroke="${p.belly}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M44 118 q4 -3 8 0 M56 130 q4 -3 8 0 M76 134 q4 -3 8 0 M92 130 q4 -3 8 0" stroke="${p.trim}" stroke-width="1.2" fill="none" opacity=".7"/>`;
  }
  return '';
}

// 몸통 위 장식 (새 직업)
function bodyDecor(cls, st, p, sk, fem) {
  const o = [];
  if (cls === 'elf') {
    o.push(`<path d="M44 72 L78 104" stroke="${p.trim}" stroke-width="3"/><path d="M58 80 q4 -6 8 0 q-4 6 -8 0 Z" fill="${st >= 3 ? '#facc15' : '#4ade80'}"/>`);
  } else if (cls === 'ogre') {
    o.push(`<path d="M42 72 L46 92 L52 84 L58 94 L64 84 L70 94 L76 84 L78 72" fill="${p.trim}" opacity=".35"/>`);
    if (st >= 2) o.push(`<path d="M46 74 Q60 82 74 74" stroke="#5d4037" stroke-width="1.2" fill="none"/>` +
      [48, 54, 60, 66, 72].map(x => `<path d="M${x} 77 l1.5 5 l1.5 -5 Z" fill="#fffde7"/>`).join(''));
  } else if (cls === 'fairy') {
    o.push([36, 48, 72, 84].map(x => `<ellipse cx="${x}" cy="131" rx="5" ry="3" fill="${p.trim}"/>`).join(''));
  } else if (cls === 'centaur') {
    o.push(`<path d="M44 72 L78 104" stroke="#5a3a1c" stroke-width="4"/>`);
    if (st >= 3) o.push(`<path d="M46 74 Q60 70 74 74 L72 94 Q60 99 48 94 Z" fill="${p.trim}" opacity=".9"/>`);
  } else if (cls === 'lich') {
    o.push(`<circle cx="60" cy="98.5" r="4" fill="${BONE}"/><circle cx="58.5" cy="98" r=".9" fill="#111"/><circle cx="61.5" cy="98" r=".9" fill="#111"/>`);
    if (st >= 3) o.push(`<path d="M46 110 l4 -6 l4 6 M66 110 l4 -6 l4 6" stroke="${p.trim}" stroke-width="1.5" fill="none" opacity=".8"/>`);
  } else if (cls === 'skeleton') {
    o.push(`<path d="M46 74 Q60 70 74 74 L72 96 Q60 101 48 96 Z" fill="${p.armor}" stroke="${p.trim}" stroke-width="1.2"/>`);
    o.push(`<path d="M60 76 v18 M52 80 h16 M53 85 h14 M54 90 h12" stroke="${st >= 2 ? BONE : '#a8a29e'}" stroke-width="1.6"/>`);
  } else if (cls === 'dryad') {
    o.push(`<path d="M44 74 Q52 90 46 108 M76 74 Q68 90 74 108" stroke="#3f6212" stroke-width="2" fill="none"/>`);
    o.push([[46, 84], [74, 90], [48, 102]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2" fill="#84cc16" transform="rotate(-30 ${x} ${y})"/>`).join(''));
  } else if (cls === 'dwarf') {
    if (st <= 2) o.push(`<path d="M46 80 h28 L76 112 H44 Z" fill="${p.apron}"/>`);
    else o.push(`<path d="M44 76 h32 v22 h-32 Z" fill="${p.trim}" opacity=".25"/><path d="M44 82 h32 M44 88 h32 M44 94 h32" stroke="${p.sleeve}" stroke-width="1" stroke-dasharray="2 2"/>`);
  } else if (cls === 'berserker') {
    if (fem) o.push(`<path d="M43 76 Q60 72 77 76 L76 90 Q60 86 44 90 Z" fill="${p.fur}"/>`);
    else o.push(`<path d="M52 82 q8 4 16 0 M54 90 q6 3 12 0" stroke="#a0643c" stroke-width="1.3" fill="none"/>`);
    o.push(`<path d="M40 70 Q54 72 60 92 L54 96 Q48 80 38 78 Z" fill="${p.fur}"/>`);
    if (st >= 2) o.push(`<path d="M66 80 l8 10 M70 78 l6 8" stroke="#b91c1c" stroke-width="2" stroke-linecap="round"/>`);
  } else if (cls === 'vampire') {
    o.push(`<path d="M42 72 Q50 69 55 70 L52 112 L38 112 Z M78 72 Q70 69 65 70 L68 112 L82 112 Z" fill="${p.vest}"/>`);
    o.push(`<path d="M56 72 l4 10 l4 -10 Z M55 76 l5 12 l5 -12" fill="#fff" stroke="#e5e7eb"/><circle cx="60" cy="88" r="2.5" fill="${p.trim === '#facc15' ? '#e11d48' : p.trim}"/>`);
  } else if (cls === 'werewolf') {
    o.push(`<path d="M38 112 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 Z" fill="#1c1917" opacity=".35"/>`);
    o.push(`<path d="M50 72 Q60 92 70 72 Z" fill="${p.sleeve}"/>`);
  } else if (cls === 'naga') {
    o.push([[48, 82], [56, 88], [64, 82], [72, 88], [52, 94], [68, 94]].map(([x, y]) => `<path d="M${x} ${y} q3 -3 6 0" stroke="${p.trim}" stroke-width="1.2" fill="none" opacity=".7"/>`).join(''));
    if (st >= 3) o.push(`<path d="M46 72 Q60 82 74 72 L72 76 Q60 86 48 76 Z" fill="${p.trim}"/>`);
  } else if (cls === 'blacksmith') {
    o.push(`<path d="M46 76 h28 L78 112 H42 Z" fill="${p.apron}"/><path d="M48 76 L44 70 M72 76 L76 70" stroke="${p.apron}" stroke-width="2.5"/>`);
    o.push(`<rect x="52" y="90" width="16" height="9" rx="2" fill="none" stroke="${p.trim}" stroke-width="1.3"/>`);
    if (st >= 3) o.push(`<path d="M54 82 l3 -4 l3 4 l3 -4 l3 4" stroke="${p.trim}" stroke-width="1.5" fill="none"/>`);
  } else if (cls === 'nomad') {
    o.push(`<path d="M42 72 L72 112 L82 112 L78 72 Z" fill="${p.tunic}"/><path d="M44 72 L74 108" stroke="${p.trim}" stroke-width="3"/>`);
    if (st >= 3) o.push(`<path d="M42 72 Q60 80 78 72" stroke="${p.trim}" stroke-width="2" fill="none"/>`);
  } else if (cls === 'knight') {
    if (st === 1) o.push(`<path d="M44 80 h32 M44 88 h32 M44 96 h32 M52 72 v26 M68 72 v26" stroke="${p.trim}" stroke-width="1" opacity=".6"/>`);
    else {
      if (st >= 3) o.push(`<path d="M44 74 Q60 69 76 74 L74 98 Q60 103 46 98 Z" fill="${p.armor}" stroke="${p.trim}" stroke-width="1.2"/>`);
      else o.push(`<path d="M42 76 h36 M42 82 h36 M42 88 h36 M42 94 h36" stroke="#6b7280" stroke-width="1" stroke-dasharray="1.5 1.5"/>`);
      o.push(`<path d="M50 80 h20 L68 112 H52 Z" fill="${p.tabard}" opacity=".95"/><path d="M60 84 v18 M54 90 h12" stroke="${p.trim}" stroke-width="3"/>`);
    }
  } else if (cls === 'duke') {
    // 두 줄 단추 군복 코트, 3단계부터 금줄 장식
    o.push(`<path d="M60 72 V112" stroke="#000" stroke-width="1" opacity=".4"/>`);
    o.push([80, 88, 96].map(y => `<circle cx="54" cy="${y}" r="1.6" fill="${p.trim}"/><circle cx="66" cy="${y}" r="1.6" fill="${p.trim}"/>`).join(''));
    if (st >= 3) o.push(`<path d="M44 76 Q52 86 46 94" stroke="${p.trim}" stroke-width="1.8" fill="none"/>`);
  } else if (cls === 'monk') {
    // 도복 깃 (V자)
    o.push(`<path d="M50 72 L60 92 L70 72" stroke="${st >= 3 ? p.trim : '#d6d3d1'}" stroke-width="3" fill="none"/>`);
    if (fem) o.push(`<path d="M52 74 L60 90 L68 74 Z" fill="${p.tunic}"/>`);
  } else if (cls === 'cleric') {
    // 영대(긴 띠)와 가슴의 십자
    o.push(`<path d="M50 72 L46 130 M70 72 L74 130" stroke="${p.trim}" stroke-width="4"/>`);
    o.push(`<path d="M60 78 v14 M54 83 h12" stroke="${p.trim}" stroke-width="2.8"/>`);
  } else if (cls === 'bard') {
    o.push(`<path d="M42 72 Q50 69 54 70 L52 112 L38 112 Z M78 72 Q70 69 66 70 L68 112 L82 112 Z" fill="${p.vest}"/>`);
    o.push(`<path d="M54 72 Q60 80 66 72 Q63 78 60 79 Q57 78 54 72 Z" fill="#fff"/>`);
    if (st >= 2) o.push(`<path d="M44 80 L76 104" stroke="${p.trim}" stroke-width="3"/>`);
  } else if (cls === 'catfolk') {
    // 방울 목걸이
    o.push(`<path d="M50 72 Q60 78 70 72" stroke="#dc2626" stroke-width="3" fill="none"/><circle cx="60" cy="78" r="3.2" fill="#facc15" stroke="#a16207" stroke-width=".8"/>`);
  } else if (cls === 'angel') {
    o.push(`<path d="M46 72 Q60 80 74 72" stroke="${p.trim}" stroke-width="2.5" fill="none"/>`);
    if (st >= 3) o.push(`<circle cx="60" cy="86" r="3.5" fill="${p.trim}"/><circle cx="60" cy="86" r="7" fill="${p.trim}" opacity=".25"/>`);
  } else if (cls === 'demon') {
    if (st >= 3) o.push(`<path d="M46 74 Q60 70 74 74 L72 96 Q60 101 48 96 Z" fill="${p.armor}" stroke="${p.trim}" stroke-width="1.2"/><path d="M54 80 l6 8 l6 -8" stroke="${p.trim}" stroke-width="2" fill="none"/>`);
    else o.push(`<path d="M44 76 L76 102" stroke="${p.trim}" stroke-width="2.5"/>`);
  } else if (cls === 'reaper') {
    o.push(`<path d="M32 134 l5 6 l5 -6 l5 7 l5 -7 l5 6 l5 -6 l5 7 l5 -7 l5 6 l5 -6 l5 6 l4 -6 Z" fill="${p.tunic}"/>`);
    o.push(`<path d="M42 98 Q60 104 78 98" stroke="${p.trim}" stroke-width="2" fill="none"/>`);
    if (st >= 3) o.push(`<circle cx="60" cy="88" r="3" fill="${p.trim}"/><circle cx="60" cy="88" r="6" fill="${p.trim}" opacity=".3"/>`);
  } else if (cls === 'golem') {
    o.push(`<path d="M46 78 l6 6 l-2 6 M70 80 l-4 8 l4 6 M56 100 l4 -4 l4 6" stroke="#44403c" stroke-width="1.2" fill="none" opacity=".7"/>`);
    if (st >= 2) o.push(`<circle cx="60" cy="88" r="${5 + st}" fill="none" stroke="${p.trim}" stroke-width="2"/><path d="M60 ${82 - st} v${12 + st * 2} M${54 - st} 88 h${12 + st * 2}" stroke="${p.trim}" stroke-width="1.5"/>`);
    if (st >= 3) o.push(`<circle cx="60" cy="88" r="${9 + st}" fill="${p.trim}" opacity=".25"/>`);
  }
  return o.join('');
}

// 어깨 장식
function shoulders(cls, st, p) {
  if (cls === 'berserker') return `<ellipse cx="37" cy="74" rx="9" ry="6" fill="${p.fur}"/>${st >= 2 ? `<ellipse cx="83" cy="74" rx="9" ry="6" fill="${p.fur}"/>` : ''}`;
  if (cls === 'dwarf' && st >= 3) return `<path d="M29 80 Q30 68 42 70 L42 80 Z M91 80 Q90 68 78 70 L78 80 Z" fill="${p.helm}" stroke="${p.trim}" stroke-width="1.5"/>`;
  if (cls === 'skeleton' && st >= 2) return `<path d="M28 80 Q30 66 44 70 L42 80 Z M92 80 Q90 66 76 70 L78 80 Z" fill="${p.armor}" stroke="${p.trim}" stroke-width="1"/><path d="M30 70 l-4 -8 l8 4 Z M90 70 l4 -8 l-8 4 Z" fill="${BONE}"/>`;
  if (cls === 'ogre' && st >= 3) return `<path d="M28 80 Q30 66 44 70 L42 80 Z" fill="#6b7280" stroke="${p.trim}"/><path d="M30 70 l-3 -7 l6 3 Z M36 67 l0 -8 l4 6 Z" fill="#d1d5db"/>`;
  if (cls === 'golem' && st >= 2) return `<path d="M26 78 L30 66 L44 68 L44 80 Z M94 78 L90 66 L76 68 L76 80 Z" fill="${p.sleeve}" stroke="#44403c" stroke-width="1"/>`;
  if (cls === 'naga' && st >= 3) return `<path d="M29 78 Q32 68 42 70 L42 78 Z M91 78 Q88 68 78 70 L78 78 Z" fill="${p.trim}"/>`;
  if (cls === 'knight' && st >= 2) return `<path d="M27 82 Q28 66 44 70 L42 82 Z M93 82 Q92 66 76 70 L78 82 Z" fill="${p.helm}" stroke="${p.trim}" stroke-width="1.5"/>`;
  // 북부대공: 어깨를 덮는 흰 털 망토 깃
  if (cls === 'duke') return `<path d="M26 82 Q24 66 44 66 Q60 72 76 66 Q96 66 94 82 Q86 76 78 78 Q60 84 42 78 Q34 76 26 82 Z" fill="${p.fur}"/>` +
    `<path d="M30 76 q3 3 6 0 M40 74 q3 3 6 0 M74 74 q3 3 6 0 M84 76 q3 3 6 0" stroke="#cbd5e1" stroke-width="1" fill="none"/>`;
  if (cls === 'bard' && st >= 2) return `<ellipse cx="36.5" cy="76" rx="8" ry="6" fill="${p.sleeve}" stroke="${p.trim}"/><ellipse cx="83.5" cy="76" rx="8" ry="6" fill="${p.sleeve}" stroke="${p.trim}"/>`;
  if (cls === 'demon' && st >= 3) return `<path d="M28 80 Q30 66 44 70 L42 80 Z M92 80 Q90 66 76 70 L78 80 Z" fill="${p.armor}" stroke="${p.trim}"/><path d="M31 70 l-3 -9 l7 5 Z M89 70 l3 -9 l-7 5 Z" fill="#e7e5e4"/>`;
  if (cls === 'nomad' && st >= 3) return `<path d="M30 76 Q36 68 44 72 L42 78 Z M90 76 Q84 68 76 72 L78 78 Z" fill="#a16207"/>`;
  return '';
}

function claws(wt) {
  const l = 4 + wt * 2;
  const one = x => `<path d="M${x - 4} 108 l-1 ${l} l3 -${l - 1} M${x} 109 l0 ${l + 1} l2 -${l} M${x + 4} 108 l1 ${l} l-3 -${l - 1}" stroke="#fafaf9" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
  return one(36.5) + one(83.5);
}

function skullFace(glow) {
  const c = glow || '#7dd3fc';
  return `<ellipse cx="53" cy="49" rx="5" ry="5.5" fill="#1a1a1a"/><ellipse cx="67" cy="49" rx="5" ry="5.5" fill="#1a1a1a"/>
    <circle cx="53" cy="49" r="4.5" fill="${c}" opacity=".3"/><circle cx="67" cy="49" r="4.5" fill="${c}" opacity=".3"/>
    <circle cx="53" cy="49.5" r="1.8" fill="${c}"/><circle cx="67" cy="49.5" r="1.8" fill="${c}"/>
    <path d="M60 53 l-2.2 4 h4.4 Z" fill="#1a1a1a"/>
    <rect x="51" y="60" width="18" height="6" rx="1.5" fill="#fff" stroke="#57534e" stroke-width=".8"/>
    <path d="M55 60 v6 M59 60 v6 M63 60 v6 M67 60 v6 M51 63 h18" stroke="#57534e" stroke-width=".7"/>
    <path d="M44 40 l4 3 M76 40 l-4 3 M70 30 l-3 4 l1 4" stroke="#a8a29e" stroke-width="1" fill="none"/>`;
}

// 얼굴 위 종족 특징
function faceExtra(cls, st, p, hair, fem) {
  if (cls === 'catfolk') return `<path d="M58.2 54.5 h3.6 l-1.8 2.2 Z" fill="#f472b6"/>` +
    `<path d="M40 55 l10 1 M40 59 l10 -1 M80 55 l-10 1 M80 59 l-10 -1" stroke="#57534e" stroke-width=".9" stroke-linecap="round"/>`;
  if (cls === 'demon') return `<path d="M56.5 59.5 l1.2 ${2.5 + st * .5} l1.2 -${2.5 + st * .5} Z M61.1 59.5 l1.2 ${2.5 + st * .5} l1.2 -${2.5 + st * .5} Z" fill="#fff"/>`;
  if (cls === 'ogre') {
    const t = [`<path d="M47 45 Q53 42 58 45 M62 45 Q67 42 73 45" stroke="#241b10" stroke-width="2.4" fill="none" stroke-linecap="round"/>`];
    if (st >= 2) t.push(`<path d="M53 61 l1.5 -${3 + st} l1.8 ${3 + st} Z M64 61 l1.5 -${3 + st} l1.8 ${3 + st} Z" fill="#fffde7" stroke="#d6d3d1" stroke-width=".5"/>`);
    return t.join('');
  }
  if (cls === 'vampire') return `<path d="M56.5 59.5 l1.3 ${2 + st * .6} l1.3 -${2 + st * .6} Z M61 59.5 l1.3 ${2 + st * .6} l1.3 -${2 + st * .6} Z" fill="#fff"/>`;
  if (cls === 'werewolf') {
    return `<path d="M38 52 l-4 4 l5 0 l-3 5 l6 -3 M82 52 l4 4 l-5 0 l3 5 l-6 -3" fill="${hair}"/>
      <ellipse cx="60" cy="58" rx="10" ry="7" fill="${p.muzzle}"/><ellipse cx="60" cy="54.5" rx="3.6" ry="2.6" fill="#1c1917"/>
      <path d="M60 57 v3 M54 61 Q57 64 60 61 Q63 64 66 61" stroke="#1c1917" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M55.5 62 l1 3 l1 -2.5 M64.5 62 l-1 3 l-1 -2.5" fill="#fff"/>`;
  }
  if (cls === 'dwarf' && fem) {
    // 여성 드워프: 수염 대신 양 갈래로 길게 땋은 머리
    const len = 76 + st * 4, ring = st >= 3 ? '#facc15' : '#a16207';
    return `<path d="M41 52 Q35 ${len - 14} 39 ${len}" stroke="${hair}" stroke-width="6" fill="none" stroke-linecap="round"/>` +
      `<path d="M79 52 Q85 ${len - 14} 81 ${len}" stroke="${hair}" stroke-width="6" fill="none" stroke-linecap="round"/>` +
      `<rect x="35" y="${len - 12}" width="7" height="4" rx="1" fill="${ring}"/><rect x="78" y="${len - 12}" width="7" height="4" rx="1" fill="${ring}"/>`;
  }
  if (cls === 'dwarf') {
    const len = 4 + st * 5;
    const b = [`<path d="M40 50 Q42 ${68 + len} 60 ${72 + len} Q78 ${68 + len} 80 50 Q74 60 60 60 Q46 60 40 50 Z" fill="${hair}"/>`,
      `<path d="M50 58 Q55 54 60 58 Q65 54 70 58 Q65 62 60 59 Q55 62 50 58 Z" fill="${hair}" stroke="#00000033"/>`];
    if (st >= 3) b.push(`<rect x="53" y="${62 + len}" width="5" height="4" rx="1" fill="#facc15"/><rect x="62" y="${62 + len}" width="5" height="4" rx="1" fill="#facc15"/>`);
    return b.join('');
  }
  if (cls === 'berserker' && st >= 2) return `<path d="M47 44 v14 M51 44 v12 M73 44 v14 M69 44 v12" stroke="${st >= 4 ? '#b91c1c' : '#2563eb'}" stroke-width="2" opacity=".7" stroke-linecap="round"/>`;
  if (cls === 'golem') return `<path d="M44 38 l5 5 l-2 5 M74 34 l-4 6 l3 4 M66 60 l4 3" stroke="#57534e" stroke-width="1.1" fill="none" opacity=".8"/>`;
  if (cls === 'naga') return `<path d="M43 54 q2 -2 4 0 M46 58 q2 -2 4 0 M73 54 q2 -2 4 0 M70 58 q2 -2 4 0" stroke="${p.fin}" stroke-width="1.2" fill="none"/>`;
  if (cls === 'lich') return `<path d="M49 54 q4 2 8 0 M63 54 q4 2 8 0" stroke="#52525b" stroke-width="1.5" fill="none"/>`;
  if (cls === 'skeleton') return `<path d="M44 46 l10 10 M70 40 l-2 8" stroke="#a8a29e" stroke-width="2" opacity=".8"/>`;
  if (cls === 'dryad' && st >= 2) return `<circle cx="46" cy="55" r="1" fill="#4d7c0f"/><circle cx="49" cy="57" r="1" fill="#4d7c0f"/><circle cx="74" cy="55" r="1" fill="#4d7c0f"/><circle cx="71" cy="57" r="1" fill="#4d7c0f"/>`;
  return '';
}

// 머리 위 종족 특징 (뿔, 늑대 귀, 잎사귀, 바위)
function headTop(cls, st, p, hair, sk) {
  if (!st) return '';
  if (cls === 'ogre') {
    const h = 6 + st * 4;
    return `<path d="M44 30 Q38 ${26 - h} 44 ${22 - h} Q46 ${24 - h / 2} 52 26 Z M76 30 Q82 ${26 - h} 76 ${22 - h} Q74 ${24 - h / 2} 68 26 Z" fill="#f5f0e1" stroke="#a8a29e" stroke-width="1"/>`;
  }
  if (cls === 'werewolf') {
    return `<path d="M40 34 L40 ${12 - st * 2} L56 26 Z M80 34 L80 ${12 - st * 2} L64 26 Z" fill="${hair}"/><path d="M43 30 L43 ${18 - st * 2} L52 27 Z M77 30 L77 ${18 - st * 2} L68 27 Z" fill="#fda4af" opacity=".6"/>`;
  }
  if (cls === 'dryad') {
    const leaves = [[40, 32, -40], [48, 24, -20], [60, 21, 0], [72, 24, 20], [80, 32, 40]].slice(0, 2 + st);
    return leaves.map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="8" fill="${st >= 3 ? '#4ade80' : '#84cc16'}" transform="rotate(${r} ${x} ${y})"/>`).join('');
  }
  if (cls === 'golem' && st >= 2) {
    return `<path d="M40 36 L46 22 L54 28 L60 18 L66 28 L74 22 L80 36 Q60 30 40 36 Z" fill="${sk}" stroke="#57534e" stroke-width="1"/>`;
  }
  if (cls === 'catfolk') {
    const e = 2 + st * 1.5;
    return `<path d="M40 34 L${42 - e} ${10 - e} L56 26 Z M80 34 L${78 + e} ${10 - e} L64 26 Z" fill="${hair}"/>` +
      `<path d="M43 30 L${43 - e / 2} ${16 - e / 2} L52 27 Z M77 30 L${77 + e / 2} ${16 - e / 2} L68 27 Z" fill="#fda4af"/>`;
  }
  if (cls === 'angel') {
    // 머리 위 빛의 고리
    const r = 13 + st * 1.5;
    return `<ellipse cx="60" cy="14" rx="${r}" ry="${3.5 + st * .3}" fill="none" stroke="#fde047" stroke-width="${2.2 + st * .4}"/>` +
      (st >= 3 ? `<ellipse cx="60" cy="14" rx="${r + 4}" ry="${6 + st * .3}" fill="none" stroke="#fef9c3" stroke-width="4" opacity=".4"/>` : '');
  }
  if (cls === 'demon') {
    const h = 6 + st * 4, c = st >= 4 ? '#1c1917' : '#3f3f46';
    return `<path d="M44 30 Q36 ${24 - h} 46 ${18 - h} Q44 ${26 - h / 2} 52 26 Z M76 30 Q84 ${24 - h} 74 ${18 - h} Q76 ${26 - h / 2} 68 26 Z" fill="${c}" stroke="#78716c" stroke-width=".8"/>`;
  }
  if (cls === 'reaper') {
    // 얼굴을 가리는 깊은 두건 (어둠 속에 눈만 빛남)
    const peak = 8 - st * 3;
    return `<path d="M30 60 Q26 ${peak + 6} 60 ${peak} Q94 ${peak + 6} 90 60 Q86 32 60 30 Q34 32 30 60 Z" fill="${p.hood}"/>` +
      `<path d="M30 60 Q34 74 44 72 M90 60 Q86 74 76 72" stroke="${p.hood}" stroke-width="5" fill="none"/>`;
  }
  return '';
}

function weapon(cls, st, p) {
  if (st === 0) {
    // 막대기에 매단 봇짐
    return `<line x1="80" y1="112" x2="98" y2="40" stroke="#8b5a2b" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="100" cy="38" r="11" fill="#b03a2e"/><path d="M93 30 Q100 24 107 30" stroke="#7d2a21" stroke-width="2" fill="none"/>
      <circle cx="96" cy="38" r="1.5" fill="#f5d0c5"/><circle cx="103" cy="42" r="1.5" fill="#f5d0c5"/><circle cx="102" cy="34" r="1.5" fill="#f5d0c5"/>`;
  }
  const s = [];
  if (cls === 'warrior' || cls === 'skeleton') {
    const dark = cls === 'skeleton';
    const len = [30, 40, 46, 52][st - 1];
    const blade = dark ? ['#a8a29e', '#6b7280', '#374151', '#1e3a8a'][st - 1] : ['#b8bec4', '#d6dde3', '#eef3f7', '#9be7ff'][st - 1];
    const guard = dark ? ['#e7e5e4', BONE, '#57534e', '#38bdf8'][st - 1] : ['#7a5a3a', '#888', '#f1c40f', '#f1c40f'][st - 1];
    if (st === 4) s.push(`<rect x="79" y="${98 - len}" width="10" height="${len}" fill="${dark ? '#38bdf8' : '#9be7ff'}" opacity=".35" rx="4"/>`);
    s.push(`<rect x="81.5" y="${100 - len}" width="5" height="${len}" fill="${blade}" stroke="#7b8790" stroke-width=".6"/>`);
    s.push(`<path d="M81.5 ${100 - len} L84 ${92 - len} L86.5 ${100 - len} Z" fill="${blade}"/>`);
    s.push(`<rect x="76" y="99" width="16" height="4" rx="1" fill="${guard}"/><rect x="82" y="103" width="4" height="10" fill="#5a3a1c"/>`);
    if (st >= 2 && dark) s.push(`<circle cx="35" cy="102" r="13" fill="${st >= 3 ? '#1e293b' : '#57534e'}" stroke="${p.trim}" stroke-width="2.5"/><circle cx="35" cy="100" r="4.5" fill="${BONE}"/><circle cx="33.5" cy="99.5" r="1.1" fill="#111"/><circle cx="36.5" cy="99.5" r="1.1" fill="#111"/><rect x="33" y="103.5" width="4" height="2.5" fill="${BONE}"/>`);
    else if (st >= 2) s.push(`<path d="M22 90 Q35 85 48 90 L46 112 Q35 124 24 112 Z" fill="${st >= 3 ? '#b71c1c' : '#78909c'}" stroke="${p.trim}" stroke-width="2.5"/>`,
      st >= 3 ? `<path d="M35 94 v20 M28 102 h14" stroke="${p.trim}" stroke-width="2.5"/>` : '');
  } else if (cls === 'mage' || cls === 'lich') {
    const top = [66, 58, 52, 46][st - 1], r = [4, 6, 7, 9][st - 1];
    const orb = cls === 'lich' ? ['#a3e635', '#5eead4', '#22d3ee', '#a5f3fc'][st - 1] : ['#8fd3ff', '#a78bfa', '#f0abfc', '#fff59d'][st - 1];
    const wood = cls === 'lich' ? (st >= 3 ? '#3f3f46' : '#57534e') : st >= 3 ? '#d4a017' : '#7a4a24';
    s.push(`<line x1="83" y1="134" x2="88" y2="${top}" stroke="${wood}" stroke-width="4" stroke-linecap="round"/>`);
    if (st >= 3) s.push(`<circle cx="88.5" cy="${top - r}" r="${r + 7}" fill="${orb}" opacity=".3"/>`);
    if (cls === 'lich' && st >= 2) {
      s.push(`<circle cx="88.5" cy="${top - r}" r="${r}" fill="${BONE}"/><circle cx="86" cy="${top - r - 1}" r="${r / 3.5}" fill="${orb}"/><circle cx="91" cy="${top - r - 1}" r="${r / 3.5}" fill="${orb}"/><rect x="${86.5}" y="${top - 3}" width="4" height="2" fill="#57534e"/>`);
      if (st === 4) s.push(`<path d="M84 ${top - r * 2} q4 -10 4 -16 q4 6 6 16 Z" fill="#5eead4" opacity=".8"/>`);
    } else {
      s.push(`<circle cx="88.5" cy="${top - r}" r="${r}" fill="${orb}" stroke="#fff" stroke-width="1"/>`);
    }
    if (cls === 'lich' && st === 1) s.push(`<rect x="24" y="96" width="14" height="17" rx="1.5" fill="#44403c" stroke="#a8a29e"/><path d="M31 99 v11" stroke="#a8a29e"/>`);
  } else if (cls === 'archer' || cls === 'elf') {
    const h = [22, 26, 30, 34][st - 1];
    const c = cls === 'elf' ? ['#a16207', '#e5e7eb', '#fde68a', '#bbf7d0'][st - 1] : ['#8b5a2b', '#5d3a1a', '#d4a017', '#5eead4'][st - 1];
    s.push(`<line x1="30" y1="${104 - h}" x2="30" y2="${104 + h}" stroke="#eee" stroke-width="1"/>`);
    s.push(`<path d="M30 ${104 - h} Q16 104 30 ${104 + h}" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>`);
    if (cls === 'elf' && st >= 2) s.push(`<ellipse cx="23" cy="${104 - h / 2}" rx="2" ry="4" fill="#4ade80" transform="rotate(-30 23 ${104 - h / 2})"/><ellipse cx="23" cy="${104 + h / 2}" rx="2" ry="4" fill="#4ade80" transform="rotate(30 23 ${104 + h / 2})"/>`);
    if (st === 4) s.push(`<path d="M30 ${104 - h} Q16 104 30 ${104 + h}" fill="none" stroke="${cls === 'elf' ? '#86efac' : '#5eead4'}" stroke-width="9" opacity=".3"/>`);
  } else if (cls === 'rogue') {
    const blade = st === 4 ? '#c4b5fd' : st >= 3 ? '#e5e7eb' : '#b0b6bb';
    const dagger = (x) => `<path d="M${x - 3} 101 L${x} ${st >= 3 ? 76 : 82} L${x + 3} 101 Z" fill="${blade}" stroke="#6b7280" stroke-width=".6"/><rect x="${x - 6}" y="100" width="12" height="3" fill="${st >= 3 ? '#c62828' : '#4b5563'}"/>`;
    s.push(dagger(83.5));
    if (st >= 2) s.push(dagger(36.5));
    if (st === 4) s.push(`<circle cx="83.5" cy="88" r="12" fill="#a78bfa" opacity=".25"/><circle cx="36.5" cy="88" r="12" fill="#a78bfa" opacity=".25"/>`);
  } else if (cls === 'pirate') {
    const blade = st === 4 ? '#e0f2fe' : '#cfd8dc';
    s.push(`<path d="M84 101 Q${98 + st} 80 ${88 + st} ${62 - st * 3} Q${90 + st} 82 79 100 Z" fill="${blade}" stroke="#78909c" stroke-width=".7"/>`);
    s.push(`<circle cx="83.5" cy="101" r="5" fill="none" stroke="${st >= 3 ? '#f1c40f' : '#795548'}" stroke-width="2"/>`);
    if (st >= 3) {
      // 어깨 위 앵무새
      s.push(`<g transform="translate(36 60)"><ellipse cx="0" cy="0" rx="6" ry="9" fill="#e53935"/><ellipse cx="2" cy="2" rx="3.5" ry="6" fill="#1e88e5"/>
        <circle cx="-1" cy="-7" r="4.5" fill="#e53935"/><path d="M-5 -7 l-4 2 l4 1 Z" fill="#fbc02d"/><circle cx="-2" cy="-8" r="1" fill="#111"/>
        <path d="M-2 8 l-2 7 M2 8 l1 7" stroke="#2e7d32" stroke-width="2.5"/></g>`);
    }
  } else if (cls === 'ogre') {
    const y = 66 - st * 6, c = st >= 3 ? '#57534e' : '#7a4a24';
    s.push(`<line x1="82" y1="112" x2="92" y2="${y + 10}" stroke="#6b4423" stroke-width="5" stroke-linecap="round"/>`);
    if (st === 4) s.push(`<ellipse cx="94" cy="${y}" rx="${14 + st}" ry="${20 + st * 2}" fill="#a3e635" opacity=".25" transform="rotate(12 94 ${y})"/>`);
    s.push(`<ellipse cx="94" cy="${y}" rx="${6 + st * 2}" ry="${12 + st * 3}" fill="${c}" transform="rotate(12 94 ${y})"/>`);
    if (st >= 2) for (const [dx, dy] of [[-8, -6], [8, -2], [-6, 8], [7, 10], [0, -14]].slice(0, st + 1))
      s.push(`<path d="M${94 + dx} ${y + dy} l${dx > 0 ? 6 : -6} -2 l${dx > 0 ? -5 : 5} 4 Z" fill="#d6d3d1"/>`);
    if (st >= 3) s.push(`<path d="M${86} ${y + 4} h16 M86 ${y - 6} h16" stroke="#a8a29e" stroke-width="2.5"/>`);
  } else if (cls === 'fairy') {
    const y = 76 - st * 4, r = 3 + st * 1.5, c = st >= 3 ? '#fde68a' : '#fbcfe8';
    s.push(`<line x1="83" y1="106" x2="90" y2="${y}" stroke="${st >= 3 ? '#facc15' : '#f9a8d4'}" stroke-width="2" stroke-linecap="round"/>`);
    if (st >= 2) s.push(`<circle cx="90" cy="${y}" r="${r + 6}" fill="${c}" opacity=".35"/>`);
    s.push(`<path transform="translate(90 ${y}) scale(${r / 5})" d="M0 -6 L1.8 -1.8 L6 -1.6 L2.6 1.2 L3.8 5.6 L0 3 L-3.8 5.6 L-2.6 1.2 L-6 -1.6 L-1.8 -1.8 Z" fill="${c}" stroke="#fff" stroke-width=".8"/>`);
  } else if (cls === 'centaur') {
    const top = 50 - st * 6, c = st >= 3 ? '#facc15' : '#d6d3d1';
    s.push(`<line x1="80" y1="134" x2="92" y2="${top + 10}" stroke="${st >= 3 ? '#92400e' : '#7a4a24'}" stroke-width="3.5" stroke-linecap="round"/>`);
    s.push(`<path d="M${89.5} ${top + 12} L93 ${top - 4} L${96} ${top + 12} Z" fill="${c}" stroke="#78716c" stroke-width=".6"/>`);
    if (st >= 2) s.push(`<path d="M91 ${top + 16} L76 ${top + 20} L91 ${top + 24} Z" fill="${st >= 4 ? '#1e3a8a' : '#b45309'}"/>`);
    if (st === 4) s.push(`<circle cx="93" cy="${top + 4}" r="9" fill="#fde68a" opacity=".35"/>`);
  } else if (cls === 'dryad') {
    const top = 62 - st * 5;
    s.push(`<path d="M83 134 Q78 110 88 96 Q96 82 86 ${top + 10} Q84 ${top} 90 ${top - 2}" stroke="${st >= 3 ? '#65a30d' : '#78350f'}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`);
    s.push(`<ellipse cx="92" cy="104" rx="3" ry="6" fill="#84cc16" transform="rotate(40 92 104)"/><ellipse cx="80" cy="86" rx="3" ry="6" fill="#84cc16" transform="rotate(-40 80 86)"/>`);
    const fc = ['#fef08a', '#f9a8d4', '#f472b6', '#fde68a'][st - 1];
    for (let i = 0; i < 5; i++) s.push(`<circle cx="${(90 + Math.cos(i * 1.26) * (2 + st)).toFixed(1)}" cy="${(top - 2 + Math.sin(i * 1.26) * (2 + st)).toFixed(1)}" r="${1.5 + st * .7}" fill="${fc}"/>`);
    s.push(`<circle cx="90" cy="${top - 2}" r="${1 + st * .5}" fill="#facc15"/>`);
    if (st === 4) s.push(`<circle cx="90" cy="${top - 2}" r="12" fill="#fde68a" opacity=".3"/>`);
  } else if (cls === 'dwarf') {
    s.push(`<line x1="82" y1="114" x2="90" y2="${66 - st * 3}" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>`);
    const y = 64 - st * 3;
    if (st === 1) s.push(`<path d="M76 ${y + 8} Q90 ${y - 4} 104 ${y + 8} Q90 ${y + 2} 76 ${y + 8} Z" fill="#9ca3af" stroke="#4b5563"/>`);
    else {
      const w = 10 + st * 3, c = st >= 3 ? '#facc15' : '#6b7280';
      s.push(`<rect x="${90 - w / 2}" y="${y - 4}" width="${w}" height="${10 + st * 2}" rx="2" fill="${c}" stroke="#44403c"/>`);
      if (st >= 3) s.push(`<path d="M${90 - 3} ${y} l3 4 l3 -4 l-3 6 Z" fill="${st === 4 ? '#38bdf8' : '#b45309'}"/>`);
      if (st === 4) s.push(`<rect x="${90 - w / 2 - 4}" y="${y - 8}" width="${w + 8}" height="${18 + st * 2}" rx="5" fill="#38bdf8" opacity=".3"/>`);
    }
  } else if (cls === 'berserker') {
    const axe = (x, flip) => {
      const top = 70 - st * 4, b = 6 + st * 2, d = flip ? -1 : 1;
      return `<line x1="${x}" y1="112" x2="${x + d * 4}" y2="${top}" stroke="#78350f" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M${x + d * 4} ${top + 2} Q${x + d * (8 + b)} ${top - 4} ${x + d * (10 + b)} ${top + 8} Q${x + d * (8 + b)} ${top + 20} ${x + d * 4} ${top + 16} Z" fill="${st >= 3 ? '#e5e7eb' : '#9ca3af'}" stroke="#4b5563"/>
        ${st === 4 ? `<path d="M${x + d * 4} ${top + 2} Q${x + d * (8 + b)} ${top - 4} ${x + d * (10 + b)} ${top + 8}" stroke="#ef4444" stroke-width="4" opacity=".5" fill="none"/>` : ''}`;
    };
    s.push(axe(84, false));
    if (st >= 3) s.push(axe(36, true));
  } else if (cls === 'vampire') {
    const len = 30 + st * 6;
    s.push(`<line x1="84" y1="102" x2="${88 + st}" y2="${102 - len}" stroke="${st === 4 ? '#fecdd3' : '#e5e7eb'}" stroke-width="2" stroke-linecap="round"/>`);
    s.push(`<path d="M78 100 Q84 92 90 100" stroke="${st >= 3 ? '#facc15' : '#9ca3af'}" stroke-width="2" fill="none"/>`);
    if (st >= 3) s.push(`<circle cx="84" cy="101" r="2" fill="#e11d48"/>`);
    if (st === 4) s.push(`<line x1="84" y1="102" x2="${88 + st}" y2="${102 - len}" stroke="#e11d48" stroke-width="6" opacity=".3"/>`);
    if (st >= 2) s.push(`<g transform="translate(22 ${40 - st * 3})"><path d="M0 0 q-6 -6 -12 -2 q4 2 4 6 q4 -4 8 -2 q4 -2 8 2 q0 -4 4 -6 q-6 -4 -12 2 Z" fill="#1c1917"/><circle cx="-1.5" cy="1" r=".8" fill="#f43f5e"/><circle cx="1.5" cy="1" r=".8" fill="#f43f5e"/></g>`);
  } else if (cls === 'werewolf') {
    if (st === 4) s.push(`<circle cx="36.5" cy="112" r="10" fill="#e0f2fe" opacity=".3"/><circle cx="83.5" cy="112" r="10" fill="#e0f2fe" opacity=".3"/>`);
  } else if (cls === 'naga') {
    const top = 48 - st * 5, c = st >= 3 ? '#facc15' : '#a8a29e';
    s.push(`<line x1="84" y1="134" x2="88" y2="${top + 12}" stroke="${st >= 3 ? '#facc15' : '#78716c'}" stroke-width="3" stroke-linecap="round"/>`);
    s.push(`<path d="M80 ${top + 12} h16 M80 ${top + 12} v-10 M88 ${top + 12} v-14 M96 ${top + 12} v-10" stroke="${c}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);
    s.push(`<path d="M78 ${top + 3} l2 -4 l2 4 Z M86 ${top - 1} l2 -4 l2 4 Z M94 ${top + 3} l2 -4 l2 4 Z" fill="${c}"/>`);
    if (st === 4) s.push(`<circle cx="88" cy="${top + 4}" r="11" fill="#5eead4" opacity=".3"/>`);
  } else if (cls === 'blacksmith') {
    // 망치 (오른손) · 2단계부터 집게로 든 달군 쇳덩이 (왼손)
    const y = 72 - st * 4, hot = ['#9ca3af', '#6b7280', '#f97316', '#facc15'][st - 1];
    s.push(`<line x1="83" y1="112" x2="88" y2="${y + 4}" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>`);
    if (st >= 3) s.push(`<rect x="${78 - st}" y="${y - 6 - st}" width="${20 + st * 2}" height="${12 + st}" rx="3" fill="${hot}" opacity=".35"/>`);
    s.push(`<rect x="${80 - st / 2}" y="${y - 4 - st / 2}" width="${16 + st}" height="${8 + st}" rx="2" fill="${st >= 3 ? '#57534e' : '#6b7280'}" stroke="#292524"/>`);
    if (st >= 2) {
      s.push(`<path d="M36 104 L28 86 M38 104 L33 86" stroke="#57534e" stroke-width="2.2"/>`);
      s.push(`<rect x="25" y="${80 - st}" width="11" height="${6 + st}" rx="1.5" fill="${st >= 3 ? '#fb923c' : '#ef4444'}"/>`);
      if (st >= 3) s.push(`<circle cx="30" cy="${83 - st / 2}" r="${8 + st}" fill="#fdba74" opacity=".35"/>`);
    }
  } else if (cls === 'nomad') {
    if (st === 1) s.push(`<circle cx="86" cy="104" r="8" fill="none" stroke="#a16207" stroke-width="2.2"/><circle cx="86" cy="104" r="5" fill="none" stroke="#a16207" stroke-width="1.8"/><path d="M92 100 Q104 92 100 80" stroke="#a16207" stroke-width="1.8" fill="none"/>`);
    else {
      // 말 위에서 쏘는 짧은 각궁 (왼손)
      const h = 18 + st * 3, c = st >= 4 ? '#facc15' : st >= 3 ? '#7c2d12' : '#92400e';
      s.push(`<line x1="30" y1="${104 - h}" x2="30" y2="${104 + h}" stroke="#eee" stroke-width="1"/>`);
      s.push(`<path d="M30 ${104 - h} Q34 ${104 - h / 2} 20 104 Q34 ${104 + h / 2} 30 ${104 + h}" fill="none" stroke="${c}" stroke-width="3.2" stroke-linecap="round"/>`);
      if (st === 4) s.push(`<path d="M30 ${104 - h} Q34 ${104 - h / 2} 20 104 Q34 ${104 + h / 2} 30 ${104 + h}" fill="none" stroke="#fde68a" stroke-width="8" opacity=".3"/>`);
      if (st >= 3) s.push(`<line x1="84" y1="110" x2="90" y2="${40 - st * 3}" stroke="#78350f" stroke-width="2.5"/><path d="M90 ${40 - st * 3} l12 4 l-12 5 Z" fill="${st >= 4 ? '#b91c1c' : '#1d4ed8'}"/>`);
    }
  } else if (cls === 'knight') {
    if (st === 1) {
      s.push(`<line x1="80" y1="132" x2="90" y2="44" stroke="#78350f" stroke-width="3"/><path d="M88 46 L91 32 L94 47 Z" fill="#9ca3af"/>`);
    } else {
      // 긴 칼 (오른손) + 문장 방패 (왼손)
      const len = [40, 44, 50, 56][st - 1], blade = st === 4 ? '#e0f2fe' : '#e5e7eb';
      if (st === 4) s.push(`<rect x="79" y="${98 - len}" width="10" height="${len}" rx="4" fill="#fde68a" opacity=".4"/>`);
      s.push(`<rect x="82" y="${100 - len}" width="4" height="${len}" fill="${blade}" stroke="#94a3b8" stroke-width=".6"/><path d="M82 ${100 - len} L84 ${93 - len} L86 ${100 - len} Z" fill="${blade}"/>`);
      s.push(`<rect x="75" y="99" width="18" height="3.5" rx="1" fill="${st >= 4 ? '#facc15' : '#78716c'}"/><rect x="82" y="102" width="4" height="10" fill="#451a03"/><circle cx="84" cy="113" r="2.3" fill="${st >= 4 ? '#facc15' : '#78716c'}"/>`);
      const sc = p.tabard || '#f5f5f4';
      s.push(`<path d="M22 86 H48 V102 Q48 118 35 126 Q22 118 22 102 Z" fill="${sc}" stroke="${p.trim}" stroke-width="2.5"/>`);
      s.push(st >= 3
        ? `<path d="M30 96 l5 -5 l5 5 l-2 8 l3 6 h-12 l3 -6 Z" fill="${st >= 4 ? '#facc15' : '#fde68a'}"/>`
        : `<path d="M35 90 v26 M26 100 h18" stroke="${p.trim}" stroke-width="3"/>`);
    }
  } else if (cls === 'reaper') {
    // 큰 낫 (날은 두건 밖 오른쪽으로)
    const top = 32 - st * 6, w = 8 + st * 3, c = st === 4 ? '#c4b5fd' : st >= 3 ? '#e5e7eb' : '#9ca3af';
    s.push(`<line x1="80" y1="138" x2="94" y2="${top}" stroke="${st >= 3 ? '#a8a29e' : '#78716c'}" stroke-width="3.5" stroke-linecap="round"/>`);
    s.push(`<path d="M94 ${top} Q${94 + w} ${top - 8} ${94 + w * 1.5} ${top + 12} Q${94 + w * .8} ${top + 2} 94 ${top + 6} Z" fill="${c}" stroke="#57534e" stroke-width=".7"/>`);
    if (st >= 3) s.push(`<path d="M94 ${top} Q${94 + w} ${top - 8} ${94 + w * 1.5} ${top + 12}" stroke="#a78bfa" stroke-width="5" opacity=".35" fill="none"/>`);
  } else if (cls === 'duke') {
    // 얼음빛 장검
    const len = [36, 44, 50, 56][st - 1], blade = ['#cbd5e1', '#e2e8f0', '#bfdbfe', '#e0f2fe'][st - 1];
    if (st >= 3) s.push(`<rect x="79" y="${98 - len}" width="10" height="${len}" rx="4" fill="#93c5fd" opacity="${st === 4 ? .45 : .25}"/>`);
    s.push(`<rect x="82" y="${100 - len}" width="4" height="${len}" fill="${blade}" stroke="#64748b" stroke-width=".6"/><path d="M82 ${100 - len} L84 ${93 - len} L86 ${100 - len} Z" fill="${blade}"/>`);
    s.push(`<path d="M75 101 Q84 96 93 101" stroke="${st >= 4 ? '#facc15' : '#94a3b8'}" stroke-width="3.5" fill="none"/><rect x="82" y="102" width="4" height="10" fill="#0f172a"/><circle cx="84" cy="113" r="2.4" fill="${st >= 3 ? '#93c5fd' : '#94a3b8'}"/>`);
  } else if (cls === 'monk') {
    // 맨손: 3단계부터 주먹에 기(氣)가 모임
    if (st >= 3) {
      const c = st === 4 ? '#fde047' : '#fb923c';
      s.push(`<circle cx="36.5" cy="104" r="${10 + st}" fill="${c}" opacity=".35"/><circle cx="83.5" cy="104" r="${10 + st}" fill="${c}" opacity=".35"/>`);
    }
  } else if (cls === 'cleric') {
    if (st === 1) s.push(`<rect x="24" y="94" width="14" height="18" rx="1.5" fill="#78350f" stroke="#fde68a"/><path d="M31 98 v10 M27.5 101.5 h7" stroke="#fde68a" stroke-width="1.5"/>`);
    else {
      const top = 52 - st * 4, c = st >= 3 ? '#facc15' : '#d6d3d1';
      s.push(`<line x1="83" y1="134" x2="88" y2="${top + 8}" stroke="${st >= 3 ? '#a16207' : '#78350f'}" stroke-width="3.5" stroke-linecap="round"/>`);
      if (st >= 3) s.push(`<circle cx="88" cy="${top}" r="${8 + st}" fill="#fef08a" opacity=".35"/><circle cx="88" cy="${top}" r="6" fill="none" stroke="${c}" stroke-width="2.5"/>`);
      s.push(`<path d="M88 ${top - 9} v18 M82 ${top - 3} h12" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`);
    }
  } else if (cls === 'bard') {
    if (st === 1) s.push(`<line x1="80" y1="104" x2="98" y2="84" stroke="#d6a35c" stroke-width="3.5" stroke-linecap="round"/><circle cx="86" cy="97.5" r=".9" fill="#451a03"/><circle cx="90" cy="93" r=".9" fill="#451a03"/><circle cx="94" cy="88.5" r=".9" fill="#451a03"/>`);
    else {
      // 류트 (왼손) + 떠다니는 음표
      const wood = st === 4 ? '#facc15' : st === 3 ? '#9a3412' : '#b45309';
      s.push(`<line x1="44" y1="96" x2="68" y2="72" stroke="#451a03" stroke-width="3.5" stroke-linecap="round"/>`);
      s.push(`<ellipse cx="38" cy="104" rx="11" ry="13" transform="rotate(-40 38 104)" fill="${wood}" stroke="#451a03" stroke-width="1"/><circle cx="40" cy="102" r="3.2" fill="#292524"/>`);
      s.push(`<path d="M34 108 L66 74" stroke="#fef3c7" stroke-width=".6"/>`);
      const note = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="2.2" fill="${st >= 3 ? '#fde047' : '#f5d0fe'}" transform="rotate(-20 ${x} ${y})"/><path d="M${x + 2.6} ${y - 1} v-9 l5 2" stroke="${st >= 3 ? '#fde047' : '#f5d0fe'}" stroke-width="1.3" fill="none"/>`;
      s.push(note(96, 58), st >= 3 ? note(20, 50) : '', st === 4 ? note(104, 30) : '');
    }
  } else if (cls === 'catfolk') {
    if (st === 1) s.push(`<path d="M84 104 L98 82" stroke="#e5e7eb" stroke-width="2"/><path d="M88 98 l4 3 M91 93 l4 3 M94 88 l4 3 M86 96 l-3 -2 M89 91 l-3 -2" stroke="#e5e7eb" stroke-width="1.4"/><path d="M96 84 l5 -6 l2 6 Z" fill="#e5e7eb"/>`);
    else {
      const blade = st === 4 ? '#fde68a' : st >= 3 ? '#e5e7eb' : '#cbd5e1';
      const knife = x => `<path d="M${x - 2.5} 100 L${x} ${st >= 3 ? 74 : 80} L${x + 2.5} 100 Z" fill="${blade}" stroke="#64748b" stroke-width=".6"/><rect x="${x - 5}" y="99" width="10" height="3" fill="${st >= 3 ? '#b91c1c' : '#57534e'}"/>`;
      s.push(knife(83.5));
      if (st >= 3) s.push(knife(36.5));
      if (st === 4) s.push(`<circle cx="83.5" cy="88" r="11" fill="#fde68a" opacity=".3"/><circle cx="36.5" cy="88" r="11" fill="#fde68a" opacity=".3"/>`);
    }
  } else if (cls === 'angel') {
    if (st === 1) s.push(`<path d="M82 104 L96 90 L100 84 Q104 82 102 90 L98 92 Z" fill="#fde68a" stroke="#ca8a04" stroke-width=".8"/>`);
    else {
      // 빛의 창
      const top = 50 - st * 6;
      s.push(`<line x1="83" y1="134" x2="89" y2="${top + 12}" stroke="${st >= 3 ? '#facc15' : '#e5e7eb'}" stroke-width="3" stroke-linecap="round"/>`);
      s.push(`<path d="M86 ${top + 14} L89.5 ${top - 2} L93 ${top + 14} Z" fill="#fef9c3" stroke="#facc15" stroke-width=".8"/>`);
      if (st >= 3) s.push(`<circle cx="89.5" cy="${top + 6}" r="${8 + st}" fill="#fef08a" opacity=".35"/>`);
    }
  } else if (cls === 'demon') {
    // 삼지창 → 불꽃 삼지창
    const top = 52 - st * 5, c = st >= 3 ? '#1c1917' : '#57534e';
    s.push(`<line x1="84" y1="134" x2="88" y2="${top + 12}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`);
    s.push(`<path d="M80 ${top + 12} h16 M80 ${top + 12} v-9 M88 ${top + 12} v-13 M96 ${top + 12} v-9" stroke="${c}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);
    if (st >= 2) s.push(`<path d="M84 ${top + 2} q4 -10 4 -16 q4 6 6 16 Z" fill="${st >= 4 ? '#a855f7' : '#f97316'}" opacity=".85"/>`);
  } else if (cls === 'golem') {
    const y = 68 - st * 4, c = ['#a8a29e', '#78716c', '#64748b', '#7dd3fc'][st - 1];
    s.push(`<line x1="83" y1="112" x2="90" y2="${y + 8}" stroke="${st >= 3 ? '#475569' : '#78350f'}" stroke-width="4" stroke-linecap="round"/>`);
    s.push(`<path d="M${82 - st} ${y} L${88} ${y - 6 - st} L${98 + st} ${y - 2} L${100 + st} ${y + 8} L${90} ${y + 14} L${80 - st} ${y + 8} Z" fill="${c}" stroke="#44403c"/>`);
    if (st >= 3) s.push(`<path d="M86 ${y + 2} l4 4 l4 -4" stroke="#38bdf8" stroke-width="1.5" fill="none"/>`);
    if (st === 4) s.push(`<circle cx="90" cy="${y + 3}" r="14" fill="#bae6fd" opacity=".35"/>`);
  }
  return s.join('');
}

function headgear(cls, st, p) {
  if (st === 0) return '';
  if (cls === 'warrior') {
    if (st === 1) return `<rect x="38" y="33" width="44" height="6" fill="#c0392b"/><path d="M82 35 l8 6 l-2 3 Z" fill="#c0392b"/>`;
    const h = [`<path d="M36 42 Q36 18 60 18 Q84 18 84 42 Z" fill="${p.helm}" stroke="${p.trim}" stroke-width="1.5"/><rect x="58" y="38" width="4" height="13" fill="${p.helm}"/>`];
    if (st >= 3) h.push(`<path d="M60 19 Q72 2 88 8 Q75 11 64 22 Z" fill="#c62828"/>`);
    if (st === 4) h.push(`<path d="M42 22 L46 8 L53 17 L60 3 L67 17 L74 8 L78 22 Z" fill="#f1c40f" stroke="#b8860b"/><circle cx="60" cy="12" r="2" fill="#e53935"/>`);
    return h.join('');
  }
  if (cls === 'mage') {
    const h = [`<path d="M36 34 L84 34 L66 ${st >= 3 ? -8 : 0} Q60 -4 56 8 Z" fill="${p.hat}"/>`,
      `<ellipse cx="60" cy="34" rx="30" ry="6" fill="${p.hat}"/>`];
    if (st >= 2) h.push(`<rect x="38" y="28" width="44" height="5" fill="${p.trim}"/>`);
    if (st >= 3) h.push(`<path d="M52 18 l1.5 3 l3 .5 l-2.3 2 l.6 3 l-2.8 -1.5 l-2.8 1.5 l.6 -3 l-2.3 -2 l3 -.5 Z" fill="#fde68a"/>`);
    if (st === 4) h.push(`<circle cx="66" cy="-8" r="6" fill="#fff59d" opacity=".5"/><circle cx="66" cy="-8" r="3" fill="#fff59d"/>`);
    return h.join('');
  }
  if (cls === 'archer') {
    if (st === 1) return `<rect x="38" y="33" width="44" height="5" fill="${p.tunic}"/><path d="M80 34 Q92 22 90 12 Q86 24 78 32 Z" fill="#e53935"/>`;
    const h = [`<path d="M34 52 Q30 14 60 14 Q90 14 86 52 Q84 30 60 28 Q36 30 34 52 Z" fill="${p.hood}"/>`];
    if (st >= 3) h.push(`<path d="M82 30 Q98 18 96 6 Q90 20 80 27 Z" fill="${st === 4 ? '#f1c40f' : '#e53935'}"/>`);
    if (st === 4) h.push(`<path d="M40 30 Q60 24 80 30" stroke="#f1c40f" stroke-width="3" fill="none"/><circle cx="60" cy="27" r="2.5" fill="#5eead4"/>`);
    return h.join('');
  }
  if (cls === 'rogue') {
    const mask = `<path d="M40 54 Q60 50 80 54 L78 64 Q60 72 42 64 Z" fill="${st === 4 ? '#2e1065' : '#2b2b2b'}"/>`;
    if (st === 1) return mask;
    const h = [`<path d="M34 54 Q30 14 60 14 Q90 14 86 54 Q84 30 60 28 Q36 30 34 54 Z" fill="${p.hood}"/>`, mask];
    if (st >= 3) h.push(`<path d="M42 66 Q60 74 78 66 L80 72 Q60 80 40 72 Z" fill="${p.trim}"/>`);
    return h.join('');
  }
  if (cls === 'pirate') {
    if (st === 1) return `<path d="M37 40 Q38 20 60 20 Q82 20 83 40 Z" fill="#c0392b"/><circle cx="48" cy="30" r="1.5" fill="#fff"/><circle cx="66" cy="27" r="1.5" fill="#fff"/><path d="M82 36 l9 4 l-3 5 Z M82 36 l7 9 l-5 1 Z" fill="#c0392b"/>`;
    const h = [];
    if (st >= 3) h.push(`<path d="M44 44 L80 39" stroke="#111" stroke-width="2"/><ellipse cx="67" cy="50" rx="5.5" ry="5" fill="#111"/>`);
    const big = st === 4 ? 6 : 0;
    h.push(`<path d="M${30 - big} 34 Q60 ${14 - big} ${90 + big} 34 Q76 28 60 30 Q44 28 ${30 - big} 34 Z" fill="#222"/>`);
    h.push(`<path d="M${40 - big / 2} 31 Q60 ${4 - big} ${80 + big / 2} 31 Z" fill="#222"/>`);
    if (st >= 3) h.push(`<path d="M${30 - big} 34 Q60 ${14 - big} ${90 + big} 34" stroke="#f1c40f" stroke-width="2" fill="none"/><circle cx="60" cy="20" r="4" fill="#fff"/><path d="M57.5 19 h1.5 M61 19 h1.5" stroke="#222" stroke-width="1.3"/>`);
    if (st === 4) h.push(`<path d="M76 24 Q98 4 104 14 Q92 14 80 28 Z" fill="#fff"/>`);
    return h.join('');
  }
  // 왕관·띠 (새 직업 공용)
  const band = (c, y = 33) => `<path d="M39 ${y + 4} Q60 ${y - 2} 81 ${y + 4} L81 ${y + 8} Q60 ${y + 2} 39 ${y + 8} Z" fill="${c}"/>`;
  const crown = (c, gem, y = 24) => `<path d="M43 ${y + 10} L45 ${y - 2} L52 ${y + 5} L60 ${y - 8} L68 ${y + 5} L75 ${y - 2} L77 ${y + 10} Z" fill="${c}" stroke="#b8860b"/><circle cx="60" cy="${y + 3}" r="2.2" fill="${gem}"/>`;
  const hood = c => `<path d="M34 54 Q30 14 60 14 Q90 14 86 54 Q84 30 60 28 Q36 30 34 54 Z" fill="${c}"/>`;
  const glowGem = (c, y) => `<circle cx="60" cy="${y}" r="6" fill="${c}" opacity=".4"/>`;
  if (cls === 'elf') {
    if (st === 1) return band('#65a30d');
    if (st === 2) return band('#d1d5db') + `<ellipse cx="60" cy="33" rx="2.5" ry="4" fill="#4ade80"/>`;
    if (st === 3) return band('#facc15') + `<path d="M60 26 l3 5 l-3 4 l-3 -4 Z" fill="#22c55e"/>`;
    return glowGem('#86efac', 26) + crown('#facc15', '#34d399', 22);
  }
  if (cls === 'ogre') {
    if (st === 3) return band('#6b7280');
    if (st === 4) return crown('#a16207', '#dc2626', 20) + `<path d="M48 22 l-2 -5 M72 22 l2 -5" stroke="#fffde7" stroke-width="2"/>`;
    return '';
  }
  if (cls === 'fairy') {
    if (st === 1) return `<circle cx="74" cy="30" r="4" fill="#fbcfe8"/><circle cx="74" cy="30" r="1.6" fill="#facc15"/>`;
    if (st === 2) return [44, 52, 60, 68, 76].map((x, i) => `<circle cx="${x}" cy="${30 - (i % 2) * 2}" r="3" fill="${['#f9a8d4', '#fde68a', '#c4b5fd'][i % 3]}"/>`).join('');
    if (st === 3) return `<path d="M46 32 L50 22 L55 28 L60 18 L65 28 L70 22 L74 32 Z" fill="#e5e7eb" stroke="#a5b4fc"/><circle cx="60" cy="25" r="2" fill="#a5f3fc"/>`;
    return glowGem('#fde68a', 22) + crown('#fde68a', '#f472b6', 20);
  }
  if (cls === 'centaur') {
    if (st === 1) return band('#b45309');
    if (st === 2) return band('#92400e') + `<path d="M80 34 Q94 22 92 10 Q88 22 78 32 Z" fill="#fff"/>`;
    const leaves = [];
    for (let i = 0; i < 6; i++) leaves.push(`<ellipse cx="${42 + i * 3.4}" cy="${31 - i * 1.4}" rx="2" ry="4" fill="${st === 4 ? '#facc15' : '#65a30d'}" transform="rotate(${-50 + i * 8} ${42 + i * 3.4} ${31 - i * 1.4})"/><ellipse cx="${78 - i * 3.4}" cy="${31 - i * 1.4}" rx="2" ry="4" fill="${st === 4 ? '#facc15' : '#65a30d'}" transform="rotate(${50 - i * 8} ${78 - i * 3.4} ${31 - i * 1.4})"/>`);
    return leaves.join('') + (st === 4 ? glowGem('#fde68a', 24) : '');
  }
  if (cls === 'lich') {
    if (st <= 2) return hood(p.hood);
    if (st === 3) return `<path d="M40 30 L42 16 L48 24 L54 12 L60 22 L66 12 L72 24 L78 16 L80 30 Z" fill="#52525b" stroke="#a1a1aa"/><circle cx="60" cy="26" r="2.4" fill="#5eead4"/>`;
    return glowGem('#5eead4', 14) + `<path d="M38 30 L40 10 L48 20 L54 4 L60 16 L66 4 L72 20 L80 10 L82 30 Z" fill="#facc15" stroke="#b8860b"/><circle cx="60" cy="24" r="3" fill="#22d3ee"/><circle cx="48" cy="26" r="1.8" fill="#a855f7"/><circle cx="72" cy="26" r="1.8" fill="#a855f7"/>`;
  }
  if (cls === 'skeleton') {
    if (st === 1) return `<path d="M38 38 Q60 30 82 38 L80 42 Q60 35 40 42 Z" fill="#e7e5e4"/><path d="M44 36 l4 6 M70 36 l-3 6" stroke="#a8a29e"/>`;
    const h = [`<path d="M36 40 Q36 18 60 18 Q84 18 84 40 L78 40 Q76 28 60 28 Q44 28 42 40 Z" fill="${p.helm}" stroke="${p.trim}" stroke-width="1.2"/>`];
    if (st >= 3) h.push(`<path d="M40 26 Q30 16 32 4 Q38 16 46 22 Z M80 26 Q90 16 88 4 Q82 16 74 22 Z" fill="${BONE}"/>`);
    if (st === 4) h.push(crown('#1e293b', '#38bdf8', 12).replace('#b8860b', '#38bdf8'));
    return h.join('');
  }
  if (cls === 'dryad') {
    if (st === 2) return `<circle cx="74" cy="28" r="4" fill="#f9a8d4"/><circle cx="74" cy="28" r="1.6" fill="#facc15"/>`;
    if (st >= 3) {
      const f = [44, 52, 60, 68, 76].map((x, i) => `<circle cx="${x}" cy="${28 - (i % 2) * 2}" r="3" fill="${['#f9a8d4', '#fde68a', '#fbcfe8'][i % 3]}"/>`).join('');
      if (st === 3) return f;
      return `<path d="M44 26 Q40 10 30 4 M40 14 L32 14 M76 26 Q80 10 90 4 M80 14 L88 14" stroke="#78350f" stroke-width="3" fill="none" stroke-linecap="round"/>` +
        `<circle cx="30" cy="4" r="3" fill="#86efac"/><circle cx="90" cy="4" r="3" fill="#86efac"/>` + f + glowGem('#fde68a', 22);
    }
    return '';
  }
  if (cls === 'dwarf') {
    if (st === 1) return `<path d="M38 38 Q38 22 60 22 Q82 22 82 38 Z" fill="#a16207"/><rect x="36" y="36" width="48" height="4" rx="2" fill="#78350f"/><circle cx="60" cy="30" r="4" fill="#fef08a" stroke="#78350f"/>`;
    const h = [`<path d="M36 40 Q36 18 60 18 Q84 18 84 40 Z" fill="${p.helm}" stroke="#44403c"/><rect x="36" y="37" width="48" height="5" rx="2" fill="${p.trim === '#facc15' ? '#78350f' : '#6b7280'}"/>`];
    if (st >= 3) h.push(`<path d="M37 34 Q24 30 22 14 Q30 24 40 26 Z M83 34 Q96 30 98 14 Q90 24 80 26 Z" fill="#f5f0e1" stroke="#a8a29e"/>`);
    if (st === 4) h.push(`<path d="M48 20 L50 10 L55 16 L60 6 L65 16 L70 10 L72 20 Z" fill="#facc15" stroke="#b8860b"/><circle cx="60" cy="28" r="2.5" fill="#38bdf8"/>`);
    return h.join('');
  }
  if (cls === 'berserker') {
    if (st === 1) return band('#7f1d1d', 32);
    if (st === 2) return `<path d="M36 40 Q34 18 60 18 Q86 18 84 40 Q72 30 60 30 Q48 30 36 40 Z" fill="${p.fur}"/><path d="M36 40 l-2 6 M84 40 l2 6" stroke="${p.fur}" stroke-width="3"/>`;
    const h = [`<path d="M36 40 Q36 18 60 18 Q84 18 84 40 Z" fill="${p.helm}" stroke="#44403c"/>`,
      `<path d="M37 32 Q20 28 18 8 Q28 22 40 24 Z M83 32 Q100 28 102 8 Q92 22 80 24 Z" fill="#f5f0e1" stroke="#a8a29e"/>`];
    if (st === 4) h.push(`<path d="M60 18 l-4 -10 l4 4 l4 -4 Z" fill="#ef4444"/>`);
    return h.join('');
  }
  if (cls === 'vampire') {
    if (st === 4) return crown('#1c1917', '#e11d48', 14).replace('#b8860b', '#facc15');
    return '';
  }
  if (cls === 'werewolf') {
    if (st === 1) return band('#7c5c3e', 30);
    if (st === 4) return `<path d="M60 26 a5 5 0 1 0 4 8 a4 4 0 1 1 -4 -8 Z" fill="#e0f2fe"/>` + glowGem('#e0f2fe', 30);
    return '';
  }
  if (cls === 'naga') {
    if (st === 1) return band('#0f766e');
    if (st === 3) return band('#facc15') + `<path d="M60 28 l3 5 l-3 4 l-3 -4 Z" fill="#14b8a6"/>`;
    if (st === 4) return glowGem('#5eead4', 22) + crown('#facc15', '#14b8a6', 20);
    return '';
  }
  if (cls === 'blacksmith') {
    if (st === 1) return band('#9a3412', 32);
    if (st === 2) return `<path d="M38 40 Q38 22 60 22 Q82 22 82 40 Z" fill="#57534e"/><rect x="36" y="37" width="48" height="4" rx="2" fill="#44403c"/>`;
    const g = st === 4 ? '#facc15' : '#78716c';
    return band('#7c2d12', 32) + `<circle cx="51" cy="33" r="5.5" fill="#1e293b" stroke="${g}" stroke-width="2"/><circle cx="69" cy="33" r="5.5" fill="#1e293b" stroke="${g}" stroke-width="2"/><circle cx="50" cy="32" r="1.5" fill="#fdba74"/><circle cx="68" cy="32" r="1.5" fill="#fdba74"/>`;
  }
  if (cls === 'nomad') {
    if (st === 1) return `<path d="M38 38 Q40 18 60 18 Q80 18 82 38 Z" fill="#a16207"/><rect x="38" y="35" width="44" height="5" rx="2" fill="#78350f"/>`;
    const fur = st === 4 ? '#f5f5f4' : '#78350f', top = st === 4 ? '#b91c1c' : st >= 3 ? '#1d4ed8' : '#7f1d1d';
    const h = [`<path d="M42 32 Q46 ${8 - st * 2} 60 ${4 - st * 2} Q74 ${8 - st * 2} 78 32 Z" fill="${top}"/>`,
      `<path d="M34 40 Q34 26 60 26 Q86 26 86 40 Q72 34 60 34 Q48 34 34 40 Z" fill="${fur}"/>`];
    if (st >= 3) h.push(`<path d="M60 ${4 - st * 2} Q70 -6 80 -2" stroke="${st === 4 ? '#facc15' : '#ef4444'}" stroke-width="2.5" fill="none"/>`);
    if (st === 4) h.push(`<circle cx="60" cy="18" r="3" fill="#facc15"/>`);
    return h.join('');
  }
  if (cls === 'knight') {
    if (st === 1) return `<path d="M34 38 Q36 20 60 20 Q84 20 86 38 Q60 32 34 38 Z" fill="${p.helm}" stroke="#57534e"/>`;
    if (st === 2) return `<path d="M36 50 Q34 18 60 18 Q86 18 84 50 Q82 36 78 34 Q60 30 42 34 Q38 36 36 50 Z" fill="#9ca3af" stroke="#6b7280"/><path d="M38 40 Q36 20 60 18 Q84 20 82 40 Z" fill="${p.helm}"/><rect x="58" y="38" width="4" height="14" fill="${p.helm}"/>`;
    // 3단계부터: 얼굴을 다 덮는 통 투구 + 깃털 장식
    const h = [`<path d="M37 68 L37 30 Q37 20 60 19 Q83 20 83 30 L83 68 Z" fill="${p.helm}" stroke="${p.trim}" stroke-width="1.5"/>`,
      `<rect x="40" y="44" width="40" height="3.5" rx="1" fill="#111"/><path d="M60 50 v14" stroke="#111" stroke-width="2"/>`,
      `<circle cx="68" cy="56" r="1" fill="#111"/><circle cx="72" cy="56" r="1" fill="#111"/><circle cx="68" cy="60" r="1" fill="#111"/><circle cx="72" cy="60" r="1" fill="#111"/>`,
      `<path d="M60 20 Q50 0 66 -6 Q64 6 70 14 Q66 18 60 20 Z" fill="${p.trim}"/>`];
    if (st === 4) h.push(`<path d="M44 24 L46 12 L52 19 L60 8 L68 19 L74 12 L76 24 Z" fill="#facc15" stroke="#b8860b"/>`);
    return h.join('');
  }
  if (cls === 'duke') {
    if (st === 1) return `<path d="M36 40 Q36 18 60 18 Q84 18 84 40 Z" fill="#475569"/><rect x="34" y="34" width="52" height="8" rx="4" fill="${p.fur}"/>`;
    if (st === 3) return band('#cbd5e1') + `<path d="M60 26 l3 5 l-3 4 l-3 -4 Z" fill="#60a5fa"/>`;
    if (st === 4) return glowGem('#bfdbfe', 18) + `<path d="M42 30 L44 12 L50 22 L55 6 L60 18 L65 6 L70 22 L76 12 L78 30 Z" fill="#e0f2fe" stroke="#60a5fa" stroke-width="1.2"/><circle cx="60" cy="25" r="2.6" fill="#3b82f6"/>`;
    return '';
  }
  if (cls === 'monk') {
    const c = ['#dc2626', '#dc2626', '#1c1917', '#facc15'][st - 1];
    return band(c, 32) + `<path d="M80 36 Q92 38 96 48 M80 38 Q90 44 90 54" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }
  if (cls === 'cleric') {
    if (st === 1) return hood(p.hood);
    if (st === 2) return `<path d="M46 27 Q60 16 74 27 Z" fill="#ffffff" stroke="#d6d3d1"/>`;
    // 3단계부터 주교관(뾰족한 모자), 4단계는 금빛 + 후광
    const h = [`<path d="M45 34 L49 8 L60 0 L71 8 L75 34 Z" fill="${p.hat}" stroke="${p.trim}" stroke-width="1.5"/>`,
      `<path d="M60 8 v18 M54 15 h12" stroke="${p.trim === '#facc15' ? '#b91c1c' : p.trim}" stroke-width="2.5"/>`];
    if (st === 4) h.unshift(`<ellipse cx="60" cy="16" rx="30" ry="30" fill="#fef9c3" opacity=".25"/>`);
    return h.join('');
  }
  if (cls === 'bard') {
    if (st === 1) return `<ellipse cx="55" cy="27" rx="22" ry="8" fill="${p.hat}"/><circle cx="55" cy="21" r="3" fill="${p.hat}"/>`;
    const big = st >= 3 ? 4 : 0;
    const h = [`<ellipse cx="56" cy="27" rx="${24 + big}" ry="${8 + big / 2}" fill="${p.hat}"/>`,
      `<path d="M66 24 Q${86 + big * 2} ${6 - big * 2} ${98 + big} ${8 - big} Q${86 + big} 16 70 26 Z" fill="${st >= 3 ? '#fde047' : '#f9a8d4'}"/>`];
    if (st === 4) h.push(`<path d="M34 28 Q56 32 80 27" stroke="#facc15" stroke-width="2.5" fill="none"/>`);
    return h.join('');
  }
  if (cls === 'catfolk') {
    if (st === 3) return band('#b91c1c', 33) + `<path d="M80 36 Q92 30 96 20 Q90 30 80 33 Z" fill="#fde047"/>`;
    if (st === 4) return crown('#facc15', '#ef4444', 18);
    return '';
  }
  if (cls === 'angel') {
    if (st === 4) return `<path d="M40 32 Q60 24 80 32" stroke="#facc15" stroke-width="3" fill="none"/>` +
      [44, 52, 68, 76].map(x => `<ellipse cx="${x}" cy="29" rx="2" ry="4" fill="#facc15" transform="rotate(${x < 60 ? -40 : 40} ${x} 29)"/>`).join('');
    return '';
  }
  if (cls === 'demon') {
    if (st === 4) return crown('#1c1917', '#a855f7', 16).replace('#b8860b', '#facc15');
    return '';
  }
  if (cls === 'golem') {
    if (st === 3) return `<path d="M54 36 h12 M60 32 v8" stroke="#38bdf8" stroke-width="2"/>`;
    if (st === 4) return `<path d="M44 26 L42 6 L50 20 Z M60 20 L60 -2 L66 18 Z M76 26 L80 6 L72 20 Z" fill="#bae6fd" stroke="#0ea5e9"/>` + glowGem('#bae6fd', 12) + `<path d="M54 36 h12 M60 32 v8" stroke="#0ea5e9" stroke-width="2"/>`;
    return '';
  }
  return '';
}

// 슬라임: 사람 몸 대신 말랑한 젤리 몸. 단계마다 커지고 색·장식이 바뀜
function slimeSVG(stage, fem) {
  const C = [['#a7f3d0', '#34d399'], ['#bae6fd', '#38bdf8'], ['#fbcfe8', '#f472b6'], ['#86efac', '#16a34a'], ['#4ade80', '#15803d'],
    ['#e2e8f0', '#64748b'], ['#fde68a', '#d97706'], ['#99f6e4', '#0d9488'], ['#c4b5fd', '#7c3aed'], ['#93c5fd', '#1d4ed8']][stage - 1];
  const w = 34 + stage * 5, h = w * .78, top = 138 - h, cy = 138 - h * .52;
  const o = [`<svg viewBox="0 -14 120 164" xmlns="http://www.w3.org/2000/svg" class="hero-svg">`];
  o.push(`<defs><radialGradient id="aura-slime"><stop offset="0" stop-color="#86efac" stop-opacity=".75"/><stop offset="1" stop-color="#86efac" stop-opacity="0"/></radialGradient></defs>`);
  if (stage >= 9) o.push(`<circle cx="60" cy="96" r="60" fill="url(#aura-slime)"/>`);
  if (stage === 10) o.push(wings10('rays'));
  if (stage >= 7) for (const [x, y, s] of [[14, 40, 1], [106, 30, 1.2], [104, 100, .9], [16, 108, 1]])
    o.push(`<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z" fill="#fff6b0"/>`);
  o.push(`<ellipse cx="60" cy="140" rx="${w / 2 + 4}" ry="5" fill="rgba(0,0,0,.25)"/>`);
  // 9단계: 등 뒤 망토
  if (stage >= 9) o.push(`<path d="M${60 - w * .35} ${cy - 4} Q60 ${cy - 14} ${60 + w * .35} ${cy - 4} L${60 + w * .55} 138 L${60 - w * .55} 138 Z" fill="${stage === 10 ? '#b91c1c' : '#4c1d95'}"/>`);
  // 몸통 (2단계 물방울은 위가 뾰족)
  const peak = stage === 2 ? `Q${60 - w * .15} ${top + h * .25} 60 ${top - 8} Q${60 + w * .15} ${top + h * .25}` : `Q${60 - w / 2} ${top} 60 ${top} Q${60 + w / 2} ${top}`;
  o.push(`<path d="M${60 - w / 2} 138 ${stage === 2 ? `Q${60 - w / 2} ${top + h * .4} ${60 - w * .2} ${top + h * .2} ` : ''}${peak} ${60 + w / 2} 138 Z" fill="${C[0]}" stroke="${C[1]}" stroke-width="2"/>`);
  o.push(`<path d="M${60 - w / 2 + 4} 136 q4 6 8 0 M${60 + w / 2 - 14} 136 q4 6 8 0" fill="${C[0]}" stroke="${C[1]}" stroke-width="1.5"/>`);
  o.push(`<ellipse cx="${60 - w * .22}" cy="${top + h * .28}" rx="${w * .1}" ry="${h * .08}" fill="#fff" opacity=".7"/>`);
  if (stage === 6) o.push(`<path d="M${60 - w * .3} ${cy + 14} h${w * .6}" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3 3"/>`);
  // 얼굴
  const ex = w * .17, er = 2.6 + stage * .25;
  o.push(`<circle cx="${60 - ex}" cy="${cy}" r="${er}" fill="#1f2937"/><circle cx="${60 + ex}" cy="${cy}" r="${er}" fill="#1f2937"/>`);
  o.push(`<circle cx="${60 - ex + 1}" cy="${cy - 1}" r="${er * .35}" fill="#fff"/><circle cx="${60 + ex + 1}" cy="${cy - 1}" r="${er * .35}" fill="#fff"/>`);
  if (fem) o.push(`<path d="M${60 - ex - er} ${cy - er + .5} l-2.5 -2 M${60 + ex + er} ${cy - er + .5} l2.5 -2" stroke="#1f2937" stroke-width="1.2" stroke-linecap="round"/>`);
  o.push(`<ellipse cx="${60 - ex * 1.6}" cy="${cy + 6}" rx="3.5" ry="2" fill="#f472b6" opacity=".45"/><ellipse cx="${60 + ex * 1.6}" cy="${cy + 6}" rx="3.5" ry="2" fill="#f472b6" opacity=".45"/>`);
  o.push(stage === 1
    ? `<path d="M56 ${cy + 7} Q60 ${cy + 4} 64 ${cy + 7}" stroke="#1f2937" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
    : `<path d="M55 ${cy + 5} Q60 ${cy + 10} 65 ${cy + 5}" stroke="${fem ? '#be185d' : '#1f2937'}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`);
  if (stage === 1) o.push(`<path d="M${60 + w * .32} ${top + 6} q-3 5 0 7 q3 -2 0 -7 Z" fill="#7dd3fc" stroke="#38bdf8" stroke-width=".6"/>`);
  // 머리 위 장식: 8 투구, 9 투구+칼, 10 왕관
  if (stage === 8 || stage === 9) {
    o.push(`<path d="M${60 - w * .3} ${top + 8} Q60 ${top - 14} ${60 + w * .3} ${top + 8} Z" fill="#cbd5e1" stroke="#64748b"/><rect x="58" y="${top - 12}" width="4" height="8" fill="#ef4444"/>`);
    if (stage === 9) o.push(`<rect x="${60 + w / 2 + 2}" y="${cy - 30}" width="4" height="34" fill="#e5e7eb" stroke="#64748b" stroke-width=".6"/><rect x="${60 + w / 2 - 3}" y="${cy + 3}" width="14" height="3.5" fill="#facc15"/>`);
  }
  if (stage === 10) o.push(`<path d="M${60 - 16} ${top + 4} L${60 - 14} ${top - 12} L${60 - 7} ${top - 4} L60 ${top - 18} L${60 + 7} ${top - 4} L${60 + 14} ${top - 12} L${60 + 16} ${top + 4} Z" fill="#facc15" stroke="#b8860b"/><circle cx="60" cy="${top - 2}" r="2.5" fill="#ef4444"/>`);
  if (fem && stage < 8) o.push(`<path d="M${60 + w * .18} ${top + 4} l-7 -5 v10 Z M${60 + w * .18} ${top + 4} l7 -5 v10 Z" fill="#f472b6"/><circle cx="${60 + w * .18}" cy="${top + 4}" r="2.2" fill="#ec4899"/>`);
  o.push(`</svg>`);
  return o.join('');
}
