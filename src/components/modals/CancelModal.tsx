import { useState } from "react"
import Dialogue from "../ui/dialogue"
import Button from "../ui/button"
import Textarea from "../ui/textarea"
import styled from "styled-components"


export default function CancelModal({ handleClick }: {handleClick: () => void}) {
    const [open, setOpen] = useState<boolean>(true)
    if (open) {
        return ( 
            <>
                <div className="shade"></div>
                <div className="modal-center">
                    <Dialogue title="Hủy lịch khám" description="Bạn có thực sự muốn hủy lịch khám này?" closeHandler={() => setOpen(false)}>
                        <main>
                            <Textarea name="reason" labelText="Lý do hủy lịch hẹn"/>
                        </main>
                        <footer>
                            <Button type="danger" onClick={handleClick}>Hủy lịch khám</Button>
                        </footer>
                    </Dialogue>
                </div>
            </>
        )
    }
}