import styled from "styled-components";
import DropdownInput from "../components/ui/dropdown-input";
import config from "../Config";
import { useEffect, useState } from "react";
import SearchIcon from "../assets/icons/search.svg";
import { Doctor } from "../types";
import Button from "../components/ui/button";
import Image from "../assets/images/appointment-img.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
    position: absolute;
    width: 100dvw;
    padding: 120px;
    height: fit-content;
    min-height: 100dvh;

    #bg-img {
        position: absolute;
        transform: rotate(90deg) translate(-1220px, -65px);
    }

`

const Wrapper = styled.main`
    position: relative;
    width: 100%;
    min-height: 100dvh;

    .input-container {
        height: 56px;
    }
    
    .dropdown-input input {
        font-size: 16px;
        height: 50px;
        padding-left: 60px;
    }

    .dropdown-input .dropdown {
        max-height: 220px;
    }

    .chevron-icon {
        display: none;
    }

    .icon {
        width: 26px;
        height: 26px;
    }

    .doctor-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 100px;
        h2 {
            font-size: 2rem;
            color: var(--green);
            font-weight: 700;
            margin-bottom: 50px;
        }

        .doctors-container {
            display: grid;
            grid-template-columns: auto auto auto;
            gap: 85px;
            .card {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }

                img {
                    width: 135px;
                }

                p {
                    font-size: 15px;
                    text-align: center;
                }

                .name {
                    font-size: 1.28rem;
                    font-weight: 600;
                }

                .info {
                    line-height: 22px;
                }

                button {
                    width: 60%;
                    margin-top: 15px;
                }
            }
        }
    }
`
export default function Home() {
    const [doctors, setDoctors] = useState<Doctor[]>();
    const navigate = useNavigate();
    const getDoctorUrl = (searchTerm: string) => {
        return `${config.apiUrl}/Doctor${searchTerm ? `?Name=${encodeURIComponent(searchTerm)}`: ''}`
    }
    useEffect(() => {
        getAllDoctors();
    }, [])

    const getAllDoctors = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/Doctor`);
            if (response.status === 200) setDoctors(response.data as Doctor[]);
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleClick = (doctor: Doctor) => {
        navigate("/appointment", {state: doctor})
    }

    const handlePick = (value: string) => {
        navigate(`/doctor/${value}`);
    }
    return (
        <Container>
            <img src={Image} alt="" id="bg-img"/>
            <Wrapper>
                <DropdownInput getListUrl={getDoctorUrl} icon={SearchIcon} type="Bác sĩ" label="Doctor" labelText="" 
                placeholder="Tìm kiếm bác sĩ" transformFunction={(list: Doctor[]) => {return list.map(item => {return {name: item.name, img: item.imageUrl, value: item.doctorId}})}}
                handlePick={handlePick}/>
                <section className="doctor-section">
                    <h2>Đội ngũ bác sĩ</h2>
                    <div className="doctors-container">
                        {doctors && doctors.map(doctor => {
                            return (
                                <div className="card">
                                    <div onClick={() => handlePick(doctor.doctorId)} style={{cursor: "pointer"}}>
                                        <img src={doctor.imageUrl}/>
                                        <p className="name">{doctor.name}</p>
                                        <p className="info">{doctor.doctorInfo}</p>
                                    </div>
                                    <Button onClick={() => handleClick(doctor)}>Đặt lịch ngay</Button>
                                </div>
                            )
                        })}
                        
                    </div>
                </section>
            </Wrapper>
        </Container>
    )
}
