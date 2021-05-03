import React from 'react';
import { CSVLink } from 'react-csv';

const Excel_download = (props) => {
    const { Download_data, File_name } = props;
    return (
        <React.Fragment>
            <CSVLink style={{ color: 'white', borderStyle: 'none' }}
                data={Download_data}
                filename={`${File_name}.csv`}>
                <button
                    style={{
                        width: '150px',
                        height: "34px",
                        border: "none",
                        borderRadius: "5px",
                        lineHeight: "25px",
                        fontSize: "14px",
                        color: "#fff",
                        background: "#555555",
                        margin: "10px 10px 0 0",
                    }}
                >엑셀 다운로드</button>
            </CSVLink>
        </React.Fragment >
    )
}

export default Excel_download;