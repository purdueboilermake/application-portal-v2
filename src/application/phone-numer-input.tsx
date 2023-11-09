import { InputBase } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FC } from "react";
import { IMaskInput } from "react-imask";
import { BoilermakeApplication } from "../service/application";

interface PhoneNumberInputProps {
  form: UseFormReturnType<BoilermakeApplication>;
}

export const PhoneNumberInput: FC<PhoneNumberInputProps> = (props: PhoneNumberInputProps) => {

  return (
    <InputBase<typeof IMaskInput>
      withAsterisk
      label="Phone Number"
      component={IMaskInput}
      mask="+1 (000) 000-0000"
      placeholder="Phone Number"
      {...props.form.getInputProps('phone')}
    />
  )
}
