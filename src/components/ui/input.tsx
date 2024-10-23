import styled from "styled-components";
const Container = styled.div<{icon: string | undefined, disabled: boolean}>`
    width: 100%;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .icon {
        position: absolute;
        left: 16px;
        width: 22px;
        height: 22px;
    }

    input {
        width: 100%;
        height: 42px;
        border-radius: 8px;
        padding: ${props => props.icon ? "0px 16px 0px calc(16px + 24px + 5px)" : "0 16px"};
        border: 1.5px solid var(--grey-border-color);
        font-size: .88rem;
        letter-spacing: .5px;
        background: var(--input-bg-color);
        color: var(--white-text-color);
        outline: none;
        resize: none;
        cursor: ${props => props.disabled ? "pointer" : ""};
    }

    input::placeholder {
        font-weight: 500;
        color: var(--input-holder-color)
    }

    input:focus-visible {
        width: calc(100% - 6px);
        height: 36px;
        background: linear-gradient(var(--input-bg-color), var(--input-bg-color)) padding-box, var(--input-focus-color) border-box;
        border: 1px solid transparent;
        outline: 4px solid #84DCF53D;
        transition: background-color 0.2s, border-color 0.2s;
    }

`

export interface InputProps {
    type?: string,
    label?: string,
    labelText: string,
    placeholder?: string
    icon?: string,
    disabled?: boolean,
    value?: any,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    error?: string; 
    onFocus?: () => void,
    children?: React.ReactNode,
}


export default function Input({ type="text", label, labelText, placeholder="", icon, disabled=false, value, onChange, onBlur, error, onFocus, children } : InputProps) {
    return (
        <label htmlFor={label} style={{width: "100%"}}>
            {labelText}
            <Container icon={icon} disabled={disabled}>
                {icon && <img className="icon" src={icon}/>}
                <input type={type} placeholder={placeholder} name={label} autoComplete="off" readOnly={disabled} value={value} onChange={onChange} onBlur={onBlur} onFocus={onFocus}/>
                {children}
            </Container>
            {error && <span className="error">{error}</span>}
            
        </label>
    )
}