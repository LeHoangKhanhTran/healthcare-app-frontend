import styled from "styled-components";
import HistoryCard from "../../components/HistoryCard";
import { Appointment } from "../../types";
import { useEffect, useState } from "react";
import config from "../../Config";
import axios from "axios";
import { useUserContext } from "../../UserContextProvider";
import { useNavigate } from "react-router-dom";
import CancelModal from "../../components/modals/CancelModal";
const Container = styled.div`
  position: absolute;
  top: 110px;
  left: 160px;
  width: 100%;

  h1 {
    font-size: 1.85rem;
    margin-block-end: 35px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 50px;
  }

  .delete {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.15rem;
    color: var(--red);
    font-weight: 600;
    cursor: pointer;
  }

  p {
    font-weight: 500;
    font-size: 1rem;
  }
`;

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState<Appointment[]>();
  const { user, loading } = useUserContext();
  const [modal, setModal] = useState<string>();
  const [appointmentId, setAppointmentId] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) {
      console.log(user);
      if (user && user.profileId) getAppointments();
      else {
        navigate("/profile");
      }
    }
  }, [loading]);
  const getAppointments = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/Appointment/patient/${user?.profileId}`
      );
      if (response.status === 200) {
        setAppointments(response.data as Appointment[]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancelAppoinment = async (id: string) => {
    try {
      const response = await axios.patch(
        `${config.apiUrl}/Appointment/${id}/cancel`
      );
      if (response.status === 200) {
        getAppointments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCancelClick = (id: string) => {
    setModal("cancel");
    setAppointmentId(id);
  };
  return (
    <Container>
      <h1>Lịch sử đặt lịch khám</h1>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "600px auto",
          padding: "0 30px",
        }}
      >
        {appointments &&
          appointments.map((appointment) => {
            return (
              <div className="item">
                <HistoryCard
                  appointment={appointment}
                  onCancelClick={() => onCancelClick(appointment.appointmentId)}
                />
              </div>
            );
          })}
      </section>
      {!appointments ||
        (appointments.length === 0 && <p>Chưa có lịch khám nào</p>)}
      {modal === "cancel" && appointmentId && (
        <CancelModal
          handleClick={() => {
            cancelAppoinment(appointmentId);
            setModal("");
          }}
        />
      )}
    </Container>
  );
}
