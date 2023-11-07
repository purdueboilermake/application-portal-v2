import { UseFormReturnType } from "@mantine/form";
import { FC, useMemo } from "react";
import { BoilermakeApplication } from "../service/application";
import { Select } from "@mantine/core";

interface GraduateYearSelectorProps {
    form: UseFormReturnType<BoilermakeApplication>;
}

export const GraduationYearSelector: FC<GraduateYearSelectorProps> = ({form}: GraduateYearSelectorProps) => {

  const years = useMemo(() => {
    const startingYear = new Date().getFullYear();
    const computedYears = [];
    for (let i = 0; i < 6; i++) {
      computedYears.push(`${startingYear + i}`);
    }

    return computedYears;
  }, []);

  return (
    <Select
      withAsterisk
      label='Expected Graduation Year'
      placeholder="When do you expect to graduate"
      data={years}
      {...form.getInputProps('year')}
      />
  )
}
