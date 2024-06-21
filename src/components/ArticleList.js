
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ArticleList = ({ articles }) => {
  return (
    <Row>
      {articles.map((article, index) => (
        <Col xs={12} md={6} lg={4} key={index} className="mb-4">
          <Card>
            <Card.Img variant="top" src={article.urlToImage} />
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.description}</Card.Text>
              <Card.Link href={article.url} target="_blank">Read more</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ArticleList;

