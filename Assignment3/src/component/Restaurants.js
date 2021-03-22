import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { Card, Table, Pagination } from "react-bootstrap";

function Restaurants(props) {
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;
  let history = useHistory();
  let query = queryString.parse(props.query);

  if (query.borough === undefined) {
    query.borough = "";
  }
  useEffect(() => {
    fetch(`https://floating-stream-95827.herokuapp.com/api/restaurants/?page=${page}&perPage=${perPage}&borough=${query.borough}`)
      .then((res) => res.json())
      .then((result) => {
        setRestaurants(result);
      });
  }, [page, props.query]);

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  if (!restaurants) {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Text>Loading Restaurants...</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  } 
  else {
    if (restaurants.length > 0) {
      return (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>Restaurant List</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Full list of restaurants. Optionally sorted by borough
              </Card.Subtitle>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((rest) => {
                return (
                  <tr
                    key={rest._id}
                    onClick={() => {
                      history.push(`/restaurant/${rest._id}`);
                    }}
                  >
                    <td>{rest.name}</td>
                    <td>
                      {rest.address.building} {rest.address.street}
                    </td>
                    <td>{rest.borough}</td>
                    <td>{rest.cuisine}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={() => previousPage()} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={() => nextPage()} />
          </Pagination>
        </div>
      );
    } else 
    {
      return (
        <div>
          <Card>
            <Card.Body>
              <Card.Text>No Restaurants Found</Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    }
  }
}

export default Restaurants;