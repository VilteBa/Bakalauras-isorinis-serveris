import { useParams } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardBody,
  CardImg,
  Button,
  CardText,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lt from "date-fns/locale/lt";

const ShelterPage = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [shelter, setShelter] = useState({});
  const [toggle, setToggle] = useState(false);
  const [editable, setEditable] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [image, setImage] = useState(require(`../assets/images/noImageJ.jpg`));

  registerLocale("lt", lt);

  useEffect(() => {
    axios.get(`Shelter/${id}`).then((response) => {
      setShelter(response.data);
      if (response.data.shelterPhoto) {
        setImage("data:image/png;base64," + response.data.shelterPhoto.data);
      }
    });
    if (userData) {
      axios
        .get(`Customer/Client/${userData.userId}`)
        .then((response) => setEditable(response.data.shelterId === id));
    }
  }, [id]);

  function editShelter() {
    navigate(`/prieglaudos-redagavimas`);
  }
  const handleSelectedDate = (date) => {
    if (date.getHours() === 0) {
      date = new Date(date.getTime() + 8 * 60 * 60 * 1000);
    }
    setSelectedDate(date);
  };

  const makeReservation = () => {
    const end = new Date(selectedDate.getTime() + 60 * 60 * 1000);
    const body = {
      shelterId: id,
      userId: userData?.userId,
      startTime: selectedDate,
      endTime: end,
    };
    axios.post(`Reservation`, body).then((response) => changeToggle());
  };

  function changeToggle() {
    setToggle(!toggle);
  }

  return (
    <Row
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: "1000px" }}>
        <Card className="text-center">
          <CardBody>
            <CardTitle tag="h1" className="border-bottom p-3 mb-0">
              <i class="bi bi-heart"> </i>
              {shelter.name}
            </CardTitle>
            <CardImg
              style={{
                maxHeight: "200px",
                maxWidth: "100%",
                width: "auto",
                borderRadius: "5%",
              }}
              alt="Card image cap"
              src={image}
            />
          </CardBody>
        </Card>
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            <i className="bi bi-list-ul me-2"> </i>
            Aprašas
          </CardTitle>
          <CardBody>
            <CardText style={{ whiteSpace: "pre-wrap" }}>
              {shelter.about}
            </CardText>
          </CardBody>
        </Card>
        <Card style={{ maxWidth: "1000px" }}>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            <i className="bi bi-envelope-open-heart me-2"> </i>
            Kontaktai
          </CardTitle>
          <CardBody>
            <div>Prieglauda - {shelter.name}</div>
            <div>Miestas - {shelter.city}</div>
            <div>Adresas - {shelter.adress}</div>
            <div>Mobilusis numeris - {shelter.phoneNumber}</div>
            <div>El. paštas - {shelter.email}</div>
          </CardBody>
        </Card>

        {editable && (
          <Button
            color="primary"
            className="btn-xs-block"
            onClick={editShelter}
          >
            Redaguoti
          </Button>
        )}
        {userData?.role === "User" && (
          <Button
            color="primary"
            className="btn-xs-block"
            onClick={changeToggle}
          >
            Savanoriauti
          </Button>
        )}

        <Modal centered isOpen={toggle} toggle={changeToggle}>
          <ModalHeader toggle={changeToggle}>Rezervacija</ModalHeader>
          <ModalBody>
            <div>Data:</div>
            <DatePicker
              locale="lt"
              selected={selectedDate}
              onChange={handleSelectedDate}
              dateFormat="yyy-MM-dd"
              showPopperArrow={false}
              minDate={new Date()}
            ></DatePicker>
            <div className="mt-3">Laikas:</div>
            <DatePicker
              locale="lt"
              showPopperArrow={false}
              selected={selectedDate}
              onChange={handleSelectedDate}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={60}
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              minTime={setHours(setMinutes(new Date(), 0), 8)}
              maxTime={setHours(setMinutes(new Date(), 0), 18)}
            />
          </ModalBody>
          <ModalFooter style={{ justifyContent: "space-between" }}>
            <Button
              className="btn-xs-block"
              color="primary"
              onClick={makeReservation}
            >
              Rezervuoti laiką
            </Button>
            <Button
              className="btn-xs-block"
              color="danger"
              onClick={changeToggle}
            >
              Atšaukti
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </Row>
  );
};

export default ShelterPage;
