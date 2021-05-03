import React, {useEffect} from 'react';
import { RangeDatePicker } from "@y0c/react-datepicker";
import "@y0c/react-datepicker/assets/styles/calendar.scss";

function date_picker_inner() {
    const a = document.querySelectorAll(".sp_admin_datePicker_box .picker-input__text");
    a[0].placeholder="Start Date";
    a[1].placeholder="End Date";
}

const Sp_Date_picker = () => {
    useEffect(() => {
        date_picker_inner();
        return() => {
            date_picker_inner();
        }
    })

    const Panel = ({ children }) => (
        <div className="sp_admin_datePicker_box">
            <div>{children}</div>
        </div>
    );

    return (
        <React.Fragment>
            <Panel>
                <RangeDatePicker/>
            </Panel>
        </React.Fragment>
    )
}

export default Sp_Date_picker;