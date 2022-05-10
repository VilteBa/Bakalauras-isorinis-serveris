import { useParams } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardBody,
  UncontrolledCarousel,
  Button,
  CardSubtitle,
  Modal,
  ModalFooter,
  Alert,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PetPage = () => {
  let navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const { t } = useTranslation();
  const userData = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [petShelter, setPetShelter] = useState({});
  const [editable, setEditable] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const [toggle, setToggle] = useState(false);
  const noImage = require(`../assets/images/noImageJ.jpg`);

  useEffect(() => {
    setAlert(JSON.parse(localStorage.getItem("petAlert")));
    axios.get(`Pet/${id}`).then((response) => setPet(response.data));

    axios
      .get(`Shelter/${pet.shelterId}`)
      .then((response) => setPetShelter(response.data));

    if (userData) {
      axios
        .get(`Pet/isLovedPet?petId=${id}&userId=${userData.userId}`)
        .then((response) => setIsLoved(response.data));

      axios
        .get(`Pet/Editable?petId=${id}&userId=${userData.userId}`)
        .then((response) => setEditable(response.data));
    }
  }, [id, pet.shelterId]); // nes kai gaus per ta ireiks gauti pacia prieglauda

  function lovePet() {
    axios
      .put(`Pet/LovePet?petId=${id}&userId=${userData.userId}`)
      .then(setIsLoved(true));
  }

  function unlovePet() {
    axios
      .delete(`Pet/UnlovePet?petId=${id}&userId=${userData.userId}`)
      .then(setIsLoved(false));
  }

  function deletePet() {
    axios.delete(`Pet/${id}`);
    navigate(-1);
  }

  function editPet() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    navigate(`/anketos-redagavimas/${id}`);
  }

  function changeToggle() {
    setToggle(!toggle);
  }

  return (
    <div>
      <Alert
        color="success"
        isOpen={alert}
        toggle={() => {
          setAlert(false);
          localStorage.setItem("petAlert", false);
        }}
      >
        {console.log(alert)}
        <b>Informacija atnaujinta sėkmingai!</b>
      </Alert>
      <Card>
        <CardBody>
          <CardTitle tag="h1" className="border-bottom p-3 mb-0">
            <i class="bi bi-heart"> </i>
            {pet.name}
          </CardTitle>
          <CardSubtitle>
            <UncontrolledCarousel
              // className="carousel"
              items={
                pet.photos?.length > 0
                  ? pet.photos.map((p) => ({
                      altText: p.name,
                      caption: "",
                      src: "data:image/png;base64," + p.data,
                    }))
                  : [
                      {
                        altText: "no Image",
                        caption: "",
                        src: noImage,
                      },
                    ]
              }
            />
          </CardSubtitle>
        </CardBody>
      </Card>
      <Card>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-list-ul me-2"> </i>
          Aprašas
        </CardTitle>
        <CardBody>
          <div>Vardas - {pet.name}</div>
          <div>
            Amžius - {pet.years} metai {pet.months} mėnesiai
          </div>
          <div>Dydis - {t(pet.size)}</div>
          <div>Spalva - {t(pet.color)}</div>
          <div>Lytis - {t(pet.sex)}</div>
          <div>Aprašymas - {pet.details}</div>
        </CardBody>
      </Card>
      <Card>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-envelope-open-heart me-2"> </i>
          Kontaktai
        </CardTitle>
        <CardBody>
          <div>Prieglauda - {petShelter.name}</div>
          <div>Miestas - {petShelter.city}</div>
          <div>Adresas - {petShelter.adress}</div>
          <div>Mobilusis numeris - {petShelter.phoneNumber}</div>
          <div>El. paštas - {petShelter.email}</div>
        </CardBody>
      </Card>
      {userData?.role === "User" ? (
        isLoved ? (
          <Button color="danger" onClick={unlovePet}>
            Išimti iš pamėgtų sąrašo
          </Button>
        ) : (
          <Button color="primary" onClick={lovePet}>
            Pamėgti
          </Button>
        )
      ) : (
        editable && (
          <div class="button-group">
            <Button color="primary" onClick={editPet}>
              Redaguoti
            </Button>
            <Button color="danger" onClick={changeToggle}>
              Trinti
            </Button>
          </div>
        )
      )}
      <Modal
        centered
        fullscreen="sm"
        size=""
        isOpen={toggle}
        toggle={changeToggle}
      >
        <ModalHeader toggle={changeToggle}>Ištrinti?</ModalHeader>
        <ModalBody>Ar tikrai norite ištrinti gyvūno anketą?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deletePet}>
            Trinti
          </Button>
          <Button color="primary" onClick={changeToggle}>
            Atšaukti
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PetPage;
