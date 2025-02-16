import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AdvanceSearchModal = ({
  show,
  setShow,
  advSearchTerm,
  setAdvSearchTerm,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  sortBy,
  setSortBy,
  handleAdvanceSearch,
  handleSetDefault,
}) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Advance Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Search anything</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type here..."
            value={advSearchTerm}
            onChange={(e) => setAdvSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>From</Form.Label>
          <Form.Control
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Sort by</Form.Label>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="publishedAt">Newest</option>
            <option value="Popularity">Popularity</option>
            <option value="Relevancy">Relevancy</option>
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSetDefault}>
          Set Default
        </Button>
        <Button variant="primary" onClick={handleAdvanceSearch}>
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdvanceSearchModal;
