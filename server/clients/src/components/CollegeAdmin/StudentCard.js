import React from "react";

import Avatar from "@mui/material/Avatar";
import classes from "./StudentCard.module.css";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import NotInterestedSharpIcon from "@mui/icons-material/NotInterestedSharp";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { applicationDetailAction } from "../../redux/reducers/applicationDetails";

const StudentCard = (props) => {
  const { selected, pending, cleared, rejected } = props.status;
  let data = props.details;
  const id = props.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.value);
  console.log(Object.keys(data).length , "datattatt");

  const sendRequest = async () => {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + "/collegeadmin/" + id,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    return data;
  };

  const cardClickHandler = () => {
    sendRequest()
      .then((res) => {
        dispatch(applicationDetailAction.addDetails(res.applicationDetails));
      })
      .then(() => navigate("/collegeadmin/" + id))
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.content}>
      {Object.keys(data).length > 0 && (
        <div className={classes.card} >
          <div className={classes.profile}>
            <Avatar
              alt="Student-image"
              src={data.userDetails[0].displayPicture}
            />

            <div className={classes.namings}>
              <h3>{data.userDetails[0].name}</h3>
              <p>{}</p>
            </div>
          </div>

          <div className={classes.details}>
            <div className={classes.courseDetails}>
              <p>
                <span className={classes.courseTitle}>Course</span>
                <span>{` : ${data.degree}`}</span>
              </p>
              <p>
                <span className={classes.courseTitle}>Branch</span>
                <span>{` : ${data.stream}`}</span>
              </p>
              <p>
                <span className={classes.courseTitle}>Register Number</span>
                <span>{` : ${data.registerNumber}`}</span>
              </p>
              <p>
                <span className={classes.courseTitle}>College Name</span>
                <span>{` : ${data.collegeName}`}</span>
              </p>
              <p>
                <span className={classes.courseTitle}>Batch</span>
                <span>{` : ${data.graduationYear}`}</span>
              </p>
            </div>
            <div className={classes.placementDetails}>
              <p>
                <span>Number of Companies Applied</span>
                <span
                  className={classes.courseTitle}
                >{` : ${data.application.length}`}</span>
              </p>
              {/* <div>
                <span className={classes.courseTitle}>
                  <BusinessIcon />
                  Company Name :
                </span>
                <span>
                  {data.application.map((app) => (
                    <ul>
                      <li>{`${app.company} - ${new Date(app.createdAt).toLocaleDateString()}`}</li>
                    </ul>
                  ))}
                </span>
              </div> */}
              <div className={classes.applicationStatus}>
                <h4>Application Status</h4>
                <div>
                  <p>
                    <span>
                      <HowToRegIcon sx={{ fontSize: "1.22rem" }} />
                      Selected
                    </span>
                    <span
                      className={classes.applicationNumbers}
                    >{` : ${selected}`}</span>
                  </p>
                  <p>
                    <CheckBoxRoundedIcon sx={{ fontSize: "1rem" }} />
                    Cleared
                    <span
                      className={classes.applicationNumbers}
                    >{` : ${cleared}`}</span>
                  </p>

                  <p>
                    <PendingActionsIcon sx={{ fontSize: "1rem" }} />
                    Pending
                    <span
                      className={classes.applicationNumbers}
                    >{` : ${pending}`}</span>
                  </p>
                  <p>
                    <NotInterestedSharpIcon sx={{ fontSize: "1rem" }} />
                    Rejected
                    <span
                      className={classes.applicationNumbers}
                    >{` : ${rejected}`}</span>
                  </p>
                  <Button variant="outlined" onClick={cardClickHandler}>Application Status</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default StudentCard;
