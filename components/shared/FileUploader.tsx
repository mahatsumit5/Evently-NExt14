import React, { Dispatch, SetStateAction } from "react";
type FileUploadProps = {
  onFieldChange: (value: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};
const FileUploader = ({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploadProps) => {
  return <div>upload</div>;
};

export default FileUploader;
