import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import axios from "axios";
import {Checkbox, message} from 'antd';

const LeaveSettings = () => {

    const options = [
        {value: 'January', label: 'January'},
        {value: 'February', label: 'February'},
        {value: 'March', label: 'March'},
        {value: 'April', label: 'April'},
        {value: 'May', label: 'May'},
        {value: 'June', label: 'June'},
        {value: 'July', label: 'July'},
        {value: 'August', label: 'August'},
        {value: 'September', label: 'September'},
        {value: 'October', label: 'October'},
        {value: 'November', label: 'November'},
        {value: 'December', label: 'December'}
    ];

    const [leaveList, setLeaveList] = useState([]);
    const [selectedLeave, setSelectedLeave] = useState({
        leave_name: '',
        country: '',
        relevant_days: '',
        joined_month: ''
    });

    useEffect(() => {
        getLeaves()
    }, []);

    const getLeaves = async () => {
        const res = await axios.get(' http://127.0.0.1:8000/api/leaveSettings/');
        setLeaveList(res.data);
    }

    const saveLeaveSetting = async e => {
        e.preventDefault();
        await axios.post(`http://127.0.0.1:8000/api/leaveSettings/${selectedLeave.id}`, selectedLeave)
            .then(res => {
                setLeaveList(res.data);
                message.success('Holiday is successfully edited.');
            })
            .catch(err => {
                console.log(err.message);
                message.error('Something went wrong. Try again.');
            });
    }

    const onChange = (checkedValues) => {
        console.log(checkedValues.toString());
        setSelectedLeave({...selectedLeave, joined_month: checkedValues.toString()});
    }

    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Leave Settings - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3 className="page-title">Leave Settings</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Leave Settings</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* /Page Header */}

                {/* Leave Settings */}
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-striped custom-table mb-0">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Country</th>
                                    <th>Leave Type</th>
                                    <th>Relevant Days</th>
                                    <th>Joined Month</th>
                                    <th className="text-right">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    leaveList && leaveList.length > 0 && leaveList.map((leave, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{leave.country}</td>
                                            <td>{leave.leave_name}</td>
                                            <td>{leave.relevant_days}</td>
                                            <td>{leave.joined_month}</td>
                                            <td className="text-right">
                                                <div className='dropdown dropdown-action'>
                                                    <a href="#" className="action-icon dropdown-toggle"
                                                       data-toggle="dropdown"
                                                       aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="#" data-toggle="modal"
                                                           data-target="#edit_leave_type"
                                                           onClick={() => setSelectedLeave(leave)}
                                                        ><i
                                                            className="fa fa-pencil m-r-5"/> Edit</a>
                                                        <a className="dropdown-item" href="#" data-toggle="modal"
                                                           data-target="#delete_company"
                                                        ><i
                                                            className="fa fa-trash-o m-r-5"/> Delete</a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Holiday Modal */}
            <div className="modal custom-modal fade" id="edit_leave_type" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Holiday</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Holiday Name <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        value={selectedLeave.leave_name}
                                        onChange={e => setSelectedLeave({...selectedLeave, leave_name: e.target.value})}
                                        type="text"/>
                                </div>
                                <div className="form-group">
                                    <label>Relevant Days <span className="text-danger">*</span></label>
                                    <div>
                                        <input
                                            className="form-control"
                                            value={selectedLeave.relevant_days}
                                            onChange={(e) => setSelectedLeave({
                                                ...selectedLeave,
                                                relevant_days: e.target.value
                                            })}
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Joined Month <span className="text-danger">*</span></label>
                                    <Checkbox.Group
                                        options={options}
                                        value={selectedLeave.joined_month.toString().split(',')}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="submit-section">
                                    <button type="submit" data-dismiss="modal" className="btn btn-primary submit-btn"
                                            onClick={saveLeaveSetting}>Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default LeaveSettings;
