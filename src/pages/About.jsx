import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function About() {
    return (
        <Container className="py-5">
            <h1 className="mb-4">About Manga Shack</h1>
            
            <Row className="mb-4">
                <Col md={6}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Our Story</Card.Title>
                            <Card.Text>
                                Founded in 2020, Manga Shack has been dedicated to bringing the best 
                                manga collection to fans worldwide. We started with a passion for 
                                Japanese comics and have grown into a trusted source for manga lovers.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Our Mission</Card.Title>
                            <Card.Text>
                                To provide manga enthusiasts with access to the widest selection of 
                                titles at competitive prices, while delivering exceptional customer 
                                service and fast, reliable shipping.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card>
                <Card.Body>
                    <Card.Title>What We Offer</Card.Title>
                    <ul>
                        <li>Extensive catalog of popular and rare manga titles</li>
                        <li>Competitive pricing on all volumes</li>
                        <li>Fast and secure worldwide shipping</li>
                        <li>Regular updates with new releases</li>
                        <li>Dedicated customer support team</li>
                        <li>Easy returns and exchanges</li>
                    </ul>
                </Card.Body>
            </Card>

            <div className="mt-4">
                <h3>Contact Us</h3>
                <p>Email: info@mangashack.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Address: 123 Manga Street, Comic City, CC 12345</p>
            </div>
        </Container>
    );
}
