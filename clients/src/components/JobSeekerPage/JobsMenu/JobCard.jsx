import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link } from "react-router-dom";
const centerItems = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  margin: "0.5rem 0",
};

const JobCard = ({ item, skillofUser }) => {
  const [acquiredScore,setScore]=useState(0)
  let score = 0;
  // console.log(skillofUser,skillofUser.toString().match(/Jython/i))
  const JobSkillset = item.SkillsRequired.split(",");
  // const JobSkillset = ["c++", "java", "python","c++"];
  const SkillMatch= JobSkillset.map(skill=>{
    if (skillofUser.toString().toLowerCase().includes(skill.toLowerCase())){
      score=score+1
    }
  })
  if (score > 0){
    let acquiredPercentage= (score/JobSkillset.length)*100
    // setScore(acquiredPercentage) 
  }

  console.log(JobSkillset,skillofUser)
  console.log(score);

  

  return (
    <div>
      <Box
        key={Math.random() * 0.9999}
        sx={{
          backgroundColor: "white",
          padding: "1rem",
          border: "1px solid black",
          display: "inline-block",
          margin: "1rem",
          borderRadius: "10px",
        }}
      >
        {/* Heading */}
        <Box>
          <h3>
            {" "}
            {item.roleName}{" "}
            <div
              style={{
                width: "10px",
                height: "10px",
                background: `${item.isClosed ? "red" : "#03C988"}`,
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></div>
          </h3>
          <h4>{item.companyName}</h4>
        </Box>
        <p style={{color:"#1A5D1A",fontWeight:600}}>{`${(score/JobSkillset.length)*100}% skill matches your skillset ` }</p>
        {/* Horizontal Columns */}
        <Box>
          <Box sx={centerItems}>
            {" "}
            <WorkOutlineIcon /> {item.experience} years
          </Box>
          <Box sx={centerItems}>
            <CurrencyRupeeIcon />
            {item.salary}
          </Box>
        </Box>
        <Box sx={centerItems}>
          <ApartmentIcon />
          {item.location}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0.5rem 0",
            alignItems: "center",
          }}
        >
          <Box sx={centerItems}>
            <DateRangeIcon />
            {new Date(item.createdAt).toLocaleDateString()}
          </Box>

          <Box>
            <Link to={`/user/jobs/${item._id}`}>
              <Button>View</Button>
            </Link>
          </Box>
        </Box>
        
        <Box>
          <p style={{ color: "grey" }}>
            {`${
              item.appliedUsers.length !== 0
                ? item.appliedUsers.length + " has applied"
                : "None applied"
            } `}
          </p>
          
        </Box>
      </Box>
    </div>
  );
};

export default JobCard;