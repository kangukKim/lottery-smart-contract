import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import { Component } from 'react';
class App extends Component{
  async componentDidMount() {

  }
  initWeb3 = async () => {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        
      } catch (error) {
        console.log(`User denied account access error : ${error}`)
      }
    }
  }
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
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
}

export default App;
