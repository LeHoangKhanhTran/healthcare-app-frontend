import { useState } from "react"
import Dialogue from "../ui/dialogue"
import DocumentForm from "../forms/DocumentForm"

export default function DocumentModal({ profileId, handleClose }: { profileId: string, handleClose?: () => void}) {
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
                    <Dialogue title="Tài liệu bệnh nhân" closeHandler={onClick}>
                       <DocumentForm profileId={profileId}/>
                    </Dialogue>
                </div>
            </>
        )
    }
}