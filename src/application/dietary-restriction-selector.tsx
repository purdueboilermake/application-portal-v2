import { UseFormReturnType } from "@mantine/form"
import { BoilermakeApplication } from "../service/application"
import { FC } from "react";
import { Autocomplete } from "@mantine/core";

interface DietaryRestrictionSelectorProps {
  form: UseFormReturnType<BoilermakeApplication>;
}

const defaultDietaryRestrictions = [
  'Vegatarian',
  'Vegan',
  'Gluten Free'
]

export const DietaryRestrictionSelector: FC<DietaryRestrictionSelectorProps> = ({ form }: DietaryRestrictionSelectorProps) => {

  return (
    <Autocomplete
      label='Dietary Restrictions'
      placeholder="Leave blank if none"
      data={defaultDietaryRestrictions}
      maxLength={50}
      {...form.getInputProps('dietaryRestrictions')}
      />
  )
}
