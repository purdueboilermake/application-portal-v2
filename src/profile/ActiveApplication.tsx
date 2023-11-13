import { Group } from "@mantine/core";
import { FC } from "react";

interface ActiveApplicationProps {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ActiveApplication: FC<ActiveApplicationProps> = (_props: ActiveApplicationProps) => {

  return (
    <Group>
      <p>Active application</p>
    </Group>
  )
}
