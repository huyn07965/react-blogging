import React from 'react';
import styled from 'styled-components';
import { DashboardHeading } from '../module';

const DashBoardPageStyles = styled.div``
const DashBoardPage = () => {
    return (
        <DashBoardPageStyles>
            <DashboardHeading 
                title="Dashboard"
                desc="Overview dashboard monitor"
            ></DashboardHeading>
        </DashBoardPageStyles>
    );
};

export default DashBoardPage;