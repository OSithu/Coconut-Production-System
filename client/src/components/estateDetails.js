import React, { Component } from 'react'
import axios from 'axios';
import PlantationNav from './PlantationNav';

export default class estateDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            block: []
        };
    }

    componentDidMount() {
        this.retrieveDetails();
    }

    retrieveDetails() {
        axios.get("http://localhost:8000/blocks")
            .then(res => {
                if (res.data.success) {
                    const formattedBlock = res.data.existingBlocks.map(block => ({
                        ...block,
                        lastHarvested: new Date(block.lastHarvested).toLocaleDateString(),
                        nextHarvesting: new Date(block.nextHarvesting).toLocaleDateString(),
                        lastFertilized: new Date(block.lastFertilized).toLocaleDateString(),
                        nextFertilization: new Date(block.nextFertilization).toLocaleDateString() // Format the date
                    }));

                    this.setState({
                        block: formattedBlock
                    });

                    console.log(formattedBlock);
                }
            })
            .catch(error => {
                console.error('Error retrieving details:', error);
            });
    }


    onDelete = (id) => {
        axios.delete(`http://localhost:8000/blocks/delete/${id}`).then(res => {
            alert("Deleted Successfully");
            this.retrieveDetails();
        })
    }

    render() {
        return (
            <div>
                <div>
                    <PlantationNav />
                </div>

                <div className="container text-center">
                    <h2> Estate Details </h2>
                    <div className="row align-items-start">
                        <div className="col">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"> Area : 5 acres </li>
                                <li className="list-group-item"> Tree Count : 300 </li>
                                <li className="list-group-item"> Block Count : 5 </li>
                            </ul>
                        </div>
                        <div className="col">
                            Google Map
                        </div>

                    </div>

                </div>
                <div className="container text-center">
                    <div className="row align-items-start">
                        <div className="col">
                        &nbsp;
                        <h2> Estate Layout </h2>
                            {/* <img src = "C:\Users\user\OneDrive\Documents\images\estateLayout.png"/> */}
                        </div>
                        <div className="col">
                            &nbsp;
                            <h2> Block Details </h2>
                            &nbsp;
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col"> Block Name </th>
                                        <th scope="col"> Tree count </th>
                                        <th scope="col"> Area </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.block.map(blocks => (
                                        <tr>
                                            <td scope="row"> {blocks.blockName} </td>
                                            <td> {blocks.area}</td>
                                            <td> {blocks.treeCount} </td>
                                            <td>
                                                <a className='btn btn-success' href="#">
                                                <i class="fa-regular fa-eye"></i>&nbsp;View
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button type="button" class="btn btn-success">
                                <a href="/addBlock" style={{ textDecoration: "none", color: 'white' }}>
                                    <i class="fa-solid fa-plus"></i>&nbsp;
                                    Add New Record
                                </a>
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}