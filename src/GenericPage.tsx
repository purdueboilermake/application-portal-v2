import { Container, ContainerProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FC, PropsWithChildren } from "react";

interface GenericPageProps extends PropsWithChildren, ContainerProps {
}

export const GenericPage: FC<GenericPageProps> = (props: GenericPageProps) => {
  const isPhoneDevice = useMediaQuery('(max-width: 575px)');
  return (
    <Container pt={isPhoneDevice ? 100 : undefined} {...props}>
      {props.children}
    </Container>
  );
}
