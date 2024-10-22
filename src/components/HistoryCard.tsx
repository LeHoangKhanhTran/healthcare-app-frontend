import styled from "styled-components";
import StatusBadge from "./ui/status-badge";
import Button from "./ui/button";
import { Appointment } from "../types";
import { formatDate } from "../Utils";
const Container = styled.div`
    width: 550px;
    height: fit-content;
    min-height: 272px;
    padding: 20px 28px 20px 28px;
    background: var(--card-bg-color);
    border-radius: 12px;
    letter-spacing: .3px;
    overflow: hidden;
    main {
        display: flex;
        gap: 25px;
        margin-bottom: 25px;
    }

    .info-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .info {
        font-size: .9rem;
        display: flex;
        gap: 8px;
        align-items: center;

        p {
            font-size: .9rem;
        }
        div {
            font-weight: 700;
        }

        .status {
            color: var(--green)
        }
    }

    .doctor {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        text-align: center;
        min-width: 112px;
        .doctor-name {
            font-weight: 700;
        }

        img {
            width: 50px;
        }
    }
`

export default function HistoryCard({ appointment, onCancelClick }: { appointment: Appointment, onCancelClick: () => void}) {
    if (appointment) 
        return (
            <Container>
                <main>
                    <section className="doctor">
                        <img src={appointment.doctor.imageUrl} alt="" />
                        <p className="doctor-name">{appointment.doctor.name}</p>
                        <p style={{fontSize: "0.9rem"}}>Bác sĩ phụ trách</p>
                     </section>
                     <section className="info-container">
                        <div className="info">
                          <div>Tên người khám:</div>
                          <p>{appointment.patient.name}</p>
                        </div>
                        <div className="info">
                            <div>Lý do khám:</div>
                            <p>{appointment.reason}</p>
                        </div>
                        <div className="info">
                          <div>Ghi chú:</div>
                          <p>{appointment.note ? appointment.note : "Không có"}</p>
                        </div>
                        <div className="info">
                            <div>Thời gian khám:</div>
                            <p>{formatDate(appointment.appointmentDate)} - ({appointment.appointmentTime})</p>
                        </div>
                        <div className="info">
                            <div>Tình trạng:</div>
                            <StatusBadge type={appointment.status.toLowerCase()}/>
                        </div>
                    </section>
                </main>
                <Button onClick={onCancelClick} type="danger">
                    Hủy lịch khám   
                </Button>
            </Container>
        )
}