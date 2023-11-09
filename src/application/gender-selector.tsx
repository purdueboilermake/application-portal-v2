import { Combobox, Input, InputBase, Select, useCombobox } from "@mantine/core";
import { FC, useState } from "react";
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
