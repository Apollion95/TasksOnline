import React, { useState, Component } from "react";
import Switch from 'react-switch';
import './DailyNotes.css'; // Import your CSS file for styling
import axios from "../../../../node_modules/axios/index";

export const DailyNotes = () => {

    const [formData, setFormData] = useState({
        taskID: "",
        taskTitle: "",
        taskDescription: "",
        isActive: false,
    });
    const { taskID, taskTitle, taskDescription, isActive } = formData;
    const [data, setData] = useState([]);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleToggle = (checked) => {
        setFormData({ ...formData, isActive: checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskID && taskTitle && taskDescription && isActive) {
            axios.post('https://jsonplaceholder.typicode.com/posts', formData)
                .then(res => {
                    setData([...data, res.data]);
                    setFormData({ taskID: "", taskTitle: "", taskDescription: "", isActive: "" });
                })
                .catch(err => console.log(err))
        }
        console.log("Form submitted:", { formData });
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 mt-2">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="taskID">Task ID:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="taskID"
                                placeholder="Enter Task ID"
                                name="taskID"
                                value={taskID}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskTitle">Task Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="taskTitle"
                                placeholder="Enter Task Title"
                                name="taskTitle"
                                value={taskTitle}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskDescription">Task Description:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="taskDescription"
                                placeholder="Enter Task Description"
                                name="taskDescription"
                                value={taskDescription}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isActive">Task Status:</label>
                            <Switch
                                onChange={handleToggle}
                                checked={isActive}
                                className="react-switch"
                            />
                            <span>{isActive ? 'Active' : 'Inactive'}</span>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
