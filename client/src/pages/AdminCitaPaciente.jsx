import { Input } from "antd";
import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import esLocale from "@fullcalendar/core/locales/es";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventsByDoctor } from "../features/turno/turnoSlice";
import useModalActive from "../hooks/useModalActive";
import ModalRegitrarCita from "../components/Admin/Modals/ModalRegitrarCita";
const AdminCitaPaciente = () => {
  const [infoTurno, setInfoTurno] = useState({});
  const [event, setEvent] = useState({});
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { eventsByDoctor } = useSelector((state) => state.turno);
  const [{ modalCreate }, { handleStateCreate }] = useModalActive();
  const [resource, setResource] = useState([{}]);
  const { TextArea } = Input;
  useEffect(() => {
    dispatch(getEventsByDoctor(auth.iddoctor));
  }, []);

  const handleEventClick = (e, date) => {
    setInfoTurno(e.event.extendedProps);
    setEvent(e.event);

    console.log(infoTurno);
    console.log(event);

    handleStateCreate(true);
  };

  return (
    <>
      <h1 className="turnos-titulo">
        Registra la cita del <span className="turnos-span">Paciente</span>
      </h1>
      <main className="main-cita">
        <FullCalendar
          schedulerLicenseKey={"GPL-My-Project-Is-Open-Source"}
          plugins={[resourceTimeGridPlugin, interactionPlugin]}
          expandRows={false}
          resourceAreaWidth={"20%"}
          locale={esLocale}
          weekends={false}
          initialView="resourceTimeGridDay"
          timeZone="utc"
          datesAboveResources={true}
          // dateClick={handleDateClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "resourceTimeGridWeek,resourceTimeGridDay",
          }}
          resources={[
            {
              id: auth.iddoctor,
              title: eventsByDoctor[0]?.nombredoctor || "Calendario sin turnos",
            },
          ]}
          events={eventsByDoctor}
          slotMinTime={"15:00:00"}
          slotMaxTime={"21:00:00"}
          allDaySlot={false}
          editable={false}
          selectable={false}
          selectMirror={true}
          eventClick={handleEventClick}
          hiddenDays={[1, 3, 5]}
          contentHeight={400}
        />
      </main>
      <ModalRegitrarCita
        infoTurno={infoTurno}
        event={event}
        modalCreate={modalCreate}
        handleStateCreate={handleStateCreate}
      />
    </>
  );
};

export default AdminCitaPaciente;
