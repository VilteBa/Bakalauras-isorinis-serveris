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
  FormFeedback,
} from "reactstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [userRole, setRole] = useState("User");
  const [shelters, setShelters] = useState([]);

  const handleChange = (e) => {
    if (e.target.checked) {
      setRole("Worker");
    } else {
      setRole("User");
    }
  };

  const handleSubmit = (e) => {
    if (!validate(e)) return;
    const body = {
      emailAddress: e.target.email.value,
      password: e.target.password.value,
      role: userRole,
      shelterId: e.target.shelterId?.value,
    };
    axios.post(`Customer/Register`, body).then(navigate(`/prisijungimas`));
    // todo: jei registracija sekmimga reikia popup arba toast arb alert?
  };

  const validate = (e) => {
    const emailPattern = /[a-z0-9]+@[a-z]+.[a-z]+/;
    let temp = {};
    temp.password = e.target.password.value.length < 6;
    temp.repeatPassword = e.target.repeatPassword.value.length < 6;
    temp.emailAdress = !e.target.emailAdress.value.match(emailPattern);
    temp.passwordsNotMatched =
      e.target.password.value !== e.target.repeatPassword.value;
    if (e.target.role.checked) {
      temp.shelterId = !e.target.shelterId.value;
    }
    setErrors(temp);
    return Object.values(temp).every((x) => x === false);
  };

  useEffect(() => {
    axios.get(`Shelter`).then((respone) => setShelters(respone.data));
  }, []);

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
              {errors["password"] && (
                <FormFeedback>
                  Slaptažodį privalo sudaryti bent 6 simboliai
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="repeatPassword">Slaptažodžio patvirtinimas</Label>
              <Input
                id="repeatPassword"
                type="password"
                invalid={
                  errors["repeatPassword"] === true ||
                  errors["passwordsNotMatched"] === true
                }
                valid={errors["repeatPassword"] === false}
              />
              {errors["repeatPassword"] && (
                <FormFeedback>
                  Slaptažodį privalo sudaryti bent 6 simboliai
                </FormFeedback>
              )}
              {errors["passwordsNotMatched"] && !errors["repeatPassword"] && (
                <FormFeedback>Nesutampa slaptažodžiai</FormFeedback>
              )}
            </FormGroup>
            <FormGroup check>
              <Label for="role" check>
                Darbuotojo registracija
              </Label>
              <Input id="role" type="checkbox" onChange={handleChange} />
            </FormGroup>
            {userRole === "Worker" ? (
              <FormGroup>
                <Label for="shelterId">Prieglauda</Label>
                <Input
                  id="shelterId"
                  type="select"
                  invalid={errors["shelterId"] === true}
                  valid={errors["shelterId"] === false}
                >
                  <option />
                  {shelters.map((s, i) => (
                    <option key={i} value={s.shelterId}>
                      {s.name}
                    </option>
                  ))}
                </Input>
                <FormFeedback>Pasirinkite prieglaudą</FormFeedback>
              </FormGroup>
            ) : (
              <></>
            )}
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
