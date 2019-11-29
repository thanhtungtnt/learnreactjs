import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      noti: null,
      todos:[]
    };

    this.apiUrl = 'https://5ddfe406bb46ce001434bdef.mockapi.io/todos';

    this.alert = this.alert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.generateTodoId = this.generateTodoId.bind(this);
  }

  alert(noti){
    this.setState({
      noti
    });

    setTimeout(() => {
      this.setState({
        noti: null
      });
    }, 2000);
  }

  handleChange(event){
    this.setState({
      newTodo: event.target.value
    });
  }

  generateTodoId(){
    const lastTodo = this.state.todos[this.state.todos.length - 1];
    if(lastTodo){
      return lastTodo.id + 1;
    }
    return 1;
  }

  addTodo(event){
    const newTodo = {
      name: this.state.newTodo,
      id: this.generateTodoId()
    };

    //state is IMMUTABLE
    const tempTodos = this.state.todos;
    tempTodos.push(newTodo);
    this.setState({
      todos: tempTodos,
      newTodo: ''
    });

    this.alert("Added Todo successfully!");
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

    this.alert("Todo updated successfully!");
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

    this.alert("Deleted Todo Successfully");
  }//end deleteTodo

  render(){
    return <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h2 className="text-center mt-5">Todo App</h2>
            {
              this.state.noti &&
            <div className="alert alert-success">
            <p className="text-center">{this.state.noti}</p>
            </div>
            }
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Type todo here" onChange={this.handleChange} value={this.state.newTodo} />
              <button className="btn btn-primary mt-3 form-control" disabled={this.state.newTodo.length < 5}
                onClick={(this.state.editing === true) ? this.updateTodo : this.addTodo}>
                {(this.state.editing === true) ? "Update Todo" : "Add Todo"}
              </button>
            </div>
            { !this.state.editing &&
            <ul className="list-group text-center">
              {this.state.todos.map((item, index) => {
                return <ListItem 
                  key={item.id}
                  item={item}
                  editItem={() => {this.editTodo(index)}}
                  deleteItem={() => {this.deleteTodo(index)}}
                />
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
