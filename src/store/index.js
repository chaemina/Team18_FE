import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// token 상태 관리
export const tokenAtom = atomWithStorage("token", null);

// auth : isLogin을 스토리지에 저장 -> 로그아웃시 RESET
// 스토리지에 auth 값이 있을때 (참일 때) -> 인가

export const authAtom = atomWithStorage("isLogin", null);
// 로그인 시 스토리지에 isLogin 저장
// 이후 인증 상태는 스토리지에 저장 된 값을 꺼내 사용
// 인증 상태는 로그아웃 시 초기화

// uid 상태 관리
// 마이페이지 조회 시 이용
export const uidAtom = atomWithStorage("uid", null);

// defaultProfileImage 전역 상태로 사용
export const profileImageAtom = atom(
  "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDFfMjIg/MDAxNjA0MjI4ODc1MDkx.itxFQbHQ_zAuNQJU7PCOlF0mmstYn2v4ZF4WygunqGIg.3jloNowx-eWU-ztCLACtYubVbATNdCFQLjgvYsynV1og.JPEG.gambasg/유튜브_기본프로필_주황.jpg?type=w400"
);

export const userProfileAtom = atom(null);

export const errorAtom = atom(null);
