import React from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      newTodo: '',
      todos:[{
        id: 1, name:"Học ReactJS"
      },{
        id: 2, name:"Kiếm Tiền"
      },{
        id: 3, name: "Mua Sữa Cho Nhím"
      }]
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  handleChange(event){
    this.setState({
      newTodo: event.target.value
    });
  }

  addTodo(event){
    const newTodo = {
      name: this.state.newTodo,
      id: this.state.todos[this.state.todos.length - 1].id + 1
    };

    //state is IMMUTABLE
    const tempTodos = this.state.todos;
    tempTodos.push(newTodo);
    this.setState({
      todos: tempTodos,
      newTodo: ''
    });
  }

  render(){
    console.log(this.state.newTodo);
    return <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h2 className="text-center mt-5">Todo App</h2>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Type todo here" onChange={this.handleChange} value={this.state.newTodo} />
              <button className="btn btn-primary mt-3 form-control" onClick={this.addTodo}>Add Todo</button>
            </div>
            
            <ul className="list-group text-center">
              {this.state.todos.map((item, index) => {
                return <li key={item.id} className="list-group-item">{item.name}</li>
              })}
            </ul>
          </div>{/*end col-sm*/}
        </div>{/*end row*/ }
      </div>{/* end container */}
    </div>
  }
}

export default App;
