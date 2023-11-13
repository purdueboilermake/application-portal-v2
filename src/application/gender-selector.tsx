import { Select } from "@mantine/core";
import { FC } from "react";
import { UseFormReturnType } from "@mantine/form";
import { BoilermakeApplication } from "../service/application";

export interface GenderSelectorProps {
  form: UseFormReturnType<BoilermakeApplication>;
}

const genderOptions = [
  'Male',
  'Female',
  'Non-Binary',
  'Prefer not to say',
  'Other'
];

export const GenderSelector: FC<GenderSelectorProps> = ({ form }: GenderSelectorProps) => {
  return (
    <Select
      withAsterisk
      label='Gender'
      data={genderOptions}
      {...form.getInputProps('gender')}
    />
  )
}
