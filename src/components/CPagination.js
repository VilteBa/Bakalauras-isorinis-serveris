import React from "react";
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";

const CPagination = () => {
  return (
    <Pagination
    aria-label="Page navigation example"
    size="lg"
  >
    <PaginationItem>
      <PaginationLink
        first
        href="#"
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        previous
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">
        1
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">
        3
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        next
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        last
      />
    </PaginationItem>
  </Pagination>
  )  
}


export default CPagination;