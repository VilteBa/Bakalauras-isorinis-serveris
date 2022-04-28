import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardFooter, CardHeader, Col, Row } from "reactstrap";

const ReservationsPage = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get(`Reservation/User/${userData.userId}`).then((respone) => {
      setReservations(respone.data);
      console.log(respone.data);
    });
  }, []);

  useEffect(() => {
    reservations.forEach((x) => {
      let b = new Date(x.startTime);
      console.log(b);
    });
  }, [reservations]);

  return (
    <Row>
      {reservations.map((reservation, index) => (
        <Col sm="4" lg="4" key={index}>
          <div>{reservation.startTime}</div>
        </Col>
      ))}
    </Row>
  );
};
export default ReservationsPage;
