import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import {message, Table} from 'antd';
import 'antd/dist/antd.css';
import {itemRender, onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import axios from "axios";
import {DatePicker} from 'antd';
import moment from "moment";

const LeaveAdmin = () => {
    const {RangePicker} = DatePicker;
    const dateFormat = 'YYYY/MM/DD';

    const [leaveList, setLeaveList] = useState([])
    const [selectedLeave,setSelectedLeave] = useState({
        department: '',
        designation: '',
        name: '',
        leaveApplyDate: '',
        leaveDatesFrom: new Date(),
        leaveDatesTo: new Date(),
        numOfDays: '',
        reason: '',
        status: ''
    });

    useEffect(() => {
        if ($('.select').length > 0) {
            $('.select').select2({
                minimumResultsForSearch: -1,
                width: '100%'
            });
        }
    });

    useEffect(() => {
        getAllLeaves();
    }, [])

    const getAllLeaves = async () => {
        axios.get(' http://127.0.0.1:8000/api/leaves/')
            .then(res => {
                setLeaveList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onStatusChange = async (leave, status) => {
        await axios.post(`http://127.0.0.1:8000/api/leaves/${leave.id}`, {
            ...leave,
            status
        })
            .then(res => {
                setLeaveList(res.data)
                message.success('Status changed.');
            })
            .catch(err => {
                console.log(err.message);
                message.error('Something went wrong. Try again.');
            });
    }

    const editLeave = async e => {
        e.preventDefault();
        await axios.post(`http://127.0.0.1:8000/api/leaves/${selectedLeave.id}`, {
            ...selectedLeave,
            leaveDatesFrom: selectedLeave.leaveDatesFrom.toISOString().split('T')[0],
            leaveDatesTo: selectedLeave.leaveDatesTo.toISOString().split('T')[0],
            numOfDays: +selectedLeave.numOfDays
        })
            .then(res => {
                setLeaveList(res.data)
                message.success('Leave updated.');
            })
            .catch(err => {
                console.log(err.message);
                message.error('Something went wrong. Try again.');
            });
    }

    const onLeaveDaysChange = val => {
        setSelectedLeave({
            ...selectedLeave,
            leaveDatesFrom: val[0]._d,
            leaveDatesTo: val[1]._d,
        })
    }

    const columns = [
        {
            title: 'Employee',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Department',
            dataIndex: 'department',
            sorter: (a, b) => a.leavetype.length - b.leavetype.length,
        },

        {
            title: 'Designation',
            dataIndex: 'designation',
            sorter: (a, b) => a.from.length - b.from.length,
        },
        {
            title: 'From',
            dataIndex: 'leaveDatesFrom',
            sorter: (a, b) => a.to.length - b.to.length,
        },
        {
            title: 'To',
            dataIndex: 'leaveDatesTo',
            sorter: (a, b) => a.to.length - b.to.length,
        },
        {
            title: 'No Of Days',
            dataIndex: 'numOfDays',
            sorter: (a, b) => a.noofdays.length - b.noofdays.length,
        },

        {
            title: 'Reason',
            dataIndex: 'reason',
            sorter: (a, b) => a.reason.length - b.reason.length,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => (
                <div className="dropdown action-label text-center">
                    <a className="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-toggle="dropdown"
                       aria-expanded="false">
                        <i className={text === "New" ? "fa fa-dot-circle-o text-purple" : text === "Pending" ?
                            "fa fa-dot-circle-o text-info" : text === "Approved" ? "fa fa-dot-circle-o text-success" : "fa fa-dot-circle-o text-danger"}/> {text}
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" onClick={() => onStatusChange(record, 'New')}><i
                            className="fa fa-dot-circle-o text-purple"/> New</a>
                        <a className="dropdown-item" href="#" onClick={() => onStatusChange(record, 'Pending')}><i
                            className="fa fa-dot-circle-o text-info"/> Pending</a>
                        <a className="dropdown-item" href="#" onClick={() => onStatusChange(record, 'Approved')}><i
                            className="fa fa-dot-circle-o text-success"/> Approved</a>
                        <a className="dropdown-item" href="#" onClick={() => onStatusChange(record, 'Declined')}><i
                            className="fa fa-dot-circle-o text-danger"/> Declined</a>
                    </div>
                </div>
            ),
            sorter: (a, b) => a.status.length - b.status.length,
        },
        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i
                        className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_leave" onClick={() => setSelectedLeave(record)}><i
                            className="fa fa-pencil m-r-5"/> Edit</a>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_approve"><i
                            className="fa fa-trash-o m-r-5"/> Delete</a>
                    </div>
                </div>
            ),
        },
    ]

    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Leaves - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Leaves</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Leaves</li>
                            </ul>
                        </div>
                        <div className="col-auto float-right ml-auto">
                            <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_leave"><i
                                className="fa fa-plus"/> Add Leave</a>
                        </div>
                    </div>
                </div>
                {/* /Page Header */}
                {/* Leave Statistics */}
                <div className="row">
                    <div className="col-md-3">
                        <div className="stats-info">
                            <h6>Today Presents</h6>
                            <h4>12 / 60</h4>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-info">
                            <h6>Planned Leaves</h6>
                            <h4>8 <span>Today</span></h4>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-info">
                            <h6>Unplanned Leaves</h6>
                            <h4>0 <span>Today</span></h4>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-info">
                            <h6>Pending Requests</h6>
                            <h4>12</h4>
                        </div>
                    </div>
                </div>
                {/* /Leave Statistics */}
                {/* Search Filter */}
                <div className="row filter-row">
                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div className="form-group form-focus">
                            <input type="text" className="form-control floating"/>
                            <label className="focus-label">Employee Name</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div className="form-group form-focus select-focus">
                            <select className="select floating">
                                <option> -- Select --</option>
                                <option>Casual Leave</option>
                                <option>Medical Leave</option>
                                <option>Loss of Pay</option>
                            </select>
                            <label className="focus-label">Leave Type</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div className="form-group form-focus select-focus">
                            <select className="select floating">
                                <option> -- Select --</option>
                                <option> Pending</option>
                                <option> Approved</option>
                                <option> Rejected</option>
                            </select>
                            <label className="focus-label">Leave Status</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div className="form-group form-focus select-focus">
                            <input className="form-control floating" type="date"/>
                            <label className="focus-label">From</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <div className="form-group form-focus select-focus">
                            <input className="form-control floating" type="date"/>
                            <label className="focus-label">To</label>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                        <a href="#" className="btn btn-success btn-block"> Search </a>
                    </div>
                </div>
                {/* /Search Filter */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">

                            <Table className="table-striped"
                                   pagination={{
                                       total: leaveList.length,
                                       showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                       showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                   }}
                                   style={{overflowX: 'auto'}}
                                   columns={columns}
                                // bordered
                                   dataSource={leaveList}
                                   rowKey={record => record.id}
                                   onChange={console.log("chnage")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Content */}
            {/* Add Leave Modal */}
            <div id="add_leave" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Leave</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Leave Type <span className="text-danger">*</span></label>
                                    <select className="select">
                                        <option>Select Leave Type</option>
                                        <option>Casual Leave 12 Days</option>
                                        <option>Medical Leave</option>
                                        <option>Loss of Pay</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>From <span className="text-danger">*</span></label>
                                    <div>
                                        <input className="form-control datetimepicker" type="date"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>To <span className="text-danger">*</span></label>
                                    <div>
                                        <input className="form-control datetimepicker" type="date"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Number of days <span className="text-danger">*</span></label>
                                    <input className="form-control" readOnly type="text"/>
                                </div>
                                <div className="form-group">
                                    <label>Remaining Leaves <span className="text-danger">*</span></label>
                                    <input className="form-control" readOnly defaultValue={12} type="text"/>
                                </div>
                                <div className="form-group">
                                    <label>Leave Reason <span className="text-danger">*</span></label>
                                    <textarea rows={4} className="form-control" defaultValue={""}/>
                                </div>
                                <div className="submit-section">
                                    <button className="btn btn-primary submit-btn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add Leave Modal */}
            {/* Edit Leave Modal */}
            <div id="edit_leave" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Leave</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Department <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={selectedLeave.department}
                                        onChange={e => setSelectedLeave({...selectedLeave, department: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Designation <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={selectedLeave.designation}
                                        onChange={e => setSelectedLeave({...selectedLeave, designation: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Name <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={selectedLeave.name}
                                        onChange={e => setSelectedLeave({...selectedLeave, name: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Leave Apply Date <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        value={selectedLeave.leaveApplyDate}
                                        onChange={e => setSelectedLeave({...selectedLeave, leaveApplyDate: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Leave Days<span className="text-danger">*</span></label>
                                    <RangePicker
                                        style={{height: '44px', width: '100%'}}
                                        value={[moment(selectedLeave.leaveDatesFrom, dateFormat), moment(selectedLeave.leaveDatesTo, dateFormat)]}
                                        onChange={onLeaveDaysChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Number of days <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={selectedLeave.numOfDays}
                                        onChange={e => setSelectedLeave({...selectedLeave, numOfDays: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Leave Reason <span className="text-danger">*</span></label>
                                    <textarea
                                        rows={4}
                                        className="form-control"
                                        value={selectedLeave.reason}
                                        onChange={e => {
                                            setSelectedLeave({...selectedLeave, reason: e.target.value})
                                        }}
                                    />
                                </div>
                                <div className="submit-section">
                                    <button className="btn btn-primary submit-btn" onClick={editLeave}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Edit Leave Modal */}
            {/* Approve Leave Modal */}
            <div className="modal custom-modal fade" id="approve_leave" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-header">
                                <h3>Leave Approve</h3>
                                <p>Are you sure want to approve for this leave?</p>
                            </div>
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <a href="" className="btn btn-primary continue-btn">Approve</a>
                                    </div>
                                    <div className="col-6">
                                        <a href="" data-dismiss="modal"
                                           className="btn btn-primary cancel-btn">Decline</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Approve Leave Modal */}
            {/* Delete Leave Modal */}
            <div className="modal custom-modal fade" id="delete_approve" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-header">
                                <h3>Delete Leave</h3>
                                <p>Are you sure want to delete this leave?</p>
                            </div>
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <a href="" className="btn btn-primary continue-btn">Delete</a>
                                    </div>
                                    <div className="col-6">
                                        <a href="" data-dismiss="modal"
                                           className="btn btn-primary cancel-btn">Cancel</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Delete Leave Modal */}
        </div>
    );
}

export default LeaveAdmin;
