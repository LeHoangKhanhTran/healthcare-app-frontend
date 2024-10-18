import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.table`
    position: relative;
    width: 100%;
    border-collapse: separate; 
    border-spacing: 0; 
    border: 2px solid var(--input-bg-color);
    border-radius: 12px;
    color: var(--table-text-color);
    font-size: 14px;
    th {
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        background: var(--table-dark-bg);
        padding: 16px 24px;
        text-align: left;
    }

    td {
        padding: 16px;
        vertical-align: middle;
        line-height: 21px;
    }

    .first-row {
        background: var(--primary-bg-color);
    }

    .second-row {
        background: var(--table-light-bg);
    }

`

export function Table({ children } : { children: ReactNode}) {
    return (
        <Container>
            {children}
        </Container>
    )
}