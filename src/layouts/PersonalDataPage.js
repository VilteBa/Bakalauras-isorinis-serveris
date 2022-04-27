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
  FormFeedback,
  Alert,
} from "reactstrap";
import axios from "axios";

const PersonalDataPage = () => {
  const [alert, setAlert] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [shelters, setShelters] = useState([]);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    shelterId: "",
  });

  useEffect(() => {
    axios.get(`Shelter`).then((respone) => setShelters(respone.data));
  }, []);

  useEffect(() => {
    axios
      .get(`Customer/Client/${userData.userId}`)
      .then((respone) => setInputs(respone.data));
  }, [userData.userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(e);
    if (!isValid) return;
    console.log(inputs);
    axios.patch(`Customer/UpdateUser`, inputs).then(setAlert(true));
    setErrors({});
  };

  const validate = (e) => {
    const phonePattern = /\+370\d{8}$/;
    const emailPattern = /[a-z0-9]+@[a-z]+.[a-z]+/;
    let temp = {};
    console.log(e.target);
    temp.shelterId = !e.target.shelterId.value;
    temp.firstName = !e.target.firstName.value;
    temp.lastName = !e.target.lastName.value;
    temp.phoneNumber = !e.target.phoneNumber.value.match(phonePattern);
    temp.emailAddress = !e.target.emailAddress.value.match(emailPattern);
    setErrors(temp);
    return Object.values(temp).every((x) => x === false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: value });
  };

  return (
    <>
      <Alert
        color="success"
        isOpen={alert}
        toggle={() => {
          setAlert(false);
        }}
      >
        <b>Informacija atnaujinta sėkmingai!</b>
      </Alert>
      <Card>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i class="bi bi-person-lines-fill me-2"></i>
          Mano Profilis
        </CardTitle>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="emailAddress">El. paštas</Label>
              <Input
                id="emailAddress"
                type="emailAddress"
                defaultValue={inputs.emailAddress}
                onChange={handleChange}
                invalid={errors["emailAddress"] === true}
                valid={errors["emailAddress"] === false}
              />
              <FormFeedback>Neteisingas el. pašto formatas</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="firstName">Vardas</Label>
              <Input
                id="firstName"
                type="text"
                defaultValue={inputs.firstName}
                onChange={handleChange}
                invalid={errors["firstName"] === true}
                valid={errors["firstName"] === false}
              />
              <FormFeedback>Įveskite vardą</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Pavardė</Label>
              <Input
                id="lastName"
                type="text"
                defaultValue={inputs.lastName}
                onChange={handleChange}
                invalid={errors["lastName"] === true}
                valid={errors["lastName"] === false}
              />
              <FormFeedback>Įveskite pavardę</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="phoneNumber">Mobilusis numeris</Label>
              <Input
                id="phoneNumber"
                type="text"
                defaultValue={inputs.phoneNumber}
                onChange={handleChange}
                invalid={errors["phoneNumber"] === true}
                valid={errors["phoneNumber"] === false}
              />
              <FormFeedback>
                Įveskite telefono numerį (formatas +370********)
              </FormFeedback>
            </FormGroup>
            {userData.role === "Worker" ? (
              <FormGroup>
                <Label for="shelterId">Prieglauda</Label>
                <Input
                  id="shelterId"
                  type="select"
                  onChange={handleChange}
                  value={inputs.shelterId}
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
              Atnaujinti duomenis
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default PersonalDataPage;
