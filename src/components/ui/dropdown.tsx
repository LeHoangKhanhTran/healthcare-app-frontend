import styled from "styled-components";
import DropdownItem, { Item } from "./dropdown-item";
const Wrapper = styled.ul<{top?: string, width?: string}>`
    position: absolute;
    width: ${props => props.width ? props.width : "100%"};;
    max-height: 100px;
    /* display: flex;
    flex-direction: column; */
    background: var(--dropdown-bg-color);
    border-radius: 16px;
    padding: 4px;
    /* gap: 20px; */
    margin-top: ${props => props.top ? props.top : "0"};
    z-index: 10;
    label {
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: .15px;
        color: var(--grey-text-color);
        border-radius: 12px;
        padding: 8px 0 0 12px;
        margin-block-end: 10px;
    }
`

interface DropdownProps {
    type: string,
    itemList: Item[],
    pickHandler: () => void,
    top?: string,
    width?: string,
    pickedOption: any,
}



export default function Dropdown({ type, itemList, pickHandler, top, width, pickedOption } : DropdownProps) {
    return (
        <Wrapper top={top} width={width} className="dropdown">
            {type && <label>{type}</label>}
            {itemList && itemList.map((item) => {
                let picked = JSON.stringify(item.value ? item.value : item.name) === JSON.stringify(pickedOption)
                
                return (
                    <DropdownItem item={item} onClick={pickHandler} picked={picked}/>
                )
            })}
        </Wrapper>
    )
}


