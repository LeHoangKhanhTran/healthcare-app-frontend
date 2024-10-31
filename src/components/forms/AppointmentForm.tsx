import styled from "styled-components";
import DropdownInput from "../ui/dropdown-input";
import Textarea from "../ui/textarea";
import Button from "../ui/button";
import CalendarIcon from "../../assets/icons/calendar.svg";
import SearchIcon from "../../assets/icons/search.svg";
import ClockIcon from "../../assets/icons/clock.svg";
import Input from "../ui/input";
import { Controller, ControllerFieldState, ControllerRenderProps, useForm, UseFormStateReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import DatePicker from "../DatePicker";
import axios from "axios";
import config from "../../Config";
import { Specialty } from "../../types";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { FormAppointment, Doctor } from "../../types";
import { useUserContext } from "../../UserContextProvider";
const Wrapper = styled.div`
    height: 85dvh;
    overflow: hidden;
    header {
        margin-bottom: 30px;
    }

    h2 {
        font-size: 1.6rem;
        color: var(--white-text-color);
    }

    main {
        /* position: relative; */
        display: flex;
        flex-direction: column;
        gap: 22px;
    }

    footer {
        margin-top: 35px;
    }

    .calendar {
        position: absolute;
        top: 128px;
        left: 35px;
    }
`

export default function AppointmentForm({ defaultDoctor }: { defaultDoctor?: Doctor }) {
    const { user, loading } = useUserContext();
    const { handleSubmit, control, setValue } = useForm<FormAppointment>({defaultValues: {patientId: "3c69e909-380d-4ae8-aa47-2d60379728fc"}});
    const [specialty, setSpecialty] = useState<string>();
    const [doctor, setDoctor] = useState<Doctor | undefined>(defaultDoctor);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [date, setDate] = useState<string>();
    const [weekday, setWeekday] = useState<number>();
    const navigate = useNavigate();
    const getSpecialtyUrl = (searchTerm: string) => {
        return `${config.apiUrl}/Specialty${searchTerm ? `?SpecialtyName=${searchTerm}` : ''}`
    }
    const getDoctorUrl = (searchTerm: string) => {
        return `${config.apiUrl}/Doctor${searchTerm || specialty ? '?' : ''}${searchTerm ? `Name=${encodeURIComponent(searchTerm)}` : ''}${searchTerm && specialty ? '&' : ''}${specialty ? `Specialty=${encodeURIComponent(specialty)}` : ''}`
    }

    const onSubmit = async (data: FormAppointment) => {
        console.log(data)
        try {
            const response = await axios.post(`${config.apiUrl}/Appointment`, data);
            if (response.status === 200) {
                const id = (response.data as {appointmentId: string}).appointmentId;
                navigate(`/success/${id}`)
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    const hideCalendar = () => {
        setTimeout(() => {
            setShowCalendar(false)
        }, 100)
    }
    const updateDate = (value: Dayjs) => {
        setValue("appointmentDate", value.format('YYYY-MM-DD'))
        setDate(value.format('DD/MM/YYYY'))
        setWeekday(value.day())
        if (value) {
            hideCalendar()
        }
    }

    const handlePickDoctor = (value: any, list?: Doctor[]) => {
        setValue("doctorId", value);
        setDoctor(list?.filter(item => item.doctorId === value)[0])
    }

    const getAppointmentTime = () => {
        return doctor?.shifts.filter(shift => shift.weekday === weekday).map(shift => {return {name: `${shift.startTime}-${shift.finishTime}`}})
    }

    useEffect(() => {
        console.log(loading)
        if (!loading) {
            console.log(user)
            if (user && user.profileId) setValue("patientId", user.profileId)
            else {
                navigate("/profile")
            }
        }
    }, [loading])
    console.log(doctor?.shifts.map(item => item.weekday))
    return (
        <Wrapper>
            <header>
                <h2>Đặt lịch khám</h2>
            </header>
            <main>
                 <DropdownInput getListUrl={getSpecialtyUrl} icon={SearchIcon} type="Chuyên khoa" label="Specialty" 
                labelText="Chuyên khoa" placeholder="Chọn chuyên khoa" handlePick={(value: string) => setSpecialty(value)}
                transformFunction={(list: Specialty[]) => {return list.map((item) => {return {name: item.name, value: item.name}})}}/> 
                 <DropdownInput getListUrl={getDoctorUrl} icon={SearchIcon} type="Bác sĩ" label="Doctor" labelText="Bác sĩ" 
                placeholder="Chọn bác sĩ" transformFunction={(list: Doctor[]) => {return list.map(item => {return {name: item.name, img: item.imageUrl, value: item.doctorId}})}}
                handlePick={handlePickDoctor} value={defaultDoctor ? {name: defaultDoctor.name, img: defaultDoctor.imageUrl, value: defaultDoctor.doctorId} : undefined}/>
                <section className="flex-container">
                    <Controller
                    name="reason"
                    control={control}
                    defaultValue=""
                    render={({
                        field}: {
                        field: ControllerRenderProps<FormAppointment, 'reason'>,
                        fieldState: ControllerFieldState,
                        formState: UseFormStateReturn<FormAppointment>
                      }) => (
                        <Textarea {...field} name="reason" labelText="Lý do đặt lịch" placeholder="Vd: Khám bệnh định kỳ"/>
                      )}
                    />
                    <Controller
                    name="note"
                    control={control}
                    defaultValue=""
                    render={({
                        field}: {
                        field: ControllerRenderProps<FormAppointment, 'note'>,
                        fieldState: ControllerFieldState,
                        formState: UseFormStateReturn<FormAppointment>
                      }) => (
                        <Textarea {...field} name="note" labelText="Ghi chú thêm"/>
                      )}
                    />
                </section>
                <section className="flex-container">
                    <div style={{flexBasis: "55%"}}>
                        <Input icon={CalendarIcon} label="appointmentDate" labelText="Ngày khám" disabled={true} placeholder="Chọn ngày khám" onFocus={() => {setShowCalendar(true)}} value={date}/>
                        {showCalendar && <DatePicker handler={updateDate} weekdays={doctor?.shifts.map(item => item.weekday)} pastDisabled={true}/>}
                    </div>
                    <div style={{flexBasis: "45%"}}>
                        <DropdownInput items={getAppointmentTime()} icon={ClockIcon} type="Thời gian khám" label="appointmentTime" labelText="Thời gian khám" placeholder="Chọn giờ khám" disabled={true} handlePick={(value: any) => setValue("appointmentTime", value)}/>
                    </div>     
                </section>
            </main>
            <footer>
                <Button onClick={handleSubmit(onSubmit)}>Đặt lịch và tiếp tục</Button>
            </footer>
        </Wrapper>
    )
}
