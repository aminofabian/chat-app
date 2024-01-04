import React, { useState } from "react";
import { io } from "socket.io-client";

const FileUpload = ({ socket }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result;
        socket.emit("send_media", { file: base64data });
        // Reset the file state after upload
        setFile(null);
      };
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
