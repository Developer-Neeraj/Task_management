import React, { useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { StyledTableCell, StyledTableRow } from "../layout/tableTheme";
import dateFormate from "../helper/dateFormate";
import titleCase from "../helper/titleCase";
import axios from "axios";
import apiHostName from "../../secret";
import { Button, CircularProgress } from "@mui/material";
import truncateText from "../helper/truncateText";
import MenuButton from "./MenuButton";
import { is } from "date-fns/locale";

const TaskTableSingleRow = (props) => {
  console.log('dejdjen',props)
  const {
    onClick,
    user,
    onUpdateTaskForDetails,
    getAllTaskForSingleUser,
    onTost,
  } = props;
  const {
    _id,
    title,
    deadline,
    status,
    createdByTask,
    createdToTask,
    tag,
    hour,
    minute,
  } = props.task;
  const [loading, setLoading] = useState(true);

  const deleteTask = async (taskId, event) => {
    event.stopPropagation();
    try {
      const res = await axios.delete(`${apiHostName}/task/${taskId}`);
      if (res.data.success) {
        setLoading(true);
        if (Boolean(user.isAdmin)) {
          onUpdateTaskForDetails();
        } else {
          const status = "";
          getAllTaskForSingleUser(user._id, status);
        }
        onTost({ status: res.status, message: res.data.message });
      }
    } catch (err) {
      console.log(err);
      setLoading(true);
      onTost({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  };

  const handleStatusClick = async (itemName) => {
    let updateStatus = {};
    if (itemName === "In Progress") {
      updateStatus = 1;
    }
    if (itemName === "Completed") {
      updateStatus = 2;
    }

    try {
      const res = await axios.put(`${apiHostName}/task/status/${_id}`, {
        status: updateStatus,
      });
      if (res.data.success) {
        setLoading(true);
        if (Boolean(user.isAdmin)) {
          onUpdateTaskForDetails();
        } else {
          const status = "";
          getAllTaskForSingleUser(user._id, status);
        }
        onTost({ status: res.status, message: res.data.message });
      }
    } catch (err) {
      console.log(err);
      setLoading(true);
      onTost({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  };

  return (
    <>
      <StyledTableRow onClick={onClick} style={{ cursor: "pointer" }}>
        <StyledTableCell
          component="th"
          scope="row"
          style={{ fontWeight: "bold" }}
        >
          {truncateText(titleCase(title), 20)}
        </StyledTableCell>
        <StyledTableCell align="center">{createdByTask?.name}</StyledTableCell>
        {Boolean(user.isAdmin) && (
          <StyledTableCell align="center">{createdToTask.name}</StyledTableCell>
        )}
        <StyledTableCell align="center">
          {dateFormate(deadline)}
        </StyledTableCell>
        <StyledTableCell align="center">
          {hour}:{minute}
        </StyledTableCell>
        <StyledTableCell align="center">
          {status === 0 ? (
            Boolean(user.isAdmin) ? (
              <p style={{ color: "#1976D2" }}>Pending</p>
            ) : loading ? (
              <MenuButton
                name={"Assigned"}
                color={"primary"}
                itemName={["In Progress", "Completed"]}
                handleStatus={(itemName) => {
                  console.log('itemName',itemName)
                  setLoading(false);
                  handleStatusClick(itemName);
                }}
              />
            ) : (
              <CircularProgress size={20} />
            )
          ) : status === 1 ? (
            Boolean(user.isAdmin) ? (
              <p style={{ color: "orange" }}>In Progress</p>
            ) : loading ? (
              <MenuButton
                name={"In Progress"}
                color={"warning"}
                itemName={["Completed"]}
                handleStatus={(itemName) => {
                  
                  setLoading(false);
                  handleStatusClick(itemName);
                }}
              />
            ) : (
              <CircularProgress size={20} />
            )
          ) : status === 2 ? (
            <p style={{ color: "green" }}>Completed</p>
          )  : null}
        </StyledTableCell>
        {Boolean(user.isAdmin) && (
          <StyledTableCell align="center">
            {loading ? (
              <Button
                sx={{
                  color: "#D32F2F",
                  borderRadius: 5,
                }}
                onClick={(e) => {
                  setLoading(false);
                  deleteTask(_id, e);
                }}
              >
                <DeleteForeverOutlinedIcon />
              </Button>
            ) : (
              <CircularProgress size={20} />
            )}
          </StyledTableCell>
        )}
      </StyledTableRow>
    </>
  );
};

export default TaskTableSingleRow;
