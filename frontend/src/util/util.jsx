// utils.js
// id => diaryId 변환
export function generateDiaryId(userId) {
  return `DIARY-${userId * 17}-ID`; // 간단한 문자열 변환
}

// diaryId => id 변환
export function extractUserIdFromDiaryId(diaryId) {
  if (!diaryId) return null;
  const parts = diaryId.split("-");
  return parts.length === 3 ? Number(parts[1]/17) : null;
}