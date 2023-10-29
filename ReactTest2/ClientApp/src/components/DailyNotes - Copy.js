import React, { useState, useEffect } from "react";
import Switch from 'react-switch';
import './DailyNotes.css';
import axios from "axios";

const API_URL = 'http://localhost:3001/api/tasks';

export const DailyNotes = () => {
    const [formData, setFormData] = useState({
        taskID: "",
        taskTitle: "",
        taskDescription: "",
        isActive: false,
    });
    const [editID, setEditID] = useState()
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0)
    const { taskID, taskTitle, taskDescription, isActive } = formData;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleToggle = (checked) => {
        setFormData({ ...formData, isActive: checked });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskID && taskTitle && taskDescription) {
            axios.post(API_URL, formData)
                .then(res => {
                    setData([...data, res.data]);
                    setFormData({ taskID: "", taskTitle: "", taskDescription: "", isActive: false });
                })
                .catch(err => console.log(err));
        }
    };
    const handleEdit = (editIDNotState) => {
        if (editID) {
            axios.get(`${API_URL}/${editIDNotState}`)
                .then(res => {
                    setFormData(res.data);
                })
                .catch(err => console.log(err));
        } else {
            console.log("Invalid ID");
        }
    };

    const handleDelete = (deleteID) => {
        axios.delete(`${API_URL}/${deleteID}`)
            .then(res => {
            })
            .catch(err => console.log(err));
    };
    const handleUpdate = () => {
        if (taskID && taskTitle && taskDescription) {
            axios.put(`${API_URL}/${editID}`, formData)
                .then(res => {
                    setFormData({ taskID: "", taskTitle: "", taskDescription: "", isActive: false });
                    setRefresh(refresh + 1)
                })
                .catch(err => console.log(err))
        }
    };
    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [refresh]);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 mt-2">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="taskID">Task Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="taskID"
                                placeholder="Enter Task ID"
                                name="taskID"
                                value={taskID}
                                onChange={handleInputChange}
                            />
                        </div><div className="form-group">
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
                        <button type="submit" className="btn btn-primary" onClick={() => {
                            handleUpdate()
                        }}>
                            Update
                        </button>
                    </form>
                    <h2>Task List</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Task ID</th>
                                <th>Task Title</th>
                                <th>Task Description</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((task, index) => (
                                <tr key={index}>
                                    <td>{task.taskID}</td>
                                    <td>{task.taskTitle}</td>
                                    <td>{task.taskDescription}</td>
                                    <td>{task.isActive ? 'Active' : 'Inactive'}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => {
                                            handleEdit(task.taskID)
                                            setEditID(task.taskID)
                                        }}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(task.taskID)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
