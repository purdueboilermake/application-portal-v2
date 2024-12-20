import { UseFormReturnType } from "@mantine/form"
import { BoilermakeApplication } from "../service/application"
import { FC } from "react";
import { Select } from "@mantine/core";

interface DegreeSelectorProps {
  form: UseFormReturnType<BoilermakeApplication>;
  disabled?: boolean;
}

const defaultDegreeOptions = [
  'Secondary / High School',
  'Undergraduate University (2 year - community college or similar)',
  'Undergraduate University (3+ year)',
  'Masters Degree',
  'Graduate University (Masters, Professional, Doctoral, etc)',
]

export const DegreeSelector: FC<DegreeSelectorProps> = ({ form, disabled = false }: DegreeSelectorProps) => {

  return (
    <Select
      withAsterisk
      label='Level of Study'
      placeholder="What degree are you currently pursuing"
      data={defaultDegreeOptions}
      disabled={disabled}
      maxLength={50}
      {...form.getInputProps('degree')}
      />
  )
}
