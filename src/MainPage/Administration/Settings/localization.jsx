/**
 * Signin Firebase
 */

import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {message, TimePicker} from 'antd';
import moment from 'moment';
import axios from "axios";
import {Modal} from 'antd'


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

    const [localization, setLocalization] = useState({
        startTime: "00:00:00",
        endTime: "00:00:00",
        workingHours: "",
        gracePeriod: "",
        mode: '',
        id: null
    })

    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        getLocalization();
    }, [])

    const getLocalization = async () => {
        const res = await axios.get(' http://127.0.0.1:8000/api/localizations/');
        console.log(res.data);
        if (res.data.length > 0) {
            setLocalization({
                ...localization,
                startTime: res.data[0].startTime,
                endTime: res.data[0].endTime,
                workingHours: res.data[0].workingHours,
                gracePeriod: res.data[0].gracePeriod,
                id: res.data[0].id,
                mode: 'edit'
            })
        }
    }

    const onStartTimeChange = (time, timeString) => {
        setLocalization({
            ...localization,
            startTime: timeString
        })
    }

    const onEndTimeChange = (time, timeString) => {
        setLocalization({
            ...localization,
            endTime: timeString
        })
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(localization);

        if (localization.mode === 'edit') {
            await axios.post(` http://127.0.0.1:8000/api/localizations/${localization.id}`, {
                startTime: localization.startTime,
                endTime: localization.endTime,
                workingHours: localization.workingHours,
                gracePeriod: localization.gracePeriod
            })
                .then(res => {
                    console.log(res);
                    message.success('Localization details are successfully edited.');
                    setIsModalVisible(true);
                })
                .catch(err => {
                    console.log(err);
                    message.error('Something went wrong. Try again.');
                });
        } else {
            await axios.post(' http://127.0.0.1:8000/api/localizations/', {
                startTime: localization.startTime,
                endTime: localization.endTime,
                workingHours: localization.workingHours,
                gracePeriod: localization.gracePeriod
            })
                .then(res => {
                    console.log(res);
                    setIsModalVisible(true);
                    setLocalization({
                        ...localization,
                        mode: 'edit'
                    })
                    message.success('Localization details are successfully saved.');
                })
                .catch(err => {
                    console.log(err);
                    message.error('Something went wrong. Try again.');
                });
        }

    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
                                        <input className="form-control" readOnly defaultValue="United Kingdom"
                                               type="text"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Timezone</label>
                                        <input className="form-control" readOnly
                                               defaultValue="(UTC +5:30) Antarctica/Palmer" type="text"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Start Time</label>
                                        <TimePicker
                                            className="form-control"
                                            value={moment(localization.startTime, 'HH:mm:ss')}
                                            onChange={onStartTimeChange}
                                            size="large"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>End Time</label>
                                        <TimePicker className="form-control"
                                                    value={moment(localization.endTime, 'HH:mm:ss')}
                                                    onChange={onEndTimeChange}
                                                    size="large"
                                                    placeholder={localization.endTime}/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Working Hours Per Day</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={localization.workingHours}
                                            onChange={e => setLocalization({
                                                ...localization,
                                                workingHours: e.target.value
                                            })}
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
                                            onChange={e => setLocalization({
                                                ...localization,
                                                gracePeriod: e.target.value
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="submit-section">
                                        <button type="submit"
                                                className="btn btn-primary submit-btn">{localization.mode === 'edit' ? 'Update' : 'Save'}</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* /Page Content */}
            <Modal title="Localization" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Localization details are successfully saved.</p>
            </Modal>
        </div>
    );
}

export default Localization;
