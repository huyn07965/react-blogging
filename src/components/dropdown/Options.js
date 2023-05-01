import React from 'react';
import styled from 'styled-components';
import { useDropdown } from './dropdown-context';

const OptionsStyles = styled.div`
    .option{
        padding: 16px 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid ${props => props.theme.greyLight};
        &:hover{
            background-color: ${props => props.theme.greyLight};
        }
}
`
const Options = (props) => {
    const {onClick} = props;
    const {setShow} = useDropdown()
    const handleClick = () => {
        onClick && onClick();
        setShow(false)
        
    }
    return (
        <OptionsStyles>
            <div
            className="option"
            onClick={handleClick}
            >
            {props.children}
            </div>
        </OptionsStyles>
    );
};

export default Options;