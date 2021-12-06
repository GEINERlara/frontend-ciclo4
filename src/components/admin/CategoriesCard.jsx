import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Modal, TextField } from "@mui/material";
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Alert } from "@mui/material";

import { UsersTable } from "./UsersTable";
import { addCategory } from "../../api";
import { CategoriesTable } from "./CategoriesTable";

const FormModal = React.forwardRef((props, ref) => {
  const flags = {
    none: 0,
    empty: 1,
    unknown: 2,
    alreadyRegistered: 3,
  };

  const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState("");
	const [slug, setSlug] = React.useState("");

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

  const handleChangeSlug = (e) => {
    setSlug(e.target.value);
  };

  const handleSeverity = () => {
    switch (errors) {
      case flags.none:
        return "success";
				case flags.empty:
				case flags.unknown:
        return "error";

      default:
        return "warning";
    }
  };

  const handleMessage = () => {
    if (errors === flags.none) return `Categoria registrada`;
    else if (errors === flags.empty) return `Hay campos vacíos`;
    else if (errors === flags.unknown) return `Error desconocido`;
    else if (errors === flags.alreadyRegistered) return `La categoria ya existe`;
	};
	
	const postCategory = async (data) => {
		let resp = await addCategory(data)
		resp = await resp.json()
		console.log('postCategory -> ', resp)
		if (resp.message === "Ha ocurrido un error") {
			setErrors(flags.unknown)
		} else {
			setErrors(flags.none)
			window.location.reload(false);
		}
	}

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(true);

    if (
			name === "" ||
			slug === ""
    ) {
      setErrors(flags.empty);
      return;
    }
    //all ok
    const data = {
      name,
      slug,
    };
    postCategory(data)
  };

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
            id="outlined-category-input"
            label="Nombre de la categoria"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            id="outlined-name-input"
            label="Slug"
            type="text"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
            }}
          />

          {alert === true && (
            <Alert severity={handleSeverity()} style={{ marginBottom: "10px" }}>
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
function CategoriesCard({ type, titles, rows }) {
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
      <CategoriesTable titles={[...titles, ""]} rows={rows} />
    </div>
  );
}

export { CategoriesCard };
