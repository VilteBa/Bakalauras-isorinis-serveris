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
  FormFeedback,
  CardImg,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

//todo: sex, type, size... Rodo angliskai, nes enum, reikia lt
const CreatePetPage = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const [imageFiles, setImageFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [imageSrcs, setImageSrcs] = useState([
    require(`../assets/images/noImageJ.jpg`),
  ]);
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
      axios.get(`Pet/${id}`).then((respone) => {
        setInputs(respone.data);

        let srcs = respone.data.photos.map(
          (p) => "data:image/png;base64," + p.data
        );
        setImageSrcs(srcs);
      });
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
    console.log(imageFiles);

    if (!validate(e)) return;
    const formData = new FormData();
    for (var x = 0; x < imageFiles.length; x++) {
      formData.append("files", imageFiles.item(x));
    }

    if (id) {
      axios.patch(`Pet`, inputs).then(() => {
        axios.post(`/Pet/${id}/photos`, formData).then(() => {
          navigate(`/suteik-namus/${id}`);
        });
      });
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
    temp.years = !e.target.years.value || e.target.years.value < 0;
    temp.months =
      !e.target.months.value ||
      e.target.months.value < 0 ||
      e.target.months.value > 12;
    temp.sex = !e.target.sex.value;
    temp.type = !e.target.type.value;
    temp.size = !e.target.size.value;
    temp.color = !e.target.color.value;
    temp.image = imageSrcs[0] === require(`../assets/images/noImageJ.jpg`);

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

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFiles = e.target.files;
      setImageFiles(imageFiles);
      setImageSrcs(Array.from(imageFiles).map((i) => URL.createObjectURL(i)));
      // let srcs = [];
      // for (var x = 0; x < imageFiles.length; x++) {
      //   const readed = new FileReader();
      //   readed.onload = (x) => {
      //     srcs.push(x.target.result);
      //   };
      //   readed.readAsDataURL(imageFiles[x]);
      // }
      // setImageSrcs(srcs);
    } else {
      setImageSrcs([require(`../assets/images/noImageJ.jpg`)]);
    }
  };
  return (
    <Card>
      <CardTitle tag="h4" className="border-bottom p-3 mb-0 text-center">
        Gyvūno anketos {id ? "redagavimas" : "kūrimas"}
      </CardTitle>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          {imageSrcs.map((src, index) => (
            <CardImg
              key={index}
              style={{ width: "auto", height: 100, margin: 3 }}
              alt="Shelter image"
              className="card-img"
              src={src}
            />
          ))}
          <FormGroup>
            <Label for="image">Nuotrauka</Label>
            <Input
              invalid={errors["image"] === true}
              valid={errors["image"] === false}
              onChange={showPreview}
              id="image"
              name="image"
              type="file"
              multiple
              accept="image/*"
            />
            <FormFeedback>Prisekite nuotrauką</FormFeedback>
          </FormGroup>
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
              <FormFeedback>Įveskite vardą</FormFeedback>
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
              <FormFeedback>Įveskite gyvūno aprašą</FormFeedback>
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
              <FormFeedback>Įveskite metus</FormFeedback>
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
              <FormFeedback>Įveskite mėnesį (0-11 mėn.)</FormFeedback>
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
                  <option key={i} value={s}>
                    {t(s)}
                  </option>
                ))}
              </Input>
              <FormFeedback>Pasirinkite lytį</FormFeedback>
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
                {types.map((type, i) => (
                  <option key={i} value={type}>
                    {t(type)}
                  </option>
                ))}
              </Input>
              <FormFeedback>Pasirinkite gyvūno tipą</FormFeedback>
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
                  <option key={i} value={s}>
                    {t(s)}
                  </option>
                ))}
              </Input>
              <FormFeedback>Pasirinkite dydį</FormFeedback>
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
                  <option key={i} value={c}>
                    {t(c)}
                  </option>
                ))}
              </Input>
              <FormFeedback>Pasirinkite spalvą</FormFeedback>
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
