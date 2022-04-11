import { useRef, useState } from "react";
import axios from "axios";

import FormButton from "./FormButton";

function FileInput(props) {
  const fileInputField = useRef(null);
  const [file, setFile] = useState({});
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleButtonClick = () => {
    fileInputField.current.click();
  };

  const handleFileUpload = (e) => {
    if (e.target.files[0].type === "text/csv") {
      setFile(e.target.files[0]);
      setIsFileUploaded(true);
    }
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  function dropHandler(e) {
    e.stopPropagation();
    e.preventDefault();

    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === "file") {
          let f = e.dataTransfer.items[i].getAsFile();
          setFile( prevState => {
              if (f.type === "text/csv"){
                  return f;
              }
              return prevState;
          });
          setIsFileUploaded(true);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
          let f = e.dataTransfer.files[i];
          setFile( prevState => {
              if (f.type === "text/csv"){
                  return f;
              }
              return prevState;
          });
          setIsFileUploaded(true);
      }
    }
  }

  const uploadBatchFile = async () => {
    try {
      const res = await axios.post(
        "https://api.up2tom.com/v3/batch/58d3bcf97c6b1644db73ad12",
        {
          file: file,
          delimiter: ','
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${process.env.API_KEY}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      if (error.response) {
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <div className="relative w-full">
      <label className="flex justify-center w-full h-32 px-4 transition bg-indigo-100 border-4 border-indigo-400 border-dashed rounded-md appearance-none cursor-pointer hover:border-indigo-400 focus:outline-none">
        <span className="flex items-center space-x-2">
          <p className="font-medium text-gray-600 text-center text-md md:text-xl md:text-gray-500">
            Drag and drop your CSV file here <br />
            or
            <br />
            <span
              onClick={handleButtonClick}
              className="text-indigo-200 font-semibold pb-2 px-4 pt-1 my rounded bg-purple-400"
            >
              browse
            </span>
          </p>
        </span>
        <input
          type="file"
          accept=".csv"
          name="file_upload"
          className="absolute w-full h-3/5 opacity-0"
          onChange={handleFileUpload}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDrop={dropHandler}
          ref={fileInputField}
          {...props}
        />
      </label>
      {isFileUploaded ? (
        <div className="w-full flex justify-between items-center">
          <p className="text-indigo-500 md:text-2xl">
            {file.name}, {file.size / 1000}kB
          </p>
          <FormButton
            title="upload batch"
            bgColor="bg-blue-500"
            textColor="text-white"
            handleOnClick={uploadBatchFile}
          />
        </div>
      ) : (
        <p className="text-indigo-500 md:text-xl">No file uploaded</p>
      )}
    </div>
  );
}

export default FileInput;
