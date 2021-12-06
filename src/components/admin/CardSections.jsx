import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const card = ({ section, endpoint, length }) => (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {section}
      </Typography>
      <Typography variant="body2">
        Total de {section.toLowerCase()}
      </Typography>
      <Typography variant="h5" component="div">
        {length}
      </Typography>
    </CardContent>
    <CardActions>
      <Link to={`/admin/${endpoint}`}>
        <Button size="small">Visitar</Button>
      </Link>
    </CardActions>
  </React.Fragment>
);

function CardSections({section, endpoint, length}) {
  return (
    <Box sx={{ minWidth: 275, margin: '1rem' }}>
      <Card variant="outlined">{card({section, endpoint, length})}</Card>
    </Box>
  );
}

export { CardSections }
