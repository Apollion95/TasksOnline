import React, { Component } from 'react';
import CRUD from './Crud';

function App() {
    return (
        <div className="App">
            <CRUD />
        </div>
    );
}
export class Home extends Component {
    static displayName = Home.name;
    render() {
        return (
            <div>
                <div className="App">
                    <CRUD />
                </div>

            </div>
        );
    }
}
