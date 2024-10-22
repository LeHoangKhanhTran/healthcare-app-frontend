import styled from "styled-components";
import CloseIcon from "../../assets/icons/close.svg";
import { ReactNode } from "react";

const Wrapper = styled.div`
    position: relative;
    padding: 40px;
    border-radius: 16px;
    background: var(--dialogue-bg-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 95vh;
    z-index: 1000;
    h2 {    
        font-weight: 600;
        font-size: 1.3rem;
        line-height: 32px;
        margin-block-end: 12px;
    }

    #description {
        font-weight: 500;
        font-size: .85rem;
        color: var(--grey-text-color)
    }

    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
       
    }

    #close-btn {
        position: absolute;
        top: 32px;
        right: 30px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

interface DialogueProps {
    title: string,
    description?: string
    children: ReactNode, 
    closeHandler: () => void
}

export default function Dialogue({ title, description, children, closeHandler }: DialogueProps) {
    return (
        <Wrapper className="dialogue">
            <div id="close-btn" onClick={closeHandler}>
                <img width="20px" height="20px" src={CloseIcon} alt="" />
            </div>
            <section style={{overflow: "hidden"}}>
                <h2>{title}</h2>
                {description && <span id="description">{description}</span>}
            </section>
            <div className="main">
                {children}
            </div>
        </Wrapper>
    )
}