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
    e.preventDefault();
    const body = {"emailAddress": e.target.email.value, "password": e.target.password.value};
    axios.post(`https://localhost:44323/Customer/Register`, body); 
    //veikia reg bet reik ziuret response
    // todo: jei registracija sekmimga reikia popup ir nukreipt i prisijungima
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
            {/* idet logo kaip atrodo reduction */}
            <FormGroup>
              <Label for="email">Vartotojo paštas???</Label>
              <Input id="email" type="email"/>
            </FormGroup>
            <FormGroup>
              <Label for="password">Slaptažodis</Label>
              <Input id="password" type="password" />
            </FormGroup>
            <FormGroup>
              <Label for="repeatPassword">
                Slaptažodžio patvirtinimas (paieškoti kaip atrodo lt kitur)
              </Label>
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
            {/* kam tas vaikas bv reikalingas? */}
            {/* {children} */}
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterPage;
