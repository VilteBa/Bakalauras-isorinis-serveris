import { useParams } from "react-router-dom";
import { Card, CardTitle, CardBody, CardImg, Button } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// todo: truksta funkcionalumo nemazai ir is back, reik kazka sumastyt susijusio su savanoryste bet db dzin jei spesiu pridesiu :D
const ShelterPage = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [shelter, setShelter] = useState({});
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    axios
      .get(`https://localhost:44323/Shelter/${id}`)
      .then((respone) => setShelter(respone.data));

    axios
      .get(`https://localhost:44323/Customer/Client/${userData.userId}`)
      .then((respone) => setEditable(respone.data.shelterId === id));
  }, [id, userData.userId]);

  function editShelter() {
    navigate(`/prieglaudos-redagavimas`);
  }
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
      {editable && (
        <Button color="primary" onClick={editShelter}>
          Redaguoti
        </Button>
      )}
    </div>
  );
};

export default ShelterPage;
