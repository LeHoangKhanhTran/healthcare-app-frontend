import styled from "styled-components";
import AppointmentImg from "../../assets/images/appointment-img.png";
import AppointmentForm from "../../components/forms/AppointmentForm";
import { useLocation } from "react-router-dom";
import { Doctor } from "../../types";
const Container = styled.div`
  .form {
    position: absolute;
    top: 100px;
    left: 210px;
    width: 50%;
    overflow: hidden;
  }
`;

export default function Appointment() {
  const location = useLocation();
  const doctor = location.state as Doctor;
  return (
    <Container>
      <div className="form">
        <AppointmentForm defaultDoctor={doctor} />
      </div>
      <img src={AppointmentImg} id="main-img" />
    </Container>
  );
}
