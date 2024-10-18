import styled from "styled-components";
import Input from "../ui/input";
import DropdownInput from "../ui/dropdown-input";
import Button from "../ui/button";
import Textarea from "../ui/textarea";
import FileUploader from "../FileUploader";
import ItemCard from "../ui/item-card";
import SearchIcon from "../../assets/icons/search.svg";
import { useEffect, useState } from "react";
import { Controller, ControllerFieldState, ControllerRenderProps, useForm, UseFormStateReturn } from "react-hook-form";
import axios, { AxiosError } from "axios";
import config from "../../Config";
import { Doctor, Specialty } from "../../types";
const Wrapper = styled.div`
    height: fit-content;
    padding: 15px 15px 15px 0;
    h2 {
        font-size: 1.6rem;
        color: var(--white-text-color);
    }

    form {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 18px; 
        min-width: 450px;
    }

    footer {
        margin-top: 32px;
    }

    .add-btn {
        background: var(--green);
        border-radius: 5px;
        padding: 5px 8px;
        height: auto;
        color: var(--white-text-color);
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 12px;
        transform: translateY(15px);
        &:hover {
            opacity: 0.85;
        }
    }

    .specialties {
        width: calc(100% - 88px);
        max-width: calc(100% - 88px);
        margin-top: 10px;
        left: calc(16px + 24px + 12px);
        display: flex;
        gap: 8px;
    }
`

const list3 = [
    {name: "Thần kinh"},
    {name: "Thần kinh"},
    {name: "Thần kinh"}
]

export type DoctorInfo = {
    name: string,
    specialties: string[],
    doctorInfo: string,
    doctorImage: File
}


export default function DoctorForm({ doctor }: { doctor?: Doctor}) {
    const [specialties, setSpecialties] = useState<string[]>([]);
    const { handleSubmit, control, setValue } = useForm<DoctorInfo>({
        defaultValues: doctor ? {
        name: doctor.name,
        specialties: doctor.specialties,
        doctorInfo: doctor.doctorInfo}      
        : {}
    });
    const handleSpecialties = (value: string) => {
        setSpecialties([...specialties, value])
        setValue('specialties', [...specialties, value])
    }

    const getSpecialtyUrl = (searchTerm: string) => {
        return `${config.apiUrl}/Specialty${searchTerm ? `?SpecialtyName=${searchTerm}` : ''}`
    }
    const onSubmit = async (data: DoctorInfo) => {
        try {
            const formData = new FormData();
            formData.append('Name', data.name);
            formData.append('DoctorInfo', data.doctorInfo);
            formData.append('DoctorImage', data.doctorImage);
            data.specialties.forEach((specialty, index) => {
                formData.append(`Specialties[${index}]`, specialty);
            });
            if (doctor) {
               await axios.put(`${config.apiUrl}/Doctor/${doctor.doctorId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            else {
                await axios.post(`${config.apiUrl}/Doctor`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
    
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Wrapper>
            <form>
            <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({
                        field,                    
                        fieldState: { error },   
                        formState                
                        }: {
                            field: ControllerRenderProps<DoctorInfo, 'name'>,
                            fieldState: ControllerFieldState,
                            formState: UseFormStateReturn<DoctorInfo>
                        }) => (
                            <Input {...field} label="Name" labelText="Tên bác sĩ"/>
                        )}
                    />
                <section>
                    <DropdownInput icon={SearchIcon} type="Chuyên khoa" label="Specialty" labelText="Chuyên khoa"
                    getListUrl={getSpecialtyUrl} 
                    transformFunction={(list: Specialty[]) => {return list.map((item) => {return {name: item.name}})}}
                    handlePick={(value: string) => handleSpecialties(value)}/>
                        <div className="flex-container specialties">
                            {doctor && doctor.specialties.map(specialty => {
                                return (
                                    <ItemCard name={specialty}/>
                                )
                            })}
                            {specialties.map((item) => {
                                return (
                                    <ItemCard name={item}/>
                                )
                            })}
                        </div>
                    
                </section>
                <Controller
                    name="doctorInfo"
                    control={control}
                    defaultValue=""
                    render={({
                        field,                    
                        fieldState: { error },   
                        formState                
                        }: {
                            field: ControllerRenderProps<DoctorInfo, 'doctorInfo'>,
                            fieldState: ControllerFieldState,
                            formState: UseFormStateReturn<DoctorInfo>
                        }) => (
                            <Textarea {...field} name="DoctorInfo" labelText="Thông tin chung"/>
                        )}
                    />  
                <label>
                    Ảnh bác sĩ
                    <Controller
                    name="doctorImage"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                        <FileUploader {...field} description={"ảnh bác sĩ"} onFileSelect={(file: File) => {onChange(file)}} defaultImg={doctor?.imageUrl}/>)}
                    />      
                </label>
            </form>
            <footer>
                <Button onClick={handleSubmit(onSubmit)}>Tiếp tục</Button>
            </footer>
        </Wrapper>
    )
}