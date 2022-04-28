import {
  Card,
  CardFooter,
  Form,
  Label,
  Input,
  CardTitle,
  Col,
  Row,
  Button,
  CardBody,
} from "reactstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useEffect, useState } from "react";

//todo: get Pets perdaryt gal viena endpoint, kiuriam paduodamas parametras nurodantis ar is loved pets, ar shelter pets ar visi
const PetsPage = ({ userSpecific = false }) => {
  const [pets, setPets] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [sexes, setSexes] = useState([]);
  const [types, setTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [role, setRole] = useState();
  const [cities, setCities] = useState([]);

  const [params, setParams] = useState({
    page: 0,
    pageLimit: 4, // atkeist i 8
    sexes: "",
    types: "",
    sizes: "",
    colors: "",
    cities: "",
    minAge: 0,
    maxAge: 0,
  });

  useEffect(() => {
    axios.get(`Pet/sexes`).then((respone) => setSexes(respone.data));
    axios.get(`Pet/types`).then((respone) => setTypes(respone.data));
    axios.get(`Pet/sizes`).then((respone) => setSizes(respone.data));
    axios.get(`Pet/colors`).then((respone) => setColors(respone.data));
    axios.get(`Shelter/Cities`).then((respone) => setCities(respone.data));
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setRole(userData.role);
    if (userSpecific) {
      if (userData.role === "User") {
        axios
          .get(`Customer/GetPetsLoved/${userData.userId}/lovedPets`)
          .then((respone) => setPets(respone.data));
      } else {
        axios.get(`Customer/Client/${userData.userId}`).then((userRespone) => {
          axios
            .get(`Shelter/Pets/${userRespone.data.shelterId}`)
            .then((respone) => setPets(respone.data));
        });
      }
    } else {
      axios
        .get(`Pet`, {
          params,
        })
        .then((respone) => {
          setPets(respone.data);
        });

      axios
        .get(`Pet/Count`, {
          params,
        })
        .then((respone) =>
          setpageCount(Math.ceil(respone.data / params.pageLimit))
        );
    }
  }, [params, userSpecific]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pets]);

  // gal cia nereik async
  const handlePageChange = async (data) => {
    setParams({ ...params, page: data.selected });
  };

  return (
    <div>
      {/* todo: kol kas filtrus rodau tik vartotojui, backe ner filtru kitiem (t.y. loved pets ar shelter pets) */}
      {!userSpecific && (
        <Form
          onSubmit={(e) => {
            setParams({
              ...params,
              page: 0,
              sexes: e.target.sex.value,
              types: e.target.type.value,
              sizes: e.target.size.value,
              colors: e.target.color.value,
              cities: e.target.city.value,
              minAge: Number(e.target.minAge.value),
              maxAge: Number(e.target.maxAge.value),
            });
          }}
        >
          <Card>
            <CardBody>
              <Row>
                <Col xs={12}>
                  <Row>
                    <Col xl={3} lg={4} sm={6} className="filter">
                      <Row>
                        <Label for="sex" sm={4}>
                          Lytis
                        </Label>
                        <Col sm={7}>
                          <Input id="sex" type="select">
                            <option value={""}>-</option>
                            {sexes.map((s, i) => (
                              <option key={i}>{s}</option>
                            ))}
                          </Input>
                        </Col>
                      </Row>
                    </Col>
                    <Col xl={3} lg={4} sm={6} className="filter">
                      <Row>
                        <Label for="type" sm={4}>
                          Rūšis
                        </Label>
                        <Col sm={7}>
                          <Input id="type" type="select">
                            <option value={""}>-</option>
                            {types.map((s, i) => (
                              <option key={i}>{s}</option>
                            ))}
                          </Input>
                        </Col>
                      </Row>
                    </Col>
                    <Col xl={3} lg={4} sm={6} className="filter">
                      <Row>
                        <Label for="size" sm={4}>
                          Dydis
                        </Label>
                        <Col sm={7}>
                          <Input id="size" type="select">
                            <option value={""}>-</option>
                            {sizes.map((s, i) => (
                              <option key={i}>{s}</option>
                            ))}
                          </Input>
                        </Col>
                      </Row>
                    </Col>
                    <Col xl={3} lg={4} sm={6} className="filter">
                      <Row>
                        <Label for="color" sm={4}>
                          Spalva
                        </Label>
                        <Col sm={7}>
                          <Input id="color" type="select">
                            <option value={""}>-</option>
                            {colors.map((s, i) => (
                              <option key={i}>{s}</option>
                            ))}
                          </Input>
                        </Col>
                      </Row>
                    </Col>
                    <Col xl={3} lg={4} sm={6} className="filter">
                      <Row>
                        <Label for="city" sm={4}>
                          Miestas
                        </Label>
                        <Col sm={7}>
                          <Input id="city" type="select">
                            <option value={""}>-</option>
                            {cities.map((s, i) => (
                              <option key={i}>{s}</option>
                            ))}
                          </Input>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={4} sm={6} className="filter">
                      <Row>
                        <Label xl={3} sm={4}>
                          Amžius
                        </Label>
                        <Col>
                          <Row>
                            <Col sm={5}>
                              <Input
                                id="minAge"
                                type="number"
                                placeholder="nuo"
                              ></Input>
                            </Col>
                            <Col
                              style={{
                                textAlign: "center",
                              }}
                              sm={1}
                              xs={12}
                            >
                              -
                            </Col>
                            <Col sm={5}>
                              <Input
                                id="maxAge"
                                type="number"
                                placeholder="iki"
                              ></Input>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} className="filter">
                  <Button className="btn-xs-block" color="info" type="submit">
                    Ieškoti
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Form>
      )}
      {/* todo:sugalvot kur geriau pride gyvuna */}
      {role === "Worker" && (
        <Row>
          <Button color="primary" className="btn-xs-block">
            Pridėti gyvūną
          </Button>
        </Row>
      )}
      <Row>
        {pets.map((pet, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <a
              style={{ textDecoration: "none" }}
              href={"#/suteik-namus/" + pet.petId}
              rel="noopener noreferrer"
            >
              <Card className="text-center mt-5">
                <CardTitle className="p-0">
                  <img
                    className="card-img"
                    src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"
                    alt="dog"
                  />
                </CardTitle>
                <CardFooter className="bg-white">
                  <h5 className="text-black">{pet.name}</h5>
                </CardFooter>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
      <div>
        <ReactPaginate
          previousLabel={"‹"}
          nextLabel={"›"}
          breakLabel={"..."}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          brealClassName={"page-item"}
          breakLinkClassName={"page-link"}
        ></ReactPaginate>
      </div>
    </div>
  );
};

export default PetsPage;
