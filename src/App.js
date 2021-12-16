import logo from "./logo.svg";
import "./App.css";
import Search from "./components/searching/Searching";
import CardComplex from "./components/card/CardUnit";
import CardBuilding from "./components/card/CardBuilding";
import { Row } from "react-bootstrap";
function App() {
  return (
    <div className="App">
      <Search />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Row>
          <CardComplex
            name="Suryanti"
            img="https://images.unsplash.com/photo-1639502003763-e9dae1e76ec5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            price={800000}
          />
          <CardComplex
            name="Siska"
            img="https://media.istockphoto.com/photos/beautiful-arab-saudi-woman-face-posing-on-the-beach-picture-id511394083?b=1&k=20&m=511394083&s=170667a&w=0&h=rArEJYU7JmvP90CrHS_obY2sxK86E_8hW02wr_rmAaM="
          />
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
