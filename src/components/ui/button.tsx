import { ReactNode } from "react";
import styled from "styled-components";

const colorMap = {
    "primary" : "var(--green)", 
    "danger": "var(--btn-red)"
} as { [key: string]: string }
const Container = styled.button<ButtonProps>`
    padding: 10px 24px;
    border-radius: 8px;
    width: 100%;
    border: none;
    color: var(--white-text-color);
    font-weight: 600;
    font-size: 1rem;
    background-color: ${ props => props.type ? colorMap[props.type] : colorMap["primary"] };
    cursor: pointer;
    &:hover {
        opacity: 0.85;
    }
`

interface ButtonProps {
    type?: "primary" | "danger"
    children: ReactNode,
    onClick: () => void
}

export default function Button({ type = "primary", children, onClick } : ButtonProps) {
    return (
        <Container type={type} onClick={onClick}>{children}</Container>
    )
}