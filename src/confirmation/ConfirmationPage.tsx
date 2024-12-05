import { Card, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";

export function ConfirmationPage() {


  const isPhoneDevice = useMediaQuery('(max-width: 575px)');
  return (
    <Container pt={isPhoneDevice ? 100 : undefined}>
      <Card>
        <h3>Congratulations</h3>
        <p>Your application for BMXI is officially submitted! You can now close this webpage</p>
        <Link to={"/profile"}>Go to your profile</Link>
        <Link to={"/teams"}>Go to the teams portal</Link>
      </Card>
    </Container>
  )
}
