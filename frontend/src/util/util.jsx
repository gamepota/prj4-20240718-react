// utils.js
export function generateDiaryId(userId) {
  return `DIARY-${userId * 17}-ID`; // 간단한 문자열 변환
}


export function extractUserIdFromDiaryId(diaryId) {
  return parseInt(diaryId.split('-')[1]) / 17; // userId 추출
}