import React from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import {Avatar_02} from "../../../Entryfile/imagepath"
import moment from "moment";

const LeaveSettings = () => {
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

                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default LeaveSettings;
