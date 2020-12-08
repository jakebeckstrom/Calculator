import React from 'react';
import { Card, Typography } from '@material-ui/core';

export default function CalcCard({expr}) {
    return (
        <Card className="history-item">
            <Typography>
                {expr}
            </Typography>
        </Card>
    )
}