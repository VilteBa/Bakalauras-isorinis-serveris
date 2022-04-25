import axios from "axios";
import { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const EditShelterPage = () => {
  let navigate = useNavigate();
  const [shelter, setShelter] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`https://localhost:44323/Customer/Client/${userData.userId}`)
      .then((userRespone) => {
        axios
          .get(`https://localhost:44323/Shelter/${userRespone.data.shelterId}`)
          .then((userRespone) => {
            setShelter(userRespone.data);
          });
      });
  }, []);

  const handleSubmit = (e) => {
    const body = {
      shelterId: shelter.shelterId,
      name: e.target.name.value,
      city: e.target.city.value,
      adress: e.target.adress.value,
      phoneNumber: e.target.phoneNumber.value,
      email: e.target.email.value,
      about: e.target.about.value,
    };
    //todo: backend sutvarkyt kad eitu per multiple lines atsakymas about
    axios
      .patch(`https://localhost:44323/Shelter`, body)
      .then(navigate(`/savanoriauk/${shelter.shelterId}`));
  };

  const back = () => {
    navigate(`/savanoriauk/${shelter.shelterId}`);
  };

  // todo: nera idedama dar foto, bet ner niekur nk su foto dar
  return (
    <Card body>
      <CardTitle tag="h4" className="border-bottom p-3 mb-0 text-center">
        Prieglaudos informacijos redagavimas
      </CardTitle>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Prieglaudos pavadinimas</Label>
            <Input id="name" defaultValue={shelter.name} />
          </FormGroup>
          <FormGroup>
            <Label for="city">Miestas</Label>
            <Input id="city" defaultValue={shelter.city} />
          </FormGroup>
          <FormGroup>
            <Label for="adress">Adresas</Label>
            <Input id="adress" defaultValue={shelter.adress} />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Mobilusis numeris</Label>
            <Input id="phoneNumber" defaultValue={shelter.phoneNumber} />
          </FormGroup>
          <FormGroup>
            <Label for="email">El. paštas</Label>
            <Input id="email" type="email" defaultValue={shelter.email} />
          </FormGroup>
          <FormGroup>
            <Label for="about">Aprašas</Label>
            <Input id="about" type="textarea" defaultValue={shelter.about} />
          </FormGroup>
          <div class="button-group">
            <Button color="primary" type="submit">
              Išsaugoti
            </Button>
            <Button color="danger" style={{ float: "right" }} onClick={back}>
              Atšaukti
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default EditShelterPage;
