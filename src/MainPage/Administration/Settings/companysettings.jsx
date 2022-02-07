/**
 * Signin Firebase
 */

import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import axios from "axios";

const Settings = () => {

    const [company,setCompany] = useState({
        country : 'USA',
        companyName : '',
        contactPerson : '',
        address:'',
        city:'',
        state:'',
        postalCode:'',
        email:'',
        phoneNumber:'',
        mobileNumber:'',
        fax:'',
        websiteUrl:''
    })
    const [companyList, setCompanyList] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState({
        id:null,
        country : '',
        companyName : '',
        contactPerson : '',
        address:'',
        city:'',
        state:'',
        postalCode:'',
        email:'',
        phoneNumber:'',
        mobileNumber:'',
        fax:'',
        websiteUrl:''
    });

    useEffect(() => {
        getCompanyList();
    },[])

    const getCompanyList = async () => {
        const res = await axios.get(' http://127.0.0.1:8000/api/companies/');
        setCompanyList(res.data);
    }

    const addCompanyHandler = async e => {
        e.preventDefault();
        await axios.post(' http://127.0.0.1:8000/api/companies/', company)
            .then(res => {
                setCompanyList(res.data);
                setCompany({
                    country : 'USA',
                    companyName : '',
                    contactPerson : '',
                    address:'',
                    city:'',
                    state:'',
                    postalCode:'',
                    email:'',
                    phoneNumber:'',
                    mobileNumber:'',
                    fax:'',
                    websiteUrl:''
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    const editCompanyHandler = async e =>{
        e.preventDefault();
        await axios.post(`http://localhost:8000/api/companies/${selectedCompany.id}`, selectedCompany)
            .then(res => {
                setCompanyList(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    const onClickEditCompany = (company) => {
        setSelectedCompany({
            id:company.id,
            country : company.country,
            companyName : company.companyName,
            contactPerson : company.contactPerson,
            address:company.address,
            city:company.city,
            state:company.state,
            postalCode:company.postalCode,
            email:company.email,
            phoneNumber:company.phoneNumber,
            mobileNumber:company.mobileNumber,
            fax:company.fax,
            websiteUrl:company.websiteUrl
        });
    }

    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Settings - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Companies</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Company Settings</Link>
                                </li>
                                <li className="breadcrumb-item active">Company</li>
                            </ul>
                        </div>
                        <div className="col-auto float-right ml-auto">
                            <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_company"><i
                                className="fa fa-plus"/> Add Company</a>
                        </div>
                    </div>
                </div>
                {/* /Page Header */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-striped custom-table mb-0">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Country</th>
                                    <th>Company Name</th>
                                    <th>Contact Person</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State/Province</th>
                                    <th>Postal Code</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Mobile Number</th>
                                    <th>Fax</th>
                                    <th>Website Url</th>
                                    <th className="text-right">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    companyList && companyList.length>0 && companyList.map((company,index) => (
                                        <tr key={company.id}>
                                            <td>{++index}</td>
                                            <td>{company.country}</td>
                                            <td>{company.companyName}</td>
                                            <td>{company.contactPerson}</td>
                                            <td>{company.address}</td>
                                            <td>{company.city}</td>
                                            <td>{company.state}</td>
                                            <td>{company.postalCode}</td>
                                            <td>{company.email}</td>
                                            <td>{company.phoneNumber}</td>
                                            <td>{company.mobileNumber}</td>
                                            <td>{company.fax}</td>
                                            <td>{company.websiteUrl}</td>
                                            <td className="text-right">
                                                <div className='dropdown dropdown-action'>
                                                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                       aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="#" data-toggle="modal"
                                                           data-target="#edit_company"  onClick={() => onClickEditCompany(company)}><i className="fa fa-pencil m-r-5" /> Edit</a>
                                                        <a className="dropdown-item" href="#" data-toggle="modal"
                                                           data-target="#delete_company" ><i
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

            {/* Add company Modal */}
            <div className="modal custom-modal fade " id="add_company" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Company</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="form-group" >
                                            <label>Country</label>
                                            <select className="form-control select" defaultValue={company.country} >
                                                <option value="USA">USA</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Company Name <span className="text-danger">*</span></label>
                                            <input className="form-control" type="text"
                                                   value={company.companyName}
                                                   onChange={e => setCompany({...company,companyName:e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Contact Person</label>
                                            <input className="form-control "
                                                   type="text" value={company.contactPerson}
                                                   onChange={e => setCompany({...company,contactPerson:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input className="form-control "
                                                   type="text"
                                                   value={company.address}
                                                   onChange={e => setCompany({...company,address:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-3">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input className="form-control"
                                                   value={company.city}
                                                   onChange={e => setCompany({...company,city:e.target.value})}
                                                   type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-3">
                                        <div className="form-group">
                                            <label>State/Province</label>
                                            <input className="form-control" type="text"
                                                   value={company.state}
                                                   onChange={e => setCompany({...company,state:e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-3">
                                        <div className="form-group">
                                            <label>Postal Code</label>
                                            <input className="form-control"
                                                   type="text"
                                                   value={company.postalCode}
                                                   onChange={e => setCompany({...company,postalCode:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input className="form-control"
                                                   type="email"
                                                   value={company.email}
                                                   onChange={e => setCompany({...company,email:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input className="form-control"
                                                   type="text"
                                                   value={company.phoneNumber}
                                                   onChange={e => setCompany({...company,phoneNumber:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Mobile Number</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={company.mobileNumber}
                                                onChange={e => setCompany({...company,mobileNumber:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Fax</label>
                                            <input className="form-control"
                                                   type="text"
                                                   value={company.fax}
                                                   onChange={e => setCompany({...company,fax:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Website Url</label>
                                            <input className="form-control"
                                                   type="text"
                                                   value={company.websiteUrl}
                                                   onChange={e => setCompany({...company,websiteUrl:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="submit-section">
                                    <button className="btn btn-primary submit-btn" data-dismiss="modal" onClick={addCompanyHandler}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit company Modal */}
            <div className="modal custom-modal fade" id="edit_company" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Company</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Country</label>
                                            <select className="form-control select">
                                                <option>USA</option>
                                                <option>United Kingdom</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Company Name <span className="text-danger">*</span></label>
                                            <input className="form-control"
                                                   type="text"
                                                   value={selectedCompany.companyName}
                                                   onChange={e => setSelectedCompany({...selectedCompany,companyName:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Contact Person</label>
                                            <input className="form-control "
                                                   value={selectedCompany.contactPerson}
                                                   onChange={e => setSelectedCompany({...selectedCompany,contactPerson:e.target.value})}
                                                   type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Address</label>
                                            <input className="form-control "
                                                   value={selectedCompany.address}
                                                   onChange={e => setSelectedCompany({...selectedCompany,address:e.target.value})}
                                                   type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-3">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input className="form-control"
                                                   value={selectedCompany.city}
                                                   onChange={e => setSelectedCompany({...selectedCompany,city:e.target.value})}
                                                   type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-3">
                                        <div className="form-group">
                                            <label>State/Province</label>
                                            <input className="form-control" type="text"
                                                   value={selectedCompany.state}
                                                   onChange={e => setSelectedCompany({...selectedCompany,state:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-3">
                                        <div className="form-group">
                                            <label>Postal Code</label>
                                            <input className="form-control"
                                                   value={selectedCompany.postalCode}
                                                   onChange={e => setSelectedCompany({...selectedCompany,postalCode:e.target.value})}
                                                   type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input className="form-control"
                                                   value={selectedCompany.email}
                                                   onChange={e => setSelectedCompany({...selectedCompany,email:e.target.value})}
                                                   type="email"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input className="form-control"
                                                   value={selectedCompany.phoneNumber}
                                                   onChange={e => setSelectedCompany({...selectedCompany,phoneNumber:e.target.value})}
                                                   type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Mobile Number</label>
                                            <input className="form-control"
                                                   value={selectedCompany.mobileNumber}
                                                   onChange={e => setSelectedCompany({...selectedCompany,mobileNumber:e.target.value})}
                                                   type="text"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Fax</label>
                                            <input className="form-control"
                                                   value={selectedCompany.fax}
                                                   onChange={e => setSelectedCompany({...selectedCompany,fax:e.target.value})}
                                                   type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Website Url</label>
                                            <input className="form-control"
                                                   value={selectedCompany.websiteUrl}
                                                   onChange={e => setSelectedCompany({...selectedCompany,websiteUrl:e.target.value})}
                                                   type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="submit-section">
                                    <button
                                        className="btn btn-primary submit-btn"
                                        data-dismiss="modal"
                                        type="submit"
                                        onClick={editCompanyHandler}
                                    >
                                        Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Company Modal */}
            <div className='modal custom-modal fade' id="delete_company" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-header">
                                <h3>Delete Company</h3>
                                <p>Are you sure want to delete?</p>
                            </div>
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <a href="#" data-dismiss="modal"
                                           className="btn btn-primary continue-btn">Delete</a>
                                    </div>
                                    <div className="col-6">
                                        <a href="#"
                                           className="btn btn-primary cancel-btn">Cancel</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
