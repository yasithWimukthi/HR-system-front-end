/**
 * Signin Firebase
 */

 import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import {Link} from "react-router-dom";
import moment from "moment";

const Settings = () => {
  useEffect( ()=>{
    if($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
    }
  });  
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
                   <li className="breadcrumb-item"><Link to="/app/main/dashboard">Company Settings</Link></li>
                   <li className="breadcrumb-item active">Company</li>
                 </ul>
               </div>
               <div className="col-auto float-right ml-auto">
                 <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_holiday"><i
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
                     <th>Title</th>
                     <th>Holiday Date</th>
                     <th>Day</th>
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

         {/* Add company Modal */}
         <div className="modal custom-modal fade " id="add_holiday" role="dialog" >
           <div className="modal-dialog modal-dialog-centered" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title">Add Holiday</h5>
                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">×</span>
                 </button>
               </div>
               <div className="modal-body">
                 <form >
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
                           <input className="form-control" type="text" defaultValue="Dreamguy's Technologies" />
                         </div>
                       </div>
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label>Contact Person</label>
                           <input className="form-control " defaultValue="Daniel Porter" type="text" />
                         </div>
                       </div>
                     </div>
                     <div className="row">
                       <div className="col-sm-12">
                         <div className="form-group">
                           <label>Address</label>
                           <input className="form-control " defaultValue="3864 Quiet Valley Lane, Sherman Oaks, CA, 91403" type="text" />
                         </div>
                       </div>
                       <div className="col-sm-6 col-md-6 col-lg-3">
                         <div className="form-group">
                           <label>City</label>
                           <input className="form-control" defaultValue="Sherman Oaks" type="text" />
                         </div>
                       </div>
                       <div className="col-sm-6 col-md-6 col-lg-3">
                         <div className="form-group">
                           <label>State/Province</label>
                           <select className="form-control select">
                             <option>California</option>
                             <option>Alaska</option>
                             <option>Alabama</option>
                           </select>
                         </div>
                       </div>
                       <div className="col-sm-6 col-md-6 col-lg-3">
                         <div className="form-group">
                           <label>Postal Code</label>
                           <input className="form-control" defaultValue={91403} type="text" />
                         </div>
                       </div>
                     </div>
                     <div className="row">
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label>Email</label>
                           <input className="form-control" defaultValue="danielporter@example.com" type="email" />
                         </div>
                       </div>
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label>Phone Number</label>
                           <input className="form-control" defaultValue="818-978-7102" type="text" />
                         </div>
                       </div>
                     </div>
                     <div className="row">
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label>Mobile Number</label>
                           <input className="form-control" defaultValue="818-635-5579" type="text" />
                         </div>
                       </div>
                       <div className="col-sm-6">
                         <div className="form-group">
                           <label>Fax</label>
                           <input className="form-control" defaultValue="818-978-7102" type="text" />
                         </div>
                       </div>
                     </div>
                     <div className="row">
                       <div className="col-sm-12">
                         <div className="form-group">
                           <label>Website Url</label>
                           <input className="form-control" defaultValue="https://www.example.com" type="text" />
                         </div>
                       </div>
                     </div>
                     <div className="submit-section">
                       <button className="btn btn-primary submit-btn">Save</button>
                     </div>
                   </form>
                 </form>
               </div>
             </div>
           </div>
         </div>

         {/* Edit company Modal */}
         <div className="modal custom-modal fade" id="edit_holiday" role="dialog">
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
                         <input className="form-control" type="text" defaultValue="Dreamguy's Technologies" />
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label>Contact Person</label>
                         <input className="form-control " defaultValue="Daniel Porter" type="text" />
                       </div>
                     </div>
                   </div>
                   <div className="row">
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label>Address</label>
                         <input className="form-control " defaultValue="3864 Quiet Valley Lane, Sherman Oaks, CA, 91403" type="text" />
                       </div>
                     </div>
                     <div className="col-sm-6 col-md-6 col-lg-3">
                       <div className="form-group">
                         <label>City</label>
                         <input className="form-control" defaultValue="Sherman Oaks" type="text" />
                       </div>
                     </div>
                     <div className="col-sm-6 col-md-6 col-lg-3">
                       <div className="form-group">
                         <label>State/Province</label>
                         <select className="form-control select">
                           <option>California</option>
                           <option>Alaska</option>
                           <option>Alabama</option>
                         </select>
                       </div>
                     </div>
                     <div className="col-sm-6 col-md-6 col-lg-3">
                       <div className="form-group">
                         <label>Postal Code</label>
                         <input className="form-control" defaultValue={91403} type="text" />
                       </div>
                     </div>
                   </div>
                   <div className="row">
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label>Email</label>
                         <input className="form-control" defaultValue="danielporter@example.com" type="email" />
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label>Phone Number</label>
                         <input className="form-control" defaultValue="818-978-7102" type="text" />
                       </div>
                     </div>
                   </div>
                   <div className="row">
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label>Mobile Number</label>
                         <input className="form-control" defaultValue="818-635-5579" type="text" />
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-group">
                         <label>Fax</label>
                         <input className="form-control" defaultValue="818-978-7102" type="text" />
                       </div>
                     </div>
                   </div>
                   <div className="row">
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label>Website Url</label>
                         <input className="form-control" defaultValue="https://www.example.com" type="text" />
                       </div>
                     </div>
                   </div>
                   <div className="submit-section">
                     <button className="btn btn-primary submit-btn">Save</button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
         </div>

         {/* Delete Company Modal */}
         <div className='modal custom-modal fade' id="delete_holiday" role="dialog">
           <div className="modal-dialog modal-dialog-centered">
             <div className="modal-content">
               <div className="modal-body">
                 <div className="form-header">
                   <h3>Delete Holiday</h3>
                   <p>Are you sure want to delete?</p>
                 </div>
                 <div className="modal-btn delete-action">
                   <div className="row">
                     <div className="col-6">
                       <a href="#" data-dismiss="modal" className="btn btn-primary continue-btn" onClick={}>Delete</a>
                     </div>
                     <div className="col-6">
                       <a href="#"
                          className="btn btn-primary cancel-btn" >Cancel</a>
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
