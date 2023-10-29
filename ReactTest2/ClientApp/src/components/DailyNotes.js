import React, { useState, useEffect } from "react";
import Switch from 'react-switch';
import './DailyNotes.css';
import axios from "axios";

const API_URL = 'http://localhost:3001/api/tasks';

export const DailyNotes = () => {
    const [formData, setFormData] = useState({
        taskID: '',
        taskTitle: '',
        taskDescription: '',
        isActive: false,
    });
    const [showCheckbox, setShowCheckbox] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const [updateButton, setUpdateButton] = useState();
    const [editID, setEditID] = useState()
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0)
    const { taskID, taskTitle, taskDescription, isActive } = formData;

    const filteredTasks = data.filter(task => {
        return !showCheckbox || task.isActive; // If showCheckbox is true, include only active tasks
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleToggle = (checked) => {
        setFormData({ ...formData, isActive: checked });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle && taskDescription) {
            const newID = data.length > 0 ? Math.max(...data.map(task => parseInt(task.taskID, 10))) + 1 : 1;
            const newTask = {
                taskID: String(newID),
                taskTitle: taskTitle,
                taskDescription: taskDescription,
                isActive: true,
            }
            axios.post(API_URL, newTask)
                .then(res => {
                    setData([...data, res.data]);
                    setFormData({ taskID: '', taskTitle: '', taskDescription: '', isActive: true });
                })
                .catch(err => console.log(err));
        }
    };
    const handleEdit = (editIDNotState) => {
        axios.get(`${API_URL}/${editIDNotState}`)
            .then(res => {
                setFormData(res.data);
            })
            .catch(err => console.log(err));
    };
    const handleDelete = (deleteID) => {
        axios.delete(`${API_URL}/${deleteID}`)
            .then(res => {
                setRefresh(refresh + 1)
            })
            .catch(err => console.log(err));
    };
    const handleUpdate = () => {
        if (taskID && taskTitle && taskDescription) {
            axios.put(`${API_URL}/${editID}`, formData)
                .then(res => {
                    setFormData({ taskID: '', taskTitle: '', taskDescription: '', isActive: true });
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
                                placeholder="Task ID"
                                name="taskID"
                                value={taskID}
                                onChange={handleInputChange}
                                disabled
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
                        <label htmlFor="taskDescription">Task Description:</label>
                        <textarea
                            className="form-control"
                            id="taskDescription"
                            placeholder="Enter Task Description"
                            name="taskDescription"
                            value={taskDescription}
                            onChange={handleInputChange}
                            rows="4"
                            cols="40">
                        </textarea>

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
                        <button type="submit" className="btn btn-primary" onClick={() => setUpdateButton(false)}> Clear
                        </button>
                        {updateButton &&(
                        <button type="submit" className="btn btn-primary" onClick={() => {
                                handleUpdate()
                            setUpdateButton(false)
                        }}>
                            Update
                            </button>
                        )}
                    </form>
                    <h2>Task List</h2>
                    <div className="form-group">
                        <label htmlFor="isShown"></label>
                        <Switch
                            onChange={() => setShowCheckbox(!showCheckbox)}
                            checked={showCheckbox}
                            className="react-switch"
                        />
                        <span>{showCheckbox ? 'Show Active' : 'Show All'}</span>
                    </div>
                
                        <table className="table">
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
                            {filteredTasks
                                .filter(task => !filterValue || task.taskID === filterValue)
                                .map((task, index) => (
                                    <tr key={index}>
                                        <td>{task.taskID}</td>
                                        <td>{task.taskTitle}</td>
                                        <td>{task.taskDescription}</td>
                                        <td>{task.isActive ? 'Active' : 'Inactive'}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={() => {
                                                handleEdit(task.taskID)
                                                setEditID(task.taskID)
                                                setUpdateButton(true)
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
