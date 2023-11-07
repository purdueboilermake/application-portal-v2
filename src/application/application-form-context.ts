import { createFormContext } from "@mantine/form";
import { BoilermakeApplication } from "../service/application";

export const [BoilermakeApplicationContext, useBMFormContext, useBMForm] = createFormContext<BoilermakeApplication>();
