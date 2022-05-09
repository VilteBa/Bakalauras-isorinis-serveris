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
import { useTranslation } from "react-i18next";

const PetsPage = ({ userSpecific = false }) => {
  const { t } = useTranslation();
  const initialParams = {
    page: 0,
    pageLimit: 8,
    sexes: "",
    types: "",
    sizes: "",
    colors: "",
    cities: "",
    minAge: 0,
    maxAge: 0,
  };
  const [pets, setPets] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [sexes, setSexes] = useState([]);
  const [types, setTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [role, setRole] = useState();
  const [cities, setCities] = useState([]);
  const [params, setParams] = useState(initialParams);
  const noImage = require(`../assets/images/noImageJ.jpg`);

  useEffect(() => {
    axios.get(`Pet/sexes`).then((response) => setSexes(response.data));
    axios.get(`Pet/types`).then((response) => setTypes(response.data));
    axios.get(`Pet/sizes`).then((response) => setSizes(response.data));
    axios.get(`Pet/colors`).then((response) => setColors(response.data));
    axios.get(`Shelter/Cities`).then((response) => setCities(response.data));
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setRole(userData?.role ?? "None");
    let petsUrl = "";
    if (userSpecific) {
      petsUrl =
        userData.role === "User"
          ? `Customer/GetPetsLoved/${userData.userId}/lovedPets`
          : `Shelter/Pets/${userData.shelterId}`;
    } else {
      petsUrl = `Pet`;
    }
    axios.get(petsUrl, { params }).then((response) => setPets(response.data));
    axios
      .get(petsUrl + `/Count`, { params })
      .then((response) =>
        setpageCount(Math.ceil(response.data / params.pageLimit))
      );
  }, [params, userSpecific]);

  useEffect(() => {
    setParams(initialParams);
    document.getElementById("filters").reset();
  }, [userSpecific]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pets]);

  // gal cia nereik async
  const handlePageChange = (data) => {
    setParams({ ...params, page: data.selected });
  };

  return (
    <div>
      <Form
        id="filters"
        onSubmit={(e) => {
          setParams({
            ...params,
            page: 0,
            sexes: e.target.sex.value,
            types: e.target.type.value,
            sizes: e.target.size.value,
            colors: e.target.color.value,
            cities: e.target.city?.value ?? "",
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
                          <option value={""}>Visi</option>
                          {sexes.map((s, i) => (
                            <option key={i} value={s}>
                              {t(s)}
                            </option>
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
                          <option value={""}>Visi</option>
                          {types.map((s, i) => (
                            <option key={i} value={s}>
                              {t(s)}
                            </option>
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
                          <option value={""}>Visi</option>
                          {sizes.map((s, i) => (
                            <option key={i} value={s}>
                              {t(s)}
                            </option>
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
                          <option value={""}>Visi</option>
                          {colors.map((s, i) => (
                            <option key={i} value={s}>
                              {t(s)}
                            </option>
                          ))}
                        </Input>
                      </Col>
                    </Row>
                  </Col>
                  {(role === "User" || !userSpecific) && (
                    <Col xl={3} lg={4} sm={6} className="filter">
                      <Row>
                        <Label for="city" sm={4}>
                          Miestas
                        </Label>
                        <Col sm={7}>
                          <Input id="city" type="select">
                            <option value={""}>Visi</option>
                            {cities.map((s, i) => (
                              <option key={i}>{s}</option>
                            ))}
                          </Input>
                        </Col>
                      </Row>
                    </Col>
                  )}
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
      {role === "Worker" && (
        <div style={{ textAlign: "center" }}>
          <a href="#/anketos-kurimas">
            <Button color="warning" className="btn-xs-block px-5 py-2">
              Pridėti gyvūną
            </Button>
          </a>
        </div>
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
                    style={{ objectFit: "cover", height: "250px" }}
                    src={
                      pet.photos.length > 0
                        ? "data:image/png;base64," + pet.photos[0].data
                        : noImage
                    }
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
