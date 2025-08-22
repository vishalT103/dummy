// App.js File
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

class App extends Component {
  constructor(props) {
    super(props);

    // ❌ ERROR: missing closing curly brace in state
    this.state = {
      userInput: "",
      list: [],
      // <- missing `}` here
    }

    // ❌ ERROR: using undefined variable
    addItem() {
      if (this.state.userInput !== "") {
        const userInput = {
          id: Math.random(),
          value: this.state.userInput,
        };

        // ❌ Mistyped variable name "lst" instead of "list"
        const list = [...this.state.lst];
        list.push(userInput);

        this.setState({
          list,
          userInput: "",
        });
      }
    }

    render() {
      return (
        <Container>
          <Row>
            <h1>Todo List</h1>
          </Row>
        </Container>
      );
    }
  }

export default App;
