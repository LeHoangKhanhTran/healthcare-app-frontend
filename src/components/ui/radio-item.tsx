import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div<{checked: boolean}>`
    position: relative;
    width: 110px;
    height: 40px;
    display: flex;
    align-items: center;
    outline: 2px dashed var(--grey-border-color);
    background: ${props => props.checked ? "var(--primary-bg-color)" : "var(--input-bg-color)"};
    border-radius: 8px;
    padding: 0 12px;


    div {
        font-weight: 500;
        font-size: .9rem;
        line-height: 24px;
        margin-left: 30px;
    }
`;

const RadioButtonLabel = styled.label`
    position: absolute;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background: var(--input-bg-color);
    border: 1px solid var(--grey-border-color);
`;

const RadioButton = styled.input`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    opacity: 0;
    z-index: 1;
    cursor: pointer;

    &:checked + ${RadioButtonLabel} {
        background: linear-gradient(var(--input-bg-color), var(--input-bg-color)) padding-box, var(--input-focus-color) border-box;
        border: 5px solid transparent;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;


export interface RadioItemProps {
    name: string,
    value: any,
    handleChange: () => void,
    checked: boolean
}

export default function RadioItem({ name, value, handleChange, checked } : RadioItemProps) {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // const items = document.getElementsByClassName(`${name}-radio`);
        // Array.from(items).forEach((e) => {
        //     (e as HTMLElement).style.background = "var(--input-bg-color)";  
        // });
        // ((event.target as HTMLElement).parentElement as HTMLElement).style.background = "var(--primary-bg-color)";
    }
    return (
        <Wrapper checked={checked} onClick={(e) => handleClick(e)} className={name + "-radio"}>
            <RadioButton type="radio" name={name} value={value} onChange={handleChange} checked={checked}/>
            <RadioButtonLabel/>
            <div>{value}</div>
        </Wrapper>
    )
}