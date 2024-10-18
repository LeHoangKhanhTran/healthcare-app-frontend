import styled from "styled-components";
import AppointmentImg from "../../assets/images/appointment-img.png"
import AppointmentForm from "../../components/forms/AppointmentForm";
const Container = styled.div`
    .form {
        position: absolute;
        top: 100px;
        left: 210px;
        width: 50%;
        overflow: hidden;
    }
`

export default function Appointment() {
    return (
        <Container>
            <div className="form">
                <AppointmentForm/>
            </div>
            <img src={AppointmentImg} id="main-img" />
        </Container>
    )
}