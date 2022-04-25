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
  const [currentPage, setCurrentPage] = useState(0);
  const [cities, setCities] = useState([]);
  // galima keist pagal ekrano dydi
  let pageLimit = 2;

  useEffect(() => {
    axios.get(`https://localhost:44323/Shelter/Cities`).then((respone) => {
      setCities(respone.data);
    });

    refresh();
  }, [currentPage, pageLimit]);

  const handlePageChange = async (data) => {
    setCurrentPage(data.selected);
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  const refresh = (city) => {
    let params = {
      page: currentPage,
      pageLimit: pageLimit,
      cities: city,
    };
    axios
      .get(`https://localhost:44323/Shelter`, { params })
      .then((respone) => setShelters(respone.data));

    axios
      .get(`https://localhost:44323/Shelter/Count`, { params })
      .then((respone) => setpageCount(Math.ceil(respone.data / pageLimit)));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [shelters]);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          refresh(e.target.cities.value);
        }}
      >
        <Card>
          <CardBody>
            <Row>
              <Label for="cities" xl={1} sm={2} xs={4}>
                Miestas
              </Label>
              <Col xs={4}>
                <Input id="cities" type="select">
                  <option value={""}>-</option>
                  {cities.map((s, i) => (
                    <option key={i}>{s}</option>
                  ))}
                </Input>
              </Col>
              <Col xl={7} md={6} xs={4}>
                <Button style={{ float: "right" }} color="info" type="submit">
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
                src="https://images-platform.99static.com//MZHbYJRflRKCRuhq-t2N6XblSRU=/157x206:1894x1943/fit-in/500x500/99designs-contests-attachments/87/87722/attachment_87722070"
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
