import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        console.log(obj);
        axios.post('http://localhost:5000/todos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        window.location.href = "/dashboard";
    }

    render() {
        return (
            <div class="container" style={{marginTop: 10}}>
                <h5>Update Tasks</h5>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
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
                    <div></div>
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
                    <div></div>
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
                    <div className="form-check" style={{marginTop: 5, marginLeft: 5}}>
                        <label className="form-check-label" htmlFor="completedCheckbox">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                                />
                            <span>Completed</span>
                        </label>
                    </div>
                    <div className="form-group" style={{marginTop: 10}}>
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
                <div class="col s6"><h6><Link to="/dashboard" className="nav-link">&#171; Back</Link></h6></div>
            </div>
        )
    }
}
