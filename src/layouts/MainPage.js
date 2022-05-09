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
  const [shelters, setShelters] = useState([]);
  const noImage = require(`../assets/images/noImageJ.jpg`);

  useEffect(() => {
    const params = { pageLimit: 3 };
    axios.get(`Pet`, { params }).then((response) => setPets(response.data));
    axios
      .get(`Shelter`, { params })
      .then((response) => setShelters(response.data));
  }, []);

  return (
    <Row
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ maxWidth: "1000px" }}>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-list-ul me-2"> </i>
          Little Ones
        </CardTitle>
        <CardBody>
          <p>
            Little Ones yra gyvūnų gerovės labdaros organizacija, turinti
            ateities viziją, kurioje kiekvienas augintinis būtų saugus,
            gerbiamas ir mylimas. Mes padedame žmonėms atrasti naują šeimos
            narį, o beglobiams gyvūnams rasti naujus , šiltus namus.
          </p>
          <p>
            Kol beglobiai laukia naujų namų, jiems ir savanorių dėmesys ir
            priežiūra. Skatiname visus norinčius prisidėti prie mūsų vizijos
            savanoriaujant ir rūpinantis pireglaudomis ir jų beglobiais
            gyvūnais.
          </p>
        </CardBody>
      </Card>
      <Card style={{ maxWidth: "1000px" }}>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-person-hearts"> </i>
          Ieškai naujo šeimos nario?
        </CardTitle>
        <CardBody>
          <h5>Paieška</h5>
          <p className="border-bottom p-2">
            Prieglaudoje ar gelbėtojų grupėje lengva rasti jums tinkamą šunį ar
            katę. Tiesiog įveskite įveskite jus dominančius kriterijus ir mes
            jums padėsime.
          </p>
          <h5 className="mt-3">Susistikimas</h5>
          <p className="border-bottom p-2 ">
            Suradę augintinį, spustelėkite ant jo anketos, kad gautumėte jo
            prieglaudos kontaktinę informaciją. Susisiekite su jais ir
            sužinokite daugiau apie tai, kaip susitikti ir priimti augintinį.
          </p>
          <h5 className="mt-3">Priėmimas</h5>
          <p className="p-2">
            Prieglauda padės priglausti gyvūną jums per savo priėmimo procesą.
            Paruoškite savo namus šuns ar katės atvykimui, kad padėtumėte jiems
            prisitaikyti prie naujos šeimos.
          </p>
        </CardBody>
      </Card>

      <Card style={{ maxWidth: "1000px" }}>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-list-ul me-2"> </i>
          Gyvūnai
        </CardTitle>
        <CardBody>
          <Row>
            {pets.map((pet, index) => (
              <Col sm="4" lg="4" key={index}>
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
                  >
                    <CardHeader className="p-2">
                      <img
                        className="card-img"
                        style={{ objectFit: "cover", height: "200px" }}
                        src={
                          pet.photos.length > 0
                            ? "data:image/png;base64," + pet.photos[0].data
                            : noImage
                        }
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
      <Card style={{ maxWidth: "1000px" }}>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-person-hearts"> </i>
          Nori savanoriauti?
        </CardTitle>
        <CardBody>
          <h5>Paieška</h5>
          <p className="border-bottom p-2">
            Kviečiame Tave tapti prieglaudų savanoriu ir padėti prižiūrint bei
            gelbėjant likimo nuskriaustus šunis bei kates. Tiesiog atrask norimą
            prieglaudą savanorystei sistemoje ir rezervuok norimą laiką.
          </p>
          <h5 className="mt-3">Savanoryste</h5>
          <p className="p-2">
            Prieglauda tave priims sutartu laiku ir supažindins ir esant
            poreikiui praves savanorystės mokymus .{" "}
          </p>
        </CardBody>
      </Card>

      <Card style={{ maxWidth: "1000px" }}>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-list-ul me-2"> </i>
          Prieglaudos
        </CardTitle>
        <CardBody>
          <Row>
            {shelters.map((shelter, index) => (
              <Col sm="4" lg="4" key={index}>
                <a
                  style={{ textDecoration: "none" }}
                  href={"#/savanoriauk/" + shelter.shelterId}
                  rel="noopener noreferrer"
                >
                  <Card
                    className="text-center border"
                    style={{
                      backgroundColor: "#c9e9ff",
                      borderColor: "#757e85",
                    }}
                  >
                    <CardHeader className="p-2">
                      <img
                        className="card-img"
                        style={{ objectFit: "cover", height: "200px" }}
                        src={
                          shelter.shelterPhoto?.data
                            ? "data:image/png;base64," +
                              shelter.shelterPhoto.data
                            : noImage
                        }
                        alt="shelter"
                      />
                    </CardHeader>
                    <CardFooter>
                      <h5 className="text-black">{shelter.name}</h5>
                      <div className="text-black">{shelter.city}</div>
                    </CardFooter>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
          <div class="text-center">
            <a href="#/savanoriauk/">
              <Button color="info" type="submit">
                Daugiau...
              </Button>
            </a>
          </div>
        </CardBody>
      </Card>
    </Row>
  );
};

export default MainPage;
