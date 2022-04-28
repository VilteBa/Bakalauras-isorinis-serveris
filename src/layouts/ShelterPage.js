import { useParams } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardBody,
  CardImg,
  Button,
  CardFooter,
  CardSubtitle,
  CardText,
  Input,
  Col,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
} from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lt from "date-fns/locale/lt";

// todo: truksta funkcionalumo nemazai ir is back, reik kazka sumastyt susijusio su savanoryste bet db dzin jei spesiu pridesiu :D
const ShelterPage = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [shelter, setShelter] = useState({});
  const [toggle, setToggle] = useState(false);
  const [editable, setEditable] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  registerLocale("lt", lt);

  useEffect(() => {
    axios.get(`Shelter/${id}`).then((respone) => setShelter(respone.data));

    axios
      .get(`Customer/Client/${userData.userId}`)
      .then((respone) => setEditable(respone.data.shelterId === id));
  }, [id, userData.userId]);

  function editShelter() {
    navigate(`/prieglaudos-redagavimas`);
  }
  const handleSelectedDate = (date) => {
    setSelectedDate(date);
  };

  const makeReservation = () => {
    const end = new Date(selectedDate.getTime() + 60 * 60 * 1000);
    const body = {
      shelterId: id,
      userId: userData.userId,
      startTime: selectedDate,
      endTime: end,
    };
    axios.post(`Reservation`, body).then((respone) => changeToggle());
  };

  function changeToggle() {
    setToggle(!toggle);
  }

  const getExcludedTimes = (date) => {
    //todo: paziuret kurie laikai jau uzimti
  };

  return (
    <div>
      <Card className="text-center">
        <CardBody>
          <CardTitle tag="h1" className="border-bottom p-3 mb-0">
            <i class="bi bi-heart"> </i>
            {shelter.name}
          </CardTitle>
          <CardImg
            // style={{ height: 30 }}
            // style={{width: 150}}
            style={{ width: "auto", height: 500 }} // todo: ant mobile 500 per daug
            alt="Card image cap"
            src="https://images-platform.99static.com//MZHbYJRflRKCRuhq-t2N6XblSRU=/157x206:1894x1943/fit-in/500x500/99designs-contests-attachments/87/87722/attachment_87722070"
          />
        </CardBody>
      </Card>
      <Card>
        <CardTitle tag="h4" className="border-bottom p-3 mb-0">
          <i className="bi bi-list-ul me-2"> </i>
          Aprašas
        </CardTitle>
        <CardBody>
          <CardText style={{ whiteSpace: "pre" }}>{shelter.about}</CardText>
        </CardBody>
      </Card>
      <Card>
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
        <Button color="primary" onClick={editShelter}>
          Redaguoti
        </Button>
      )}
      {userData.role === "User" && (
        <>
          <Button color="primary" onClick={changeToggle}>
            Savanoriauti
          </Button>
        </>
      )}

      <Modal centered isOpen={toggle} toggle={changeToggle}>
        <ModalHeader toggle={changeToggle}>Rezervacija</ModalHeader>
        <ModalBody>
          <div>Data:</div>
          <DatePicker
            locale="lt"
            selected={selectedDate}
            onChange={handleSelectedDate}
            onSelect={getExcludedTimes}
            dateFormat="yyy-MM-dd"
            showPopperArrow={false}
            // inline
            minDate={new Date()}
          ></DatePicker>
          <div className="mt-3">Laikas:</div>
          <DatePicker
            locale="lt"
            showPopperArrow={false}
            selected={selectedDate}
            // excludeTimes={excludedTimes}
            onChange={handleSelectedDate}
            onSelect={getExcludedTimes}
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
  );
};

export default ShelterPage;
