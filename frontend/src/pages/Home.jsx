import CarouselComp from "../components/CarouselComp";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/Home.css"
import MangaCard from "../components/MangaCard";
import Spinner from 'react-bootstrap/Spinner'
import { useState, useEffect } from "react";
import { getFeaturedManga, getMangaCoverArt } from '../../api/manga';

export default function Home() {
    const [manga, setManga] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            const result = await getFeaturedManga()
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
                    {manga.map((manga) => (
                    <Col lg={4} md={4} className="mb-3">
                       <MangaCard manga={manga} cover={manga.cover} />
                    </Col>
                ))}
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