import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";

const Input = styled("input")({
  display: "none",
});

const ImagesFilesAsArray = ({ imagesAsFiles, setImagesAsFiles }) => {
  useEffect(() => {
    console.log({ imagesAsFiles });
  }, [imagesAsFiles]);

  const handleClearImage = (e) => {
    console.log(e.target.id);

    const target = parseInt(e.target.id);

    const copyOfImagesAsFiles = [...imagesAsFiles];
    copyOfImagesAsFiles.splice(target, 1);
    setImagesAsFiles(copyOfImagesAsFiles);
  };

  if (imagesAsFiles.length > 0) {
    return imagesAsFiles.map((image, idx) => (
      <span style={{ display: "inline-flex", margin: "1rem" }}>
        <img
          style={{ height: "300px", width: "auto" }}
          src={URL.createObjectURL(image)}
          alt={image.name}
        />
        <Button
          style={{ display: "contents" }}
          onClick={handleClearImage}
          id={idx}
        >
          x
        </Button>
      </span>
    ));
  }
  return <span></span>;
};

const ProductImagesForm = ({ images, setImages }) => {
  const allInputs = [];

  const [imagesAsFiles, setImagesAsFiles] = useState(allInputs);
  const [imagesAsUrls, setImagesAsUrls] = useState(allInputs);

  useEffect(() => {
    console.log(imagesAsFiles);
  }, [imagesAsFiles]);

  const handleImagesAsFiles = (e) => {
    let tempArray = [];
    for (let index = 0; index < e.target.files.length; index++) {
      const image = e.target.files[index];

      if (image.type !== "image/jpeg") {
        console.log(`Type not valid -> ${image.name}, ignored`);
        continue;
      }
      tempArray.push(image);
    }
    // setImages(imagesAsFiles)
    setImagesAsFiles(tempArray);
    setImages(tempArray);
  };

  return (
    <div>
      <Typography variant="h6">Imágenes:</Typography>
      {/* <form onSubmit={handleUploadToFirebase}> */}
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          multiple={true}
          onChange={handleImagesAsFiles}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <Box component="div" sx={{ overflow: "auto", whiteSpace: "nowrap" }}>
        <ImagesFilesAsArray
          imagesAsFiles={imagesAsFiles}
          setImagesAsFiles={setImagesAsFiles}
        />
      </Box>
      {/* </form> */}
    </div>
  );
};

export default ProductImagesForm;
