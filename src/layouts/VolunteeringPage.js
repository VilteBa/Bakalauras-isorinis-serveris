import { Col, Row } from "reactstrap";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Button,
} from "reactstrap";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const VolunteeringPage = () => {
  const [shelters, setShelters] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // galima keist pagal ekrano dydi
  let pageLimit = 5;

  useEffect(() => {
    const getPets = async () => {
      const res = await fetch(
        `https://localhost:44323/Shelter?page=${currentPage}&pageLimit=${pageLimit}`
      );
      const data = await res.json();
      setShelters(data);

      // suzinot kiek tiksliai prieglaudu yra
      const total = 11;
      setpageCount(Math.ceil(total / pageLimit));
    };

    getPets();
  }, [currentPage, pageLimit]);

  const handlePageChange = async (data) => {
    setCurrentPage(data.selected);
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  let imageSrc = "";
  return (
    <div>
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
