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
  FormFeedback,
  Row,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const EditShelterPage = () => {
  let navigate = useNavigate();
  const [shelter, setShelter] = useState({});
  const [imageFile, setImageFile] = useState();
  const [errors, setErrors] = useState({});
  const [imageSrc, setImageSrc] = useState(
    require(`../assets/images/noImageJ.jpg`)
  );

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    axios.get(`Shelter/${userData.shelterId}`).then((response) => {
      setShelter(response.data);
      setImageSrc("data:image/png;base64," + response.data.shelterPhoto.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    var isValid = validate(e);
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
    formData.append("file", imageFile);

    if (isValid) {
      axios.patch(`/Shelter`, body).then();
      if (imageFile) {
        axios.post(`/Shelter/${shelter.shelterId}/photo`, formData).then(() => {
          new Promise((r) => setTimeout(r, 200));
          navigate(`/savanoriauk/${shelter.shelterId}`);
        });
      } else {
        new Promise((r) => setTimeout(r, 200));
        navigate(`/savanoriauk/${shelter.shelterId}`);
      }
    }
  };

  const validate = (e) => {
    const phonePattern = /\+370\d{8}$/;
    const emailPattern = /[a-z0-9]+@[a-z]+.[a-z]+/;

    let temp = {};
    temp.name = !e.target.name.value;
    temp.city = !e.target.city.value;
    temp.adress = !e.target.adress.value;
    temp.phoneNumber = !e.target.phoneNumber.value.match(phonePattern);
    temp.email = !e.target.email.value.match(emailPattern);
    temp.about = !e.target.about.value;
    temp.image = imageSrc === require(`../assets/images/noImageJ.jpg`);
    setErrors(temp);
    return Object.values(temp).every((x) => x === false);
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

  return (
    <Row
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card body style={{ maxWidth: "1000px" }}>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0 text-center">
          Prieglaudos informacijos redagavimas
        </CardTitle>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <CardImg
              style={{ width: "auto", height: 200 }}
              alt="Shelter image"
              className="card-img"
              src={imageSrc}
            />
            <FormGroup>
              <Label for="image">Nuotrauka</Label>
              <Input
                invalid={errors["image"] === true}
                valid={errors["image"] === false}
                onChange={showPreview}
                id="image"
                name="image"
                type="file"
                accept="image/*"
              />
              <FormFeedback>Prisekite nuotrauką</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="name">Prieglaudos pavadinimas</Label>
              <Input
                invalid={errors["name"] === true}
                valid={errors["name"] === false}
                id="name"
                defaultValue={shelter.name}
              />
              <FormFeedback>Įveskite prieglaudos pavadinimą</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="city">Miestas</Label>
              <Input
                invalid={errors["city"] === true}
                valid={errors["city"] === false}
                id="city"
                defaultValue={shelter.city}
              />
              <FormFeedback>Įveskite miestą</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="adress">Adresas</Label>
              <Input
                invalid={errors["adress"] === true}
                valid={errors["adress"] === false}
                id="adress"
                defaultValue={shelter.adress}
              />
              <FormFeedback>Įveskite adresą</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Mobilusis numeris</Label>
              <Input
                invalid={errors["phoneNumber"] === true}
                valid={errors["phoneNumber"] === false}
                id="phoneNumber"
                defaultValue={shelter.phoneNumber}
              />
              <FormFeedback>
                Įveskite telefono numerį (formatas +370********)
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email">El. paštas</Label>
              <Input
                invalid={errors["email"] === true}
                valid={errors["email"] === false}
                id="email"
                defaultValue={shelter.email}
              />
              <FormFeedback>Neteisingas el. pašto formatas</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="about">Aprašas</Label>
              <Input
                invalid={errors["about"] === true}
                valid={errors["about"] === false}
                id="about"
                type="textarea"
                defaultValue={shelter.about}
              />
              <FormFeedback>Įveskite aprašą</FormFeedback>
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
    </Row>
  );
};

export default EditShelterPage;
