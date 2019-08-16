import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import uuid from 'uuid';

import './App.css';

class App extends Component {
  state = {
    todos:[
      {
        id: uuid.v4(),
        title:'Take out',
        completed: false,
      },
      {
        id: uuid.v4(),
        title:'Dinner with Wife',
        completed: false,
      },
      {
        id: uuid.v4(),
        title:'Meeting with boss',
        completed: false,
      }
    ]
  }

  //Toggle Complete
  markComplete = (id) => {
    this.setState({todos:this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo;
    })})
  }

  // Add Todo
  addTodo = (title) =>{ 
    const newTodo = {
      id: uuid.v4(),
      title,
      completed:false,
    }
    this.setState({todos: [...this.state.todos,newTodo]});
  }

  // delTodo
  delTodo = (id) => {
    this.setState({todos:[...this.state.todos.filter(todo => todo.id !== id)]});
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Router path="/" render={props=>()} />
            <AddTodo addTodo={this.addTodo} />
            <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
  