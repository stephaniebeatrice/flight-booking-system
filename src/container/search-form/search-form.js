import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./search-form.css";

const airports = ["Nairobi (NRB)", "Delhi (DEL)", "Bengaluru (BLR)", "Mumbai (BOM)"];

const isDate = date => {
  return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
};

const ErrorLabel = props => {
  return <label style={{ color: "red" }}>{props.message}</label>;
};

export const SearchForm = props => {
  let origin, destination;
  const [isReturn, setFlightType] = useState(false);
  const [status, setFormValid] = useState({ isValid: false });
  let invalidFields = {};
  //const isReturn = true;
  const handleSubmit = event => {
    event.preventDefault();
    const { flights } = props;
    invalidFields = {};
    const criteria = {
      origin: origin.state.text,
      destination: destination.state.text,
      departureDate: event.target.dateOfDep.value,
      numOfPassengers: event.target.numOfPassengers.value,
    };

    if (event.target.flightType[1].checked) {
      criteria.returnDate = event.target.dateOfReturn.value;
      if (!isDate(event.target.dateOfReturn.value)) {
        invalidFields.returnDate = true;
      }
    }

    if (!airports.includes(criteria.origin)) {
      invalidFields.origin = true;
    }
    if (!airports.includes(criteria.destination) || criteria.origin === criteria.destination) {
      invalidFields.destination = true;
    }
    if (!isDate(criteria.departureDate)) {
      invalidFields.departureDate = true;
    }
    if (!isDate(criteria.departureDate)) {
      invalidFields.departureDate = true;
    }
    if (Object.keys(invalidFields).length > 0) {
      setFormValid({ isValid: false, ...invalidFields });
      return;
    }

    setFormValid({ isValid: true });
    props.findFlights({ flights, criteria });
  };

  return (
    <div className="flight-search-container">
      <Card className="flight-search-card">
        <Card.Body>
          <Form className="search-form" onSubmit={handleSubmit}>
            <Form.Group className="flight-type-group">
              <Form.Check
                inline
                checked={!isReturn}
                type="radio"
                label="One way"
                name="flightType"
                id="formHorizontalRadios1"
                onChange={e => setFlightType(false)}
              />
              <Form.Check
                inline
                checked={isReturn}
                type="radio"
                label="Round Trip"
                name="flightType"
                id="formHorizontalRadios2"
                onChange={e => setFlightType(true)}
              />
            </Form.Group>

            <Form.Group controlId="formGridOrigin" className="form-group">
              <label htmlFor="from">From:</label>
              <Typeahead labelKey="origin" options={airports} placeholder="Select Origin" ref={ref => (origin = ref)} />
              {status.origin && <ErrorLabel message="Please enter a valid airport"></ErrorLabel>}
            </Form.Group>

            <Form.Group controlId="formGridDestination" className="form-group">
              <label htmlFor="to">To:</label>
              <Typeahead labelKey="destination" options={airports} placeholder="Select Destination" ref={ref => (destination = ref)} />
              {status.destination && <ErrorLabel message="Please enter a valid airport but not same as origin"></ErrorLabel>}
            </Form.Group>

            <Form.Group controlId="formGridDateOfDep" className="form-group">
              <Form.Label>Departure Date</Form.Label>
              <Form.Control type="date" name="dateOfDep" placeholder="yyyy-mm-dd" required />
              {status.departureDate && <ErrorLabel message="Please enter a valid departure date"></ErrorLabel>}
            </Form.Group>

            {isReturn && (
              <Form.Group controlId="formGridDateOfReturn" className="form-group">
                <Form.Label>Return Date</Form.Label>
                <Form.Control type="date" name="dateOfReturn" placeholder="yyyy-mm-dd" required />
                {status.returnDate && <ErrorLabel message="Please enter a valid return date"></ErrorLabel>}
              </Form.Group>
            )}

            <Form.Group controlId="exampleForm.ControlSelect1" className="form-group">
              <label htmlFor="departure">Passengers</label>
              <Form.Control as="select" name="numOfPassengers" placeholder="Number of Passengers">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SearchForm;
