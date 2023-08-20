import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./Searchbar";
import { Paper, Stack } from "@mui/material";

import AddBatch from "./AddBatch";
import Image from "../../../../util/Avater";
import { SvgIcon } from "@mui/material";
import "../../../../App.css";
import AddTeacher from "./AddTeacher";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TeacherList from './TeacherList'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { TabList } from "@mui/lab";
import { TabPanel } from "@mui/lab";

export default function InstitutePage({ ControlNotification }) {
  const { search } = useLocation();
  const id = search.split("=")[1];
  const [teacher, setTeacher] = useState([]);
  const [institute, setInstitute] = useState([]);
  const getInstitution = () => {
    fetch("/api/admin/getInstitution", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") setInstitute(data.message);
      });
  };

  const getTeacher = () => {
    fetch("/api/admin/getTeacher")
      .then((res) => res.json())
      .then((data) => {
        setTeacher(data.message);
      });
  };
  const editTeacherAction = (type,data) =>{
    fetch('/api/admin/editTeacherAction',{
  method:"POST",
  headers:{
    "Content-type":"application/json"
  },
  body:JSON.stringify({type,data,id})
    })
    .then(res => res.json())
    .then((data) => {
      if(data.status == 'success'){
    getInstitution()
    ControlNotification(data.status,data.message)
      }
      if(data.status == 'error')   ControlNotification(data.status,data.message)
    })
  } 
  const removeTeacher = (data) =>{
    fetch('/api/admin/removeTeacher',{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({data,id})
        })
        .then(res => res.json())
        .then((data) => {
          if(data.status == 'success'){
        getInstitution()
        getTeacher()
        ControlNotification(data.status,data.message)
          }
          if(data.status == 'error')   ControlNotification(data.status,data.message)
        })
  }
const getTeacherAccess =(status,data) =>{

if(status == 'callInstitute') getInstitution()
if(status == 'removeBatch') editTeacherAction('removeBatch',data)
if(status == 'removeTeacher')  removeTeacher(data)


if(status == 'success' ) {
  getInstitution()
  getTeacher()
} 

}
  useEffect(() => {
    getInstitution();
    getTeacher();
  }, []);
  return (
    <div>
      <SearchBar />
      <Stack sx={{ marginTop: "20px" }}>
        {institute.length > 0 ? (
          ""
        ) : (
          <Home
            teacher={teacher}
            institute={institute}
            id={id}
            ControlNotification={ControlNotification}
            getTeacherAccess={getTeacherAccess}
          />
        )}
      </Stack>
    </div>
  );
}

const Home = ({ institute, id, ControlNotification, teacher,getTeacherAccess }) => {
  const style = {
    image: {
      width: " 40px",
      height: " 40px",
    },
    name: {
      color: " #000",
      fontFamily: " DM Sans",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
    addBtn: {
      color: "white",
      borderRadius: " 4px",
      background: " #187163",
      minWidth: "118px",
      height: "34px",
      textTransform: "none",
    },
    batch: {
      color: " #000",
      fontFamily: " DM Sans",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      marginTop: "20px",
    },
  };
  return (
    <Paper
      sx={{
        borderRadius: "5px",
        background: "#FFF",
        boxShadow: "0px 15px 62px 0px rgba(0, 0, 0, 0.08)",
        width: "100%",
        height: "600px",

        padding: "20px",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing="15px">
          <img src={institute.avatar} style={style.image} alt="" />
          <p style={style.name}>{institute.name}</p>
        </Stack>
        <Stack direction="row" alignItems="center" spacing="15px">
          <AddTeacher
            id={id}
            teacher={teacher}
            ControlNotification={ControlNotification}
            getTeacherAccess={getTeacherAccess}
          />
          <AddBatch id={id} ControlNotification={ControlNotification} getTeacherAccess={getTeacherAccess} />
        </Stack>
      </Stack>
      <ChooseTab institute={institute} getTeacherAccess={getTeacherAccess} ControlNotification={ControlNotification}/>
    </Paper>
  );
};

function ChooseTab({ institute,getTeacherAccess,ControlNotification }) {

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
          
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#FEA800",
               
              },
              "& .MuiTab-root " :{ color:' black !important' }

            }}
            
          >
            <Tab
              sx={{ textTransform: "none", fontSize:'16px' ,fontWeight: "550" ,
           
            }}
              label="Active Batches"
              value="1"
            />
            <Tab
              sx={{ textTransform: "none",fontSize:'16px', fontWeight: "550" }}
              label="Teacher List"
              value="2"
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ActiveBatch institute={institute} />
        </TabPanel>
        <TabPanel value="2">
       <TeacherList institute={institute} getTeacheAccess={getTeacherAccess} ControlNotification={ControlNotification} />    
        </TabPanel>
      </TabContext>
    </Box>
  );
}

const ActiveBatch = ({ institute }) => {
  return (
    <div
      className="scrollHide"
      style={{ width:'100%', height: "450px", overflow: "scroll", }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {institute.batch == undefined
          ? null
          : institute.batch.map((task, index) => (
              <Batch task={task} key={index} />
            ))}
      </div>
    </div>
  );
};

const Batch = ({ task }) => {
  const navigator = useNavigate();
  const RieDirect = () => {
    navigator(`/admin/institution/page/batch?=${task.batchID}`);
  };

  const style = {
    image: {
      width: " 46px",
      height: "44px",
    },
    name: {
      color: " #000",
      fontFamily: " DM Sans",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
  };

  return (
    <Paper
      sx={{
        width: "290px",
        height: "70px",
        borderRadius: "5px",
        background: "#FFF",
        boxShadow: " 0px 15px 62px 0px rgba(0, 0, 0, 0.08)",
        cursor: "pointer",
      }}
      onClick={RieDirect}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing="10px">
          <img src={Image.FileImage} style={style.image} alt="" />
          <p style={style.name}>{task.name}</p>
        </Stack>
        <SvgIcon component={ArrowForwardIosIcon} sx={{ color: "#187163" }} />
      </Stack>
    </Paper>
  );
};


