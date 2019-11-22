import React from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
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
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
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
  }//end addTodo

  updateTodo(){
    //get editing position
    let i = this.state.editingIndex;

    //create a temporary available to store the todos[i]
    const todo = this.state.todos[i];

    //set new value at newTodo to todo.name
    todo.name = this.state.newTodo;

    //Clone Todos
    const tempTodos = this.state.todos;

    //Set updated todo to the clone todos
    tempTodos[i] = todo;

    //finally, set tempTodos to todos, and reset other props
    this.setState({
      todos: tempTodos,
      editing: false,
      editingIndex: true,
      newTodo: ''
    });
  }//end updateTodo

  editTodo(index){
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  }//end editTodo

  deleteTodo(index){
    const tempTodos = this.state.todos;
    delete tempTodos[index];

    this.setState({
      todos: tempTodos
    });
  }//end deleteTodo

  render(){
    return <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h2 className="text-center mt-5">Todo App</h2>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Type todo here" onChange={this.handleChange} value={this.state.newTodo} />
              <button className="btn btn-primary mt-3 form-control" 
                onClick={(this.state.editing === true) ? this.updateTodo : this.addTodo}>
                {(this.state.editing === true) ? "Update Todo" : "Add Todo"}
              </button>
            </div>
            { !this.state.editing &&
            <ul className="list-group text-center">
              {this.state.todos.map((item, index) => {
                return <li key={item.id} className="list-group-item">
                  <button 
                  className="btn btn-info mr-4" 
                  onClick={() => {this.editTodo(index); }}>U</button>
                  {item.name}
                  <button 
                  className="btn btn-danger ml-4" 
                  onClick={() => {this.deleteTodo(index); }}>X</button>
                </li>
              })}
            </ul>
            }
          </div>{/*end col-sm*/}
        </div>{/*end row*/ }
      </div>{/* end container */}
    </div>
  }
}

export default App;
