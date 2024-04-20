import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlantationNav from './PlantationNav';
import { useReactToPrint } from 'react-to-print';

const ViewHvstSchedule = () => {

    const [date, setDate] = useState('');
    const [blockName, setBlockName] = useState('');
    const [inCharge, setInCharge] = useState('');
    const [staff01, setStaff01] = useState('');
    const [staff02, setStaff02] = useState('');
    const [staff03, setStaff03] = useState('');
    const [assignedDate, setAssignedDate] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const { id } = useParams();

    const componentPDF = useRef();

    const formatDate = (date) => {
        const d = new Date(date);
        let month = "" + (d.getMonth() + 1);
        let day = "" + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    };

    useEffect(() => {
        const getRecord = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/hScedule/${id}`);
                const { schedule } = res.data;
                setDate(formatDate(schedule.date));
                setBlockName(schedule.blockName);
                setInCharge(schedule.inCharge);
                setStaff01(schedule.staff01);
                setStaff02(schedule.staff02);
                setStaff03(schedule.staff03);
                setAssignedDate(formatDate(schedule.assignedDate));
                setCurrentDate(formatDate(new Date()));
                

            } catch (err) {
                if (err.response) {
                    console.log(err.response.data.error);
                } else {
                    console.log("Error occurred while getting axios get request");
                }
            }
        };
        getRecord();
    }, [id]);

    const generateReport = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "title"
        //onAfterPrint: ()=> alert("report saved")
    })

    return (
        <div className='plantBody'>
            <PlantationNav />
            &nbsp;

            <div ref={componentPDF}>

            <div className="print-header" style={{ display: "none" }}>
                    <h1> Jayakody Koppara Stores </h1>
                    <hr/>
                </div>
<div className='plantReport'>
                <h1 className='plantTopic'> Harvesting Schedule </h1>
                &nbsp;
                <div class="row">
                    <div class="col-5"> Scheduled Date : </div>
                    {date}
                </div>
                <div class="row">
                    <div class="col-5"> Block : </div>
                    {blockName}
                </div>
                <div class="row">
                    <div class="col-5"> Staff In Charge : </div>
                    {inCharge}
                </div>
                <div class="row">
                    <div class="col-5"> Assigned Staff : </div>
                    {staff01}
                </div>
                <div class="row">
                    <div class="col-5">  </div>
                    {staff02}
                </div>
                <div class="row">
                    <div class="col-5">  </div>
                    {staff03}
                </div>
                <p style={{ textAlign: 'right' }}> Assigned on {assignedDate} </p>
                </div>
                <div className="print-footer" style={{ display: "none" }}>
                    <hr/>
                    <p>Report Generated on {currentDate} </p>
                </div>
            </div>
            <button onClick={generateReport}> Generate Report </button>
        </div>

    )
}

export default ViewHvstSchedule;
