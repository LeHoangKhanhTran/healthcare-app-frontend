import { useState } from "react";
import styled from "styled-components";

const OtpSlot = styled.input<{active: boolean}>`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border: 2px solid ${props => props.active ? "var(--green)" : "var(--grey-border-color)"};
    font-size: 2rem;
    background: var(--primary-bg-color);
    padding: 10px 8px;
    color: var(--white-text-color);
    text-align: center;
    outline: none;
    &:focus {
        border: 2px solid var(--green);
    }
`

const OtpSlotGroup = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    height: 70px;
    
`

export default function InputOtp({ otp, setOtp }: { otp: string, setOtp: (value: string) => void}) {

    const [currentIndex, setIndex] = useState<number>(0);
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            let updatedOtp = "";
            if (index === currentIndex) {
                updatedOtp = otp.substring(0, currentIndex - 1) + " " + " " + otp.substring(currentIndex + 1, otp.length);
                setIndex(prev => prev - 1);
                ((e.target as HTMLInputElement).previousSibling as HTMLInputElement).focus();
            }
            else {
                updatedOtp = otp.substring(0, index) + " "  + otp.substring(index + 1 , otp.length);
            }
            if (((e.target as HTMLInputElement).value.length > 0) && index > 0) {
                ((e.target as HTMLInputElement).previousSibling as HTMLInputElement).focus();
            }
            setOtp(updatedOtp);
        }
        else if (!isNaN(Number(e.key))) {
            let input = Number(e.key)
            if (!isNaN(input) && (currentIndex < 6 || index < currentIndex)) {
                let updatedOtp = ""
                if (index === currentIndex) {
                    updatedOtp = otp.substring(0, currentIndex) + input.toString() + otp.substring(currentIndex + 1, otp.length);
                    setIndex(prev => prev + 1 > 5 ? 5 : prev + 1);
                }
                else {
                    updatedOtp = otp.substring(0, index) + input.toString() + otp.substring(index + 1, otp.length);
                }
                setOtp(updatedOtp);
                if (currentIndex < 5) {
                    ((e.target as HTMLInputElement).nextSibling as HTMLInputElement).focus();
                }
            }
        }
        if (e.key == "ArrowRight") {
            ((e.target as HTMLInputElement).nextSibling as HTMLInputElement).focus();
        }
        if (e.key == "ArrowLeft") {
            ((e.target as HTMLInputElement).previousSibling as HTMLInputElement).focus();
        }
    }
    return (
        <OtpSlotGroup>
            {Array(6).fill(null).map((_element, i) => {
                return (
                    <OtpSlot active={i <= currentIndex} autoFocus={i === 0} value={otp[i]} onKeyDown={(e) => {handleKeyDown(e, i)}}/>
                )
            })}
        </OtpSlotGroup>
    )
}