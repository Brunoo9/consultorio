import { Select, Card } from "antd";
import { useState, useEffect, useReducer } from "react";
import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import esLocale from "@fullcalendar/core/locales/es";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import ModalTurnoCreate from "./Modals/ModalTurnoCreate";
import ModalTurnoView from "./Modals/ModalTurnoView";
import {
  getEvents,
  getDoctorsSelect,
} from "../../features/selects/selectSlice";
import { useDispatch, useSelector } from "react-redux";

const Calendar = () => {
  const dispatch = useDispatch();
  const { events, doctorsSelect } = useSelector((state) => state.select);
  const [resource, setResource] = useState([]);
  const onChange = (obj, { value, label }) => {
    setResource([
      {
        id: value,
        title: label,
      },
    ]);
  };
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [turno, setTurno] = useState({}); // el que va a crear
  const [event, setEvent] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false); //alfinal es un modal
  const [infoTurno, setInfoTurno] = useState({});
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const getRegisters = async () => {
      await Promise.all([dispatch(getEvents()), dispatch(getDoctorsSelect())]);
    };
    getRegisters();
  }, [reducerValue]);

  const handleEventClick = (e, date) => {
    setInfoTurno(e.event.extendedProps);
    setEvent(e.event);

    setDrawerOpen(true);
  };

  const handleDateSelect = (selectInfo) => {
    setTurno(selectInfo);
    setModalCreateOpen(true);
  };

  return (
    <>
      <div className="div-calendar">
        <Card
          title={"Selecciona un doctor"}
          headStyle={{ height: 1 }}
          bordered={false}
          style={{
            width: 300,
            marginBottom: "1rem",
            height: 120,
          }}
        >
          <Select
            style={{
              width: "100%",
            }}
            options={doctorsSelect}
            onChange={onChange}
            placeholder={"Selecciona el doctor"}
          />
        </Card>
      </div>

      <Card
        bordered={false}
        style={{
          width: "100%",
        }}
      >
        <FullCalendar
          schedulerLicenseKey={"GPL-My-Project-Is-Open-Source"}
          plugins={[resourceTimeGridPlugin, interactionPlugin]}
          expandRows={false}
          resourceAreaWidth={"20%"}
          weekends={false}
          initialView="resourceTimeGridDay"
          locale={esLocale}
          timeZone="utc"
          datesAboveResources={true}
          // dateClick={handleDateClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "resourceTimeGridWeek,resourceTimeGridDay",
          }}
          resources={resource}
          resourceAreaHeaderContent="Doctores"
          events={events}
          slotLabelFormat={{
            hour: "numeric",
            minute: "numeric",
          }}
          slotMinTime={"15:00:00"}
          slotMaxTime={"21:00:00"}
          allDaySlot={false}
          editable={false}
          selectable={true}
          selectMirror={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          hiddenDays={[1, 3, 5]}
          contentHeight={400}
        />
      </Card>

      <ModalTurnoCreate
        turno={turno}
        setTurno={setTurno}
        modalCreateOpen={modalCreateOpen}
        setModalCreateOpen={setModalCreateOpen}
        forceUpdate={forceUpdate}
      />
      <ModalTurnoView
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
        infoTurno={infoTurno}
        setInfoTurno={setInfoTurno}
        event={event}
      />
    </>
  );
};

export default Calendar;
