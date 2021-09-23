
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Alert, Nav } from '@themesberg/react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        "email": null,
        "username": null,
        "password": null,
        "confirm_password": null,
        "user_type": "individual",
        "is_organization": false,
      },
      errors: [],
    }
  }

  setCredentials = (key, value) => {
    var credential = this.state.credentials
    credential[key] = value
    this.setState({ credentials: credential })
  }

  validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(String(password));
  }

  validateCredentials = async (event) => {
    var errors = []
    if (this.validatePassword(this.state.credentials.password)) {
      errors.push(
        <div>Please enter a valid Password. Requirements:
          <ol>
            <li>Should contain at least one digit.</li>
            <li>Should contain at least one lower case.</li>
            <li>Should contain at least one upper case.</li>
            <li>Should contain at least 8 from the above mentioned characters.</li>
          </ol>
        </div>
      )
    }

    if(this.state.credentials.user_type == "individual"){
      this.setCredentials("is_organization", false);
    }

    // proceed to save in database and redirect
    await axios.post('/api/account/register', this.state.credentials)
      .then((data) => {
        this.setState({ errors: [] });
        window.location.href = Routes.Signin.path
      })
      .catch((error) => {
        const response_data = error.response.data
        if (typeof response_data == "string") {
          this.setState({ errors: [<div><p>Please contact us and report this issue at: <Card.Link href={"mailto:" + Routes.email.path}>{Routes.email.path}</Card.Link></p><p>{response_data}</p></div>] });
        }
        else {
          Object.entries(response_data).map(([k, v], i) => errors.push(<div>{k}: {v}</div>))
          this.setState({ errors: errors });
        }
      })
    return false
  }

  render_user_type = () => {
    if (this.state.credentials.user_type == null || this.state.credentials.user_type == "individual") {
      return ""
    }
    return (
      <Form.Group id="user_affiliation" className="mb-4">
        <Form.Label>I am a / an</Form.Label>
        <Row>
          <Col>
            <Nav fill defaultActiveKey="participant" variant="pills" className="rounded flex-column flex-md-row">
              <Nav.Item>
                <Nav.Link eventKey="participant" className="mb-sm-3 mb-md-0" onClick={() => { this.setCredentials("is_organization", false) }}>
                  {this.state.credentials.user_type == "event" ? "Participant" : "Applicant"}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="organizer" className="mb-sm-3 mb-md-0" onClick={() => { this.setCredentials("is_organization", true) }}>
                  {this.state.credentials.user_type == "event" ? "Organizer" : "Part of startup"}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Form.Group>
    )
  }

  render() {
    return (
      <main>
        <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <Container>
            <p className="text-center">
              <Card.Link as={Link} to={Routes.ZealHome.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
              </Card.Link>
            </p>
            <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Create an account</h3>
                  </div>
                  <Form className="mt-4">

                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Your Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control autoFocus required type="email" placeholder="example@company.com" onChange={(event) => this.setCredentials("email", event.target.value)} />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group id="username" className="mb-4">
                      <Form.Label>Username or Organization's name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUserAlt} />
                        </InputGroup.Text>
                        <Form.Control autoFocus required type="text" placeholder="Enter username here" onChange={(event) => this.setCredentials("username", event.target.value)} />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group id="password" className="mb-4" onChange={(event) => this.setCredentials("password", event.target.value)}>
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group id="confirmPassword" className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Confirm Password" onChange={(event) => this.setCredentials("confirm_password", event.target.value)} />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group id="user_type" className="mb-4">
                      <Form.Label>I am using zeal for</Form.Label>
                      <Form.Select onChange={(event) => { this.setCredentials("user_type", event.target.value) }}>
                        <option value="individual">personal use</option>
                        <option value="event">hackathon / other events</option>
                        <option value="startup">startup</option>
                      </Form.Select>
                    </Form.Group>

                    {this.render_user_type()}

                    <FormCheck type="checkbox" className="d-flex mb-4">
                      <FormCheck.Input required id="terms" className="me-2" />
                      <FormCheck.Label htmlFor="terms">
                        I agree to the <Card.Link>terms and conditions</Card.Link>
                      </FormCheck.Label>
                    </FormCheck>

                    {
                      this.state.errors.length > 0 ?
                        <Alert variant="warning">
                          <ul>
                            {this.state.errors.map((x, index) => <li key={`error_${index}`}>{x}</li>)}
                          </ul>
                        </Alert>
                        :
                        ""
                    }

                    <Button variant="primary" type="submit" className="w-100" onClick={this.validateCredentials}>
                      Sign up
                    </Button>
                  </Form>

                  <div className="mt-3 mb-4 text-center">
                    <span className="fw-normal">or</span>
                  </div>
                  <div className="d-flex justify-content-center my-4">
                    <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </Button>
                    <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                      <FontAwesomeIcon icon={faTwitter} />
                    </Button>
                    <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                      <FontAwesomeIcon icon={faGithub} />
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="fw-normal">
                      Already have an account?
                      <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                        {` Login here `}
                      </Card.Link>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    );
  }
};

export default SignUp