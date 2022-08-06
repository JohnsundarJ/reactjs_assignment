import React, { useState, useEffect } from "react";
import axios from "axios";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {
  Tab, Tabs, styled, InputBase, InputAdornment,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getResource, resourcePending } from "../redux/action/resourceAction.js";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Stack from '@mui/material/Stack';
import "./user.css";
import ResourceDetail from "./ResourceDetail.js";

const Search = styled("div")({
  backgroundColor: "#EAE7E4",
  padding: "0 10px",
  borderRadius: "5px",
  width: "60%",
  height: "40px"
});

const createState = {
  title: '',
  description: '',
  link: '',
  resource_name: ''
}
function User(props) {

  const navigate = useNavigate();
  const ResourceReducer = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState("/");
  const [Resources, setResources] = useState([]);
  const [createDetails, setCreateDetails] = useState(createState);

  useEffect(() => {
  }, [])
  const handleChange = (event, newValue) => {
    setPage(newValue);
    navigate(newValue)
  }
  const handleCreate = (e) => {

    const { name, value } = e.target;
    setCreateDetails(
      {
        ...createDetails,
        [name] : value
      })
  }
  const handleCreation =()=>{
    const { title, link, description, resource_name } = createDetails;
    if (title === "" || title===null || title===undefined)
      alert("Please fill out title field")
    else if (link === "" || link===null || link===undefined)
      alert("Please fill out link field!")
      else if (resource_name === "" || resource_name===null || resource_name===undefined)
      alert("Please fill out resource field!")
      else if (description === "" || description===null || description===undefined)
    alert("Please fill out description field!")
    else {
      axios.get(`https://media-content.ccbp.in/website/react-assignment/add_resource.json`, createDetails)
        .then((res) => {
          if (res.status === 200) {
            setCreateDetails(createState)
            alert(res.status + "\nItem created successfully with status of 200")
          
          }
          else
            alert("Something went wrong!")
        })
        .catch((err) => {
          alert(err);
        })
    }
  }
  return (
    <div style={{
    }}>
      <div class="wrapper">

        <div class="form">
          <IconButton onClick={() => {
            
    // localStorage.setItem("id",ResourceDetail.id)
            navigate("/resource_detail", {
              state: {
                id: localStorage.getItem("id")
              }
            })
          }}>
            <ArrowBackIosIcon sx={{ color: "grey" }} />
            <p style={{ fontSize: "12px" }}>Users</p>
          </IconButton>
          <br></br>
          <form style={{
            display: "flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "25%",
            // marginRight: "auto",
            // width:" 10em"
          }}>
            <label style={{ fontSize: "25px", fontWeight: "bold" }}>Item Details</label>
            <br></br>
            <label style={{ fontSize: "15px", color: "grey" }}>ITEM NAME</label>
           
            <input
            name='title'
            onChange={handleCreate}
            value={createDetails.title}
            required
              style={{ marginTop: "10px", height: "25px", width: "300px" }} type="text" />
            <br></br>
            <label style={{ fontSize: "15px", color: "grey" }}>LINK</label>
          
            <input
            name='link'
            onChange={handleCreate}
            value={createDetails.link}
            required
              style={{ color: "blue", marginTop: "10px", height: "25px", width: "300px" }} type="text" />
            
            <br></br>
            <label style={{ fontSize: "15px", color: "grey" }}>RESOURCE NAME</label>
            
            <input
              
            name='resource_name'
            onChange={handleCreate}
            value={createDetails.resource_name}
              required
              style={{ marginTop: "10px", height: "25px", width: "300px" }} type="text" />
            <br></br>
            <label style={{ fontSize: "15px", color: "grey" }}>DESCRIPTION</label>
           
            <textarea
            
            name='description'
            onChange={handleCreate}
            value={createDetails.description}
            required
              rows="2" cols="38" style={{ marginTop: "10px", width: "auto" }} >
            </textarea>
            <br></br>
            <br></br>
            <Button variant="contained" onClick={() => {
              handleCreation()
            }
            }>Create</Button>
          </form>
        </div>
        <img class="right-img" src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZnVybml0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80" />

      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
  };
};
const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(User);