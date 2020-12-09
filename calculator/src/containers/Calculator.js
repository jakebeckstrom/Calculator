import React from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import { evaluate } from '../utils';

export default function Calculator({ updateServer }) {

    const [ expr, setExpr ] = React.useState("");
    const [ answer, setAnswer] = React.useState("");

    async function calculate(expr, update) {
        const ans = await evaluate(expr);
        setAnswer(ans);
        update(expr + " = " + ans);
      }

    function handleButtonClick(e) {
        let click = e.currentTarget.innerText;
        switch (click) {
            case '=':
                calculate(expr, updateServer);
                break;
            case 'C':
                setExpr("");
                setAnswer("");
                break;
            default:
                if (answer) {
                    setExpr(click);
                    setAnswer("");
                } else {
                    setExpr(expr + click);
                }
        }
    }

    function checkAnswer(e){
        if (answer) {
            setExpr("");
            setAnswer("");
        }
    }
    
    const handleChange = (e) => {
        setExpr(e.currentTarget.value);
    }

    function validateExpr() {
        var regex = new RegExp(/^[0-9]+(\.[0-9]+)?[+\-/*][0-9]+(\.[0-9]+)?$/);
        return !regex.test(expr);
    }

    return(
        <Container className="calculator" maxWidth='xs'>
            <p>Calculator</p>
            <div className="expr">
                {(expr || !expr) &&
                <TextField
                    value={expr}
                    inputProps={{
                        style: { textAlign: "right" }
                      }}
                    error={validateExpr(expr)}
                    onChange={handleChange}
                    onClick={checkAnswer}
                /> }
            </div>
            <div className="answer">
                <TextField
                    value={answer}
                    inputProps={{
                        style: { textAlign: "right" }
                      }}
                />
            </div>
            <div className="number-buttons">
                <Button className="button" size="large" onClick={handleButtonClick}>1</Button>
                <Button className="button" size="large" onClick={handleButtonClick}>2</Button>
                <Button className="button" size="large" onClick={handleButtonClick}>3</Button>
                <Button className="button" size="large" onClick={handleButtonClick}>4</Button>
                <Button className="button" size="large" onClick={handleButtonClick}>5</Button>
                <Button className="button" size="large" onClick={handleButtonClick}>6</Button>
                <Button className="button" size="large" onClick={handleButtonClick}>7</Button>
                <Button className="button" size="large" onClick={handleButtonClick}>8</Button>
                <Button className="button" size="large" onClick={handleButtonClick}>9</Button>
                <Button className="button" size="large" onClick={handleButtonClick}>C</Button>
                <Button className="button" size="large" onClick={handleButtonClick}>0</Button>
                <Button className="button" size="large" onClick={handleButtonClick}>.</Button>
            </div>
            {/* TODO: Switch to icon buttons to increase visibity */}
            <div className="operator-buttons">
                <Button className="button" size="small" variant="contained" onClick={handleButtonClick}> + </Button>
                <Button className="button" size="small" variant="contained" onClick={handleButtonClick}> - </Button>
                <Button className="button" size="small" variant="contained" onClick={handleButtonClick}> * </Button>
                <Button className="button" size="small" variant="contained" onClick={handleButtonClick}> / </Button>
                <Button className="button" size="small" variant="contained" onClick={handleButtonClick} disabled={validateExpr(expr)}>=</Button>
            </div>
        </Container>
    )
}