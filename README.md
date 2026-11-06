# 레벨업 라이프 (Study Like a Game)

공부나 운동을 기록하면 캐릭터가 성장하는 자기계발 RPG 웹앱이에요.
설치할 필요 없이 브라우저에서 열면 되고, 휴대폰 홈 화면에 추가하면 앱처럼 쓸 수 있어요. 인터넷이 없어도 돼요.

## 주요 기능

- **직업별로 따로 성장**: 30개 직업 중에서 키울 직업을 골라요. 기록한 포인트는 지금 고른 직업에만 쌓여서, 직업마다 단계(1~10)가 따로 올라가요.
  - 사람 직업: 전사, 마법사, 궁수, 도적, 해적, 광전사, 대장장이, 유목민(말 탄 모습), 중세기사, 북부대공, 무도가, 성직자, 음유시인. 떠돌이 거지에서 시작해요.
  - 종족 직업: 엘프, 오우거, 페어리, 켄타우로스, 리치, 해골기사, 드라이어드, 드워프, 뱀파이어, 늑대인간, 나가, 골렘, 사신, 고양이 수인, 천사, 악마, 슬라임. 각 종족의 약한 모습(어린 엘프, 꼬마 오우거, 떠도는 해골, 아기 천사, 꼬마 임프, 아기 슬라임 등)에서 시작해요.
- **직업별 남성·여성 선택**: 🛡️ 직업 탭의 카드마다 있는 👦/👧 버튼으로 직업마다 따로 성별을 골라요. 처음 시작 화면에서 고른 성별은 첫 직업에만 적용돼요. 여성은 긴 머리·옆머리·속눈썹·입술색이 달라지고, 드워프는 수염 대신 땋은 머리, 광전사는 가슴 털 가리개가 생겨요. (도감: `docs/jobs-male.png` 남성, `docs/jobs-female.png` 여성)
- **한국 특별 직업 ☯️ 삼조선** (한국어로 볼 때만 보여요): 빈 삼태극 문양에서 삼족오 → 봉황 → 천마가 차례로 깃들고, 하늘(빨강)·땅(파랑)·사람(노랑) 색이 채워지는 7단계예요. 그림은 `images/samtaegeuk-1.png` ~ `7.png`(원본: `assets/samtaegeuk-7stages-3legs.png`). 다른 언어로 바꿔도 이미 키우는 중이면 계속 보여요.
- **한국 특별 직업 🐦 고려봉황** (한국어로 볼 때만 보여요): 단청 그림체의 봉황이 불꽃을 품은 알 → 아기 봉황 → 어린 봉황 → 구름을 타는 봉황 → 전설의 고려봉황으로 자라는 5단계예요. 그림은 `images/goryeo-1.png` ~ `5.png`(5단계 원본: `assets/goryeo-phoenix-original.png`).
- **내 캐릭터 만들기**: 사진을 올려서 나만의 캐릭터를 만들어요. 단계 수(2~30단계)를 정하고 단계마다 사진을 한 장씩 올려요. 여러 장을 한꺼번에 고르면 순서대로 들어가요. 사진은 긴 변 320px로 줄여서 이 기기에 저장돼요.
- **캐릭터 지우기**: 직업 탭 카드 오른쪽 위 ✕ 버튼으로 기본 직업과 내 캐릭터를 지워요.
  - 지울 때 그 캐릭터로 쌓은 기록을 **함께 지울지**(기록·통계·그래프에서 빠짐) **남길지**(그대로 보임) 골라요.
  - 지운 기본 직업은 직업 탭 맨 아래 **♻️ 지운 직업 되살리기**에서 다시 꺼내요. 기록을 남겼으면 단계도 그대로예요. 내 캐릭터는 사진이 지워져서 되살릴 수 없어요.
- **내가 만드는 활동**: 공부, 독서, 운동 같은 활동을 직접 만들고 1단위(분, 쪽, 회 등)당 포인트를 정해요.
- **통계**: 일·주·월·년 단위 그래프를 활동별, 직업별, 합계로 볼 수 있어요. 직업을 골라 그 직업 기록만 볼 수도 있어요. 직업마다 어떤 활동으로 포인트를 얻었는지도 보여 줘요.
- **기록**: 최근 7일 그래프, 직업별·활동별 누적 포인트, 전체 기록을 보고 지울 수 있어요.
- **메모**: 아이디어가 떠오르면 바로 적어 둬요. 수정, 고정(📌), 검색, 삭제가 돼요.
- **홈 배경**: 홈 화면 캐릭터 뒤 배경을 기본 6가지 중에서 고르거나 내 사진으로 바꿔요.
- **13개 언어**: 한국어, English, 日本語, Español, Português, Français, Deutsch, Bahasa Indonesia, Tiếng Việt, ไทย, Русский, Türkçe, हिन्दी. 처음엔 폰 언어를 따라가고(목록에 없는 언어는 영어), 설정에서 바꿀 수 있어요.
- **백업**: 기록을 JSON 파일로 저장하고 다시 불러올 수 있어요.

## 실행 방법

- 그냥 열기: `index.html`을 브라우저로 열어요. (다른 언어 파일을 불러오려면 아래처럼 로컬 서버로 여는 게 좋아요.)
- 오프라인 실행, 홈 화면 추가까지 쓰려면 로컬 서버로 열어요.

  ```bash
  python -m http.server 8000
  ```

  그다음 http://localhost:8000 에 접속해요.

## GitHub Pages로 공개하기

1. 이 폴더를 GitHub 저장소에 올려요.
2. 저장소의 **Settings → Pages**에서 Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 정하고 저장해요.
3. 잠시 뒤 `https://<아이디>.github.io/<저장소이름>/` 주소로 접속할 수 있어요.

## 안드로이드 앱으로 만들기 (Capacitor)

웹앱을 그대로 감싸서 안드로이드 앱으로 만들어요. 필요한 것: Node.js, Android Studio.

1. 처음 한 번: `npm install`
2. 웹 파일을 고친 뒤마다: `npm run sync` (앱에 들어갈 파일만 `www/`로 모아서 `android/`에 복사해요)
3. `npm run open`으로 Android Studio에서 `android` 폴더를 열고, 폰을 USB로 연결해서 ▶ 실행해요. (폰에서 개발자 옵션 → USB 디버깅을 켜요)
4. Play 스토어용: Android Studio의 **Build → Generate Signed App Bundle**로 `.aab` 파일을 만들어요. 이때 만든 서명 키 파일(.jks)과 비밀번호는 꼭 따로 보관해요. 잃어버리면 앱을 업데이트할 수 없어요.

- 앱 ID: `io.github.wjdgus333.levelup` (`capacitor.config.json`). Play 스토어에 한 번 올리면 바꿀 수 없어요.
- **광고(AdMob)**: 앱에서만 아래 메뉴 바로 위에 배너가 나와요(웹에는 안 나와요). 아래에서 올라오는 창이 열리면 잠깐 숨겨요.
  - AdMob 앱 ID는 `android/app/src/main/AndroidManifest.xml`, 배너 광고 단위 ID는 `index.html`의 `AD_BANNER_ID`에 있어요.
  - `index.html`의 `AD_TEST = false`라서 진짜 광고가 나와요(Play 스토어 출시용). 테스트 광고로 돌리려면 `true`. **내 앱의 진짜 광고를 직접 누르면 AdMob 계정이 정지될 수 있어요.**
  - 유럽처럼 동의가 필요한 지역에서는 처음에 개인정보 동의 창이 떠요.
- 홈 화면 앱 이름은 폰 언어에 따라 바뀌어요(`android/app/src/main/res/values-*/strings.xml`. 기본 영어, 한국어·일본어·태국어·힌디어는 따로).
- 앱에서만 다르게 동작하는 것:
  - **뒤로가기 버튼**: 열린 창 닫기 → 다른 탭이면 홈으로 → 홈에서 2초 안에 두 번 누르면 종료.
  - **백업 저장**: 다운로드 대신 공유 창이 떠요. 카톡 나와의 채팅·드라이브·메일 등으로 보내 두면 돼요. 불러오기는 웹과 같아요.
  - **화면 위아래 여백**: 상태바·제스처 바에 가리지 않게 자동으로 여백을 둬요. 상태바 아이콘은 흰색(`capacitor.config.json`의 `SystemBars.style`).
- Filesystem 플러그인이 Java 21을 써서, 처음 빌드할 때 Gradle이 Java 21을 자동으로 받아요(`android/settings.gradle`의 foojay 설정).
- 앱 아이콘·시작 화면 그림: `python scripts/make-android-icons.py`로 다시 만들어요.
- 앱 버전을 올릴 땐 `android/app/build.gradle`의 `versionCode`(1, 2, 3…)와 `versionName`을 올려요.
- 앱 안의 기록은 웹 브라우저와 따로 저장돼요. 옮기려면 설정의 백업 저장 → 불러오기를 써요.
- GitHub Pages에는 `android/`, `scripts/`, `package.json` 등을 올리지 않아도 돼요.

## Play 스토어 등록 자료

- `privacy.html`: 개인정보처리방침 (https://wjdgus333.github.io/studylikeagame/privacy.html). 앱 설정 맨 아래에도 링크가 있어요.
- `docs/store-listing.md`: 앱 설명(한국어·영어), 콘텐츠 등급·데이터 보안 설문 답안
- `docs/store/`: 스토어 아이콘(512), 그래픽 이미지(1024×500), 휴대폰 스크린샷 4장(1080×1920)

## 번역 고치기·추가하기

- `lang/keys.js`: 한국어 원문 목록(`ui`, `jobs`, `stages`)
- `lang/언어코드.js`: 같은 순서의 번역 목록
- 새 문장을 넣을 땐 각 목록 **맨 뒤**에만 추가하고, 모든 언어 파일의 같은 자리에도 번역을 넣어요.
- 번역 파일을 고친 뒤엔 `index.html`의 `APP_V`와 `sw.js`의 `CACHE` 숫자를 올려요. (옛 파일이 캐시에 남지 않게)

## 캐릭터 그림 바꾸기 (선택)

`images/직업-단계.png` 파일을 넣고, 넣은 파일 이름을 `images/list.json`에 적으면 기본 그림 대신 그 이미지를 보여 줘요.
예: `images/warrior-1.png` ~ `images/warrior-10.png` (여성 그림은 `images/warrior-f-1.png` ~ `images/warrior-f-10.png`)

```json
["warrior-1.png", "warrior-2.png", "warrior-f-1.png"]
```

`list.json`이 없으면 기본 그림만 써요. (없는 그림을 하나하나 찾지 않아서 앱이 빨리 열려요)
직업 이름: `warrior`(전사), `mage`(마법사), `archer`(궁수), `rogue`(도적), `pirate`(해적), `elf`(엘프), `ogre`(오우거), `fairy`(페어리), `centaur`(켄타우로스), `lich`(리치), `skeleton`(해골기사), `dryad`(드라이어드), `dwarf`(드워프), `berserker`(광전사), `vampire`(뱀파이어), `werewolf`(늑대인간), `naga`(나가), `golem`(골렘), `blacksmith`(대장장이), `nomad`(유목민), `knight`(중세기사), `reaper`(사신), `duke`(북부대공), `monk`(무도가), `cleric`(성직자), `bard`(음유시인), `catfolk`(고양이 수인), `angel`(천사), `demon`(악마), `slime`(슬라임)

## 파일 구성

| 파일 | 설명 |
|---|---|
| `index.html` | 앱 화면과 기능 전부 |
| `hero.js` | 직업 정보와 캐릭터 그림(SVG) |
| `lang/` | 번역 (keys.js + 언어별 파일 12개) |
| `sw.js` | 오프라인 실행용 서비스 워커 |
| `manifest.webmanifest`, `icon*` | 홈 화면 추가용 앱 정보와 아이콘 |
| `android/`, `capacitor.config.json`, `package.json`, `scripts/` | 안드로이드 앱 만들기용 |

기록은 각자 기기의 브라우저(localStorage)에만 저장되고, 서버로 보내지 않아요.
