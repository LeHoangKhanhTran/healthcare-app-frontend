import styled from "styled-components";
import Input from "../ui/input";
import RadioItem from "../ui/radio-item";
import UserIcon from "../../assets/icons/user.svg";
import EmailIcon from "../../assets/icons/email.svg";
import PhoneIcon from "../../assets/icons/phone.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import { useState } from "react";
import { Control, Controller, ControllerFieldState, ControllerRenderProps, UseFormGetValues, UseFormSetValue, UseFormStateReturn } from "react-hook-form";
import { PatientProfileForm } from "../../pages/Patient/PatientProfile";
import DatePicker from "../DatePicker";
import { Dayjs } from "dayjs";

const Wrapper = styled.div`
 
    h2 {
        font-size: 1.6rem;
        color: var(--white-text-color);
        margin-bottom: 20px;
    }

    form {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    .calendar {
        position: fixed;
        top: 123px;
        left: 245px;
    }
`


const genderMap: {[key: string]: 0 | 1 | 2} = {
    Male: 0,
    Female: 1,
    Other: 2
}

const arr = ["Male", "Female", "Other"]
export default function PersonalInfoForm({ control, setValue, getValues } : { control: Control<PatientProfileForm>, setValue: UseFormSetValue<PatientProfileForm>, getValues?: UseFormGetValues<PatientProfileForm>}) {
    const [gender, setGender] = useState<string>(getValues && getValues('gender') ? arr[getValues('gender')] : "Male");
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [date, setDate] = useState<string>(getValues ? getValues("dateOfBirth") : "");

    const hideCalendar = () => {
        setTimeout(() => {
            setShowCalendar(false)
        }, 100)
    }
    
    const updateDate = (value: Dayjs) => {
        setValue("dateOfBirth", value.format("DD/MM/YYYY"))
        setDate(value.format("DD/MM/YYYY"))
        if (value) {
            hideCalendar()
        }
    }
    const handleGender = (gender: "Male" | "Female" | "Other") => {
        setGender(gender);
        setValue('gender', genderMap[gender])
    }
    return (
        <Wrapper>
            <h2>Thông tin cá nhân</h2>
            <form>
            <Controller
            name="fullname"
            control={control}
            defaultValue=""
            render={({
                field}: {
                    field: ControllerRenderProps<PatientProfileForm, 'fullname'>,
                    fieldState: ControllerFieldState,
                    formState: UseFormStateReturn<PatientProfileForm>
                }) => (
                    <Input {...field} icon={UserIcon} label="FullName" labelText="Họ và tên" placeholder="Vd: John Wales" />
                )}
            />
                
                <div className="flex-container">
                    <Controller
                    name="email"
                    control={control}
                    render={({
                        field}: {
                            field: ControllerRenderProps<PatientProfileForm, 'email'>,
                            fieldState: ControllerFieldState,
                            formState: UseFormStateReturn<PatientProfileForm>
                        }) => (
                            <Input {...field} icon={EmailIcon} type="email" label="Email" labelText="Email"/>
                        )}
                    />
                    <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    render={({
                        field}: {
                            field: ControllerRenderProps<PatientProfileForm, 'phoneNumber'>,
                            fieldState: ControllerFieldState,
                            formState: UseFormStateReturn<PatientProfileForm>
                        }) => (
                            <Input {...field} icon={PhoneIcon} type="tel"label="PhoneNumber" labelText="Số điện thoại"/>
                        )}
                    />
                </div>
                <div className="flex-container">
                    <div style={{flex: "50%"}}>
                        <Input icon={CalendarIcon} label="DateOfBirth" labelText="Ngày sinh" disabled={true} onFocus={() => {setShowCalendar(true)}} value={date}/>
                        {showCalendar && <DatePicker handler={updateDate}/>}
                    </div>
                    <label style={{flex: "50%"}}>
                        Giới tính
                        <div className="flex-container" style={{height: "45px", justifyContent: "space-around", alignItems: "center"}}>
                            <RadioItem name="Gender" value="Nam" handleChange={() => {handleGender("Male")}} checked={gender === "Male"}/>
                            <RadioItem name="Gender" value="Nữ" handleChange={() => {handleGender("Female")}} checked={gender === "Female"}/>
                            <RadioItem name="Gender" value="Khác" handleChange={() => {handleGender("Other")}} checked={gender === "Other"}/>
                        </div>
                    </label>
                </div>
                <div className="flex-container">
                    <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    render={({
                        field}: {
                            field: ControllerRenderProps<PatientProfileForm, 'address'>,
                            fieldState: ControllerFieldState,
                            formState: UseFormStateReturn<PatientProfileForm>
                        }) => (
                            <Input {...field} label="Address" labelText="Địa chỉ"/>
                        )}
                    />
                    <Controller
                    name="occupation"
                    control={control}
                    defaultValue=""
                    render={({
                        field}: {
                            field: ControllerRenderProps<PatientProfileForm, 'occupation'>,
                            fieldState: ControllerFieldState,
                            formState: UseFormStateReturn<PatientProfileForm>
                        }) => (
                            <Input {...field} label="Occupation" labelText="Nghề nghiệp"/>
                        )}
                    />
                </div>
            </form> 
        </Wrapper>
    )
}