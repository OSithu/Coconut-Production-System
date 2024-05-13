import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ReminderList = () =>{
    const [reminders, setReminders] = useState([]);

    useEffect(() =>{
        axios.get('/reminders')
        .then(res => setReminders(res.data))
        .catch(err => console.log(err));
    },[]);

    return(
        <div>
            <h2>Reminders:</h2>
            <ul>
                {reminders.map(reminder =>(
                    <li key={reminder._id}>{reminder.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default ReminderList;