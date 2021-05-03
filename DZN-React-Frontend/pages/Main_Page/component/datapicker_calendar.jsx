import React, {useCallback, useEffect, useState} from 'react';
import { RangeDatePicker } from "@y0c/react-datepicker";
import "@y0c/react-datepicker/assets/styles/calendar.scss";

function date_picker_inner() {
    const a = document.querySelectorAll(".datePicker_box .picker-input__text");
    a[0].placeholder="Start Date";
    a[1].placeholder="End Date";
}

const User_date_picker = ({start, end}) => {    

    useEffect(() => {
        date_picker_inner();
        return() => {
            date_picker_inner();
        }
    })

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
   
    useEffect(() => {                
        setStartDate(start);
        setEndDate(end);
    }, [start, end])

    const dateChange = useCallback(() => {
        const buttonClick = document.querySelectorAll(".serach_date_btn"); 

        buttonClick.forEach((data) => {
            data.classList.remove("serach_date_btn_active");
        });
    }, [])

    const Panel = ({ children }) => (
        <div className="datePicker_box">
            <div>{children}</div>
        </div>
    );

    return (
        <React.Fragment>
            <Panel>               
                {
                !(startDate === '' || endDate === '') ? 
                <RangeDatePicker initialStartDate={startDate} initialEndDate={endDate} onChange={dateChange} /> :
                <RangeDatePicker onChange={dateChange}/>
                }
            </Panel>
        </React.Fragment>
    )
}

export default User_date_picker;