

import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, ButtonGroup, Spinner, Alert } from 'react-bootstrap';
import ArticleList from './components/ArticleList';
import Pagination from './components/Pagination';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState(['All', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 10;

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, currentPage]);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    const categoryQuery = selectedCategory !== 'All' ? `&category=${selectedCategory.toLowerCase()}` : '';
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${currentPage}${categoryQuery}&apiKey=4676d743239847149772709ea648ae0a`);
      setArticles(response.data.articles);
      setTotalResults(response.data.totalResults);
    } catch (err) {
      setError('Failed to fetch articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  return (
    <div>
      <div className="header">
        <h1>News App</h1>
      </div>
      <Container>
        <Row className="my-4">
          <Col>
            <ButtonGroup className="button-group">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  variant={category === selectedCategory ? 'primary' : 'secondary'}
                >
                  {category}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <div className="text-center my-4">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <ArticleList articles={articles} />
            )}
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            {!loading && !error && (
              <Pagination
                currentPage={currentPage}
                totalResults={totalResults}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

