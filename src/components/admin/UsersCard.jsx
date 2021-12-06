import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Modal, TextField } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Alert } from "@mui/material";

import { UsersTable } from "./UsersTable";
import { postUser } from "../../api"


const FormModal = React.forwardRef((props, ref) => {

  const flags = {
    none: 0,
    empty: 1,
    mismatch: 2,
    alreadyRegistered: 3,
  };

  const stat = {
    inactive: 0,
    active: 1,
  }
  
  const [open, setOpen]             = React.useState(false);
  const [name, setName]             = React.useState("");
  const [role, setRole]             = React.useState("editor");
  const [email, setEmail]           = React.useState("");
  const [pswd, setPswd]             = React.useState("");
  const [repeatPswd, setRepeatPswd] = React.useState("");
  const [status, setStatus] = React.useState(stat.active);
  const [errors, setErrors] = React.useState(flags.none);
  const [alert, setAlert] = React.useState(false);

  const boxStyle = {
    position: "absolute",
    width: 400,
    border: "2px solid rgb(25 118 210)",
    boxShadow: 24,
    p: 4,
    backgroundColor: "white",
  };

  const handleClose = () => setOpen(false);

  const handleChangeRole = (e) => {
    setRole(e.target.value)
  }
  
  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleSeverity = () => {
    switch (errors) {
      case flags.none:
        return 'success'
      case flags.alreadyRegistered:
      case flags.empty:
      case flags.mismatch:
        return 'error'
    
      default:
        return 'warning'
    }
  }

  const handleMessage = () => {
    if (errors === flags.none) return `Usuario registrado`
    else if(errors === flags.empty) return `Hay campos vacíos`
    else if(errors === flags.mismatch) return `Contraseña no coincide`
    else if(errors === flags.alreadyRegistered) return `El usuario ya existe`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAlert(true)
    //TODO: check if email (and password?) was already registered
    
    if (name === '' || email === '' ||
      role === '' || pswd === '' ||
      repeatPswd === '')
    {
      setErrors(flags.empty)
      return
    }
    
    if (pswd !== repeatPswd)
    {
      setErrors(flags.mismatch)
      return
    }
    //all ok
    const data = {
      name,
      email,
      password: pswd,
      status,
      role,
    };

    postUser(data)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'El usuario ya existe.') {
          setErrors(flags.alreadyRegistered)
        }
        else {
          setErrors(flags.none)
          window.location.reload(false);
        }
      })
  }

  React.useImperativeHandle(ref, () => ({
    handleOpen: (open) => {
      setOpen(open);
    },
  }));

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
          <TextField
            margin="normal"
            id="outlined-confirm-password-input"
            label="Confirmar Contraseña"
            type="password"
            autoComplete="current-password"
            value={repeatPswd}
            onChange={(e) => {
              setRepeatPswd(e.target.value);
            }}
          />
          {alert === true && (
            <Alert severity={handleSeverity()} style={{marginBottom:'10px'}}>
              {handleMessage()}
            </Alert>
          )}
          <Button variant="contained" type="submit">
            Crear
          </Button>
        </form>
      </Box>
    </Modal>
  );
});

//TODO: Rename this Component
function Card({ type, titles, rows }) {
  const addModalRef = React.useRef();

  const handleClick = () => {
    addModalRef.current.handleOpen(true);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <FormModal ref={addModalRef} />
      <Box display="flex" justifyContent="flex-end" mb="1rem">
        <Button variant="contained" onClick={handleClick}>
          {`Crear ${type}`}
        </Button>
      </Box>
      <UsersTable titles={[...titles, ""]} rows={rows} />
    </div>
  );
}

export { Card };
