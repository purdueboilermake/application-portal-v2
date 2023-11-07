import { UseFormReturnType } from "@mantine/form"
import { BoilermakeApplication } from "../service/application"
import { FC } from "react";
import { Autocomplete } from "@mantine/core";

interface SchoolSelectorProps {
  form: UseFormReturnType<BoilermakeApplication>;
}

const defaultSchools = [
  'Purdue University West Lafayette',
  'Purdue University - Other campus',
  'Indiana University - Any Campus',
  'University Illinois Urbana Champaign'
]

export const SchoolSelector: FC<SchoolSelectorProps> = ({ form }: SchoolSelectorProps) => {

  return (
    <Autocomplete
      withAsterisk
      label='University'
      placeholder="The university you attend"
      data={defaultSchools}
      {...form.getInputProps('school')}
      />
  )
}
