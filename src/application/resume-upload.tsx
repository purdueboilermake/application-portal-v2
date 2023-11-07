import { Button, FileButton, Group, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";

interface ResumeUploadProps {
}

export const ResumeUpload: FC<ResumeUploadProps> = () => {

  const [file, setFile] = useState<File | null>(null);
  const [fileErrorMessage, setFileErrorMessage] = useState<string | null>(null);

  const clearFile = () => {
    setFile(null);
  };

  useEffect(() => {
    if (file) {
      const checker = /\.pdf$/;
      const filenameError = checker.test(file.name)
        ? null
        : 'File must be a PDF';
      setFileErrorMessage(filenameError);
    }
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
