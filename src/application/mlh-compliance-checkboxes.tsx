import { Anchor, Checkbox } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { BoilermakeApplication } from "../service/application"
import { FC } from "react";

interface MlhComplianceCheckboxesProps {
  form: UseFormReturnType<BoilermakeApplication>;
}

export const MlhComplianceCheckboxes: FC<MlhComplianceCheckboxesProps> = ({form}: MlhComplianceCheckboxesProps) => {


  return (
    <>
      <Checkbox
          label={
            <>
            I have read and agree to the{' '}
            <Anchor href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" rel="noopener noreferrer">
              MLH Code of Conduct
            </Anchor>. (Required)
            </>
          }
          style={{ marginBottom: '8px' }} 
          {...form.getInputProps('agreeToCodeOfConduct', { type: 'checkbox' })}
        />

      <Checkbox
        label={
          <>
            I authorize you to share my application/registration information with Major
            League Hacking for event administration, ranking, and MLH administration in-line with 
            the MLH Privacy Policy. I further agree to the terms of both the{' '}
            <Anchor href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noopener noreferrer">
            MLH Contest Terms and Conditions
            </Anchor>
            {' '}and the {' '}
            <Anchor href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer">
            MLH Privacy Policy
            </Anchor>
            . (Required)
          </>
        }
        style={{ marginBottom: '8px' }} 
        {...form.getInputProps('agreeToTermsAndConditions', {type: 'checkbox'})}
        />

      <Checkbox
        label={
          <>
            I agree to RSVP before the event if I intend on participating and I understand that if I don't RSVP I will not be guaranteed admission. (Required)
          </>
        }
        style={{ marginBottom: '8px' }} 
        {...form.getInputProps('agreeToRSVP', {type: 'checkbox'})}
        />

      <Checkbox
        label={
          <>
            I allow Boilermake to take pictures of me and distribute them. (Required)
          </>
        }
        style={{ marginBottom: '8px' }} 
        {...form.getInputProps('consentToPhoto', {type: 'checkbox'})}
        />
      

      <Checkbox
        label={
          <>
          I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements. (Optional)
          </>
        }
        style={{ marginBottom: '8px' }}
        {...form.getInputProps('recieveCommunications', {type: 'checkbox'})}
        />
    </>
  )
}
