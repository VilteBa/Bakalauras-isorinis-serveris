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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import moment from "moment";
import { useTranslation } from "react-i18next";
import "moment/locale/lt";
import ReactPaginate from "react-paginate";

const ReservationsPage = () => {
  const { t } = useTranslation();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [reservations, setReservations] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [role, setRole] = useState();
  const [toggle, setToggle] = useState(false);
  const [pageCount, setpageCount] = useState(0);
  const [reservationId, setReservationId] = useState("");
  const [states, setStates] = useState([]);
  const [params, setParams] = useState({
    page: 0,
    pageLimit: 8,
    shelterId: "00000000-0000-0000-0000-000000000000",
    userId: "00000000-0000-0000-0000-000000000000",
    startTime: "",
    endTime: "",
    reservationState: null,
  });

  useEffect(() => {
    setRole(userData.role);
    axios.get(`Shelter`).then((response) => setShelters(response.data));
    axios
      .get(`Reservation/States`)
      .then((response) => setStates(response.data));

    if (userData.role === "User") {
      setParams({ ...params, userId: userData.userId });
    } else {
      setParams({ ...params, shelterId: userData.shelterId });
    }
  }, []);

  useEffect(() => {
    axios
      .get(`Reservation`, { params })
      .then((response) => setReservations(response.data));

    axios
      .get(`Reservation/Count`, { params })
      .then((response) =>
        setpageCount(Math.ceil(response.data / params.pageLimit))
      );
  }, [params]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [reservations]);

  const cancelReservation = (id) => {
    axios.put(`Reservation/${id}/cancel`).then(() => {
      axios
        .get(`Reservation`, { params })
        .then((response) => setReservations(response.data));
    });
  };

  const approveReservation = (id) => {
    axios.put(`Reservation/${id}/approve`).then(() => {
      axios
        .get(`Reservation`, { params })
        .then((response) => setReservations(response.data));
    });
  };

  function changeToggle() {
    setToggle(!toggle);
  }

  const handlePageChange = (data) => {
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
            reservationState: e.target.state.value,
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
                    <Label for="state" sm={3} xs={4}>
                      Būsena
                    </Label>
                    <Col md={5} sm={6} xs={8}>
                      <Input id="state" type="select">
                        <option value={""}>Visos</option>
                        {states.map((s, i) => (
                          <option key={i} value={s}>
                            {t(s)}
                          </option>
                        ))}
                      </Input>
                    </Col>
                  </Row>
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
                <Col xs={12} sm={8} style={{ margin: "auto" }}>
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
                          {"Kontaktai: "}
                          {reservation.user.phoneNumber}
                          {", "}
                          {reservation.user.emailAddress}
                        </div>
                      </>
                    )}
                  </CardSubtitle>
                </Col>
                <Col sm={4} style={{ textAlign: "center", margin: "auto" }}>
                  {(role === "User" ||
                    reservation.reservationState !== "None") && (
                    <b className={reservation.reservationState.toLowerCase()}>
                      {t(reservation.reservationState)}
                    </b>
                  )}
                  {reservation.reservationState === "None" &&
                    role === "Worker" && (
                      <Button
                        style={{ width: "100%" }}
                        color="success"
                        className="mt-3 btn-xs-block"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          approveReservation(reservation.reservationId);
                        }}
                      >
                        Patvirtinti rezervaciją
                      </Button>
                    )}
                  {reservation.reservationState !== "Canceled" && (
                    <Button
                      style={{ width: "100%" }}
                      color="danger"
                      className="mt-3 btn-xs-block"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setToggle(true);
                        setReservationId(reservation.reservationId);
                      }}
                    >
                      Atšaukti rezervaciją
                    </Button>
                  )}
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
      <Modal
        centered
        fullscreen="sm"
        size=""
        isOpen={toggle}
        toggle={changeToggle}
      >
        <ModalHeader toggle={changeToggle}>Atšaukti?</ModalHeader>
        <ModalBody>Ar tikrai norite atšaukti rezervaciją?</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            type="button"
            onClick={() => {
              changeToggle();
              cancelReservation(reservationId);
            }}
          >
            Atšaukti rezervaciją
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ReservationsPage;
