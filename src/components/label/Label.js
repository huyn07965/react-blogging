import React from 'react';
import styled from 'styled-components';
const LabelStyles = styled.label`
    font-size: 16px;
    color: ${props => props.theme.greyDark};
    font-weight: bold;
    cursor: pointer;
`

const Label = ({htmlFor ='', children, ...props}) => {
    return (
        <LabelStyles htmlFor={htmlFor} {...props}>
            {children}
        </LabelStyles>
    );
};

export default Label;