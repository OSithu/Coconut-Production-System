import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../stylesheets/plantation.css';

export default class PlantationNav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <NavLink className="nav-link" id = 'plantNav-link' activeClassName="active" to="/estateDetails">Estate Details</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" id = 'plantNav-link' activeClassName="active" to="/viewHarvest">Harvest Details</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" id = 'plantNav-link' activeClassName="active" to="/viewHvstSchedules">Harvesting Schedules</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" id = 'plantNav-link' activeClassName="active" to="/estStaff">Estate Staff</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

