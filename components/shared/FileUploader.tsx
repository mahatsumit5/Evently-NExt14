import React, { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { convertFileToUrl } from "@/lib/utils";
type FileUploadProps = {
  onFieldChange: (value: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]> | any>;
};
const FileUploader = ({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploadProps) => {
  return (
    <div className="h-10">
      <Input
        type="file"
        multiple
        onChange={(e) => {
          const { files } = e.target;
          setFiles(files);
          // onFieldChange(convertFileToUrl());
        }}
      />
    </div>
  );
};

export default FileUploader;
