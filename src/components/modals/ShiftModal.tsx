import { useState } from "react"
import Dialogue from "../ui/dialogue"
import ShiftForm from "../forms/ShiftForm"
import styled from "styled-components"
import { Doctor } from "../../types"

const Container = styled.div`
    .modal-center div {
        max-width: 970px;
    }


`
export default function ShiftModal({ doctor, handleClose }: { doctor: Doctor, handleClose?: () => void}) {
    const [open, setOpen] = useState<boolean>(true)
    const onClick = () => {
        setOpen(false)
        if (handleClose) handleClose();
    }
    if (open) {
        return(
            <Container>
                <div className="shade"></div>
                <div className="modal-center">
                    <Dialogue title="Các ca khám của bác sĩ" closeHandler={onClick}>
                       <ShiftForm pickedDoctor={doctor}/>
                    </Dialogue>
                </div>
            </Container>
        )
    }
}