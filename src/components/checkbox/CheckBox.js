import React from 'react';
import { useController } from 'react-hook-form';
import styled, { css } from 'styled-components';
const CheckBoxStyles = styled.label`
    .body{
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        cursor: pointer;
    }
    .check{
        width: 30px;
        height: 30px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        ${props => props.checked !== null && css`background-color: ${props => props.theme.greenLight}`};
        ${props => props.checked == null && css`background-color: ${props => props.theme.greyLight}`};
    }
    .icon{
        width: 25px;
        height: 25px;
    }
    .hidden-input{
        visibility: hidden;
    }
`

const CheckBox = ({ checked, children, control, name, ...rest }) => {
    const { field } = useController({
        control,
        name,
        defaultValue: "",
      });
    return (
        <CheckBoxStyles>
            <input
                onChange={() => {}}
                checked={checked}
                type="checkbox"
                className="hidden-input"
                {...field}
                {...rest}
            />
            <div className="body">
                <div
                className="check"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                    />
                </svg>
                </div>
                <span>{children}</span>
            </div>
        </CheckBoxStyles>
    );
};

export default CheckBox;