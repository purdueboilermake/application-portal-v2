import { UseFormReturnType } from "@mantine/form"
import { BoilermakeApplication } from "../service/application"
import { FC } from "react";
import { Select } from "@mantine/core";

interface DegreeSelectorProps {
  form: UseFormReturnType<BoilermakeApplication>;
}

const defaultDegreeOptions = [
  'High School',
  'Associates Degree',
  'Bachelors Degree',
  'Masters Degree',
  'Professional Degree',
  'Doctorate'
]

export const DegreeSelector: FC<DegreeSelectorProps> = ({ form }: DegreeSelectorProps) => {

  return (
    <Select
      withAsterisk
      label='Degree'
      placeholder="What degree are you currently pursuing"
      data={defaultDegreeOptions}
      {...form.getInputProps('degree')}
      />
  )
}
