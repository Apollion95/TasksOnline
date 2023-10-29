import React, { Component } from 'react';
import '../custom.css';

export class Home extends Component {
    static displayName = Home.name;
    render() {
        return (
            <div>
                <h1>Welcome to task planner tool! </h1><br></br>
                Purpose of this tool was to remain simple but usefull. <br></br>
                How to use it?<br></br>
                Go to <b>Daily Notes</b>  from navigation bar. <br></br>
                Nexly if you want to create a <b>new task</b>, simpy provide task title and description. If task is active select from switch button "Active" and click <b>submit</b>.<br></br>
                If you want to update extisting task, click edit next to it and change task title, task description or it status from active to inactive and click <b>update</b>.<br></br>
                <b>Clear</b> button will clear all textboxes.<br></br>
                There is also one more switch that will allow you to show only active tasks or show all tasks.
                <h3>have fun!</h3>
            </div>

        );
    }
}
