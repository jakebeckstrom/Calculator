import React from'react';
import { Container } from '@material-ui/core'
import CalcCard from '../components/CalcCard';

export default function History({list}) {

    return(
        <Container className="history" maxWidth='xs'>
            <p>History</p>
            {list.map((i) => <CalcCard expr={i} />)}
            {/* <CalcCard expr="3 + 2 = 5" /> */}
        </Container>
    )
}