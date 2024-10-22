import styled from "styled-components";
import Image from "../../assets/images/register-img.png";
import PersonalInfoForm from "../../components/forms/PersonalInfoForm";
import Button from "../../components/ui/button";
import MedicalInfoForm from "../../components/forms/MedicalInfoForm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../../Config";
import axios from "axios";
import { PatientProfile } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../UserContextProvider";
import { formatDate } from "../../Utils";
const Container = styled.div`
    #main-img {
        height: 100dvh;
    }
    .form {
        position: absolute;
        top: 175px;
        left: 210px;
        width: 50%;
        height: fit-content;
        overflow: hidden;
    }

    header {
        position: absolute;
        top: 90px;
        left: 210px;

        h1 {
            font-size: 1.7rem;
            font-weight: 700;
            line-height: 44pxx;
            margin-block-end: 5px;
        }

        p {
            font-size: .9rem;
            color: var(--grey-text-color);
        }
    }

    footer {
        margin-top: 25px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        button {
            width: 20%;
        }
    }
`
type PersonalInfo = {
    fullName: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: string,
    gender: number,
    address: string,
    occupation: string
}

type MedicalInfo = {
    insuranceNumber: string,
    allergies: string,
    currentMedications: string,
    pastMedicalHistory: string
}

export type PatientProfileForm = PersonalInfo & MedicalInfo & {
    userPhoneNumber: string
};


export default function ProfileForm() {
    const {user, loading} = useUserContext();
    const [form, setForm] = useState<"personal" | "medical">("personal");
    const location = useLocation();
    const navigate = useNavigate();
    const profile = location.state as PatientProfile || undefined;
    console.log(user?.phoneNumber)
    const { handleSubmit, control, setValue, getValues } = useForm<PatientProfileForm>({defaultValues: profile ? {
        fullName: profile.fullname,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        address: profile.address,
        occupation: profile.occupation,
        insuranceNumber: profile.insuranceNumber,
        allergies: profile.allergies,
        currentMedications: profile.currentMedications,
        pastMedicalHistory: profile.pastMedicalHistory,
    } : {gender: 0, phoneNumber: user?.phoneNumber, email: user?.email}});
    const onSubmit = async (data: PatientProfileForm) => {
        console.log(data)
        try {
            if (profile) {
                await axios.put(`${config.apiUrl}/PatientProfile/${profile.patientProfileId}`, data);
            }
            else {
                await axios.post(`${config.apiUrl}/PatientProfile`, data);
            }
            navigate("/")
        }
        catch(error) {
            console.log(error)
        }
    }
    const handleNext = () => {
        if (form === "personal") {
            setForm(_prev => "medical")
        }
        else {
            handleSubmit(onSubmit)()
        }
    }

    const handlePrev = () => {
        setForm(_prev => "personal")
    }

    useEffect(() => {
        if (!loading) {
            if (user) setValue("userPhoneNumber", user.phoneNumber);
            else navigate("/login")
        }
    }, [user])
    if (user) 
        return (
            <Container>
                <header>
                   {!profile && 
                    <div>
                     <h1>Chào mừng 👋</h1>
                     <p>Xin hãy cung cấp một số thông tin trước khi tiếp tục</p>
                    </div>
                   }
                   {profile && 
                    <div>
                        <h1>Chỉnh sửa thông tin</h1>
                    </div>
                   }
                </header>
                <div className="form">
                    {form === "personal" && <PersonalInfoForm control={control} setValue={setValue} getValues={getValues}/>}
                    {form === "medical" && <MedicalInfoForm control={control}/>}
                    <footer>
                        <Button onClick={handleNext}>Tiếp tục</Button>
                        {form === "medical" && <Button onClick={handlePrev}>Quay lại</Button>}
                    </footer>
                </div>
                <img src={Image} id="main-img"/>
            </Container>
        )
}