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
  Row,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CreatePetPage = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const [imageFiles, setImageFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [deleteImages, setdeleteImages] = useState([]);
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
      axios.get(`Pet/${id}`).then((response) => {
        setInputs(response.data);
        let srcs = response.data.photos.map((p) => ({
          id: p.fileId,
          src: "data:image/png;base64," + p.data,
        }));
        setOldImages(srcs);
      });
    }

    axios
      .get(`Customer/Client/${userData.userId}`)
      .then((response) =>
        setInputs({ ...inputs, shelterId: response.data.shelterId })
      );
  }, [id]);

  useEffect(() => {
    axios.get(`Pet/sexes`).then((response) => setSexes(response.data));
    axios.get(`Pet/types`).then((response) => setTypes(response.data));
    axios.get(`Pet/sizes`).then((response) => setSizes(response.data));
    axios.get(`Pet/colors`).then((response) => setColors(response.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate(e)) return;
    const formData = new FormData();
    for (var x = 0; x < imageFiles.length; x++) {
      formData.append("files", imageFiles[x]); // buvo items
    }

    if (id) {
      axios.patch(`Pet`, inputs).then(() => {
        deleteImages.forEach((i) => {
          axios.delete(`/Pet/photos/${i}`);
        });
        localStorage.setItem("petAlert", true);
        axios.post(`/Pet/${id}/photos`, formData).then(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          navigate(`/suteik-namus/${id}`);
        });
      });
    } else {
      axios.post(`Pet`, inputs).then((response) => {
        axios.post(`/Pet/${response.data.petId}/photos`, formData).then(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          navigate(`/suteik-namus/${response.data.petId}`);
        });
      });
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
      setImageFiles([...imageFiles, ...e.target.files]);
      let imgs = Array.from(e.target.files).map((i) => ({
        name: i.name,
        src: URL.createObjectURL(i),
      }));
      setNewImages([...newImages, ...imgs]);
    }
  };

  const removeNew = (name) => {
    let filteredNewImages = imageFiles.filter((i) => i.name !== name);
    setImageFiles(filteredNewImages);
    let filteredNewImagesSrc = newImages.filter((i) => i.name !== name);
    setNewImages(filteredNewImagesSrc);
  };

  const removeOld = (id) => {
    let filteredOldImages = oldImages.filter((i) => i.id !== id);
    setOldImages(filteredOldImages);
    setdeleteImages([...deleteImages, id]);
  };

  return (
    <Row
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ maxWidth: "1000px" }}>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0 text-center">
          Gyvūno anketos {id ? "redagavimas" : "kūrimas"}
        </CardTitle>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {newImages.map((image, index) => (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Button
                    onClick={() => removeNew(image.name)}
                    className="close"
                    type="button"
                  >
                    <span>&times;</span>
                  </Button>
                  <CardImg
                    key={index}
                    className="editable-img card-img"
                    alt="Shelter image"
                    src={image.src}
                  />
                </div>
              ))}
              {oldImages.map((image, index) => (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Button
                    onClick={() => removeOld(image.id)}
                    className="close"
                    type="button"
                  >
                    <span>&times;</span>
                  </Button>
                  <CardImg
                    key={index}
                    className="editable-img card-img"
                    alt="Shelter image"
                    src={image.src}
                  />
                </div>
              ))}
            </div>
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
    </Row>
  );
};

export default CreatePetPage;
