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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  let navigate = useNavigate();
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
    e.preventDefault();
    // todo: gal daugiau duomenu suvest registracijos metu: ner priority
    if (
      (e.target.password.value === e.target.repeatPassword.value) &
      !!e.target.email.value
    ) {
      const body = {
        emailAddress: e.target.email.value,
        password: e.target.password.value,
        role: userRole,
        shelterId: e.target.shelterid?.value,
      };
      axios.post(`Customer/Register`, body).then(
        // todo: jei registracija sekmimga reikia popup arba toast
        navigate(`/prisijungimas`)
      );
    } else {
      //todo: reiks erroro veliau
      console.log("nesutampa slap");
    }
  };

  useEffect(() => {
    axios
      .get(`Shelter`)
      .then((respone) => setShelters(respone.data));
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
            <FormGroup check>
              <Label for="role" check>
                Darbuotojo registracija
              </Label>
              <Input id="role" type="checkbox" onChange={handleChange} />
            </FormGroup>
            {userRole === "Worker" ? (
              <FormGroup>
                <Label for="shelterid">Prieglauda</Label>
                <Input id="shelterid" type="select">
                  <option />
                  {shelters.map((s, i) => (
                    <option key={i} value={s.shelterId}>
                      {s.name}
                    </option>
                  ))}
                </Input>
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
