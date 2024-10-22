import styled from "styled-components"
import { Table } from "../../components/ui/table";
import Input from "../../components/ui/input";
import SearchIcon from "../../assets/icons/search.svg";
import { PatientProfile } from "../../types";
import { useEffect, useState } from "react";
import config from "../../Config";
import axios from "axios";
const Container = styled.div`
    position: absolute;
    width: 84%;
    height: fit-content;
    min-height: 40vh;
    top: 90px;
    left: 8%;
    padding-bottom: 30px;
    .specialty-group {
        display: flex;
        gap: 8px;
    }

    .table {
        margin-top: 100px;
        overflow-x: scroll;
    }

    td {
        min-width: 180px;
    }

    ::-webkit-scrollbar {
        height: 8px;
        cursor: pointer;
    }

    .name {
        font-weight: 600;
        line-height: 20px;
    }

    .search-filter {
        position: absolute; 
        display: flex;
        width: 100%;
        justify-content: space-between;
        left: 0;
        margin-top: 20px;
        height: 30vh;   
    }
`

export default function PatientProfileAdmin() {
    const [profiles, setProfiles] = useState<PatientProfile[]>(); 
    const [searchName, setName] = useState<string>();
    console.log(searchName)
    useEffect(() => {
        getProfiles()
    }, [searchName])
    const getProfiles = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/PatientProfile${searchName ? `?FullName=${searchName}` : ''}`)
            if (response.status === 200) {
                setProfiles(response.data as PatientProfile[])
            }
        }
        catch(error) {
            console.log(error)
        }
    }
    return (
        <Container>
            <section className="search-filter">
                <div style={{position: "relative", width: "250px"}}>
                    <Input labelText="Tên bệnh nhân" icon={SearchIcon} onChange={(e) => {setName(e.target.value)}}/>
                </div>
            </section>
            <section className="table">
                <Table>
                    <thead>
                        <tr>
                            <th style={{borderTopLeftRadius: "12px"}}>Tên bệnh nhân</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Ngày sinh</th>
                            <th>Địa chỉ</th>
                            <th style={{borderTopRightRadius: "12px"}}>Số bảo hiểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles && profiles.map((profile, i) => {
                            return (
                                <tr className={i % 2 === 0 ? "first-row" : "second-row"}>
                                    <td>{profile.fullname}</td>
                                    <td>{profile.phoneNumber}</td>
                                    <td>{profile.email}</td>
                                    <td>{profile.dateOfBirth}</td>
                                    <td>{profile.address}</td>
                                    <td>{profile.insuranceNumber}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </section>
        </Container>
    )
}