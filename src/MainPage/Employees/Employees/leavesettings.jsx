import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import {Avatar_02} from "../../../Entryfile/imagepath"
import moment from "moment";
import axios from "axios";

const LeaveSettings = () => {

    const [leaveList, setLeaveList] = useState([]);

    useEffect(() => {
        getLeaves()
    }, []);

    const getLeaves = async () => {
        const res = await axios.get(' http://127.0.0.1:8000/api/leaves/');
        setLeaveList(res.data);
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
                                    leaveList && leaveList.length > 0 && leaveList.map((leave,index)=>(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{leave.country}</td>
                                            <td>{leave.leave_name}</td>
                                            <td></td>
                                            <td></td>
                                            <td className="text-right">
                                                <div className='dropdown dropdown-action'>
                                                    <a href="#" className="action-icon dropdown-toggle"
                                                       data-toggle="dropdown"
                                                       aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="#" data-toggle="modal"
                                                           data-target="#edit_leave_type"
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
                                    <input className="form-control" defaultValue="New Year" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label>Holiday Date <span className="text-danger">*</span></label>
                                    <div><input className="form-control"
                                                type="date" />
                                    </div>
                                </div>
                                <div className="submit-section">
                                    <button type="submit" data-dismiss="modal" className="btn btn-primary submit-btn">Save
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
