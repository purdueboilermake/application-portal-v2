import { Autocomplete } from "@mantine/core";
import { FC } from "react";
import { UseFormReturnType } from "@mantine/form";
import { BoilermakeApplication } from "../service/application";

const defaultDegrees = [
  'Computer Science',
  'Data Science',
  'Artificial Intelligence',
  'Computer Engineering',
  'Electrical & Computer Engineering',
  'Computer Information Technology'
];

interface MajorSelectorProps {
  form: UseFormReturnType<BoilermakeApplication>;
}

export const MajorSelector: FC<MajorSelectorProps> = ({ form }: MajorSelectorProps) => {

  return (
    <Autocomplete
      withAsterisk
      label='Major'
      placeholder='Choose the major that describes you best'
      description="Choose a major or type one in"
      data={defaultDegrees}
      {...form.getInputProps('major')}
    />
  );
}
