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
  CardTitle,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//todo: sex, type, size... Rodo angliskai, nes enum, reikia lt
const CreatePetPage = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [sexes, setSexes] = useState([]);
  const [types, setTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [inputs, setInputs] = useState({
    petId: id ?? undefined,
    name: "",
    details: "",
    years: "",
    months: "",
    sex: "",
    type: "",
    size: "",
    color: "",
    shelterId: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (id) {
      axios.get(`Pet/${id}`).then((respone) => setInputs(respone.data));
    }

    axios
      .get(`Customer/Client/${userData.userId}`)
      .then((respone) =>
        setInputs({ ...inputs, shelterId: respone.data.shelterId })
      );
  }, [id]);

  useEffect(() => {
    axios.get(`Pet/sexes`).then((respone) => setSexes(respone.data));
    axios.get(`Pet/types`).then((respone) => setTypes(respone.data));
    axios.get(`Pet/sizes`).then((respone) => setSizes(respone.data));
    axios.get(`Pet/colors`).then((respone) => setColors(respone.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(e);
    if (!isValid) return;
    if (id) {
      axios
        .patch(`Pet`, inputs)
        .then((response) => navigate(`/suteik-namus/${id}`));
    } else {
      axios
        .post(`Pet`, inputs)
        .then((response) => navigate(`/suteik-namus/${response.data.petId}`));
    }
  };

  const validate = (e) => {
    let temp = {};
    temp.name = !e.target.name.value;
    temp.details = !e.target.details.value;
    temp.years = !e.target.years.value;
    temp.months = !e.target.months.value;
    temp.sex = !e.target.sex.value;
    temp.type = !e.target.type.value;
    temp.size = !e.target.size.value;
    temp.color = !e.target.color.value;
    // todo: reiks validacijos ir pet Images
    setErrors(temp);
    return Object.values(temp).every((x) => x === false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: value });
  };

  const back = () => {
    if (id) {
      navigate(`/suteik-namus/${id}`);
    } else {
      navigate(`/main`);
    }
  };

  // todo: nera idedama dar foto, bet ner niekur nk su foto dar
  return (
    <Card>
      <CardTitle tag="h4" className="border-bottom p-3 mb-0 text-center">
        Gyvūno anketos {id ? "redagavimas" : "kūrimas"}
      </CardTitle>
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
                invalid={errors["name"] === true}
                valid={errors["name"] === false}
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
                invalid={errors["details"] === true}
                valid={errors["details"] === false}
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
                invalid={errors["years"] === true}
                valid={errors["years"] === false}
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
                invalid={errors["months"] === true}
                valid={errors["months"] === false}
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
                invalid={errors["sex"] === true}
                valid={errors["sex"] === false}
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
                invalid={errors["type"] === true}
                valid={errors["type"] === false}
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
                invalid={errors["size"] === true}
                valid={errors["size"] === false}
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
                invalid={errors["color"] === true}
                valid={errors["color"] === false}
              >
                <option />
                {colors.map((c, i) => (
                  <option key={i}>{c}</option>
                ))}
              </Input>
            </Col>
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

export default CreatePetPage;
