import { Col, Row } from "reactstrap";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Button,
  Form,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const VolunteeringPage = () => {
  const [shelters, setShelters] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [cities, setCities] = useState([]);
  const [params, setParams] = useState({
    page: 0,
    pageLimit: 4,
    cities: "",
  });
  const noImage = require(`../assets/images/noImageJ.jpg`);

  useEffect(() => {
    axios.get(`Shelter/Cities`).then((respone) => setCities(respone.data));
  }, []);

  useEffect(() => {
    axios.get(`Shelter`, { params }).then((respone) => {
      setShelters(respone.data);
    });

    axios
      .get(`Shelter/Count`, { params })
      .then((respone) =>
        setpageCount(Math.ceil(respone.data / params.pageLimit))
      );
  }, [params]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [shelters]);

  const handlePageChange = async (data) => {
    setParams({ ...params, page: data.selected });
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          setParams({ ...params, cities: e.target.cities.value, page: 0 });
        }}
      >
        <Card>
          <CardBody>
            <Row>
              <Label for="cities" xl={1} sm={2} xs={4}>
                Miestas
              </Label>
              <Col sm={4} xs={8}>
                <Input id="cities" type="select">
                  <option value={""}>Visi</option>
                  {cities.map((s, i) => (
                    <option key={i}>{s}</option>
                  ))}
                </Input>
              </Col>
              <Col xl={7} sm={6} xs={12} className="filter">
                <Button
                  style={{ float: "right" }}
                  color="info"
                  type="submit"
                  className="btn-xs-block"
                >
                  Ieškoti
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Form>
      <Row>
        {shelters.map((shelter, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Card>
              <CardImg
                alt="Card image cap"
                style={{
                  maxHeight: "300px",
                  maxWidth: "100%",
                  width: "auto",
                  borderRadius: "5%",
                }}
                src={
                  shelter.shelterPhoto?.data
                    ? "data:image/png;base64," + shelter.shelterPhoto.data
                    : noImage
                }
              />
              <CardBody className="p-4">
                <CardTitle tag="h5">{shelter.name}</CardTitle>
                <CardSubtitle>{shelter.city}</CardSubtitle>
                <Button
                  href={"#/savanoriauk/" + shelter.shelterId}
                  color="primary"
                >
                  Daugiau...
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
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
  );
};

export default VolunteeringPage;
