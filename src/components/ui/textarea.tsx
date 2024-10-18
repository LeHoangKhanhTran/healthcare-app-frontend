import styled from "styled-components";
const Wrapper = styled.div`
    width: 100%;
    
    label {
        height: 135px;
    }
    textarea {
        width: 100%;
        appearance: none;
        height: 100px;
        border-radius: 8px;
        padding: 12px 16px;
        border: 1.5px solid var(--grey-border-color);
        font-size: .9rem;
        background: var(--input-bg-color);
        color: var(--white-text-color);
        outline: none;
        resize: none;
        line-height: 22px;
    }

    textarea::placeholder {
        font-weight: 500;
        color: var(--input-holder-color)
    }

    textarea:focus-visible {
        width: calc(100% - 8px);
        margin-left: 4px;
        background: linear-gradient(var(--input-bg-color), var(--input-bg-color)) padding-box, var(--input-focus-color) border-box;
        border: 1px solid transparent;
        outline: 4px solid #84DCF53D;
        transition: background-color 0.2s, border-color 0.2s;
    }
`

export interface TextAreaProps {
    name: string,
    labelText: string,
    placeholder?: string,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string
}

export default function Textarea({ name, labelText, placeholder="", onChange, value } : TextAreaProps) {
    return (
        <Wrapper>
            <label htmlFor={name}>
                {labelText}
                <textarea name={name} placeholder={placeholder} onChange={onChange} value={value}></textarea>
            </label>
        </Wrapper>
    )
}