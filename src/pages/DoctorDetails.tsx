import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import config from "../Config";
import { useEffect, useState } from "react";
import { Doctor, ShiftTime } from "../types";
import Button from "../components/ui/button";
import { parseShifts } from "../Utils";
import ItemCard from "../components/ui/item-card";

const Container = styled.div`
  position: absolute;
  width: 100dvw;
  padding: 120px;
  height: fit-content;
  min-height: 100dvh;
`;

const Wrapper = styled.main`
  position: relative;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  h2 {
    font-size: 2rem;
    color: var(--green);
    font-weight: 700;
    margin-bottom: 10px;
  }

  hr {
    position: absolute;
    margin-top: 53px;
    width: 28%;
    border: 0.1px solid var(--green);
  }

  .name-img {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 600;
    img {
      width: 7.8rem;
    }
  }

  button {
    width: 293px;
    transform: translateY(-10px);
  }

  .info {
    max-width: 70%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    font-size: 1.1rem;

    .info-container {
      display: flex;
      gap: 12px;
    }

    span {
      flex-shrink: 0;
      font-weight: 600;
    }

    p {
      line-height: 28px;
    }
  }

  .shifts {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .item-card {
    padding: 0 6px;

    width: 95px;
    border: 1px solid var(--green);
    margin-right: 12px;
  }
`;

export default function DoctorDetails() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState<Doctor>();
  const [shifts, setShifts] = useState<{ [key: string]: ShiftTime[] }>();
  const navigate = useNavigate();
  const getDoctor = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/Doctor/${doctorId}`);
      if (response.status === 200) {
        const doctor = response.data as Doctor;
        setDoctor(doctor);
        setShifts(
          parseShifts(
            doctor.shifts.sort(
              (shiftOne, shiftTwo) => shiftOne.weekday - shiftTwo.weekday
            )
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctor();
  }, [doctorId]);
  if (doctorId && doctor) {
    return (
      <Container>
        <Wrapper>
          <h2>Thông tin bác sĩ</h2>
          <hr />
          <section className="name-img">
            <img src={doctor.imageUrl} />
            <p className="doctor-name">{doctor.name}</p>
          </section>
          <Button
            onClick={() => {
              navigate("/appointment", { state: doctor });
            }}
          >
            Đặt lịch khám
          </Button>
          <section className="info">
            <div className="info-container">
              <span>Thông tin chung:</span>
              <p>{doctor.doctorInfo}</p>
            </div>
            <div className="info-container">
              <span>Các ca khám trong tuần:</span>
              <div className="shifts">
                {shifts &&
                  Object.entries(shifts).map(([weekday, shiftTime]) => {
                    return (
                      <div style={{ display: "flex" }}>
                        <p style={{ fontWeight: "600", width: "90px" }}>
                          {weekday}:
                        </p>
                        {shiftTime &&
                          shiftTime.length > 0 &&
                          shiftTime.map((shiftTime) => {
                            return <ItemCard name={shiftTime.time} />;
                          })}
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </Wrapper>
      </Container>
    );
  }
}
