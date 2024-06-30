import React, { useContext, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // 날짜 및 이벤트 클릭을 위한 플러그인
import "./DiaryCalendar.css";
import { LoginContext } from "../../../../../component/LoginProvider.jsx"; // 필요한 CSS 파일 경로 확인

const DiaryCalendar = () => {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const { memberInfo } = useContext(LoginContext);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("diaryEvents"));
    if (savedEvents) {
      setEvents(savedEvents);
    }
  }, []);

  const handleDateClick = (info) => {
    const title = prompt("메모를 입력하세요:");
    if (title) {
      const newEvent = {
        title,
        start: info.dateStr,
        allDay: true,
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem("diaryEvents", JSON.stringify(updatedEvents));
    }
  };

  return (
    <div id="calendar">
      {memberInfo && memberInfo.id && memberInfo.nickname && (
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          height="auto" // 캘린더의 높이를 자동으로 조정
        />
      )}
    </div>
  );
};

export default DiaryCalendar;
