import React, { Component } from 'react';

export default class PlantationNav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/estateDetails"> Estate Details </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="#"> Harvest Details </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="#"> Harvesting Schedules </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" href="#"> Estate Staff </a>
                            </li>
                        </ul>
                        {/*<form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>*/}
                    </div>
                </div>
            </nav>
        )
    }
}
