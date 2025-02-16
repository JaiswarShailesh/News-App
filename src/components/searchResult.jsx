import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FigureCaption,
  Row,
  Pagination,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import NewsCardSkeleton from "./newsCardSkeleton";
import { API_KEY, BASE_URL } from "../config/api";
import axios from "axios";

const SearchResult = ({ selectedLanguage }) => {
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || "";
  const fromDate = location.state?.fromDate || "";
  const toDate = location.state?.toDate || "";
  const sortBy = location.state?.sortBy || "";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;

  const navigate = useNavigate();

  // Calculate total pages
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  useEffect(() => {
    const getData = async () => {
      if (!searchTerm.trim()) {
        navigate("/");
      }

      try {
        setLoading(true);
        setCurrentPage(1);
        let response = "";
        if (searchTerm && fromDate && toDate && sortBy) {
          response = await axios.get(
            `${BASE_URL}/everything?q=${searchTerm}&from=${fromDate}&to=${toDate}&sortBy=${sortBy}&language=${selectedLanguage}&apiKey=${API_KEY}`
          );
        } else {
          response = await axios.get(
            `${BASE_URL}/everything?q=${searchTerm}&language=${selectedLanguage}&apiKey=${API_KEY}`
          );
        }

        setArticles(response.data.articles);
        console.log(response.data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [searchTerm, selectedLanguage]); // Added `searchTerm` and `selectedLanguage` as dependencies

  return (
    <Container className="mt-5">
      {articles.length > 0 && <h2>Search Results {`(${articles.length})`}</h2>}

      <Row className="row-cols-1 row-cols-md-3 g-4">
        {loading ? (
          <NewsCardSkeleton numberOfCard={6} size={4} />
        ) : currentArticles.length === 0 ? (
          <Col className="text-center mt-4" md={12}>
            <div className="alert alert-danger" role="alert">
              <h4>No News Found 🙄</h4>
              <p>Try selecting a different category or language.</p>
            </div>
          </Col>
        ) : (
          currentArticles.map((article, index) => (
            <Col key={index} className="d-flex">
              <Card className="mb-4 d-flex flex-column w-100">
                {article.urlToImage && (
                  <Card.Img
                    variant="top"
                    src={article.urlToImage}
                    alt="News"
                    className="img-fluid"
                  />
                )}
                <Card.Body className="d-flex flex-column flex-grow-1">
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {article.description || "No description available."}
                  </Card.Text>
                  <div className="mt-auto">
                    <FigureCaption className="blockquote-footer text-end">
                      <cite title="Source Title">
                        {article.author ? article.author : "Unknown"}
                      </cite>
                      <p>
                        {formatDistanceToNow(new Date(article.publishedAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </FigureCaption>
                    <Button
                      className="w-100"
                      variant="outline-primary"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="d-flex justify-content-center">
          <Pagination.First
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </Container>
  );
};

export default SearchResult;
