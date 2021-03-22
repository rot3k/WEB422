import { Card } from "react-bootstrap";

function NotFound() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Not Found</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
}

export default NotFound;