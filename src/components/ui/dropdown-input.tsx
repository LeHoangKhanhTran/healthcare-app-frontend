import styled from "styled-components";
import Input, { InputProps } from "./input";
import ChevronIcon from "../../assets/icons/chevron-down.svg";
import ItemCard from "./item-card";
import Dropdown from "./dropdown";

import { useEffect, useRef, useState } from "react";
import { Item } from "./dropdown-item";
import axios, { AxiosError } from "axios";

const Wrapper = styled.div`
    .chevron-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    .item-card {
        position: absolute;
        top: 4px;
        left: 52px;
    }
`
interface DropdownInputProps<T> extends InputProps {
    type: string,
    getListUrl?: (searchTerm: string) => string,
    transformFunction?: (list: T[]) => Item[],
    handlePick: (value?: any, list?: T[]) => void,
    items?: any[],
    removeValue?: boolean
}

interface DoctorItem {
    name: string,
    img: string,
    value: string
}


export default function DropdownInput<T>({ type, icon, labelText, placeholder, disabled, handlePick, getListUrl, transformFunction, items, value, removeValue } : DropdownInputProps<T>) {
    const ref = useRef<HTMLImageElement | null>(null);
    const [rect, setRect] = useState<DOMRect | undefined>(ref.current?.getBoundingClientRect());
    const [pickedValue, setValue] = useState<any>(value);
    const [open, setOpen] = useState<boolean>(false);
    const [itemList, setItemList] = useState<Item[]>();
    const [list, setList] = useState<T[]>();
    const [searchTerm, setTerm] = useState<string>("");
    const [shouldDisable, setShouldDisable] = useState<boolean | undefined>(disabled);
    useEffect(() => {
        if(!items) {
            if (transformFunction) getItemList(transformFunction);
            else getItemList()
        }
        else {
            setItemList(items)
            setList(list)
        }
     
    }, [searchTerm, getListUrl, items])
    
    useEffect(() => {
        if (removeValue) setValue(value ? value : "")
    }, [removeValue])

    const getItemList = async (transformFunc?: (list: T[]) => Item[]) => {
        try {
            if (!getListUrl) {
                return;
            }
            const response =  await axios.get(getListUrl(searchTerm));
            if (response.status === 200) {
                let items;
                if (transformFunc) {
                    items = transformFunc(response.data as T[])
                }
                else {
                    items = response.data as Item[]
                }
                setList(response.data as T[])
                setItemList(items);
            }
        }
        catch (error) {
            console.log((error as AxiosError).message)
        }
    }
    
    useEffect(() => {
        if (ref.current) {
            setRect(ref.current.getBoundingClientRect()); 
            window.addEventListener('resize', () => setRect(ref.current?.getBoundingClientRect()));
        }

        return () => {
          window.removeEventListener('resize', () => setRect(ref.current?.getBoundingClientRect()));
        };
    }, []);

    const getInputValue: (value: any) => any = (value: any) => {
        if (type === "Bác sĩ") return searchTerm       
        if (value) return (value as Item).name;
    } 
    const handler = (value : any) => {
        handlePick((value as Item).value, list)
        setValue(value)
    }
    const CloseDropdown = () => {
        setTimeout(() => {
            setOpen(false)
        }, 100)
    }
    const handleFocus = () => {
        setOpen(true); 
        if (pickedValue !== undefined && pickedValue !== null) {
            setShouldDisable(true)
        }
    }
    return (
        <Wrapper className="dropdown-input" ref={ref}>
            <Input icon={icon} labelText={labelText} placeholder={type !== "Bác sĩ" || !pickedValue ? placeholder : ""} disabled={shouldDisable} 
            value={getInputValue(pickedValue)} onChange={(e) => {setTerm(e.target.value)}} onFocus={handleFocus} onBlur={CloseDropdown}>
                {type === "Bác sĩ" && pickedValue  && <ItemCard name={pickedValue.name} img={pickedValue.img}/>}
                <img className="chevron-icon" src={ChevronIcon} style={{rotate: open ? "180deg" : ""}}/>
            </Input>
            {open && itemList && <Dropdown type={type} itemList={itemList} pickHandler={handler} top={`0px`} width={`${rect?.width}px`} pickedOption={[pickedValue]}/>}
        </Wrapper>
    )
}