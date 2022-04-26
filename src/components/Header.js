import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import axios from "axios";

const Header = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [shelterId, setShelterId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let urlToShelter = `#/savanoriauk/${shelterId}`;
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (userData?.role === "Worker") {
      axios
        .get(`Customer/Client/${userData.userId}`)
        .then((respone) => {
          setShelterId(respone.data.shelterId);
        });
    }
  }, [userData]);

  return (
    <Navbar color="primary" dark expand="md">
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/main" className="nav-link">
              Pradžia
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/suteik-namus" className="nav-link">
              Suteik Namus
            </Link>
          </NavItem>{" "}
          <NavItem>
            <Link to="/savanoriauk" className="nav-link">
              Savanoriauk
            </Link>
          </NavItem>{" "}
        </Nav>
      </Collapse>
      {userData ? (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <i class="bi bi-person-circle"></i>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="#/vartotojo-duomenys">
              Mano duomenys
            </DropdownItem>
            {userData.role === "User" ? (
              <DropdownItem href="#/pamegti-gyvunai">
                Pamėgti gyvūnai
              </DropdownItem>
            ) : (
              <>
                <DropdownItem href={urlToShelter}>Mano prieglauda</DropdownItem>
                <DropdownItem href="#/prieglaudos-gyvunai">
                  Mano prieglaudos gyvūnai
                </DropdownItem>
                <DropdownItem href="#/anketos-kurimas">
                  Pridėti gyvūną
                </DropdownItem>
              </>
            )}
            <DropdownItem divider />
            <DropdownItem
              onClick={() => localStorage.clear()}
              href="#/prisijungimas"
            >
              Atsijungti
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Nav navbar>
          <NavItem>
            <Link to="/prisijungimas" className="nav-link">
              Prisijungimas
            </Link>
          </NavItem>
        </Nav>
      )}
    </Navbar>
  );
};

export default Header;
