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
} from "reactstrap";
import moment from "moment";
import "moment/locale/lt";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [role, setRole] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setRole(userData.role);
  }, []);

  useEffect(() => {
    getReservations();
  }, []);

  const deleteReservation = (id) => {
    axios.delete(`Reservation/${id}`).then((respone) => {
      getReservations();
    });
  };

  const getReservations = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData.role === "User") {
      axios.get(`Reservation/User/${userData.userId}`).then((respone) => {
        setReservations(respone.data);
        console.log(respone.data);
      });
    } else {
      axios.get(`Reservation/Shelter/${userData.shelterId}`).then((respone) => {
        setReservations(respone.data);
        console.log(respone.data);
      });
    }
  };

  return (
    <>
      {" "}
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
                          {reservation.user.phoneNumber}{" "}
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
    </>
  );
};
export default ReservationsPage;
