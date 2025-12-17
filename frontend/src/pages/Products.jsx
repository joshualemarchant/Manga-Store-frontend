import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getManga } from '../../api/manga';
import { useEffect, useState } from 'react';

export default function Products() {
    const [manga, setManga] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const result = await getManga()
            setManga(result)
        }
        loadData()
    }, [])
    
    return (
        <Container className="py-5">
            <h1 className="mb-4">All Manga</h1>
            
            {/* Search and Filter */}
            <Row className="mb-4">
                <Col md={6}>
                    <Form.Control type="text" placeholder="Search manga..." />
                </Col>
                <Col md={3}>
                    <Form.Select>
                        <option>All Genres</option>
                        <option>Action</option>
                        <option>Romance</option>
                        <option>Comedy</option>
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select>
                        <option>Sort by</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Title: A-Z</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* Product Grid */}
            <Row>
                {/* Product cards will be mapped here */}
                {manga.map((manga) => (
                <Col sm={6} md={4} lg={3} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://dummyimage.com/mediumrectangle" />
                        <Card.Body>
                            <Card.Title>{manga.title}</Card.Title>
                            <Card.Text>$9.99</Card.Text>
                            <Button variant="primary" className="w-100">Add to Cart</Button>
                        </Card.Body>
                    </Card>
                </Col>
                ))}              
            </Row>
        </Container>
    );
}