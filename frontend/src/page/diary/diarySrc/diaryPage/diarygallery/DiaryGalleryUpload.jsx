import React, { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";

function DiaryGalleryUpload(props) {
  const [files, setFiles] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files[0]);
  };

  function handleUpload() {}

  return (
    <Box>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </Box>
  );
}

export default DiaryGalleryUpload;
