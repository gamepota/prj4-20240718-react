import React, { useContext, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDisclosure } from "@chakra-ui/react";
import "./DiaryCalendar.css";
import ModalComponent from "./ModalComponent";
import { LoginContext } from "../../../../../component/LoginProvider.jsx";

const DiaryCalendar = () => {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const { memberInfo } = useContext(LoginContext);
  const {
    isOpen: modalIsOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure();
  const [modalInfo, setModalInfo] = useState({ type: "", info: null });

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("diaryEvents"));
    if (savedEvents) {
      setEvents(savedEvents);
    }
  }, []);

  const handleSave = (inputText) => {
    if (modalInfo.type === "add") {
      const newEvent = {
        title: inputText,
        start: modalInfo.info.dateStr,
        allDay: true,
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem("diaryEvents", JSON.stringify(updatedEvents));
    } else if (modalInfo.type === "edit") {
      const updatedEvents = events.map((event) =>
        event.start === modalInfo.info.event.startStr
          ? { ...event, title: inputText }
          : event,
      );
      setEvents(updatedEvents);
      localStorage.setItem("diaryEvents", JSON.stringify(updatedEvents));
      modalInfo.info.event.setProp("title", inputText); // 캘린더의 이벤트 제목 업데이트
    }
    closeModal();
  };

  const handleDateClick = (info) => {
    setModalInfo({ type: "add", info });
    openModal();
  };

  const handleEventClick = (info) => {
    setModalInfo({ type: "edit", info });
    openModal();
  };

  const handleDelete = () => {
    const updatedEvents = events.filter(
      (event) => event.start !== modalInfo.info.event.startStr,
    );
    setEvents(updatedEvents);
    localStorage.setItem("diaryEvents", JSON.stringify(updatedEvents));
    closeModal();
  };

  return (
    <div id="calendar">
      {memberInfo.access && memberInfo.id && memberInfo.nickname && (
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
        />
      )}
      <ModalComponent
        isOpen={modalIsOpen}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={handleDelete}
        defaultText={
          modalInfo.type === "edit" ? modalInfo.info.event.title : ""
        }
      />
    </div>
  );
};

export default DiaryCalendar;
