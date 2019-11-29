# Setup Webpack

### Some basic npm commands: 
```
1. npm init -y : reset npm
2. npm i --save-dev webpack webpack-cli : install Webpack
3. npm i --save-dev babel-core babel-preset-env babel-preset-react babel-loader - install babel-core, babel-preset-env, babel-preset-react, and babel-loader
4. npm i --save-dev webpack-dev-server - install webpack-dev-server
5. npm i --save-dev html-webpack-plugin - install html-webpack-plugin
6. npm i --save-dev react react-dom - install react and react dom
```

**You need to add into *scripts* in *package.json* to use something
Ex: for using webpack and webpack-dev-server, I added 2 these code lines below:
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "webpacktnt": "webpack",
    "webpackstart": "webpack-dev-server"
  },
```

### WEBPACK

**Every options contains in module.exports**

```
module.exports = {}
```

**There are many options:** 
1. The input file
```
entry: path.join(__dirname, 'src', 'app.js'),
```
2. the output file - in output properties, there are 2 properties (path, filename)
```
output: {
   path: path.join(__dirname, 'dist'),
   filename: 'app.bundle.js'
}
```
3. You need to set the mode option to 'development' or 'production' so that webpack know if it need to compile into a dev version (uncompressed) or production version (compressed)
```
mode: process.env.NODE_ENV || 'development'
```
4. Teach webpack how to compile babel
```
module: {
    rules: [{
        test: /\.(js|jsx)$/, - a regular expression to make sure the file input is correct type
        exclude: /node_modules/, - ignore node_modules folder
        use: ['babel-loader'] - use babel-loader
    }]
}
```
5. Config webpack-dev-server
```
devServer: {
        contentBase: path.join(__dirname,'src'),
    },
```
6. Config html-webpack-plugin
```
plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'src','index.html')        
        })
    ]
```

### REACTJS
**1. You need to bind all event function in React**
Ex: 
```
this.handleChange = this.handleChange.bind(this);
this.addTodo = this.addTodo.bind(this);
```
**2. Event function has 2 parameters**
```
event.target.value
event.target.name
```
**3. Add an item to state**
- Step 1: Clone state into a const 
- Step 2: Add the item to the clone state 
- Step 3: setState again with the new clone state

Ex: 
```
const tempTodos = this.state.todos;
tempTodos.push(newTodo);
this.setState({
    todos: tempTodos,
    newTodo: ''
});
```
**4. Construct of map function**
```
this.state.todos.map((item, index) => {
    return <li key={item.id} className="list-group-item">{item.name}</li>
})
```
**5. Delete an item from state**
You need to use onClick with another way so that you can pass the *index* to the function
```
<button 
    className="btn btn-danger ml-4" 
    onClick={() => {this.deleteTodo(index); }}>X</button>
```
Then, in function, you use delete function to delete an item in state
```
deleteTodo(index){
    const tempTodos = this.state.todos;
    delete tempTodos[index];

    this.setState({
        todos: tempTodos
    });
}
```
**6. Update an item**
Step 1: Create a prop store the *editing* status
Step 2: Use "editing" prop as a condition to change button name, function,... 
```
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
```
Change button name, function using this way: 
```
<button className="btn btn-primary mt-3 form-control" 
onClick={(this.state.editing === true) ? this.updateTodo : this.addTodo}>
{(this.state.editing === true) ? "Update Todo" : "Add Todo"}
</button>
```
**editTodo:
```
editTodo(index){
    const todo = this.state.todos[index];
    this.setState({
        editing: true,
        newTodo: todo.name,
        editingIndex: index
    });
}//end editTodo
```
**updateTodo:
```
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
```
**7. Fix a bug from adding todo.**
When I remove all items in list, this error will appear. This error appear because there is no item in list and can not get item (*can not get this: this.state.todos[this.state.todos.length - 1]*). So, we need another way to generateID. See below: 
```
generateTodoId(){
    const lastTodo = this.state.todos[this.state.todos.length - 1];
    if(lastTodo){
      return lastTodo.id + 1;
    }
    return 1;
}
```
**8. Seperate the code into a new component: ListItem**
```
import React from 'react';

const ListItem = (props) => {
    return <li key={props.item.id} className="list-group-item">
    <button 
    className="btn btn-info mr-4" 
    onClick={props.editItem}>U</button>
    {props.item.name}
    <button 
    className="btn btn-danger ml-4" 
    onClick={props.deleteItem}>X</button>
  </li>
}

export default ListItem;
```
Edit in App.js
```
...
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
...
```
**9. Adding alert notification**
```
...
this.state = {
    newTodo: '',
    editing: false,
    editingIndex: null,
    **noti: null,
    todos:[{
    id: 1, name:"Học ReactJS"
    },{
    id: 2, name:"Kiếm Tiền"
    },{
    id: 3, name: "Mua Sữa Cho Nhím"
    }]
};

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

{
    this.state.noti &&
<div className="alert alert-success">
<p className="text-center">{this.state.noti}</p>
</div>
}
...
```
**10. Disble button if newTodo.length < 5**
```
    <button className="btn btn-primary mt-3 form-control" disabled={this.state.newTodo.length < 5}
                onClick={(this.state.editing === true) ? this.updateTodo : this.addTodo}>
                {(this.state.editing === true) ? "Update Todo" : "Add Todo"}
              </button>
```
**11. MockApi.io**
MockAPI is a simple tool that lets you easily mock up APIs, generate custom data, and preform operations on it using RESTful interface. MockAPI is meant to be used as a prototyping/testing/learning tool.

**12. Install axios**
```
npm install axios --save
```



