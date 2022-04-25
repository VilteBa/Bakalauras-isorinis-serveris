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
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PetPage = () => {
  let navigate = useNavigate();

  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [petShelter, setPetShelter] = useState({});
  const [editable, setEditable] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const [toggle, setToggle] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));

  function lovePet() {
    axios
      .put(
        `https://localhost:44323/Pet/LovePet?petId=${id}&userId=${userData.userId}`
      )
      .then(setIsLoved(true));
  }
  function unlovePet() {
    axios
      .delete(
        `https://localhost:44323/Pet/UnlovePet?petId=${id}&userId=${userData.userId}`
      )
      .then(setIsLoved(false));
  }

  function deletePet() {
    axios.delete(`https://localhost:44323/Pet/${id}`);
    navigate(-1);
    //todo: po navigate reik per naujo gaut pets nes sena rodo
  }

  function editPet() {
    navigate(`/anketos-redagavimas/${id}`);
  }

  function changeToggle() {
    setToggle(!toggle);
  }

  useEffect(() => {
    axios
      .get(`https://localhost:44323/Pet/${id}`)
      .then((respone) => setPet(respone.data));

    axios
      .get(`https://localhost:44323/Shelter/${pet.shelterId}`)
      .then((respone) => setPetShelter(respone.data));

    axios
      .get(
        `https://localhost:44323/Pet/isLovedPet?petId=${id}&userId=${userData.userId}`
      )
      .then((respone) => {
        setIsLoved(respone.data);
      });

    axios
      .get(
        `https://localhost:44323/Pet/Editable?petId=${id}&userId=${userData.userId}`
      )
      .then((respone) => {
        setEditable(respone.data);
      });
  }, [id, pet.shelterId, userData.userId]); // nes kai gaus per ta ireiks gauti pacia prieglauda

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h1" className="border-bottom p-3 mb-0">
            <i class="bi bi-heart"> </i>
            {pet.name}
          </CardTitle>
          <CardSubtitle>
            {/* todo: pataisyt kad geriau veiktu nes neveikia rodykles!!
          ner priority db isvis neturiu foto */}
            <UncontrolledCarousel
              items={[
                {
                  altText: "",
                  caption: "",
                  key: 1,
                  src: "https://post.healthline.com/wp-content/uploads/2020/09/1867-Pets_Vaccination-1296x728-header-1200x628.jpg",
                },
                {
                  altText: "",
                  caption: "",
                  key: 2,
                  src: "https://post.healthline.com/wp-content/uploads/2020/09/1867-Pets_Vaccination-1296x728-header-1200x628.jpg",
                },
                {
                  altText: "",
                  caption: "",
                  key: 3,
                  src: "https://post.healthline.com/wp-content/uploads/2020/09/1867-Pets_Vaccination-1296x728-header-1200x628.jpg",
                },
              ]}
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
          <div>Aprašymas - {pet.details}</div>
          <div>Dydis - {pet.size}</div>
          <div>Spalva - {pet.color}</div>
          <div>Lytis - {pet.sex}</div>
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
      {userData.role === "User" ? (
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
            {/* redaguoti truksta funkcionalumo */}
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
