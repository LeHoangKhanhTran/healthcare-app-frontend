import { useState } from "react"
import Dialogue from "../ui/dialogue"
import DoctorForm from "../forms/DoctorForm"
import { Doctor } from "../../types"

export default function DoctorModal({doctor, handleClose, sideTask}: {doctor?: Doctor, handleClose?: () => void, sideTask: () =>  Promise<void>}) {
    const [open, setOpen] = useState<boolean>(true);
    const onClick = () => {
        setOpen(false);
        if (handleClose) handleClose()
    }
    if (open) {
        return(
            <>
                <div className="shade"></div>
                <div className="modal-center">
                    <Dialogue title="Thông tin bác sĩ" closeHandler={onClick}>
                       <DoctorForm doctor={doctor} onClick={async () => {await sideTask(); setOpen(false)}}/>
                    </Dialogue>
                </div>
            </>
        )
    }
}