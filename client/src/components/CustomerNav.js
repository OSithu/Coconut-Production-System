import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class CustomerNav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/estateDetails">Customer Details</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/viewHarvest">Harvest Details</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/viewHvstSchedules">Harvesting Schedules</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/estStaff">Estate Staff</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}