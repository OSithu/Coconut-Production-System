import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class PlantationNav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/estateDetails">Estate Details</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/viewHarvest">Harvest Details</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/viewHvstSchedules">Harvesting Schedules</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/#">Estate Staff</NavLink>
                            </li>
                        </ul>
                        {/*<form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>*/}
                    </div>
                </div>
            </nav>
        )
    }
}

