/**
 * Signin Firebase
 */

 import React, {useEffect, useState} from 'react';
import { Helmet } from "react-helmet";
import { TimePicker } from 'antd';
import moment from 'moment';


const Localization = () => {
 //  useEffect( ()=>{
 //    let selectbox = localStorage.getItem("selectbox")
 //    if(selectbox === "true"){
 //        setTimeout(function() {
 //          window.location.reload(1)
 //          localStorage.removeItem("selectbox")
 //        },1000)
 //    }if($('.select').length > 0) {
 //      $('.select').select2({
 //        minimumResultsForSearch: -1,
 //        width: '100%'
 //      });
 //    }
 // });

  const [localization,setLocalization] = useState({
    starTime:'00:00:00',
    endTime:'00:00:00',
    workingHours:'',
    gracePeriod:''
  })

  const onStartTimeChange = (time, timeString) => {
    setLocalization({
      ...localization,
      starTime:timeString
    })
  }

  const onEndTimeChange = (time, timeString) =>{
    setLocalization({
      ...localization,
      endTime:timeString
    })
  }

  const formSubmitHandler = (e) =>{
    e.preventDefault();
    console.log(localization);
  }

  return ( 
         <div className="page-wrapper">
         <Helmet>
             <title>Localization - HRMS Admin Template</title>
             <meta name="description" content="Login page"/>					
         </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
           <div className="row">
             <div className="col-md-8 offset-md-2">
               {/* Page Header */}
               <div className="page-header">
                 <div className="row">
                   <div className="col-sm-12">
                     <h3 className="page-title">Basic Settings</h3>
                   </div>
                 </div>
               </div>
               {/* /Page Header */}
               <form onSubmit={formSubmitHandler}>
                 <div className="row">
                   <div className="col-sm-6">
                     <div className="form-group">
                       <label>Default Country</label>
                       <input className="form-control" readOnly defaultValue="United Kingdom" type="text" />
                     </div>
                   </div>
                   <div className="col-sm-6">
                     <div className="form-group">
                       <label>Timezone</label>
                       <input className="form-control" readOnly defaultValue="(UTC +5:30) Antarctica/Palmer" type="text" />
                     </div>
                   </div>
                   <div className="col-sm-6">
                     <div className="form-group">
                       <label>Start Time</label>
                       <TimePicker
                           className="form-control"
                           defaultValue={moment(localization.starTime, 'HH:mm:ss')}
                           onChange={onStartTimeChange}
                           size="large" />
                     </div>
                   </div>
                   <div className="col-sm-6">
                     <div className="form-group">
                       <label>End Time</label>
                       <TimePicker className="form-control"
                                   defaultValue={moment(localization.endTime, 'HH:mm:ss')}
                                   onChange={onEndTimeChange}
                                   size="large"
                       />
                     </div>
                   </div>
                   <div className="col-sm-6">
                     <div className="form-group">
                       <label>Working Hours Per Day</label>
                       <input
                           className="form-control"
                           type="text"
                           value={localization.workingHours}
                           onChange={e=>setLocalization({...localization,workingHours:e.target.value})}
                       />
                     </div>
                   </div>
                   <div className="col-sm-6">
                     <div className="form-group">
                       <label>Grace Period</label>
                       <input
                           className="form-control"
                           type="text"
                           value={localization.gracePeriod}
                           onChange={ e => setLocalization({...localization,gracePeriod:e.target.value})}
                       />
                     </div>
                   </div>
                   <div className="col-sm-12">
                     <div className="submit-section">
                       <button type="submit" className="btn btn-primary submit-btn">Save</button>
                     </div>
                   </div>
                 </div>
               </form>
             </div>
           </div>
         </div>
         {/* /Page Content */}
       </div>
      );
  }

export default Localization;
