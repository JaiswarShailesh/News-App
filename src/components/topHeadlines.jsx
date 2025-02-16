import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FigureCaption,
  Row,
} from "react-bootstrap";
import { API_KEY, BASE_URL } from "../config/api";
import axios from "axios";

const TopHeadlines = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    console.log("Fetching data from api");

    const response = await axios.get(
      `${BASE_URL}/top-headlines?country=us&apikey=${API_KEY}`
    );

    console.log(`${BASE_URL}/top-headlines?country=us&apikey=${API_KEY}`);

    console.table(response.data.articles);

    setData(response.data.articles);
  };

  const handleReadMore = (linkToArticle) => {
    console.log(linkToArticle);
    window.open(linkToArticle, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Row>
        <h2>Top Headlines</h2>
        {data.map((article, index) => (
          <Col md={3} key={index}>
            <Card className="mb-4">
              {article.urlToImage && (
                <Card.Img variant="top" src={article.urlToImage} alt="News" />
              )}
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                  {article.description || "No description available."}
                </Card.Text>
                <FigureCaption className="blockquote-footer text-end">
                  <cite title="Source Title">
                    {article.author ? article.author : "Unknown"}
                  </cite>
                </FigureCaption>
                <Button
                  className="d-block"
                  variant="outline-primary"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleReadMore(article.url)}
                >
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TopHeadlines;
