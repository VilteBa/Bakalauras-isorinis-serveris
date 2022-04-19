import { Col, Row } from "reactstrap";
import { Card, CardHeader, CardFooter } from "reactstrap";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

// todo: reiks filtavimo, is backo yra kazkiek padaryta

const PetsPage = () => {
  const [pets, setPets] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // galima keist pagal ekrano dydi
  let pageLimit = 5;

  useEffect(() => {
    // todo: jei prisijunges paprastas vartotojas sitas get'as ok, bet jei darbuotojas jis turi gauti gyvunus pagal jo prieglaudos ids
    const getPets = async () => {
      const res = await fetch(
        `https://localhost:44323/Pet?page=${currentPage}&pageLimit=${pageLimit}`
      );
      const data = await res.json();
      setPets(data);

      // suzinot kiek tiksliai gyvunu yra
      const total = 11;
      setpageCount(Math.ceil(total / pageLimit));

      // todo: kol kas pagination dzin ihardkodinta lai buna :Ds
    };

    getPets();
  }, [currentPage, pageLimit]);

  const handlePageChange = async (data) => {
    setCurrentPage(data.selected);
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  // const { isLoading, data } = useQuery("Pets", () => fetch(baseUrl).then((res) => res.json()));

  // if(isLoading) return <h1>loading</h1>
  // if(!data) return <h1>error</h1>

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
