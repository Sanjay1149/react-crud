import React, { Component } from "react";
import StudentDataService from "../services/student.sevice";
import { Route } from 'react-router-dom'

import Student from "./student.component";

export default class StudentsList extends Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveStudent = this.setActiveStudent.bind(this);
        this.removeAllStudents = this.removeAllStudents.bind(this);
        this.onDataChange = this.onDataChange.bind(this);

        this.state = {
            students: [],
            currentStudent: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        StudentDataService.getAll().on("value", this.onDataChange);
    }

    componentWillUnmount() {
        StudentDataService.getAll().off("value", this.onDataChange);
    }

    onDataChange(items) {
        let students = [];

        items.forEach((item) => {
            let key = item.key;
            let data = item.val();
            students.push({
                key: key,
                name: data.name,
                score: data.score,
                course: data.course,
                published: data.published,
            });
        });

        this.setState({
            students: students,
        });
    }

    refreshList() {
        this.setState({
            currentStudent: null,
            currentIndex: -1,
        });
    }

    setActiveStudent(student, index) {
        this.setState({
            currentStudent: student,
            currentIndex: index,
        });
    }

    removeAllStudents() {
        StudentDataService.deleteAll()
            .then(() => {
                this.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { students, currentStudent, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Students List</h4>

                    <ul className="list-group">
                        {students &&
                        students.map((student, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveStudent(student, index)}
                                key={index}
                            >
                                {student.name}
                            </li>
                        ))}
                    </ul>
                    <Route render={({ history}) => (
                        <button
                            type='button'
                            className="btn btn-success"
                            onClick={() => { history.push('/add') }}
                        >
                            Add
                        </button>
                    )} />

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllStudents}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentStudent ? (
                        <Student
                            student={currentStudent}
                            refreshList={this.refreshList}
                        />
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Student...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
