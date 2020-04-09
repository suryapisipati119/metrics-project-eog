import React from 'react';
import { Button, styled } from '@material-ui/core';
import { useHistory } from "react-router-dom";

export const Metrics: React.FC = () => {

    const history = useHistory();
    function handleClick(){
        history.push('/metrics-page')
    }
    return (
       <StyledButton onClick={handleClick}>
           Metrics
       </StyledButton>
    );
}; 

const StyledButton = styled(Button)({
    color: '#FFFFFF',
    padding: '6px 40px 0px 0px'
})
