// App.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Card,
  Nav,
} from "react-bootstrap";
import {
  SunFill,
  MoonFill,
  CheckCircleFill,
  Pencil,
  Trash,
} from "react-bootstrap-icons";

function App() {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, pending

  // Load from localStorage
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("todos"));
    const storedTheme = JSON.parse(localStorage.getItem("darkMode"));
    if (storedList) setList(storedList);
    if (storedTheme) setDarkMode(storedTheme);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(list));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [list, darkMode]);

  // Add todo
  const addItem = () => {
    if (userInput.trim() !== "") {
      const newItem = {
        id: Date.now(),
        value: userInput,
        completed: false,
      };
      setList([...list, newItem]);
      setUserInput("");
    }
  };

  // Delete todo
  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  // Toggle completion
  const toggleComplete = (id) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Start editing
  const startEditing = (index, value) => {
    setEditingIndex(index);
    setEditValue(value);
  };

  // Save edit
  const saveEdit = (index) => {
    if (editValue.trim() !== "") {
      const updated = [...list];
      updated[index].value = editValue;
      setList(updated);
      setEditingIndex(null);
      setEditValue("");
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  // Clear completed
  const clearCompleted = () => {
    setList(list.filter((item) => !item.completed));
  };

  // Clear all
  const clearAll = () => {
    setList([]);
  };

  // Filtered todos
  const filteredList =
    filter === "all"
      ? list
      : filter === "completed"
        ? list.filter((i) => i.completed)
        : list.filter((i) => !i.completed);

  // Stats
  const total = list.length;
  const completed = list.filter((i) => i.completed).length;
  const pending = total - completed;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(to right, #141e30, #243b55)"
          : "linear-gradient(to right, #f8f9fa, #e9ecef)",
        color: darkMode ? "#fff" : "#000",
        transition: "0.3s",
      }}
    >
      <Container fluid className="py-4 d-flex flex-column h-100">
        {/* Header */}
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold">🚀 Advanced Todo Dashboard</h2>
            <Button
              variant={darkMode ? "light" : "dark"}
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-circle"
              style={{ width: "50px", height: "50px" }}
            >
              {darkMode ? <SunFill /> : <MoonFill />}
            </Button>
          </Col>
        </Row>

        {/* Stats */}
        <Row className="my-3">
          <Col md={4}>
            <Card className="shadow-sm text-center">
              <Card.Body>
                <h5>Total</h5>
                <h3>{total}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm text-center">
              <Card.Body>
                <h5>Completed</h5>
                <h3 className="text-success">{completed}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm text-center">
              <Card.Body>
                <h5>Pending</h5>
                <h3 className="text-danger">{pending}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Input */}
        <Row className="mb-3">
          <Col md={{ span: 8, offset: 2 }}>
            <InputGroup>
              <FormControl
                placeholder="Add a new todo..."
                size="lg"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Button variant="primary" onClick={addItem}>
                Add
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {/* Filters */}
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Nav
              variant="pills"
              activeKey={filter}
              onSelect={(k) => setFilter(k)}
              className="justify-content-center mb-3"
            >
              <Nav.Item>
                <Nav.Link eventKey="all">All</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="completed">Completed</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="pending">Pending</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>

        {/* Todo List */}
        <Row className="flex-grow-1">
          <Col md={{ span: 8, offset: 2 }}>
            <Card
              className={`shadow-sm ${darkMode ? "bg-dark text-white" : ""}`}
              style={{ maxHeight: "60vh", overflowY: "auto" }}
            >
              <ListGroup variant="flush">
                {filteredList.length === 0 && (
                  <ListGroup.Item className="text-center">
                    🎉 Nothing here
                  </ListGroup.Item>
                )}
                {filteredList.map((item, index) => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center"
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                    }}
                  >
                    <div className="flex-grow-1 me-2">
                      {editingIndex === index ? (
                        <InputGroup>
                          <FormControl
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                          <Button
                            variant="success"
                            onClick={() => saveEdit(index)}
                          >
                            Save
                          </Button>
                          <Button variant="secondary" onClick={cancelEdit}>
                            Cancel
                          </Button>
                        </InputGroup>
                      ) : (
                        item.value
                      )}
                    </div>
                    <div>
                      <Button
                        variant="outline-success"
                        className="me-2"
                        onClick={() => toggleComplete(item.id)}
                      >
                        <CheckCircleFill />
                      </Button>
                      <Button
                        variant="outline-warning"
                        className="me-2"
                        onClick={() => startEditing(index, item.value)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteItem(item.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>

        {/* Clear Buttons */}
        <Row className="mt-3">
          <Col md={{ span: 8, offset: 2 }} className="d-flex justify-content-between">
            <Button variant="danger" onClick={clearCompleted}>
              Clear Completed
            </Button>
            <Button variant="outline-danger" onClick={clearAll}>
              Clear All
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
