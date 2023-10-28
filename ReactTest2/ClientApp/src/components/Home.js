import React, { Component } from 'react';
import CRUD from './Crud';

export class Home extends Component {
    static displayName = Home.name;
    render() {
        return (
            <div>
                this is only welcome page, to be improved later
                <CRUD />
            </div>

        );
    }
}
