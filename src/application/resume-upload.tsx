import { Button, FileButton, Group, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";

interface ResumeUploadProps {
  onFileChange: (file: File | null) => void;
}

const validateFileName = (name: string) => {
  const checker = /\.pdf$/;
  return checker.test(name)
    ? null
    : 'File must be a PDF';
}

export const ResumeUpload: FC<ResumeUploadProps> = (props: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileErrorMessage, setFileErrorMessage] = useState<string | null>(null);

  const clearFile = () => {
    setFile(null);
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const errorName = validateFileName(file.name);

    if (errorName) {
      setFileErrorMessage(errorName);
      return;
    }

    props.onFileChange(file);
  }, [file]);

  return (
    <Group>
      <FileButton
        accept=".pdf,application/pdf"
        onChange={setFile}
      >
        {props => <Button {...props}>Select Resume</Button>}
      </FileButton>
      <Button disabled={!file} color="red" onClick={clearFile}>
        Reset
      </Button>
      {file &&
        <p>Selected file: {file.name}</p>
      }
      { fileErrorMessage &&
        <Text c={'red'}>{fileErrorMessage}</Text>
      }
    </Group>
  );
}
