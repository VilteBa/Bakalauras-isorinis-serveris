import { Col, Row } from "reactstrap";
import { Card, CardHeader, CardFooter } from "reactstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// todo: reiks filtavimo, is backo yra kazkiek padaryta

const PetsPage = ({ userSpecific = false }) => {
  // galima keist pagal ekrano dydi
  let pageLimit = 8;
  const [pets, setPets] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (userSpecific) {
      if (userData.role === "User") {
        axios
          .get(
            `https://localhost:44323/Customer/GetPetsLoved/${userData.userId}/lovedPets`
          )
          .then((respone) => setPets(respone.data));
      } else {
        axios
          .get(`https://localhost:44323/Customer/Client/${userData.userId}`)
          .then((userRespone) => {
            axios
              .get(
                `https://localhost:44323/Shelter/Pets/${userRespone.data.shelterId}`
              )
              .then((respone) => {
                setPets(respone.data);
              });
          });
      }
    } else {
      axios
        .get(
          `https://localhost:44323/Pet?page=${currentPage}&pageLimit=${pageLimit}`
        )
        .then((respone) => setPets(respone.data));
    }

    // suzinot kiek tiksliai gyvunu yra kad rodyt teisinga sk puslapiu
    const total = 11;
    setpageCount(Math.ceil(total / pageLimit));
  }, [currentPage, pageLimit, userData, userSpecific]);

  const handlePageChange = async (data) => {
    setCurrentPage(data.selected);
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  return (
    <div>
      <Row>
        {pets.map((pet, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <a
              style={{ textDecoration: "none" }}
              href={"#/suteik-namus/" + pet.petId}
              rel="noopener noreferrer"
            >
              <Card className="text-center mt-5">
                <CardHeader className="p-0">
                  <img
                    className="card-img"
                    src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"
                    alt="dog"
                  />
                </CardHeader>
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
