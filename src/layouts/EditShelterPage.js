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
  CardImg,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const EditShelterPage = () => {
  let navigate = useNavigate();
  const [shelter, setShelter] = useState({});
  const [imageSrc, setImageSrc] = useState(
    require(`../assets/images/noImageJ.jpg`)
  );
  const [imageFile, setImageFile] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    axios.get(`Customer/Client/${userData.userId}`).then((userRespone) => {
      axios.get(`Shelter/${userRespone.data.shelterId}`).then((userRespone) => {
        setShelter(userRespone.data);
      });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      shelterId: shelter.shelterId,
      name: e.target.name.value,
      city: e.target.city.value,
      adress: e.target.adress.value,
      phoneNumber: e.target.phoneNumber.value,
      email: e.target.email.value,
      about: e.target.about.value,
    };

    const formData = new FormData();
    // todo: i form data reik perkelt kas yra body
    console.log(imageFile);
    console.log(typeof imageFile);
    //todo: backend sutvarkyt kad eitu per multiple lines atsakymas about
    // axios
    //   .patch(`https://localhost:44323/Shelter`, body)
    //   .then(navigate(`/savanoriauk/${shelter.shelterId}`));
  };

  const back = () => {
    navigate(`/savanoriauk/${shelter.shelterId}`);
  };
  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const readed = new FileReader();
      readed.onload = (x) => {
        setImageSrc(x.target.result);
        setImageFile(imageFile);
      };
      readed.readAsDataURL(imageFile);
    } else {
      setImageSrc(require(`../assets/images/noImageJ.jpg`));
    }
  };
  // todo: galima pasikurt validate ar pan ir daryt set errors, ir jei yra errors rodyt error;
  //todo: https://www.youtube.com/watch?v=ORVShW0Yjaw 35 minute
  // todo: nera idedama dar foto, bet ner niekur nk su foto dar
  return (
    <Card body>
      <CardTitle tag="h4" className="border-bottom p-3 mb-0 text-center">
        Prieglaudos informacijos redagavimas
      </CardTitle>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <CardImg
            style={{ width: "auto", height: 300 }}
            alt="Shelter image"
            className="card-img"
            src={imageSrc}
          />
          <FormGroup>
            <Label for="image">Nuotrauka</Label>
            <Input
              onChange={showPreview}
              id="image"
              name="file"
              type="file"
              accept="image/*"
            />
          </FormGroup>
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
