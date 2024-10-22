import styled from "styled-components";



const Wrapper = styled.div`
    /* position: absolute;
    top: 34px;
    left: calc(16px + 24px + 12px); */
    padding: 4px 8px;
    border-radius: 5px;
    width: fit-content;
    height: fit-content;
    border: 1px solid #FFFFFF14;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: .15px;
    font-weight: 600;
    background: var(--card-bg-color);

    .item-img {
        width: 24px;
        height: 24px;
    }
`

interface ItemCardProps {
    name: string,
    img?: string,
    handleClick?: () => void,
    className?: string
}

export default function ItemCard({ name, img, handleClick, className="" } : ItemCardProps) {
    return (
        <Wrapper className={"item-card " + className} onClick={handleClick}>
            {img && <img className="item-img" src={img}/>}
            <p className="name">{name}</p>
        </Wrapper>
    )
}