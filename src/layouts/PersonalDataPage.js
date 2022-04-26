import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";

const PersonalDataPage = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [shelters, setShelters] = useState([]);
  const [user, setUser] = useState({});
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    emailAdress: "",
    phoneNumber: "",
    shelterId: "",
  });

  useEffect(() => {
    axios.get(`Shelter`).then((respone) => setShelters(respone.data));
  }, []);

  useEffect(() => {
    axios.get(`Customer/Client/${userData.userId}`).then((respone) => {
      setUser(respone.data);
      setInputs(respone.data);
    });
  }, [userData.userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`Customer/UpdateUser`, inputs);

    //todo: reik popup ar alert kad duomenys atnaujinti
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: value });
  };

  return (
    <Card>
      <CardTitle tag="h4" className="border-bottom p-3 mb-0">
        <i class="bi bi-person-lines-fill me-2"></i>
        Mano Profilis
      </CardTitle>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">El. paštas</Label>
            <Input
              id="email"
              type="email"
              defaultValue={inputs.emailAddress}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">Vardas</Label>
            <Input
              id="firstName"
              type="text"
              defaultValue={inputs.firstName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Pavardė</Label>
            <Input
              id="lastName"
              type="text"
              defaultValue={inputs.lastName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="phoneNumber">Mobilusis numeris</Label>
            <Input
              id="phoneNumber"
              type="text"
              defaultValue={inputs.phoneNumber}
              onChange={handleChange}
            />
          </FormGroup>
          {userData.role === "Worker" ? (
            <FormGroup>
              <Label for="shelterId">Prieglauda</Label>
              <Input
                id="shelterId"
                type="select"
                onChange={handleChange}
                value={inputs.shelterId}
              >
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
            Atnaujinti duomenis
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default PersonalDataPage;
