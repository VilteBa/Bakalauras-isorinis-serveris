import { useParams } from "react-router-dom";
import { Card, CardTitle, CardBody, CardImg } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";

// todo: truksta funkcionalumo nemazai ir is back, reik kazka sumastyt susijusio su savanoryste bet db dzin jei spesiu pridesiu :D
const ShelterPage = () => {
  const { id } = useParams();
  const [shelter, setShelter] = useState({});

  useEffect(() => {
    axios
      .get(`https://localhost:44323/Shelter/${id}`)
      .then((respone) => setShelter(respone.data));
  }, [id]);

  return (
    <div>
      <Card className="text-center">
        <CardBody>
          <CardTitle tag="h1" className="border-bottom p-3 mb-0">
            <i class="bi bi-heart"> </i>
            {shelter.name}
          </CardTitle>
          <CardImg
            // style={{ height: 30 }}
            // style={{width: 150}}
            style={{ width: "auto", height: 500 }} // todo: ant mobile 500 per daug
            alt="Card image cap"
            src="https://images-platform.99static.com//MZHbYJRflRKCRuhq-t2N6XblSRU=/157x206:1894x1943/fit-in/500x500/99designs-contests-attachments/87/87722/attachment_87722070"
          />
        </CardBody>
      </Card>
      <Card>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-list-ul me-2"> </i>
          Aprašas
        </CardTitle>
        <CardBody>
          <div>{shelter.about}</div>
        </CardBody>
      </Card>
      <Card>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-envelope-open-heart me-2"> </i>
          Kontaktai
        </CardTitle>
        <CardBody>
          <div>Prieglauda - {shelter.name}</div>
          <div>Miestas - {shelter.city}</div>
          <div>Adresas - {shelter.adress}</div>
          <div>Mobilusis numeris - {shelter.phoneNumber}</div>
          <div>El. paštas - {shelter.email}</div>
        </CardBody>
      </Card>
      {/* todo: jei darbuotojas perziuri savo prieglauda tai turi but edit button ir galejimas redaguot 
      NERA priority kol kas, nera net edit shelter jokio page */}
    </div>
  );
};

export default ShelterPage;
