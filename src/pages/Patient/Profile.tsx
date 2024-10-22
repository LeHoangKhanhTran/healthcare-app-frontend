import styled from "styled-components";
import Button from "../../components/ui/button";
import TrashIcon from "../../assets/icons/trash-can.svg";
import PdfImage from "../../assets/images/pdf.png"
import { PatientProfile } from "../../types";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../Config";
import { useNavigate } from "react-router-dom";
import DocumentModal from "../../components/modals/DocumentModal";
import { useUserContext } from "../../UserContextProvider";
import { formatDate } from "../../Utils";
const Container = styled.div`
    max-width: 60%;
    width: fit-content;
    display: flex;
    flex-direction: column;
    padding: 50px;
    gap: 30px;
    background: linear-gradient(var(--input-bg-color), var(--input-bg-color)) padding-box, var(--input-focus-color) border-box;
    border: 1px solid transparent;
    border-radius: 12px;

    h2 {
        font-size: 1.75rem;
        margin-block-end: 20px;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 600px;
        section {
            display: flex;
            gap: 14px;
        }
        .field {
            font-weight: 600;
        }
    }

    .document-container {
        display: flex;
        font-size: 18px;
        font-weight: 600;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 35px;
        .document {
            display: flex;
            align-items: center;
            img {
                border-radius: 5px;
            }
        }

        .pdf {
            width: 140px;
            margin-right: 20px;
        }

        .document-img {
            max-width: 180px;
            min-width: 140px;
            margin-right: 30px;
        }
    }
    
    button {
        margin: 0 0 20px 0;
    }

    .delete-icon {
        cursor: pointer;
    }
`
const Wrapper = styled.div`
    position: absolute;
    top: 110px;
    left: 24%;
    h1 {
        font-size: 2rem;
        margin-block-end: 25px;
    }
`

const genderMap: {[key: string]: string} = {
    Male: 'Nam',
    Female: 'Nữ',
    Other: 'Khác'
}


export default function Profile() {
    const { user, loading } = useUserContext() ?? { user: null, loading: true };
    const [profile, setProfile] = useState<PatientProfile>();
    const [modal, setModal] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {   
        if (!loading) {
            console.log(user)
            if (user && user.profileId) getProfile(user.profileId);
            else if (!user) navigate("/login")
        }
    }, [loading, user, user?.profileId])
    const getProfile = async (profileId: string) => {
        try {
            const response = await axios.get(`${config.apiUrl}/PatientProfile/${profileId}`);
            if (response.status === 200) {
                setProfile(response.data as PatientProfile)
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    const changeInfo = () => {
        navigate('/profile', { state: profile })
    }

    const deleteDocument = async (documentId: string) => {
        try {
            const response = await axios.delete(`${config.apiUrl}/PatientProfile/${user?.profileId}/documents?documentId=${documentId}`);
            if (response.status === 200) {
                getProfile(user && user.profileId ? user.profileId : "")
            }
        }
        catch (error) {
            console.log(error)
        }
    } 

    if (profile) 
        return (
            <>
                <Wrapper>
                    <h1>Hồ sơ bệnh nhân</h1>
                    <Container>
                        <section>
                            <h2>Thông tin cá nhân</h2>
                            <div style={{display: "flex", gap: "0px"}}>
                                <div className="info">
                                    <section>
                                        <div className="field">Họ tên:</div>
                                        <p>{profile.fullname}</p>
                                    </section>
                                    <section>
                                        <div className="field">Ngày sinh:</div>
                                        <p>{profile.dateOfBirth}</p>
                                    </section>
                                    <section>
                                        <div className="field">Giới tính:</div>
                                        <p>{genderMap[profile.gender]}</p>
                                    </section>
                                    <section>
                                        <div className="field">Email:</div>
                                        <p>{profile.email}</p>
                                    </section>
                                </div>
                                <div className="info">
                                    <section>
                                        <div className="field">Số điện thoại:</div>
                                        <p>{profile.phoneNumber}</p>
                                    </section>
                                    <section>
                                        <div className="field">Địa chỉ:</div>
                                        <p>{profile.address}</p>
                                    </section>
                                    <section>
                                        <div className="field">Nghề nghiệp:</div>
                                        <p>{profile.occupation}</p>
                                    </section>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2>Thông tin y tế</h2>
                            <div className="info">
                                <section>
                                    <div className="field">Số bảo hiểm y tế:</div>
                                    <p>{profile.insuranceNumber}</p>
                                </section>
                                <section>
                                    <div className="field">Các dị ứng:</div>
                                    <p>{profile.allergies}</p>
                                </section>
                                <section>
                                    <div className="field">Các loại thuốc đang dùng:</div>
                                    <p>{profile.currentMedications}</p>
                                </section>
                                <section>
                                    <div className="field">Tiền sử bệnh lý:</div>
                                    <p>{profile.pastMedicalHistory}</p>
                                </section>
                            </div>
                        </section>
                        <Button onClick={changeInfo}>Chỉnh sửa thông tin</Button>
                        <section>
                            <h2>Các tài liệu</h2>
                            {profile.patientDocuments && profile.patientDocuments.map(document => {
                                return (
                                    <div className="document-container">
                                        <div className="document">
                                            {document.documentFormat=== "jpg" || document.documentFormat === "png" ?
                                                <img className="document-img" src={document.documentUrl} alt={document.documentName}/> : 
                                                <a href={document.documentUrl} target="_blank" rel="noopener noreferrer">
                                                    <img className="pdf" src={PdfImage} alt={document.documentName}/>
                                                </a>
                                            }
                                            <p>{document.documentName}</p>
                                        </div>
                                        <img className="delete-icon" src={TrashIcon} alt="" width="28px" height="28px" onClick={() => deleteDocument(document.documentId)}/>
                                    </div>
                                )
                            })}
                            {(!profile.patientDocuments || profile.patientDocuments.length === 0) && <div>Chưa có tài liệu nào được đăng tải</div>}
                        </section>
                        <Button onClick={() => {setModal("document")}}>Thêm tài liệu</Button>
                    </Container>
                </Wrapper>
                {modal === "document" && <DocumentModal profileId={profile.patientProfileId} handleClose={() => {setModal("")}} sideTask={getProfile(profile.patientProfileId)}/>}
            </>
        )
    }