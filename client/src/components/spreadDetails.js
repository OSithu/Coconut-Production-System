import React, { Component } from 'react'
import axios from 'axios';

export default class spreadDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            record:{}
        };
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`http://localhost:8000/record/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    record:res.data.record
                });
            }
        })
    }



  render() {
    return (
      <div>spreadDetails</div>
    )
  }
}
