<div align="center">

## Garden 🌱

🌱 함께 피워내는 한국어 교육 플랫폼 **Garden** 입니다.

</div>

### Index

1. [🖥️ Project ](#-project)
   - [ 🎈 Instance address](#-instance-address)
   - [⏰ develop period](#-develop-period)
   - [🔎 purpose](#-purpose)
2. [🚀 How to start?](#-how-to-start)
3. [⚒️ Technology stack](#-technology-stack)
4. [💡 Main function](#-main-function)
5. [📌 Directory structure](#-directory-structure)

### 💻 Project

한국어 교육 플랫폼 **Garden**은 한류 문화를 기반으로 한국어 학습의 장벽을 극복하고, 외국인들에게 다양한 방식의 학습 환경을 제공합니다.

관심사를 기반으로 한국어 학습이 가능하도록 **한국어 영상 서비스** / **멘토 멘티 서비스** / **채팅 서비스** 를 제공하고 있습니다.

| FE Gardener                              | BE Gardener                                  |
| ---------------------------------------- | -------------------------------------------- |
| 👨‍🌾 [정성현](https://github.com/jsh1147)  | 👨‍🌾 [이윤수](https://github.com/sjmjys954646) |
| 👩‍🌾 [강바다](https://github.com/bada308)  | 👨‍🌾 [진승현](https://github.com/choboss00)    |
| 👩‍🌾 [채민아](https://github.com/chaemina) | 👩‍🌾 [강효정](https://github.com/cosmos-1885)  |

#### 🎈 Instance address

- FE 배포 주소 : https://ke94a9914479ca.user-app.krampoline.com/videos

#### 🎨 ERD

![title](https://user-images.githubusercontent.com/37840237/282228221-992a7c04-34b2-4b61-b4de-63e23fe8719c.png)

#### ⏰ develop period

- 23.09.26 ~23.11.11

#### 🔎 purpose

- 카카오 테크 캠퍼스 3단계 팀 프로젝트 **18조 FrontEnd**

### 🚀 How to start?

```
npm install
npm run dev
```

### 🤖 Technology stack

<div align="center">

#### FrontEnd stack

<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/>
<img 
src="https://img.shields.io/badge/axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=white"/>
<img src="https://img.shields.io/badge/👻 Jotai-000000?style=flat-square&logoColor=white"/>
<img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white"/>
<img 
src="https://img.shields.io/badge/Lodash-3492FF?style=flat-square&logo=lodash&logoColor=white"/>
<img 
src="https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white"/>
<img src="https://img.shields.io/badge/ESlint-4B32C3?style=flat-square&logo=eslint&logoColor=white"/>
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white"/>

#### Cowork tools

<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white"/>
<img src="https://img.shields.io/badge/ Slack-4A154B?style=flat-square&slack=notion&logoColor=white"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white"/>
</div>
<br/>

```
Reason why

- vite :  ES 모듈을 직접 사용하여 개발 환경 구축하기에 초기 서버시작이
매우 빠름. 전체 페이지 리로드 없이 변경된 모듈만 업데이트(HMR)
- React : 컴포넌트 기반 아키텍쳐로 코드의 재사용성과 유지 관리가 용이함.
서버 사이드 렌더링 (SSR)을 지원하여 초기 로딩 시간 단축
- ReactQuery : 서버 상태를 효율적으로 관리하고 캐싱. 데이터 요청의
 로딩, 에러, 성공 상태를 쉽게 관리할 수 있으며 자동으로 응답을 캐싱
하여 반복적인 요청을 최소화함.
- axios : 프로미스 기반 API를 제공하여 비동기 요청을 보다 쉽게 처리
할 수 있게 해주며, async/await 문법 사용에 용이함. 응답을 받을 때 자
동으로 JSON 데이터로 변환해주며, JSON 형태로 데이터를 보낼 때도
자동으로 문자열로 변환.
- tailwindcss : 컴포넌트를 상황에 따라 간편히 커스텀하기 편리함.
- Jotai : 원자(atom) 단위로 전역 상태를 단순하고 최소화하여 관리

```

### 💡 Main function

#### 사용자 계정
![image](https://github.com/Step3-kakao-tech-campus/Team18_FE/assets/71962076/1c80b8f7-ae82-493d-aeba-8943bd5fd1f1)

- 회원가입, 로그인 기능 구현
- 회원 가입 시 관심사, 국가, 멘토/멘티 선택
- 마이페이지 프로필, 개인정보조회, 수정 기능 구현

#### 영상 시청 서비스
![image](https://github.com/Step3-kakao-tech-campus/Team18_FE/assets/71962076/8fd660e2-ae73-4552-9672-9a1c9e9978c4)
![image](https://github.com/Step3-kakao-tech-campus/Team18_FE/assets/71962076/cbc9b52d-e82e-4e7f-9e4f-d337e6bdcfca)

- 카테고리 별 영상 정보 무한 스크롤로 구현
- 로그인 시 사용자의 관심사 기반 추천 영상 정보 제공
- 영상 시청 시 한국어/ 영어 자막 제공
- 최근 시청한 10개의 영상 보관함 제공

#### 멘토링 서비스
![image](https://github.com/Step3-kakao-tech-campus/Team18_FE/assets/71962076/ac72c994-92f9-4399-b0e7-03fb6ec47675)

- 목록 페이지
  - 무한 스크롤 방식으로 멘토링 목록 제공
  - 카테고리에 따른 검색 기능 제공
- 상세 페이지
  - 멘토링 상세 정보와 함께 신청 멘티 목록 제공
  - 로그인유/무, 멘토/멘티, 본인/타인글에 따라 제공되는 기능 변화
- 작성/수정 페이지
  - 신규 글 작성 / 기존 글 수정 기능 제공
- 대시보드 페이지
  - 본인이 연관된 진행/마감 멘토링 현황 제공
  - 모달을 통해 상대 멘토/멘티 프로필 제공

#### 채팅 서비스
![image](https://github.com/Step3-kakao-tech-campus/Team18_FE/assets/71962076/d1b13707-6161-4cb2-b51a-c6557ee2d14a)
![image](https://github.com/Step3-kakao-tech-campus/Team18_FE/assets/71962076/205fc551-26cc-4a8f-a852-168c4d0188cf)

- Public/My 채널 리스트 확인
- 카테고리 및 서브 카테고리 검색 가능
- 채널 생성 기능 구현
- 채널 참여 및 나가기 기능 구현
- 메세지 확인 및 송신 가능
- 채널 정보 조회 및 수정

### 📌 Directory structure

```
- .github
- cert
- node_modules
- public
- src
     - apis
     - assets
     - components
          - account
          - chatting
          - common
          - mentoring
          - watching
     - constants
     - hooks
     - layouts
     - pages
         - account
         - chatting
         - mentoring
         - watching
     - store
     - tests
     - utils
     - main.css
     - main.jsx
     - Router.jsx
- .env
- .eslintrc.json
- .gitignore
-.prettierrc.json
- index.html
- package-lock.json
- package.json
- postcss.config.cjs
- README.md
- step3.md
- tailwind.config.cjs
- vite.config.js
```
