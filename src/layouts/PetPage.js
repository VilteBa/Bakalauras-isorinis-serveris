import { useParams } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardBody,
  UncontrolledCarousel,
  Button,
  CardSubtitle,
} from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const PetPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [petShelter, setPetShelter] = useState({});
  const userData = JSON.parse(localStorage.getItem("user"));

  function lovePet() {
    axios.put(
      `https://localhost:44323/Pet/lovePet?petId=${id}&userId=${userData.userId}`
    );
  }

  useEffect(() => {
    axios
      .get(`https://localhost:44323/Pet/${id}`)
      .then((respone) => setPet(respone.data));

    axios
      .get(`https://localhost:44323/Shelter/${pet.shelterId}`)
      .then((respone) => setPetShelter(respone.data));
  }, [id, pet.shelterId]); // nes kai gaus per ta ireiks gauti pacia prieglauda

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
        <Button color="primary" onClick={lovePet}>
          Pamėgti
        </Button>
      ) : (
        <Button color="primary">Redaguoti</Button>
      )}
    </div>
  );
};

export default PetPage;
