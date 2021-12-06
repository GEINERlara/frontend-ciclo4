import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import CircleIcon from "@mui/icons-material/Circle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

const ProductsTableRow = ({ row }) => {
  
  return (
    <TableRow>
      <TableCell align="center">
        <CircleIcon color={row.status === "activo" ? "success" : "error"} />
      </TableCell>
      <TableCell align="center">
        { row.category ? row.category.name : '-' } 
      </TableCell>
      <TableCell align="center">{row.name} </TableCell>
      <TableCell align="center">
        {row.price ? `$ ${row.price.toLocaleString("es-ES")}` : "-"}
      </TableCell>
      <TableCell align="center">
        <Link to={`/admin/products/edit/${row._id}`}>
          <IconButton style={{ cursor: "pointer" }}>
            <EditIcon id={row} />
          </IconButton>
        </Link>
      </TableCell>
      <TableCell align="center">
        <Link to={`/productos/${row.slug}`}>
          <IconButton style={{ cursor: "pointer" }}>
            <VisibilityIcon id={row._id} />{" "}
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  )
}

function ProductsTable({ titles, rows }) {

  const [content, setContent] = React.useState(rows || []);

  React.useEffect(() => {
    setContent(rows);
  }, [rows]);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" my={2}>
        <Link to={`/admin/products/create`}>
          <Button variant="contained">
            Crear Producto
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
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
              <ProductsTableRow row={row} key={row._id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export { ProductsTable };
