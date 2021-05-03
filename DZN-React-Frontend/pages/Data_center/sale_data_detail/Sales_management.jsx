import React, { useEffect, useState } from 'react';
import Sales_management_table from './Sales_management_table';
import Sales_management_search from './Sales_management_search';
import dummyData from './Sales_management_dummy_data.json';

const Sales_management = () => {
    const [salesData, setSalesData] = useState();    
    const [searchData, setSearchData] = useState({startDate: '', endDate: ''});
    const [loading, setLoading] = useState(false);  // API 통해서 처리 했을 경우 사용
    const [rending, setRending] = useState(false);
    const [totalCnt, setTotalCnt] = useState(0);
    const [isSearch, setIsSearch] = useState(false);

    // 더미데이터로 처리
    useEffect(() => {
        const datas = dummyData.data;
        const {startDate, endDate} = searchData;
        
        const filterData = datas.filter((data, i) => {            
            if(startDate === '' && endDate === '' ) return true
            else return startDate <= moment(data.date).format('YYYY-MM-DD') && moment(data.date).format('YYYY-MM-DD') <= endDate
        })

        if(totalCnt === 0) {
            setTotalCnt(filterData.length);
        }

        filterData.sort((a,b) => {
            return new Date(b.date) - new Date(a.date);
        })
        setSalesData(() => filterData);        
        setRending(false);
        setLoading(true);
    }, [rending === true])
    // useEffect(() => {
    //     // 매출 데이터 받아 왔을 때 처리
    //     (async() => {
    //         try {

    //         } catch(e) {
    //             console.error(e);
    //         }
    //     })
    // }, [])

    return (
        <React.Fragment>
                <div className="search_page">
                    <Sales_management_search setSearchData={setSearchData} setRending={setRending} setIsSearch={setIsSearch}/>
                    {loading && <Sales_management_table salesData={salesData} totalCnt={totalCnt} isSearch={isSearch} setIsSearch={setIsSearch}/>}                    
                </div>
        </React.Fragment>
    )
}

export default Sales_management;