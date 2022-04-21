import axios from "axios";
import { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Col,
  Input,
  Label,
  CardHeader,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

//todo: sex, type, size... Rodo angliskai, reikia lt
const EditShelterPage = () => {
  let navigate = useNavigate();
  const [shelter, setShelter] = useState({});

  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
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

  //todo: puslapis uzkraunamas dar nespejus uzsetint duomenu. pataisyt !

  const handleSubmit = (e) => {
    const body = {
      name: e.target.name.value,
      city: e.target.city.value,
      adress: e.target.adress.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      about: e.target.about.value,
    };
    //todo: dar ner tokio endpoint
    // axios
    //   .patch(`https://localhost:44323/Shelter`, body)
    //   .then((response) => navigate(`/suteik-namus/${shelter.shelterId}`));
  };

  const back = () => {
    console.log(shelter);
    navigate(`/savanoriauk/${shelter.shelterid})`);
  };

  // todo: nera idedama dar foto, bet ner niekur nk su foto dar
  return (
    <Card body>
      <CardHeader tag="h3" className="text-center">
        Prieglaudos anketos kūrimas
      </CardHeader>
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
          <Button
            color="danger"
            style={{ float: "right" }}
            onClick={back}
            right
          >
            Atšaukti
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default EditShelterPage;
