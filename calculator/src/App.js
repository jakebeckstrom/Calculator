import './App.css';
import React from 'react';
import Calculator from './containers/Calculator';
import History from './containers/History';
import { Container } from '@material-ui/core';

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
        const res = JSON.parse(e.data);
        setList(res);
    }

    return () =>
        ws.onclose = () => {
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
