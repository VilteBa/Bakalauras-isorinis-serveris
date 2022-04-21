import axios from "axios";
import { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Col,
  Input,
  Label,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// todo: reikia sutvarkyt refactorint bisk kad butu ne tik kaip post page - gyvuno kurimas
// todo: bet kad ir kaip update page - gyvuno redagavimo page ir uzpilydti laukai turi but
// todo: reiks atsinest petId ?? ir jei yra petid tai ne post pet o update

//todo: sex, type, size... Rodo angliskai, reikia lt
const CreatePetPage = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [sexes, setSexes] = useState([]);
  const [types, setTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [inputs, setInputs] = useState({
    petid: id ?? undefined,
    name: "",
    details: "",
    years: "",
    months: "",
    sex: "",
    type: "",
    size: "",
    color: "",
    shelterid: "",
  });
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`https://localhost:44323/Pet/sexes`)
      .then((respone) => setSexes(respone.data));

    axios
      .get(`https://localhost:44323/Pet/types`)
      .then((respone) => setTypes(respone.data));

    axios
      .get(`https://localhost:44323/Pet/sizes`)
      .then((respone) => setSizes(respone.data));

    axios
      .get(`https://localhost:44323/Pet/colors`)
      .then((respone) => setColors(respone.data));

    axios
      .get(`https://localhost:44323/Shelter`)
      .then((respone) => setShelters(respone.data));

    if (id) {
      axios.get(`https://localhost:44323/Pet/${id}`).then((respone) => {
        console.log(respone.data);
        // kazkaip uzsetint
        setInputs(respone.data);
      });
    }

    axios
      .get(`https://localhost:44323/Customer/Client/${userData.userId}`)
      .then((userRespone) => {
        setInputs({ ...inputs, shelterid: userData.userId.shelterId });
        console.log(inputs.value);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .patch(`https://localhost:44323/Pet`, inputs)
        .then((response) => navigate(`/suteik-namus/${id}`));
    } else {
      axios
        .post(`https://localhost:44323/Pet`, inputs)
        .then((response) => navigate(`/suteik-namus/${response.data.petId}`));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: value });
  };

  // todo: nera idedama dar foto, bet ner niekur nk su foto dar
  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="name" sm={2}>
              Gyvūno vardas
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                id="name"
                onChange={handleChange}
                defaultValue={inputs.name}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="details" sm={2}>
              Apie gyvūną
            </Label>
            <Col sm={10}>
              <Input
                type="textarea"
                id="details"
                onChange={handleChange}
                defaultValue={inputs.details}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="years" sm={2}>
              Metai
            </Label>
            <Col sm={4}>
              <Input
                type="number"
                id="years"
                onChange={handleChange}
                defaultValue={inputs.years}
              />
            </Col>
            <Label for="months" sm={2}>
              Mėn.
            </Label>
            <Col sm={4}>
              <Input
                type="number"
                id="months"
                onChange={handleChange}
                defaultValue={inputs.months}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="sex" sm={2}>
              Lytis
            </Label>
            <Col sm={10}>
              <Input
                id="sex"
                type="select"
                onChange={handleChange}
                value={inputs.sex}
              >
                <option />
                {sexes.map((s, i) => (
                  <option key={i}>{s}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="type" sm={2}>
              Tipas
            </Label>
            <Col sm={10}>
              <Input
                id="type"
                type="select"
                onChange={handleChange}
                value={inputs.type}
              >
                <option />
                {types.map((t, i) => (
                  <option key={i}>{t}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="size" sm={2}>
              Dydis
            </Label>
            <Col sm={10}>
              <Input
                id="size"
                type="select"
                onChange={handleChange}
                value={inputs.size}
              >
                <option />
                {sizes.map((s, i) => (
                  <option key={i}>{s}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="color" sm={2}>
              Spalva
            </Label>
            <Col sm={10}>
              <Input
                id="color"
                type="select"
                onChange={handleChange}
                value={inputs.color}
              >
                <option />
                {colors.map((c, i) => (
                  <option key={i}>{c}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          {/* todo: gal net nereik sito?? o pagal tai koks vartotojas kuria tai prieglaudai ir priskirt */}
          <FormGroup row>
            <Label for="shelterid" sm={2}>
              Prieglauda
            </Label>
            <Col sm={10}>
              <Input
                id="shelterid"
                type="select"
                onChange={handleChange}
                value={inputs.shelterid}
              >
                <option />
                {shelters.map((s, i) => (
                  <option key={i} value={s.shelterId}>
                    {s.name}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <Button type="submit">Išsaugoti</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

// reiks kazkokio upluod photo */}
// <img src={imageSrc}></img>
// <input type="file" accept="image/*" onChange={savePhoto}></input>
// <button onClick={save}></button>

export default CreatePetPage;
