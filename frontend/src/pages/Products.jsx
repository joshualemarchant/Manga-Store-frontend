import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'; // import Spinner
import { getManga } from '../../api/manga';
import { useEffect, useState } from 'react';
import MangaCard from '../components/MangaCard';


export default function Products() {
    const [manga, setManga] = useState([])
    const [loading, setLoading] = useState(true);

    
    const handleSort = (e) => {
        const criteria = e.target.value;
        const sortedItems = [...manga].sort((a, b) => {
            switch (criteria) {
                case 'alphabetical':
                     return a.title.localeCompare(b.title);
                case 'price-low-to-high': 
                    return a.price - b.price 
                case 'price-high-to-low':
                     return b.price - a.price 
                    }
            });
        setManga(sortedItems);
    };


    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const result = await getManga()
            setManga(result)
            setLoading(false)
        };
        
        loadData()
    }, [])

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-3">Loading...</p>
            </Container>
        );
    }
    
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
                    <Form.Select onChange={handleSort}>
                        <option value="popularity">Relevance</option>
                        <option value="price-low-to-high">Price: Low to High</option>
                        <option value="price-high-to-low">Price: High to Low</option>
                        <option value="alphabetical">Title: A-Z</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* Product Grid */}
            <Row>
                {/* Product cards will be mapped here */}
                {manga.map((manga) => (
                <Col key={manga.title} sm={6} md={4} lg={4} className="mb-4">
                    <MangaCard manga={manga} cover={[manga.cover]} />
                </Col>
                ))}              
            </Row>
        </Container>
    );
}