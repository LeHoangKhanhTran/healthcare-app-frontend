import styled from "styled-components"
import { Table } from "../../components/ui/table";
import ItemCard from "../../components/ui/item-card";
import DropdownInput from "../../components/ui/dropdown-input";
import Input from "../../components/ui/input";
import SearchIcon from "../../assets/icons/search.svg";
import Button from "../../components/ui/button";
import { useEffect, useState } from "react";
import DoctorModal from "../../components/modals/DoctorModal";
import ShiftModal from "../../components/modals/ShiftModal";
import config from "../../Config";
import { Doctor, Specialty } from "../../types";
import axios from "axios";
const Container = styled.div`
    position: absolute;
    width: 84%;
    min-height: 40vh;
    height: fit-content;    
    top: 90px;
    left: 8%;
    font-size: 14px;
    padding-bottom: 30px;
    .specialty-group {
        display: flex;
        gap: 8px;
        min-width: fit-content;

        .item-card {
            min-width: fit-content;
        }
    }

    .table {
        margin-top: 10px;
    }

    .name {
        font-weight: 600;
        line-height: 20px;
    }

    .actions {
        width: 190px;
        font-weight: 600;
        .normal {
            color: var(--green);
        }

        .cancel {
            color: var(--red);
        }
        span {
            cursor: pointer;
        }
    }

    .doctor {
        display: flex;
        align-items: center;
        gap: 8px;
        img {
            width: 32px;
            height: 32px;
        }
    }

    .search-filter {
        /* position: absolute;  */
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: end;
        left: 0;
        margin-top: 20px;
    }

    .filter {
        display: flex;
        gap: 20px; 
    }

    .filter > p {
       margin-top: 42px;
       font-weight: 700;
    }

    .search-filter input {
        /* width: 200px; */
        font-weight: 600;
    }

    .flex-container button {
        height: 42px;
        width: 143px;
    }

   

    .search-filter input{
        width: 250px;
    }


`

export default function DoctorAdmin() {
    const [specialty, setSpecialty] = useState<string>();
    const [modal, setModal] = useState<string>();
    const [doctors, setDoctors] = useState<Doctor[]>();
    const [doctor, setDoctor] = useState<Doctor>();
    const [name, setName] = useState<string>();
    const [filterRemoved, setFilterRemoved] = useState<boolean>(false);
    useEffect(() => {
        getDoctors()
    }, [specialty, name])
    const getSpecialtyUrl = (searchTerm: string) => {
        return `${config.apiUrl}/Specialty${searchTerm ? `?SpecialtyName=${searchTerm}` : ''}`
    }
    const getDoctors = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/Doctor${name && specialty ? `?Name=${name}&Specialty=${specialty}` : 
                name ? `?Name=${name}` : specialty ? `?Specialty=${specialty}` : ''}`)
            if (response.status === 200) {
                setDoctors(response.data as Doctor[])
            }
        }
        catch(error) {
            console.log(error)
        }
    }
    const deleteDoctor = async(id: string) => {
        try {
            const response = await axios.delete(`${config.apiUrl}/Doctor/${id}`)
            if (response.status === 200) {
                getDoctors()
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    const removeFilter = () => {
        setSpecialty("");
        setFilterRemoved(true)
    }
    return (
        <Container>
            <section className="search-filter">
                <div style={{position: "relative", width: "250px"}}>
                    <Input labelText="Bác sĩ" icon={SearchIcon} onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div className="flex-container" style={{alignItems: "end"}}>
                    <div className="filter">
                        <p>Lọc theo:</p>
                        <DropdownInput icon={SearchIcon} type="Chuyên khoa" label="Specialty" labelText="Chuyên khoa"
                        getListUrl={getSpecialtyUrl} 
                        transformFunction={(list: Specialty[]) => {return list.map((item) => {return {name: item.name}})}}
                        handlePick={(value: string) => setSpecialty(value)} removeValue={filterRemoved}/>
                    </div>
                    <Button type="danger" onClick={removeFilter}>Bỏ lọc</Button>
                    <Button onClick={() => {setModal("doctor")}}>Thêm bác sĩ</Button>
                </div>
            </section>
            <section className="table">
                <Table>
                    <thead>
                        <tr>
                            <th style={{borderTopLeftRadius: "12px"}}>Bác sĩ</th>
                            <th>Chuyên khoa</th>
                            <th>Thông tin chung</th>
                            <th className="actions" style={{borderTopRightRadius: "12px"}}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors && doctors.map((doctor, i) => {
                            return (
                                <tr className={i % 2 === 0 ? "first-row" : "second-row"}>
                                    <td>
                                        <div className="doctor">
                                            <img src={doctor.imageUrl} alt=""/>
                                            <span className="name">{doctor.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="specialty-group">
                                            {doctor.specialties && doctor.specialties.map((specialty) => {
                                                return (
                                                    <ItemCard name={specialty}/>
                                                )
                                            })}
                                        </div>
                                    </td>
                                    <td>{doctor.doctorInfo}</td>
                                    <td>
                                        <div className="actions">
                                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                                <span className="normal" onClick={() => {setDoctor(doctor); setModal("doctor")}}>Chỉnh sửa</span>
                                                <span onClick={() => {setDoctor(doctor); setModal("shifts")}}>Ca khám</span>
                                                <span className="cancel" onClick={() => deleteDoctor(doctor.doctorId)}>Xóa</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </section>
            {modal === "doctor" && !doctor && <DoctorModal handleClose={() => {setModal(""); getDoctors()}} sideTask={getDoctors()}/>}
            {modal === "doctor" && doctor && <DoctorModal doctor={doctor} handleClose={() => {setModal("")}} sideTask={getDoctors()}/>}
            {modal === "shifts" && doctor && <ShiftModal doctor={doctor} handleClose={() => setModal("")}/>}
        </Container>
    )
}