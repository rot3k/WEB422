import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import moment from "moment";
import { Card, CardGroup } from "react-bootstrap";

function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch( `https://floating-stream-95827.herokuapp.com/api/restaurants/${props.id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.hasOwnProperty("_id")) {
          setRestaurant(result);
          setLoading(false);
        } else {
          setRestaurant(null);
          setLoading(false);
        }
      });
  }, [props.id]);

  if (loading) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>Loading Restaurant Data...</Card.Text>
        </Card.Body>
      </Card>
    );
  } 
  else {
    if (restaurant !== null) {
      return (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {restaurant.address.building} {restaurant.address.street}
              </Card.Subtitle>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>

          <h1>Ratings</h1>

          <CardGroup>
            {restaurant.grades.map((rest, i) => {
              return (
                <Card key={`${i}`}>
                  <Card.Body>
                    <Card.Title>Grade: {rest.grade}</Card.Title>
                    <Card.Text>
                      Completed: {moment(rest.date).format("L")}
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </CardGroup>
        </div>
      );
    } else {
      return (
        <Card>
          <Card.Body>
            <Card.Text>Unable to find Restaurant with id: {props.id}</Card.Text>
          </Card.Body>
        </Card>
      );
    }
  }
}

export default Restaurant;