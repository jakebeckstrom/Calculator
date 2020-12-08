import React from 'react';
import { Container, TextField } from '@material-ui/core';

export default function Screen({expr, ans}){
    
    return (
        <Container className="screen">
            <TextField className="expr-text" value={expr}/>
            <TextField className="ans-text" value={ans}/>
        </Container>
    )
}