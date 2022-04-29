import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Button,
  Col,
  Row,
  Form,
  Label,
  Input,
} from "reactstrap";
import moment from "moment";
import "moment/locale/lt";
import ReactPaginate from "react-paginate";

const ReservationsPage = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [reservations, setReservations] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [role, setRole] = useState();
  const [pageCount, setpageCount] = useState(0);
  const [params, setParams] = useState({
    page: 0,
    pageLimit: 8,
    shelterId: "00000000-0000-0000-0000-000000000000",
    userId: "00000000-0000-0000-0000-000000000000",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    setRole(userData.role);
    axios.get(`Shelter`).then((respone) => setShelters(respone.data));

    if (userData.role === "User") {
      setParams({ ...params, userId: userData.userId });
    } else {
      setParams({ ...params, shelterId: userData.shelterId });
    }
  }, []);

  useEffect(() => {
    getReservations();
  }, [params]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [reservations]);

  const deleteReservation = (id) => {
    axios.delete(`Reservation/${id}`).then((respone) => {
      getReservations();
    });
  };

  const getReservations = () => {
    axios
      .get(`Reservation`, { params })
      .then((respone) => setReservations(respone.data));

    axios.get(`Reservation/Count`, { params }).then((respone) => {
      setpageCount(Math.ceil(respone.data / params.pageLimit));
      console.log(respone.data);
    });
  };

  const handlePageChange = async (data) => {
    setParams({ ...params, page: data.selected });
  };

  return (
    <>
      <Form
        onSubmit={(e) => {
          setParams({
            ...params,
            shelterId: e.target.shelters?.value ?? userData.shelterId,
            startTime: e.target.from.value,
            endTime: e.target.to.value,
            page: 0,
          });
        }}
      >
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card style={{ maxWidth: "800px" }}>
            <CardBody>
              <Row>
                <Col>
                  {role === "User" && (
                    <Row className="filter">
                      <Label for="shelters" sm={3} xs={4}>
                        Prieglauda
                      </Label>
                      <Col md={5} sm={6} xs={8}>
                        <Input id="shelters" type="select">
                          <option
                            value={"00000000-0000-0000-0000-000000000000"}
                          >
                            -
                          </option>
                          {shelters.map((s, i) => (
                            <option key={i} value={s.shelterId}>
                              {s.name}
                            </option>
                          ))}
                        </Input>
                      </Col>
                    </Row>
                  )}

                  <Row className="filter">
                    <Label for="from" sm={3} xs={4}>
                      Nuo
                    </Label>
                    <Col md={5} sm={6} xs={8}>
                      <Input id="from" type="date"></Input>
                    </Col>
                  </Row>
                  <Row className="filter">
                    <Label for="to" sm={3} xs={4}>
                      Iki
                    </Label>
                    <Col md={5} sm={6} xs={8}>
                      <Input id="to" type="date"></Input>
                    </Col>
                  </Row>
                </Col>
                <Col sm={2} xs={12}>
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
        </Row>
      </Form>
      {reservations.map((reservation, index) => (
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card style={{ maxWidth: "800px" }} sm="4" lg="4" key={index}>
            <CardBody className="p-4">
              <Row>
                <Col xs={12} sm={8}>
                  <CardTitle tag="h5">
                    {moment(reservation.startTime).format("ll")} {"  "}
                    {moment(reservation.startTime).format("LT")} {" - "}
                    {moment(reservation.endTime).format("LT")}
                  </CardTitle>
                  <CardSubtitle>
                    {role === "User" ? (
                      `${reservation.shelter.name} - ${reservation.shelter.city} ${reservation.shelter.adress}`
                    ) : (
                      <>
                        <div>
                          {"Savanoris - "} {reservation.user.firstName}{" "}
                          {reservation.user.lastName}
                        </div>
                        <div>
                          {"Kontaktai - "}
                          {reservation.user.phoneNumber}
                          {", "}
                          {reservation.user.emailAddress}
                        </div>
                      </>
                    )}
                  </CardSubtitle>
                </Col>
                <Col sm={4}>
                  <Button
                    color="danger"
                    style={{ float: "right" }}
                    className="mt-3 btn-xs-block"
                    onClick={() => deleteReservation(reservation.reservationId)}
                  >
                    Atšaukti rezervaciją
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
      ))}
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
    </>
  );
};
export default ReservationsPage;
