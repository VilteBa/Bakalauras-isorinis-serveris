import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";

const Header = () => {
  //todo: kol kas ??? token thing
  const userData = localStorage.getItem("user");
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const clearCookieOrStorage = () => {};
  return (
    <Navbar color="primary" dark expand="md">
      {/* nlb reikalinga ikonke? mest lauk */}
      {/* <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-md-none">
          <i class="bi-github" role="img" aria-label="GitHub"></i>
        </NavbarBrand>
      </div> */}
      {/* X jei iskleisti  ooo bet reik sutvarkyt kad su userDropdown gerai butu*/}
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
            <DropdownItem>Mano duomenys</DropdownItem>
            {/* todo: neveikia rodymas pagal role */}
            {userData.role === "User" ? (
              // todo: reikalinga nuoroda i prisijungusio asmens pamegtu gyvunu sarasa - ner priority
              <DropdownItem>Pamėgti gyvūnai</DropdownItem>
            ) : (
              <>
                {/* todo: reikalinga nuoroda i prisijungusio darbuotojo prieglauda */}
                <DropdownItem>Mano prieglauda</DropdownItem>
                <DropdownItem href="#/anketos-kurimas">
                  Pridėti gyvūną
                </DropdownItem>
              </>
            )}
            <DropdownItem divider />
            {/*todo: isvalyt storage paspaudus atsijungt */}
            <DropdownItem href="#/prisijungimas">Atsijungti</DropdownItem>
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
