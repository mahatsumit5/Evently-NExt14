import React, { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
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
  return (
    <div className="h-10">
      <Input type="file" />
    </div>
  );
};

export default FileUploader;
