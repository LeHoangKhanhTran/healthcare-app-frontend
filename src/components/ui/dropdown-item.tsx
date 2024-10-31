import styled from "styled-components"
import CheckIcon from "../../assets/icons/check.svg";


export interface Item {
    name: string,
    img?: string,
    value?: any
}

const ItemWrapper = styled.li<{picked: boolean}>`
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border-radius: 12px;
    margin-bottom: 10px;
    background: ${props => props.picked ? "var(--card-bg-color)" : "var(--dropdown-bg-color)"};
    color: var(--white-text-color);
    cursor: pointer;
    justify-content: space-between;
    &, .item-content {
        display: flex;
        align-items: center;
        gap: 12px; 
    }

    &:hover, &:focus {
        background: var(--card-bg-color);
    }

    .doctor-img {
        width: 38px;
        height: 38px;
    }

    .name {
        font-size: .92rem;
        line-height: 24px;
        letter-spacing: .25px;
        font-weight: 600;
    }

    .check {
        width: 18px;
        height: 18px;
    }
`

export default function DropDownItem({ item, onClick, picked } : { item: Item, onClick: (value?: any, list?: any[]) => void, picked: boolean }) {
    const handleClick = () => {
        onClick(item)
    }

     return (
        <ItemWrapper picked={picked} onClick={handleClick}>
            {item.img && <div className="item-content">
                <img className="doctor-img" src={item.img} alt=""/>
                <span className="name">{item.name}</span>
            </div>}
            {!item.img && <span className="name">{item.name}</span>}
            {picked && <img className="check" src={CheckIcon}/>}
        </ItemWrapper>
    )
}

