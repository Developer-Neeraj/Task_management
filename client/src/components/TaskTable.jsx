import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { StyledTableCell } from "../layout/tableTheme";
import TaskTableSingleRow from "./TaskTableSingleRow";
import TaskCardSingleContent from "./TaskCardSingleContent";

const TaskTable = ({
  data,
  user,
  handleRowClick,
  handleCreateTask,
  handleTost,
  onUpdateTaskForDetails,
  getAllTaskForSingleUser,
}) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    Boolean(user.isAdmin) === true
      ? onUpdateTaskForDetails(event.target.value, name)
      : getAllTaskForSingleUser(user._id, event.target.value);
  };
  console.log('data?.allTasks',data.allTasks)
  const handleNameChange = (event) => {
    setName(event.target.value);
    onUpdateTaskForDetails(status, event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography component="h5" variant="h5" align="left" fontWeight="bold">
          {Boolean(user.isAdmin) ? "Manage Task" : "Manage Your All Task"}
        </Typography>
        {Boolean(user.isAdmin) && (
          <Button
            variant="contained"
            style={{ textTransform: "capitalize" }}
            onClick={handleCreateTask}
          >
            Create Task
          </Button>
        )}
      </Box>
      <Divider />
      {isLargeScreen ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              mt: 2,
            }}
          >
            <Typography align="left">
              Total Tasks: {data?.totalTask || 0}
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {Boolean(user.isAdmin) && (
                <TextField
                  label="Filter By Name"
                  variant="outlined"
                  size="small"
                  value={name}
                  onChange={handleNameChange}
                />
              )}
              <Select
                value={status}
                size="small"
                displayEmpty
                onChange={handleStatusChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="INPROGRESS">In Progress</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
              </Select>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table
              sx={{
                minWidth: 700,
              }}
              aria-label="customized table"
            >
              {/* ...Table headers */}
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Task Name</StyledTableCell>
                  {/* <StyledTableCell align="center">Catagory</StyledTableCell> */}
                  <StyledTableCell align="center">Assigned By</StyledTableCell>
                  {Boolean(user.isAdmin) && (
                    <StyledTableCell align="center">
                      Assigned User
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="center">
                    Deadline Date
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Deadline Time
                  </StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  {Boolean(user.isAdmin) && (
                    <StyledTableCell align="center">Delete</StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              {/* ...Table Body */}
              {data?.allTasks.length === 0 ? (
                <Typography
                  component="h4"
                  variant="h4"
                  align="center"
                  sx={{ mt: 4 }}
                >
                  No Task Available
                </Typography>
              ) : (
                <TableBody>
                  {data?.allTasks.map((task) => (
                    <TaskTableSingleRow
                      key={task._id}
                      task={task}
                      user={user}
                      onClick={() => handleRowClick(task._id)}
                      onTost={handleTost}
                      onUpdateTaskForDetails={onUpdateTaskForDetails}
                      getAllTaskForSingleUser={getAllTaskForSingleUser}
                    />
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </>
      ) : data?.allTasks.length === 0 ? (
        <>
          {Boolean(user.isAdmin) ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  mb: 1,
                  mt: 1,
                }}
              >
                {Boolean(user.isAdmin) && (
                  <TextField
                    label="Filter By Name"
                    variant="outlined"
                    size="small"
                    value={name}
                    onChange={handleNameChange}
                  />
                )}
                <Select
                  value={status}
                  size="small"
                  displayEmpty
                  onChange={handleStatusChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="INPROGRESS">In Progress</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                </Select>
              </Box>
              <Typography align="left" sx={{ mb: 1, fontWeight: "bold" }}>
                Total Tasks: {data?.totalTask || 0}
              </Typography>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                  mt: 1,
                }}
              >
                <Typography align="left" sx={{ fontWeight: "bold" }}>
                  Total Tasks: {data?.totalTask || 0}
                </Typography>

                <Select
                  value={status}
                  size="small"
                  displayEmpty
                  onChange={handleStatusChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="INPROGRESS">In Progress</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                </Select>
              </Box>
            </>
          )}
          <Typography component="h6" variant="h6" align="center" sx={{ mt: 4 }}>
            No Task Available
          </Typography>
        </>
      ) : (
        <>
          {Boolean(user.isAdmin) ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  mb: 1,
                  mt: 1,
                }}
              >
                {Boolean(user.isAdmin) && (
                  <TextField
                    label="Filter By Name"
                    variant="outlined"
                    size="small"
                    value={name}
                    onChange={handleNameChange}
                  />
                )}
                <Select
                  value={status}
                  size="small"
                  displayEmpty
                  onChange={handleStatusChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="INPROGRESS">In Progress</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                </Select>
              </Box>
              <Typography align="left" sx={{ mb: 1, fontWeight: "bold" }}>
                Total Tasks: {data?.totalTask || 0}
              </Typography>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                  mt: 1,
                }}
              >
                <Typography align="left" sx={{ fontWeight: "bold" }}>
                  Total Tasks: {data?.totalTask || 0}
                </Typography>

                <Select
                  value={status}
                  size="small"
                  displayEmpty
                  onChange={handleStatusChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="INPROGRESS">In Progress</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                </Select>
              </Box>
            </>
          )}
          <Grid container spacing={2}>
            {data?.allTasks.map((task) => (
              <TaskCardSingleContent
                key={task._id}
                task={task}
                user={user}
                onClick={() => handleRowClick(task._id)}
                onTost={handleTost}
                onUpdateTaskForDetails={onUpdateTaskForDetails}
                getAllTaskForSingleUser={getAllTaskForSingleUser}
              />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default TaskTable;
