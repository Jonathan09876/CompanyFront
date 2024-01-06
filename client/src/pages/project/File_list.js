import React, { useState,useEffect } from "react";
import { Button, Table,Input } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { listProjectAction } from "../../actions/projectActions";
import {listCompanyAction} from "../../actions/companyAction"
import { addDataToModel, deleteData } from './Request_api';
import * as XLSX from 'xlsx';

const File_list = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const listProject = useSelector((state) => state.projectList);
  const { loading, error, projects } = listProject;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const addData = (data, name) => {
    console.log(data, name);

    addDataToModel(data, name).then((data) => {
      if (data) {
        console.log('yes');
        setFile('');
      } else {
        console.log('no');
      }
    });
  };
  const filePathset=(e)=> {
      e.preventDefault();
      var file = e.target.files[0];
      setFile(file);

      if (file === '') {
        alert('Insert some file');
      } else {
      var f = file;
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });

        wb.SheetNames.forEach(function (sheetName) {
          var name = sheetName.toLowerCase();
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(
            wb.Sheets[sheetName]
          );
          if(XL_row_object.length>1)
          {
             var json_object = JSON.stringify(XL_row_object);
             addData(json_object, name);
          }
         
          
        });
      };
      reader.readAsBinaryString(f);
      alert(`sheets Added Succesfully!`);
    }
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      dispatch(listCompanyAction());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      
      <input
          element="input"
          id="name"
          type="file"
          label="File Upload"
          accept=".xls,xlsx"
          // validators={[VALIDATOR_REQUIRE()]}
          onChange={ (e) => filePathset(e)} />
            <br />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>File Name</th>
              <th>Upload Date</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project._id}</td>
                <td>{project.name}</td>
                <td>{project.details}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>
                  <LinkContainer to={`/project/${project._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
     
  );
 
};
export default File_list;
