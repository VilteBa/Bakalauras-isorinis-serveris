import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardFooter,
  Button,
  CardHeader,
} from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const MainPage = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const params = {
      pageLimit: 3,
    };

    axios
      .get(`https://localhost:44323/Pet`, {
        params,
      })
      .then((respone) => {
        setPets(respone.data);
      });
  });
  return (
    <>
      <Card>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-list-ul me-2"> </i>
          Little Ones
        </CardTitle>
        <CardBody>
          <div></div>
        </CardBody>
      </Card>

      <Card>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-list-ul me-2"> </i>
          Prieglaudos
        </CardTitle>
        <CardBody>
          <div></div>
        </CardBody>
      </Card>

      <Card>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-person-hearts"> </i>
          Ieškai naujo šeimos nario?
        </CardTitle>
        <CardBody>
          <h5>Paieška</h5>
          <div className="border-bottom p-2">
            Prieglaudoje ar gelbėtojų grupėje lengva rasti jums tinkamą šunį ar
            katę. Tiesiog įveskite įveskite jus dominančius kriterijus ir mes
            jums padėsime.
          </div>
          <h5 className="mt-3">Susistikimas</h5>
          <div className="border-bottom p-2 ">
            Suradę augintinį, spustelėkite ant jo anketos, kad gautumėte jo
            prieglaudos kontaktinę informaciją. Susisiekite su jais ir
            sužinokite daugiau apie tai, kaip susitikti ir priimti augintinį.
          </div>
          <h5 className="mt-3">Priėmimas</h5>
          <div className="p-2">
            Prieglauda padės priglausti gyvūną jums per savo priėmimo procesą.
            Paruoškite savo namus šuns ar katės atvykimui, kad padėtumėte jiems
            prisitaikyti prie naujos šeimos.
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-list-ul me-2"> </i>
          Gyvūnai
        </CardTitle>
        <CardBody>
          <Row>
            {pets.map((pet, index) => (
              <Col sm="4" lg="4" xl="3" key={index}>
                <a
                  style={{ textDecoration: "none" }}
                  href={"#/suteik-namus/" + pet.petId}
                  rel="noopener noreferrer"
                >
                  <Card
                    className="text-center border"
                    style={{
                      backgroundColor: "#c9e9ff",
                      borderColor: "#757e85",
                    }}
                    // color="light"
                  >
                    <CardHeader className="p-2">
                      <img
                        className="card-img"
                        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"
                        alt="dog"
                      />
                    </CardHeader>
                    <CardFooter>
                      <h5 className="text-black">{pet.name}</h5>
                    </CardFooter>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
          <div class="text-center">
            <a href="#/suteik-namus">
              <Button color="info" type="submit">
                Daugiau...
              </Button>
            </a>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-person-hearts"> </i>
          Nori savanoriauti?
        </CardTitle>
        <CardBody>
          <div>KAZKA PAN SAVANORYSTEI</div>
          KAZKA PAN SAVANORYSTEI
        </CardBody>
      </Card>
    </>
  );
};

export default MainPage;
