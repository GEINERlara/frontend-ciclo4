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
import { IconButton, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";

import { updateCategory } from "../../api";

const UpdateModalForm = React.forwardRef(({ data, onDataChanged }, ref) => {
  const flags = {
    none: 0,
    empty: 1,
    slugNotValid: 2,
    pswdLength: 3,
  };

  const stat = {
    inactive: 0,
    active: 1,
  };

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(data.name);
  const [slug, setslug] = useState(data.slug);
  const [errors, setErrors] = useState(flags.none);
  const [alert, setAlert] = useState(false);

  const handleClose = () => setOpen(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(true);

    if (name === "" || slug === "") {
      setErrors(flags.empty);
      return;
    }

    const newData = {
      name,
      slug,
    };

    updateCategory(newData, data._id)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "slug en uso por otra cuenta.") {
          setErrors(flags.slugNotValid);
        } else {
          setErrors(flags.none);
          window.location.reload(false);
        }
      });
  };

  // const handleChangeRole = (e) => {
  //   setRole(e.target.value);
  // };
  // const handleChangeStatus = (e) => {
  //   setStatus(e.target.value);
  // };
  const handleSeverity = (e) => {
    switch (errors) {
      case flags.none:
        return "success";
      case flags.empty:
      case flags.slugNotValid:
      case flags.pswdLength:
        return "error";

      default:
        return "warning";
    }
  };
  const handleMessage = (e) => {
    if (errors === flags.none) return `Categoria actualizada`;
    else if (errors === flags.empty) return `Hay campos vacíos`;
    else if (errors === flags.slugNotValid) return `slug en uso`;
    else if (errors === flags.pswdLength)
      return `La contraseña debe tener almenos 6 caracteres`;
  };

  useImperativeHandle(ref, () => ({
    handleOpen: (open) => {
      setOpen(open);
    },
  }));

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
            label="Nombre Categoria"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <TextField
            margin="normal"
            id="outlined-slug-input"
            label="Slug"
            type="text"
            value={slug}
            onChange={(e) => {
              setslug(e.target.value);
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

function CategoriesTableRow({ row }) {
  const updateModalRef = React.useRef();
  const handleClick = () => {
    updateModalRef.current.handleOpen(true);
  };

  return (
    <>
      <UpdateModalForm data={row} ref={updateModalRef} />

      <TableRow>
        <TableCell align="center">{row.name} </TableCell>
        <TableCell align="center">{row.slug} </TableCell>
        <TableCell>
          <IconButton style={{ cursor: "pointer" }} onClick={handleClick}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

function CategoriesTable({ titles, rows }) {
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
            <CategoriesTableRow row={row} key={row._id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { CategoriesTable };
