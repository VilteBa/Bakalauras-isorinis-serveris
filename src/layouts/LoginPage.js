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
  FormFeedback,
} from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(false); //todo: kaip paduot kad true po registracijos?

  const handleSubmit = (e) => {
    if (!validate(e)) return;
    const body = {
      emailAddress: e.target.emailAdress.value,
      password: e.target.password.value,
    };
    axios.post(`Customer/Authenticate`, body).then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate(`/main`);
        window.location.reload();
      }
    });
  };
  const validate = (e) => {
    const emailPattern = /[a-z0-9]+@[a-z]+.[a-z]+/;
    let temp = {};
    temp.emailAdress = !e.target.emailAdress.value.match(emailPattern);
    temp.password = !e.target.password.value;
    setErrors(temp);
    return Object.values(temp).every((x) => x === false);
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
              <Label for="emailAdress">Vartotojo paštas</Label>
              <Input
                id="emailAdress"
                invalid={errors["emailAdress"] === true}
                valid={errors["emailAdress"] === false}
              />
              <FormFeedback>Neteisingas el. pašto formatas</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Slaptažodis</Label>
              <Input
                id="password"
                type="password"
                invalid={errors["password"] === true}
                valid={errors["password"] === false}
              />
              <FormFeedback>Įveskite slaptažodį</FormFeedback>
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
