import styled from "styled-components";
import CheckIcon from "../../assets/icons/check-circle.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import ItemCard from "../../components/ui/item-card";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../Config";
import { Appointment, Doctor } from "../../types";
import { useEffect, useState } from "react";
import { formatDate } from "../../Utils";


const Container = styled.div`
    position: absolute;
    width: 100%;
    top: 28dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 25px;

    section {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #success-icon {
        width: 100px;
        height: 100px;
    }

    .announcement {
        font-size: 1.6rem;
        line-height: 44px;
        font-weight: 700;
        transform: translateY(-13px);
    }

    .note {
        font-size: .9rem;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: .15px;
        color: var(--grey-text-color)
    }

    .details {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        width: 62%;
        .title {
            font-size: 1.15rem;
            font-weight: 500;
            line-height: 36px;
            color: var(--grey-text-color)
        }

        .time {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
            color: var(--grey-text-color)
        }
    }

    hr {
        width: 60%;
        border: 1px solid var(--success-details-border);
    }
`



export default function Success() {
    const [appointment, setAppointment] = useState<Appointment>();
    const [doctor, setDoctor] = useState<Doctor>();
    const { id } = useParams();
    useEffect(() => {
        getAppointmentAndDoctor();
    }, [])
    const getAppointmentAndDoctor = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/Appointment/${id}`);
            if (response.status === 200) {
                const appointment = response.data as Appointment
                setAppointment(appointment)
                await getDoctor(appointment.doctor.doctorId);
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const getDoctor = async (doctorId: string) => {
        try {
            const response = await axios.get(`${config.apiUrl}/Doctor/${doctorId}`);
            if (response.status === 200) {
                const doctor = response.data as Doctor;
                setDoctor(doctor)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    
    return(
        <Container>
            <section>
                <img id="success-icon" src={CheckIcon} alt="" />
                <p className="announcement"><span style={{color: "var(--green)"}}>Yêu cầu đặt lịch</span> của bạn đã được gửi thành công!</p>
                <p className="note">Chúng tôi sẽ sớm xác nhận tình trạng của lịch khám này</p>
            </section>
            <hr/>
            {appointment && 
                <div className="details">
                    <p className="title">Chi tiết lịch khám:</p>
                    {doctor && <ItemCard name={doctor.name} img={doctor.imageUrl}/>}
                    <div className="time">
                        <img src={CalendarIcon}/>
                        <div>{formatDate(appointment.appointmentDate)} - ({appointment.appointmentTime})</div>
                    </div>
                </div>
            }
            <hr/>
        </Container>
    )
}