import React, { useState ,useEffect} from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../../bootstrap.min.css';
import isEmpty from 'lodash.isempty'; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const DetailShow = ({children,...props })  => {
  const [classstyle, setClassstyle] = useState('');
  const [hubs, setHubs]=useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = userLogin;
  const style={
    height:"956px",
    top:"119px"

  }
  

  const handleClose=()=>
  {
    setClassstyle("offcanvas offcanvas-end bg-success");
    props.onClosedetail()
  }
  const handleShow=()=>
  {
    
  }
  useEffect(() => {
    setClassstyle("offcanvas offcanvas-end bg-success show")
    let temperhubs=JSON.parse(props.list.hubs)
    console.log(temperhubs)
    setHubs(temperhubs);
    console.log(hubs)
  }, [dispatch, navigate,userInfo]);
  return (
    <>
    {!isEmpty(hubs) && (
        <div className={classstyle} style={style} id="demo">
          <div className="offcanvas-header">
            <h1 className="offcanvas-title">{props.list.companyName}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" onClick={handleClose}></button>
          </div>
          <div className="offcanvas-body">
            <h6>{props.list.address}</h6>
            <h6>{props.list.detail1}</h6>
            <h6>{props.list.detail2}</h6>
            <h6>president:{props.list.president}</h6>
            <br />
            <br />
            <br />
            <h5>hubs:</h5>
            {hubs.arr.map((hub)=>
            {
                <h6>{hub.name}:{hub.address}</h6>
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default DetailShow;