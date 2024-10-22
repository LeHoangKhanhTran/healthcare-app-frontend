import styled from "styled-components";
import { Table } from "../ui/table";
import ItemCard from "../ui/item-card";
import TrashIcon from "../../assets/icons/trash-can.svg";
import DropdownInput from "../ui/dropdown-input";
import Input from "../ui/input";
import Button from "../ui/button";
import { Controller, ControllerFieldState, ControllerRenderProps, useForm, UseFormStateReturn } from "react-hook-form";
import axios from "axios";
import config from "../../Config";
import { Doctor, Shift, ShiftTime } from "../../types";
import { useEffect, useState } from "react";
import { parseShifts } from "../../Utils";
const Container = styled.section`
    width: 100%;
    height: fit-content;
    position: relative;
    padding-right: 10px;
    .time-card {
        position: relative;
        display: flex;
        gap: 10px;

        .item-card {
            cursor: pointer;
        }

        .highlighted {
            border: 1px solid var(--green)
        }

        .picked {
            border: 1px solid var(--red);
        }
    }

    h2 {
        margin-top: 25px;
    }

    .add-shift {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        gap: 14px;
        align-items: start;
        height: 150px;
        button {
            position: relative;
            top: 30px;
            width: 170px;
            font-size: .88rem;
            height: 41px;
        }
        
    }

    .delete {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 5px;
        margin-bottom: 15px;
        font-size: 14px;
        font-weight: 600;
        color: var(--red);
        cursor: pointer;
    }

    table {
        border: 2px solid var(--grey-border-color);
    }

    table tr td {
        border-bottom: px solid var(--grey-border-color);
    }

    .weekday {
        width: 140px;
        font-size: .98rem;
        border-right: 1px solid var(--grey-border-color);
    }

    /* ul {
        transform: translateY(5px);
    } */
`
const weekdays = [
    { name: "Thứ Hai", value: 1},
    { name: "Thứ Ba", value: 2 },
    { name: "Thứ Tư", value: 3 },
    { name: "Thứ Năm", value: 4 },
    { name: "Thứ Sáu", value: 5 },
    { name: "Thứ bảy", value: 6 },
    { name: "Chủ Nhật", value: 0 }
];




export default function ShiftForm({ pickedDoctor }: { pickedDoctor: Doctor }) {
    const [doctor, setDoctor] = useState<Doctor>(pickedDoctor)
    const { handleSubmit, control, setValue } = useForm<Shift>();
    const [shifts, setShifts] = useState<{[key: string]: ShiftTime[]}>();
    const [removedShifts, setRemovedShifts] = useState<string[]>([]);
    const [removeMode, setMode] = useState<boolean>(false);
    console.log(doctor)
    useEffect(() => {
        if (doctor && doctor.shifts) {
            setShifts(parseShifts(doctor.shifts.sort((shiftOne, shiftTwo) => shiftOne.weekday - shiftTwo.weekday)));
        }
    }, [doctor])

    const onSubmit = async (data: Shift) => {
        try {
            console.log(data)
            const response = await axios.patch(`${config.apiUrl}/Doctor/${doctor.doctorId}/shifts`, data);
            if (response.status === 200)  {
                retrieveDoctor(doctor.doctorId);
            }
        }
        catch(error) {
            console.log(error)
        }
    }
    

   

    const toggleShift = (id: string) => {
        if (removeMode) {
            console.log(id)
            if (removedShifts.includes(id)) {
                setRemovedShifts(prev => prev.filter(shift => shift !== id))
            }
            else {
                setRemovedShifts(prev => [...prev, id])
            }
        }
    }

    const handleDelete = () => {
        if (removeMode && removedShifts.length > 0) {
            removeShifts(removedShifts);
        }
        setMode(prev => !prev)
    }

    const retrieveDoctor = async (id: string) => {
        try {
            const response = await axios.get(`${config.apiUrl}/Doctor/${id}`);
            if (response.status === 200) {{
                const doctor = response.data as Doctor
                if (doctor) {
                    setDoctor(doctor)
                }
            }}
        }
        catch (error) {
            console.log(error)
        }
    }

    const removeShifts = async (ids: string[]) => {
        try {
            const requests = ids.map(id => {
                return axios.delete(`${config.apiUrl}/Doctor/${doctor.doctorId}/shifts`, {
                    params: { shiftId: id }
                });
            });
    
            await axios.all(requests)
            .then(() => {
                setRemovedShifts([]);
                retrieveDoctor(doctor.doctorId)
            })
            .catch(error => {
                console.error('Error deleting shifts:', error);
            });
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };
    return (
        <Container>
            <section className="delete" onClick={handleDelete}>
                <img src={TrashIcon} width="20px" height="20px" id="trash-icon"/>
                <p>Hủy ca khám</p>
            </section>
            <Table>
                <thead>
                    <th style={{borderTopLeftRadius: "12px"}}>Thứ</th>
                    <th style={{borderTopRightRadius: "12px"}}>Các ca khám</th>
                </thead>
                <tbody>
                        {shifts && Object.entries(shifts).map(([weekday, shiftTime]) => {
                            return (
                                <tr>
                                    <td className="weekday">{weekday}</td>
                                    <td className="time-card">
                                        {shiftTime && shiftTime.length > 0 && shiftTime.map(shiftTime => {
                                            return (
                                                <ItemCard name={shiftTime.time} 
                                                handleClick={() => {toggleShift(shiftTime.shiftId)}} 
                                                className={removeMode && removedShifts.includes(shiftTime.shiftId) ? "picked" : removeMode ? "highlighted" : ""}/>
                                            )
                                        })}
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
            <h2>Thêm ca khám</h2>
            <section className="add-shift">
                <div>
                    <DropdownInput labelText="Thứ" type="Thứ" items={weekdays} handlePick={(value?: any) => {setValue("weekday", value)}} disabled={true}/>
                </div>
                <div>
                <Controller
                name="startTime"
                control={control}
                render={({
                    field}: {
                        field: ControllerRenderProps<Shift, 'startTime'>,
                        fieldState: ControllerFieldState,
                        formState: UseFormStateReturn<Shift>
                    }) => (
                        <Input {...field} labelText="Thời gian bắt đầu" placeholder="Vd: 9:45"/>
                    )}
                />
                    
                </div>
                <div>
                <Controller
                name="finishTime"
                control={control}
                render={({
                    field                
                    }: {
                        field: ControllerRenderProps<Shift, 'finishTime'>,
                        fieldState: ControllerFieldState,
                        formState: UseFormStateReturn<Shift>
                    }) => (
                        <Input {...field} labelText="Thời gian kết thúc" placeholder="Vd: 14:00"/>
                    )}
                />
                </div>
                <div>
                <Controller
                name="slots"
                control={control}
                render={({
                    field                
                    }: {
                        field: ControllerRenderProps<Shift, 'slots'>,
                        fieldState: ControllerFieldState,
                        formState: UseFormStateReturn<Shift>
                    }) => (
                        <Input {...field} type="number" labelText="Số lượt khám" placeholder="10"/>
                    )}
                />
                    
                </div>
                <Button onClick={handleSubmit(onSubmit)}>Thêm ca khám</Button>
            </section>
        </Container>
    )
}