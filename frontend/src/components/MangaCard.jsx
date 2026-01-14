import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/MangaCard.css'; // make sure this path is correct

export default function MangaCard({ manga, cover }) {
    return (
        <Card className="display-card">
            <Card.Img
                variant="top"
                src={cover}
                alt={manga.title}
                className="card-image"
            />
            <Card.Body className="card-body-wrapper">
                <div className="card-text-wrapper">
                    <Card.Title className="truncate-title">{manga.title}</Card.Title>
                    <Card.Text className="truncate-authors">
                        {manga.authors.map(author => author.name).join(", ")}
                    </Card.Text>
                    <Card.Text>Rating: {manga.score}/10</Card.Text>
                    <Card.Text className="price-tag">${manga.price}</Card.Text>
                </div>
                <Button variant="primary" className="add-to-cart-btn w-100">Add to Cart</Button>
            </Card.Body>
        </Card>
    );
}
