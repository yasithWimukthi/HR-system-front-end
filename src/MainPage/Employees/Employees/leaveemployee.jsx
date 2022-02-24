import React, {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import {message, Table} from 'antd';
import 'antd/dist/antd.css';
import {itemRender, onShowSizeChange} from "../../paginationfunction"
import "../../antdstyle.css"
import {DatePicker} from 'antd';
import moment from "moment";
import axios from "axios";


const LeaveEmployee = () => {

    const {RangePicker} = DatePicker;
    const dateFormat = 'YYYY/MM/DD';

    const [leave, setLeave] = useState({
        department: '',
        designation: '',
        name: '',
        leaveApplyDate: '',
        leaveDatesFrom: new Date(),
        leaveDatesTo: new Date(),
        numOfDays: '',
        reason: ''
    })

    const [selectedLeave, setSelectedLeave] = useState({
        department: '',
        designation: '',
        name: '',
        leaveApplyDate: '',
        leaveDatesFrom: new Date(),
        leaveDatesTo: new Date(),
        numOfDays: '',
        reason: ''
    })

    const [leaveList, setLeaveList] = useState([])
    const[selectToDelete,setSelectToDelete] = useState({})

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

    const submitLeave = async e => {
        e.preventDefault();
        await axios.post(' http://127.0.0.1:8000/api/leaves/', {
            ...leave,
            leaveDatesFrom: leave.leaveDatesFrom.toISOString().split('T')[0],
            leaveDatesTo: leave.leaveDatesTo.toISOString().split('T')[0],
            numOfDays: +leave.numOfDays
        })
            .then(res => {
                setLeave({
                    department: '',
                    designation: '',
                    name: '',
                    leaveApplyDate: '',
                    leaveDatesFrom: new Date(),
                    leaveDatesTo: new Date(),
                    numOfDays: '',
                    reason: ''
                })
                setLeaveList(res.data);
                message.success('Leave is saved.');
            })
            .catch(err => {
                console.log(err);
                message.error('Something went wrong. Try again.');
            });
    }

    const editLeave = async e => {
        e.preventDefault();
        await axios.post(` http://127.0.0.1:8000/api/leaves/${selectedLeave.id}`, {
            ...selectedLeave,
            leaveDatesFrom: selectedLeave.leaveDatesFrom.toISOString().split('T')[0],
            leaveDatesTo: selectedLeave.leaveDatesTo.toISOString().split('T')[0],
            numOfDays: +selectedLeave.numOfDays
        })
            .then(res => {
                setSelectedLeave({
                    department: '',
                    designation: '',
                    name: '',
                    leaveApplyDate: '',
                    leaveDatesFrom: new Date(),
                    leaveDatesTo: new Date(),
                    numOfDays: '',
                    reason: ''
                })
                setLeaveList(res.data);
                message.success('Leave is saved.');
            })
            .catch(err => {
                console.log(err);
                message.error('Something went wrong. Try again.');
            });
    }

    const deleteLeave = async e => {
        e.preventDefault();
        await axios.delete(`http://localhost:8000/api/leaves/${selectToDelete.id}`)
            .then(res => {
                setLeaveList(res.data)
                message.success('Leave is successfully removed.');
            })
            .catch(err => {
                console.log(err);
                message.error('Something went wrong. Try again.');
            });
    }

    const onLeaveDaysChange = val => {
        setLeave({
            ...leave,
            leaveDatesFrom: val[0]._d,
            leaveDatesTo: val[1]._d,
        })
    }

    const onEditLeaveDays = val => {
        setSelectedLeave({
            ...selectedLeave,
            leaveDatesFrom: val[0]._d,
            leaveDatesTo: val[1]._d,
        })
    }

    useEffect(() => {
        if ($('.select').length > 0) {
            $('.select').select2({
                minimumResultsForSearch: -1,
                width: '100%'
            });
        }
    });

    const columns = [
        {
            title: 'From',
            dataIndex: 'leaveDatesFrom',
            sorter: (a, b) => a.from.length - b.from.length,
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
                <div className="action-label text-center">
                    <a className="btn btn-white btn-sm btn-rounded" href="">
                        <i className={text === "New" ? "fa fa-dot-circle-o text-purple" : text === "Pending" ?
                            "fa fa-dot-circle-o text-info" : text === "Approved" ? "fa fa-dot-circle-o text-success"
                                : "fa fa-dot-circle-o text-danger"}/> {text}
                    </a>
                </div>
            ),
        },
        // {
        //     title: 'Approved By',
        //     dataIndex: 'name',
        //     render: (text, record) => (
        //         <h2 className="table-avatar">
        //             <Link to="/app/profile/employee-profile" className="avatar"><img alt="" src={record.image}/></Link>
        //             <Link to="/app/profile/employee-profile">{text} </Link>
        //         </h2>
        //     ),
        //     sorter: (a, b) => a.name.length - b.name.length,
        // },
        {
            title: 'Action',
            render: (text, record) => (
                <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i
                        className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_leave"
                           onClick={() => {
                               setSelectedLeave({
                                   ...record,
                                   leaveDatesFrom: new Date(record.leaveDatesFrom),
                                   leaveDatesTo: new Date(record.leaveDatesTo),
                               })
                           }}><i
                            className="fa fa-pencil m-r-5"/> Edit</a>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_approve" onClick={() => setSelectToDelete(record)}><i
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
                            <h6>Annual Leave</h6>
                            <h4>12</h4>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-info">
                            <h6>Medical Leave</h6>
                            <h4>3</h4>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-info">
                            <h6>Other Leave</h6>
                            <h4>4</h4>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="stats-info">
                            <h6>Remaining Leave</h6>
                            <h4>5</h4>
                        </div>
                    </div>
                </div>
                {/* /Leave Statistics */}
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
                                   onChange={console.log("change")}
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
                                    <label>Department <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={leave.department}
                                        onChange={e => setLeave({...leave, department: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Designation <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={leave.designation}
                                        onChange={e => setLeave({...leave, designation: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Name <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={leave.name}
                                        onChange={e => setLeave({...leave, name: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Leave Apply Date <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        value={leave.leaveApplyDate}
                                        onChange={e => setLeave({...leave, leaveApplyDate: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Leave Days<span className="text-danger">*</span></label>
                                    <RangePicker
                                        style={{height: '44px', width: '100%'}}
                                        //value={[moment(leave.leaveDatesFrom, dateFormat), moment(leave.leaveDatesTo, dateFormat)]}
                                        onChange={onLeaveDaysChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Number of days <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={leave.numOfDays}
                                        onChange={e => setLeave({...leave, numOfDays: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Leave Reason <span className="text-danger">*</span></label>
                                    <textarea
                                        rows={4}
                                        className="form-control"
                                        value={leave.reason}
                                        onChange={e => {
                                            setLeave({...leave, reason: e.target.value})
                                        }}
                                    />
                                </div>
                                <div className="submit-section">
                                    <button className="btn btn-primary submit-btn" onClick={submitLeave}>Submit</button>
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
                                        onChange={e => setSelectedLeave({
                                            ...selectedLeave,
                                            designation: e.target.value
                                        })}
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
                                        onChange={e => setSelectedLeave({
                                            ...selectedLeave,
                                            leaveApplyDate: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Leave Days<span className="text-danger">*</span></label>
                                    <RangePicker
                                        style={{height: '44px', width: '100%'}}
                                        value={[moment(selectedLeave.leaveDatesFrom, dateFormat), moment(selectedLeave.leaveDatesTo, dateFormat)]}
                                        onChange={onEditLeaveDays}
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
                                    <button className="btn btn-primary submit-btn" onClick={editLeave}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Edit Leave Modal */}
            {/* Delete Leave Modal */}
            <div className="modal custom-modal fade" id="delete_approve" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-header">
                                <h3>Delete Leave</h3>
                                <p>Are you sure want to Cancel this leave?</p>
                            </div>
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <a href="#" className="btn btn-primary continue-btn" onClick={deleteLeave}>Delete</a>
                                    </div>
                                    <div className="col-6">
                                        <a href="#" data-dismiss="modal"
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

export default LeaveEmployee;
