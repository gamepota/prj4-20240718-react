import React, { useContext, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./DiaryCalendar.css";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";

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

  const handleEventClick = (info) => {
    const action = prompt(
      "메모를 수정하거나 삭제하려면 '수정' 또는 '삭제'를 입력하세요:",
      info.event.title,
    );
    if (action === "수정") {
      const updatedTitle = prompt("메모를 수정하세요:", info.event.title);
      if (updatedTitle) {
        const updatedEvents = events.map((event) =>
          event.start === info.event.startStr
            ? { ...event, title: updatedTitle }
            : event,
        );
        setEvents(updatedEvents);
        localStorage.setItem("diaryEvents", JSON.stringify(updatedEvents));
        info.event.setProp("title", updatedTitle); // 캘린더의 이벤트 제목 업데이트
      }
    } else if (action === "삭제") {
      const updatedEvents = events.filter(
        (event) => event.start !== info.event.startStr,
      );
      setEvents(updatedEvents);
      localStorage.setItem("diaryEvents", JSON.stringify(updatedEvents));
      info.event.remove(); // 캘린더에서 이벤트 제거
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
          eventClick={handleEventClick} // 이벤트 클릭 핸들러 추가
          height="auto"
        />
      )}
    </div>
  );
};

export default DiaryCalendar;
