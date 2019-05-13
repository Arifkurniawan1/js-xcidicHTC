import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription =
this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible =
this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:5000/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })
    }

    render() {
        return (
            <div class="container" style={{marginTop: 10}}>
                <h5>Create New Task</h5>
                <form onSubmit={this.onSubmit}>
                    <div class="input-field col s12">
                        <label>Description</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="input-field col s12">
                        <label>Who will be responsible</label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>
                    <div className="form-group">
                          <label><h6>Priority</h6></label>
                          <label>
                            <input  class="with-gap"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                                    <span>Low</span>
                          </label>
                          <label>
                            <input  class="with-gap"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked={this.state.todo_priority==='Medium'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                                    <span>Medium</span>
                          </label>
                          <label>
                            <input  class="with-gap"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="High"
                                    checked={this.state.todo_priority==='High'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                                    <span>High</span>
                          </label>
                    </div>
                    <div className="form-group" style={{marginTop: 10}}>
                        <input type="submit" value="Create Task" className="btn btn-primary" />
                    </div>
                </form>
                <div class="col s6"><h6><Link to="/dashboard" className="nav-link">&#171; Back</Link></h6></div>
            </div>
        )
    }
}
