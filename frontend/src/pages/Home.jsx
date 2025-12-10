import CarouselComp from "../components/CarouselComp";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "../styles/Home.css"

export default function Home() {
    return (
            <>
            <div id="welcome-card" className="text-white text-center py-5" >
                <Container>
                    <h1 className="display-2">Welcome to Manga shack</h1>
                    <p className="lead">Your one-stop shop for manga</p>
                    
                </Container>
            </div>

            <CarouselComp />
            
            {/* Featured Section */}
            <Container className="py-5">
                <h2 className="mb-4">Featured Manga</h2>
                <Row>
                    <Col md={4} className="mb-3">
                        <Card>
                            <Card.Img variant="top" src="https://dummyimage.com/mediumrectangle" />
                            <Card.Body>
                                <Card.Title>Manga Title</Card.Title>
                                <Card.Text>$9.99</Card.Text>
                                <Button variant="primary">View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card>
                            <Card.Img variant="top" src="https://dummyimage.com/mediumrectangle"/>
                            <Card.Body>
                                <Card.Title>Manga Title</Card.Title>
                                <Card.Text>$9.99</Card.Text>
                                <Button variant="primary">View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Card>
                            <Card.Img variant="top" src="https://dummyimage.com/mediumrectangle" />
                            <Card.Body>
                                <Card.Title>Manga Title</Card.Title>
                                <Card.Text>$9.99</Card.Text>
                                <Button variant="primary">View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Info Section */}
            <div className="bg-light py-5">
                <Container>
                    <Row className="text-center">
                        <Col md={4} className="mb-3">
                            <h3>📚</h3>
                            <h5>Huge Selection</h5>
                            <p>Thousands of manga titles</p>
                        </Col>
                        <Col md={4} className="mb-3">
                            <h3>🚚</h3>
                            <h5>Fast Shipping</h5>
                            <p>Quick delivery worldwide</p>
                        </Col>
                        <Col md={4} className="mb-3">
                            <h3>💰</h3>
                            <h5>Great Prices</h5>
                            <p>Best deals on manga</p>
                        </Col>
                    </Row>
                </Container>
            </div>    
            </>
    )
}