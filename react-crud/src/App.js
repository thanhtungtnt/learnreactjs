import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      todos:[{
        id: 1, name:"Học ReactJS"
      },{
        id: 2, name:"Kiếm Tiền"
      },{
        id: 3, name: "Mua Sữa Cho Nhím"
      }]
    };
  }

  render(){
    return <div className="App">
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

      <h2 className="text-center">Todo App</h2>
      <ul className="list-group text-center">
        {this.state.todos.map((item) => {
        return <li className="list-group-item" id="item.id">{item.name}</li>
        })}
      </ul>
    </div>
  }
}

export default App;
