import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Canvas from './App';
import reportWebVitals from './reportWebVitals';
import SandboxUI from './sandbox';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  const canvas = useRef<fabric.Canvas>(null) as React.RefObject<fabric.Canvas>;
  return (
    <SandboxUI canvas={canvas}>
      <div className="App-canvas">
        <Canvas ref={canvas} />
      </div>
    </SandboxUI>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
