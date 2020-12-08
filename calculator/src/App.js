import './App.css';
import React from 'react';
import Calculator from './containers/Calculator';
import History from './containers/History';
import { Container } from '@material-ui/core';

// const list = [
//   "2 + 2 = 4",
//   "3 + 2 = 5",
//   "8 + 2 = 10"
// ]

function App() {

  const [ws, setWs] = React.useState(new WebSocket(process.env.REACT_APP_WS));
  const [list, setList] = React.useState([]);

  function updateServer(expr) {
    ws.send(expr);
  }

  React.useEffect(() => {
    // signal connection
    ws.onopen = (e) => { ws.send('open'); }

    ws.onmessage = (e) => {
        console.log(e);
        const res = JSON.parse(e.data);
        console.log(res);
        setList(res);
    }

    return () =>
        ws.onclose = () => {
            console.log("Closed");
            setWs(new WebSocket(process.env.REACT_APP_WS));
        }
}, [ws.onmessage, ws.onopen, ws.onclose, ws])

  return (
    <Container className="App">
        <Calculator updateServer={updateServer}/>
        <History list={list}/>
      </Container>
  );
}

export default App;
