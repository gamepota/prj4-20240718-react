import React, { createContext, useState } from 'react';

export const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [diaryBoardList, setDiaryBoardList] = useState([]);

  return (
    <DiaryContext.Provider value={{ diaryBoardList, setDiaryBoardList }}>
      {children}
    </DiaryContext.Provider>
  );
};
