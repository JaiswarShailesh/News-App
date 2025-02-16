import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import AdvanceSearchModal from "./advanceSearch";

const NavigationBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Advance search
  const [advSearchTerm, setAdvSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState(getCurrentDate());
  const [toDate, setToDate] = useState(getCurrentDate());
  const [sortBy, setSortBy] = useState("Newest");

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate("/SearchResult", {
      state: { searchTerm: searchTerm },
    });
  };

  const handleAdvanceSearch = async (e) => {
    e.preventDefault();
    setSearchTerm("");
    setShow(false);
    navigate("/SearchResult", {
      state: {
        searchTerm: advSearchTerm,
        fromDate: fromDate,
        toDate: toDate,
        sortBy: sortBy,
      },
    });
  };

  const handleSetDefault = () => {
    setAdvSearchTerm("");
    setFromDate(getCurrentDate());
    setToDate(getCurrentDate());
    setSortBy("Newest");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">News App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/settings" className="me-2">
                <Nav.Link>Settings</Nav.Link>
              </LinkContainer>
              <Form inline="true" onSubmit={handleSearch}>
                <InputGroup>
                  <Form.Control
                    placeholder="Type here"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-start-0"
                    type="submit"
                  >
                    Search
                  </Button>
                </InputGroup>
              </Form>
              <Button
                variant="warning"
                size="sm"
                className="mx-3 mt-3 mt-md-0"
                onClick={() => setShow(true)}
              >
                Advance Search
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AdvanceSearchModal
        setShow={setShow}
        show={show}
        advSearchTerm={advSearchTerm}
        setAdvSearchTerm={setAdvSearchTerm}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleAdvanceSearch={handleAdvanceSearch}
        handleSetDefault={handleSetDefault}
      />
    </>
  );
};

export default NavigationBar;
