import { Anchor, Button, Card, Container,  Grid, GridCol, LoadingOverlay, NumberInput, Select, TextInput, Textarea } from "@mantine/core";
import { FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../auth-context";
import { useLoaderData, useNavigate } from "react-router-dom";
import { DocumentReference, onSnapshot } from "firebase/firestore";
import { BoilermakeApplication, defaultBoilermakeApplication } from "../service/application";

import './ApplicationPage.css';
import { GenderSelector } from "./gender-selector";
import { MajorSelector } from "./major-selector";
import { useForm } from "@mantine/form";
import { SchoolSelector } from "./school-selector";
import { DegreeSelector } from "./degree-selector";
import { GraduationYearSelector } from "./grad-year-selector";
import { MlhComplianceCheckboxes } from "./mlh-compliance-checkboxes";
import { combineValidators, maxLength, nonBlankString, validAge, validEmail, validPhoneNumber } from "./validators";
import { ResumeUpload } from "./resume-upload";
import { ServiceContainer } from "../service/service-container";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { PhoneNumberInput } from "./phone-numer-input";
import { ResumeFileInfo } from "../service/file-upload-service";
import { notifications } from '@mantine/notifications';

interface FormSubsectionProps extends PropsWithChildren {
  title: string;
}

const FormSubsection: FC<FormSubsectionProps> = ({ title, children }) => {
  return (
    <div className="form-subsection-container">
      <h5>{title}</h5>
      {children}
    </div>
  )
}

const horizontalColSpan = { xs: 2, sm: 2, md: 2, lg: 1, xl: 1 };

export function ApplicationPage() {

  const applicationRef = useLoaderData() as DocumentReference;
  const currentUser = useContext(AuthContext);

  const [lastSubmitted, setLastSubmitted] = useState<Date | null>(null);
  const [existingResumeInfo, setExistingResumeInfo] = useState<ResumeFileInfo | null>(null);

  const applicationService = useMemo(() => ServiceContainer.instance().applicationService, []);
  const fileUploadService = useMemo(() => ServiceContainer.instance().fileUploadService, []);
  const navigator = useNavigate();

  const form = useForm({
    initialValues: defaultBoilermakeApplication,
    validateInputOnChange: true,
    validate: {
      firstName: nonBlankString,
      lastName: nonBlankString,
      gender: nonBlankString,
      phone: combineValidators([nonBlankString, validPhoneNumber]),
      age: validAge,
      country: nonBlankString,
      degree: nonBlankString,
      altEmail: validEmail,
      major: nonBlankString,
      year: nonBlankString,
      whyBM: combineValidators([nonBlankString, maxLength(2000)]),
      projectIdeas: combineValidators([nonBlankString, maxLength(2000)]),
      shirtSize: nonBlankString,
      agreeToCodeOfConduct: (value) => value ? null : 'Required',
      agreeToTermsAndConditions: (value) => value ? null : 'Required',
    },
  });

  useEffect(() => {
    onSnapshot(applicationRef,
      documentData => {
        const applicationData = documentData.data() as BoilermakeApplication;
        form.setValues(applicationData);
        setLastSubmitted(applicationData.lastSubmitted);
      }
    );

    if (currentUser) {
      fileUploadService.existingResumeInfo(currentUser)
        .then(setExistingResumeInfo);
    }
  }, [currentUser]);

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [formDisabled, setFormDisabled] = useState<boolean>(true);
  useEffect(() => {
    const valid = form.isValid() && (resumeFile !== null || existingResumeInfo !== null);
    setFormDisabled(!valid);
  }, [form, resumeFile, existingResumeInfo]);

  const [loadingVisible, { toggle, open, close }] = useDisclosure(false);

  const submitFormCallback = useCallback(async (formValues: BoilermakeApplication) => {
    if (!currentUser) {
      return;
    }

    toggle();
    await applicationService.submitApplication(currentUser, applicationRef, formValues, resumeFile);
    navigator('/confirmation');
  }, [resumeFile, currentUser, applicationService, applicationRef]);

  const saveFormCallback = useCallback(async () => {

    if (!currentUser) {
      return;
    }

    open();
    await applicationService.saveApplication(currentUser, applicationRef, form.values, resumeFile);
    close();
    notifications.show({
      title: 'Application Saved',
      message: 'Please return and submit your application later'
    });
  }, [resumeFile, currentUser, applicationService, applicationRef, form]);

  // TODO this is remarkably jank, but by god it'll geter done
  const isPhoneDevice = useMediaQuery('(max-width: 575px)');

  return (
    <Container pt={isPhoneDevice ? 90 : undefined} pb={50}>
      <Card>
        <h3>Application for {currentUser?.displayName}</h3>
        <form onSubmit={form.onSubmit(submitFormCallback)} className="application-form-container">
          <FormSubsection
            title="Personal Information"
          >
            <LoadingOverlay visible={loadingVisible} loaderProps={{ 'children': 'Submitting...' }} />
            <Grid columns={2}>
              <GridCol span={horizontalColSpan}>
                <TextInput
                  withAsterisk
                  label='First Name'
                  {...form.getInputProps('firstName')}
                  />
              </GridCol>
              <GridCol span={horizontalColSpan}>
                <TextInput
                  withAsterisk
                  label='Last Name'
                  {...form.getInputProps('lastName')}
                  />
              </GridCol>
            </Grid>

            <TextInput
              label='Preferred Name'
              {...form.getInputProps('preferredName')}
              />

            <TextInput
              withAsterisk
              label='Email'
              disabled
              description='This is the email tied to your GitHub account. It cannot be changed'
              {...form.getInputProps('email')}
              />

            <TextInput
              label='Alternate Email'
              description='Provide an alternate email for communication'
              {...form.getInputProps('altEmail')}
              />

            <PhoneNumberInput
              form={form}
              />

            <NumberInput
              withAsterisk
              label='Age'
              allowNegative={false}
              allowDecimal={false}
              {...form.getInputProps('age')}
              />

            <GenderSelector
              form={form}
              />

            <TextInput
              withAsterisk
              label='Country of Origin'
              {...form.getInputProps('country')}
              />
          </FormSubsection>
          <FormSubsection title="Education">
            <SchoolSelector form={form} />
            <MajorSelector form={form} />
            <DegreeSelector form={form} />
            <GraduationYearSelector form={form} />
          </FormSubsection>

          <FormSubsection title="Event Questions">
            <Textarea
              withAsterisk
              autosize
              label="Why BoilerMake"
              description={form.values.whyBM.length + '/2000'}
              placeholder="Please explain why you want to attend BoilerMake."
              maxLength={2000}
              {...form.getInputProps('whyBM')}
              />

            <Textarea
              withAsterisk
              autosize
              label="Project Ideas"
              description={form.values.projectIdeas.length + '/2000'}
              placeholder="Describe any project ideas you have. Bullet points are acceptable."
              maxLength={2000}
              {...form.getInputProps('projectIdeas')}
              />

            <Select
              withAsterisk
              label='Shirt Size'
              description='Sizes are unisex'
              data={['XSmall', 'Small', 'Medium', 'Large', 'XLarge', 'XXLarge']}
              {...form.getInputProps('shirtSize')}
              />

            <TextInput
              label='Dietary Restrictions'
              placeholder="Leave blank if none"
              {...form.getInputProps('dietaryRestrictions')}
              />

          </FormSubsection>
          <FormSubsection title="Resume Upload">
            <ResumeUpload
              onFileChange={setResumeFile}
              />
            { existingResumeInfo &&
              <p>Resume already on file: <Anchor href={existingResumeInfo.downloadLink}>{existingResumeInfo.name}</Anchor></p>
            }
          </FormSubsection>
          <FormSubsection title="Terms of Attending">
            <MlhComplianceCheckboxes form={form} />
          </FormSubsection>

          <Button size="lg" disabled={formDisabled} style={{marginTop: 16}} variant="gradient" type="submit">
            { lastSubmitted ? 'UPDATE' : 'SUBMIT' }
          </Button>
          <Button size="lg" style={{marginTop: 8}} variant="outline" onClick={saveFormCallback}>
            SAVE PROGRESS
          </Button>
        </form>
      </Card>
    </Container>
  )
}


