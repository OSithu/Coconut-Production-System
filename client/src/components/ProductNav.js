import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class ProductNav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/viewProduct">Product Details</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/viewProductCnt">Product Records</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}