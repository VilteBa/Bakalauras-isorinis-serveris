import axios from "axios";
import {
  Button,
  Card,
  Form,
  Row,
  FormGroup,
  Input,
  Col,
  Label,
} from "reactstrap";

const RegisterPage = () => {
  const handleSubmit = (e) => {
    // todo: reik paziuret ar slaptazodziai sutampa
    // todo: jei registracija sekmimga reikia popup ir nukreipt i prisijungima
    // todo: reik ROLE pasirinkt butinai ar paprastas vartotojas ar darbuotojas
    // todo: gal daugiau duomenu suvest registracijos metu: ner priority
    e.preventDefault();
    const body = {
      emailAddress: e.target.email.value,
      password: e.target.password.value,
    };
    axios.post(`https://localhost:44323/Customer/Register`, body);
  };

  return (
    <Row
      style={{
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Col md={6} lg={4}>
        <Card body>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Vartotojo paštas</Label>
              <Input id="email" type="email" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Slaptažodis</Label>
              <Input id="password" type="password" />
            </FormGroup>
            <FormGroup>
              <Label for="repeatPassword">Slaptažodžio patvirtinimas</Label>
              <Input id="repeatPassword" type="password" />
            </FormGroup>
            <Button type="submit" size="lg" color="primary" block>
              Sukurti paskyrą
            </Button>
            <div className="text-center pt-1">
              <h6>arba</h6>
              <h6>
                <a href="#/prisijungimas">Prisijungti</a>
              </h6>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterPage;
