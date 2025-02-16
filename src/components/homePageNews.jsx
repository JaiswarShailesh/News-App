import React, { useEffect, useState, useCallback } from "react";
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
import NewsCardSkeleton from "./newsCardSkeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

const HomePageNews = ({ categorName, selectedLanguage }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    console.log("Fetching data from API...");

    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/top-headlines?country=us&category=${categorName}&language=${selectedLanguage}&apiKey=${API_KEY}`
      );

      console.log(`${BASE_URL}/top-headlines?country=us&category=${categorName}&language=${selectedLanguage}&apiKey=${API_KEY}`)

      console.log(response.data.articles);
      setData(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }, [categorName, selectedLanguage]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container className="mt-5">
      {data.length > 0 && <h2>Top Headlines</h2>}
      <Row
        className="row-cols-1 row-cols-md-3 g-4"
        data-masonry='{"percentPosition": true }'
      >
        {loading ? (
          <NewsCardSkeleton numberOfCard={6} size={4} />
        ) : data.length === 0 ? (
          <Col className="text-center mt-4" md={12}>
            <div class="alert alert-danger" role="alert">
              <h4>No News Found 🙄</h4>
              <p>Try selecting a different category or language.</p>
            </div>
          </Col>
        ) : (
          data.map((article, index) => (
            <Col key={index}>
              <Card className="h-100">
                {/* {article.urlToImage && (
                  <Card.Img
                    variant="top"
                    src={article.urlToImage}
                    alt="News"
                    className="img-fluid"
                  />
                )} */}
                {article.urlToImage && (
                  <LazyLoadImage
                    alt="News"
                    src={article.urlToImage}
                    effect="blur" // Adds a blur effect before the image loads
                    className="img-fluid"
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {article.description || "No description available."}
                  </Card.Text>
                  <div className="mt-auto">
                    <FigureCaption className="blockquote-footer text-end">
                      <cite title="Source Title">
                        {article.author || "Unknown"}
                      </cite>
                    </FigureCaption>
                    <Button
                      className="w-100"
                      variant="outline-primary"
                      onClick={() =>
                        window.open(
                          article.url,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      Read More
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default HomePageNews;
