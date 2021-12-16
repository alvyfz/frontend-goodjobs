import logo from "./logo.svg";
import "./App.css";
import Search from "./components/searching/Searching";
import CardComplex from "./components/card/card_complex";
import { Row } from "react-bootstrap";
function App() {
  return (
    <div className="App">
      <Search />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Row>
          <CardComplex />
          <CardComplex />
          <CardComplex />
        </Row>

        <h1>RALEWAY</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
