import React, { Component } from "react";
import StudentDataService from "../services/student.sevice";
import { Route } from 'react-router-dom'


export default class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeScore = this.onChangeScore.bind(this);
        this.onChangeCourse = this.onChangeCourse.bind(this);
        this.saveStudent = this.saveStudent.bind(this);
        this.newStudent = this.newStudent.bind(this);

        this.state = {
            name: "",
            score: "",
            course: "",
            submitted: false,
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeCourse(e) {
        this.setState({
            course: e.target.value,
        });
    }

    onChangeScore(e) {
        this.setState({
            score: e.target.value,
        });
    }

    saveStudent() {
        let data = {
            name: this.state.name,
            score: this.state.score,
            course: this.state.course
        };

        StudentDataService.create(data)
            .then(() => {
                console.log("Created new item successfully!");
                this.setState({
                    submitted: true,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newStudent() {
        this.setState({
            name: "",
            score: "",
            course: "",
            submitted: false,
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div className="button-placement">
                        <h4>Student admission successful!</h4>
                        <button className="btn btn-success" onClick={this.newStudent}>
                            Add another student
                        </button>
                        <Route render={({ history}) => (
                            <button
                                type='button'
                                className="btn btn-success"
                                onClick={() => { history.push('/admission') }}
                            >
                                Return Home
                            </button>
                        )} />
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="score">Score</label>
                            <input
                                type="text"
                                className="form-control"
                                id="score"
                                required
                                value={this.state.score}
                                onChange={this.onChangeScore}
                                name="score"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="course">Course</label>
                            <input
                                type="text"
                                className="form-control"
                                id="course"
                                required
                                value={this.state.course}
                                onChange={this.onChangeCourse}
                                name="course"
                            />
                        </div>

                        <button onClick={this.saveStudent} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
