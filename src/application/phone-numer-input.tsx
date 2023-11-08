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
        label="Your phone"
        component={IMaskInput}
        mask="+1 (000) 000-0000"
        placeholder="Your phone"
        {...props.form.getInputProps('phone')}
      />
  )
}
