import * as React from "react";
import { useState, useEffect, useImperativeHandle } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import CircleIcon from "@mui/icons-material/Circle";
import { IconButton, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";

import { updateUser } from "../../api";


const UpdateModalForm = React.forwardRef(({data, onDataChanged}, ref) => {
  
  const flags = {
    none: 0,
    empty: 1,
    emailNotValid: 2,
    pswdLength: 3,
  };
  
  const stat = {
    inactive: 0,
    active: 1,
  };
  
  const [open, setOpen]     = useState(false);
  const [name, setName]     = useState(data.name);
  const [role, setRole]     = useState(data.role);
  const [email, setEmail]   = useState(data.email);
  const [pswd, setPswd]     = useState('');
  const [status, setStatus] = useState(data.status);
  const[errors, setErrors]  = useState(flags.none);
  const [alert, setAlert]   = useState(false);

  const handleClose = () => setOpen(false);
  const handleSubmit = (e) => {
    e.preventDefault()
    setAlert(true)

    if (
      name === "" ||
      email === "" ||
      role === "" ||
      pswd === ""
    ) {
      setErrors(flags.empty);
      return;
    }

    if (pswd.length < 6)
    {
      setErrors(flags.pswdLength)
      return;
    }

    const newData = {
      name,
      email,
      password: pswd,
      status,
      role,
    }

    updateUser(newData, data._id)
      .then((res) => res.json())
      .then((data) => {
        if (
          data.message === "Email en uso por otra cuenta."
        ) {
          setErrors(flags.emailNotValid);
        } else {
          setErrors(flags.none);
          window.location.reload(false)
        }
      });
  }

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  }
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  }
  const handleSeverity = (e) => {
    switch (errors) {
      case flags.none:
        return 'success'
      case flags.empty:
      case flags.emailNotValid:
      case flags.pswdLength:
        return 'error'
      
      default:
        return 'warning'
    }
  }
  const handleMessage = (e) => {
    if (errors === flags.none) return `Usuario actualizado`;
    else if (errors === flags.empty) return `Hay campos vacíos`;
    else if (errors === flags.emailNotValid) return `Email en uso`;
    else if (errors === flags.pswdLength) return `La contraseña debe tener almenos 6 caracteres`;
  }


  useImperativeHandle(ref, () => ({
    handleOpen: (open) => {
      setOpen(open)
    }
  }))

  const boxStyle = {
    position: "absolute",
    width: 400,
    border: "2px solid rgb(25 118 210)",
    boxShadow: 24,
    p: 4,
    backgroundColor: "white",
  };

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxStyle}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
            margin="normal"
            id="outlined-name-input"
            label="Nombre completo"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <InputLabel>Rol</InputLabel>
          <Select
            labelId="rol"
            id="role"
            value={role}
            label="Rol"
            onChange={handleChangeRole}
          >
            <MenuItem value={`admin`}>Admin</MenuItem>
            <MenuItem value={`editor`}>Editor</MenuItem>
          </Select>

          <InputLabel>Status</InputLabel>
          <Select
            labelId="status"
            id="status"
            value={status}
            label="Status"
            onChange={handleChangeStatus}
          >
            <MenuItem value={stat.active}>Activo</MenuItem>
            <MenuItem value={stat.inactive}>Inactivo</MenuItem>
          </Select>

          <TextField
            margin="normal"
            id="outlined-email-input"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            id="outlined-password-input"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            value={pswd}
            onChange={(e) => {
              setPswd(e.target.value);
            }}
          />
          {alert === true && (
            <Alert severity={handleSeverity()} style={{ marginBottom: "10px" }}>
              {handleMessage()}
            </Alert>
          )}
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </form>
      </Box>
    </Modal>
  );
});

function UsersTableRow({ row }) {
  const updateModalRef = React.useRef();

  const handleClick = () => {
    updateModalRef.current.handleOpen(true)
  }

  return (
    <>
      <UpdateModalForm data={row} ref={ updateModalRef }/>

    <TableRow>
      <TableCell align="center">
        <CircleIcon color={row.status === 1 ? "success" : "error"} />
      </TableCell>
      <TableCell align="center">{row.name} </TableCell>
      <TableCell align="center">{row.email} </TableCell>
      <TableCell align="center">{row.role} </TableCell>
      <TableCell>
        <IconButton
          style={{ cursor: "pointer" }}
          onClick={handleClick}
          >
          <EditIcon
          />
        </IconButton>
      </TableCell>
      </TableRow>
      </>
  );
}

function UsersTable({ titles, rows }) {
  const [content, setContent] = React.useState(rows || []);

  React.useEffect(() => {
    setContent(rows);
  }, [rows]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {titles.map((title, idx) => (
              <TableCell
                align="center"
                key={idx}
                style={{ fontWeight: "bold" }}
              >
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((row) => (
            <UsersTableRow row={row} key={row._id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { UsersTable }
