import styled from "styled-components";
import Dialogue from "../ui/dialogue";
import InputOtp from "../ui/input-otp";
import Button from "../ui/button";
import { useState } from "react";
import axios from "axios";
import config from "../../Config";

const Container = styled.div`
    .error {
        font-size: .9rem;
        margin-top: 10px;
        color: var(--btn-red);
    }
`

export default function OtpModal({ phoneNumber, onClick }: { phoneNumber: string, onClick: () => void }) {
    const [open, setOpen] = useState<boolean>(true)
    const [error, setError] = useState<string>();
    const [code, setCode] = useState<string>("000000");
    const verifyOtp = async () => {
        try {
            const data = {phoneNumber: phoneNumber, code: code}
            const response = await axios.post(`${config.apiUrl}/verify-otp`, data);
            if (response.status === 200) {
                onClick();
            }
        }
        catch(error) {
            setError("Mã OTP không chính xác")
        }
    }
    if (open) {
        return ( 
            <>
                <div className="shade"></div>
                <Container className="modal-center">
                    <Dialogue title="Xác nhận OTP" description="Hãy nhập mã OTP được gửi đến số điện thoại của bạn." closeHandler={() => setOpen(false)}>
                        <main>
                            <InputOtp otp={code} setOtp={(value: string) => setCode(value)}/>
                            { error && <div className="error">{error}</div>}
                        </main>
                        <footer>
                            <Button onClick={verifyOtp}>Gửi mã</Button>
                        </footer>
                    </Dialogue>
                </Container>
            </>
        )
    }
}