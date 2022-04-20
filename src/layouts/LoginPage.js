import React from "react";
import axios from "axios";
import {
  Button,
  Alert,
  Card,
  Form,
  Row,
  FormGroup,
  Input,
  Col,
  Label,
} from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  let navigate = useNavigate();
  const [alert, setAlert] = useState(false); //todo: kaip paduot kad true po registracijos?

  const handleSubmit = (e) => {
    const body = {
      emailAddress: e.target.email.value,
      password: e.target.password.value,
    };
    axios
      .post(`https://localhost:44323/Customer/Authenticate`, body)
      .then((response) => {
        if (response.data.token) {
          //nzn ar ok saugot tiek info localStorage?? token thing
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate(`/main`);
          // todo: reik rerender dropdown nes db rodp "Prisijungti" nors prisijungta..?
        }
      });
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
            <Button type="submit" size="lg" color="primary" block>
              Prisijungti
            </Button>
            <div className="text-center pt-1">
              <h6>arba</h6>
              <h6>
                <a href="#/registracija">Sukurti paskyrą</a>
              </h6>
            </div>
          </Form>
        </Card>
        <Alert
          color="success"
          isOpen={alert}
          toggle={() => {
            setAlert(false);
          }}
        >
          I am an alert and I can be dismissed!
        </Alert>
      </Col>
    </Row>
  );
};

export default LoginPage;
