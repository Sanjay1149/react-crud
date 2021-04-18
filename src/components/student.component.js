import React, { Component } from "react";
import StudentDataService from "../services/student.sevice";

export default class Student extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeScore = this.onChangeScore.bind(this);
        this.onChangeCourse = this.onChangeCourse.bind(this);
        this.updateStudent = this.updateStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);

        this.state = {
            currentStudent: {
                key: null,
                name: "",
                score: "",
                course: ""
            },
            message: "",
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { student } = nextProps;
        if (prevState.currentStudent.key !== student.key) {
            return {
                currentStudent: student,
                message: ""
            };
        }

        return prevState.currentStudent;
    }

    componentDidMount() {
        this.setState({
            currentStudent: this.props.student,
        });
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentStudent: {
                    ...prevState.currentStudent,
                    name: name,
                },
            };
        });
    }

    onChangeCourse(e) {
        const course = e.target.value;

        this.setState(function (prevState) {
            return {
                currentStudent: {
                    ...prevState.currentStudent,
                    course: course,
                },
            };
        });
    }

    onChangeScore(e) {
        const score = e.target.value;

        this.setState((prevState) => ({
            currentStudent: {
                ...prevState.currentStudent,
                score: score,
            },
        }));
    }

    updateStudent() {
        const data = {
            name: this.state.currentStudent.name,
            score: this.state.currentStudent.score,
            course: this.state.currentStudent.course,
        };

        StudentDataService.update(this.state.currentStudent.key, data)
            .then(() => {
                this.setState({
                    message: "The student was updated successfully!",
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deleteStudent() {
        StudentDataService.delete(this.state.currentStudent.key)
            .then(() => {
                this.props.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentStudent } = this.state;

        return (
            <div>
                <h4>Student</h4>
                {currentStudent ? (
                    <div className="edit-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentStudent.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="score">Score</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="score"
                                    value={currentStudent.score}
                                    onChange={this.onChangeScore}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="course">Course</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="course"
                                    value={currentStudent.course}
                                    onChange={this.onChangeCourse}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteStudent}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateStudent}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Student...</p>
                    </div>
                )}
            </div>
        );
    }
}
