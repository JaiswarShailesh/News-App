import React from "react";
import { Card, Col, Placeholder } from "react-bootstrap";

const NewsCardSkeleton = ({ numberOfCard, size }) => {
  return (
    <>
      {Array(numberOfCard)
        .fill()
        .map((_, index) => (
          <Col md={size} key={index}>
            <Card className="mb-4" aria-hidden="true">
              <Placeholder
                as={Card.Img}
                className="placeholder-img rounded-bottom-0"
                height={"180px"}
              />
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />
                  <Placeholder xs={4} /> <Placeholder xs={6} />
                  <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={12} />
              </Card.Body>
            </Card>
          </Col>
        ))}
    </>
  );
};

export default NewsCardSkeleton;
