import React, { Component } from "react";
import { Breadcrumb, Card, Row, Col, Container, Form, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEdit, faTimes, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import { Routes } from "../routes";

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                ["A sample title", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."],
                ["Where does it come from?", "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."],
            ],
            currently_editing: -1,
        }
    }

    createNote = () => {
        var notes_copy = this.state.notes
        notes_copy.push(["", ""])
        this.setState({ notes: notes_copy }, () => {
            this.setState({ currently_editing: this.state.notes.length - 1 })
        })
    }

    deleteNotes = (index) => {
        var notes_copy = this.state.notes
        notes_copy.splice(index, 1);
        this.setState({ currently_editing: -1 }, () => {
            this.setState({ notes: notes_copy })
        })
    }

    editNote = (title_body_idx, data) => {
        var notes_copy = this.state.notes
        notes_copy[this.state.currently_editing][title_body_idx] = data
        this.setState({ notes: notes_copy })
    }

    renderNotes = () => {
        return (
            this.state.notes.map(([title, body], index) => (
                <Row>
                    <Col key={`notes-${index}`}>
                        <Card>
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
                                <div>
                                    <Card.Body>
                                        <h5 className={"mb-md-0"}>{title}</h5>
                                    </Card.Body>
                                </div>
                                <div>
                                    <Card.Body>
                                        <FontAwesomeIcon icon={faEdit} onClick={() => { this.setState({ currently_editing: index }) }} className={"m-2"} />
                                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => this.deleteNotes(index)} className={"m-2"} />
                                    </Card.Body>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            ))
        )
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                            <Breadcrumb.Item active>Notes</Breadcrumb.Item>
                        </Breadcrumb>
                        <h4>Notes</h4>
                        <p className="mb-0">Jot down your precious ideas and thoughts here.</p>
                    </div>
                </div>

                <Container className="px-0">
                    <Button variant="secondary" className="m-3" onClick={this.createNote}>
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> New Note
                    </Button>
                    <Row>
                        <Col xs={(this.state.currently_editing != -1) ? 3 : 12} className={"animate-all"}>
                            {this.renderNotes()}
                        </Col>
                        <Col className={`${(this.state.currently_editing != -1) ? "scale-up-animation" : "scale-down-animation"}`}>
                            <Card border="light" className="shadow-sm">
                                <Card.Header className="border-bottom border-light d-flex justify-content-between">
                                    <Col xs={9}>
                                        <Form.Control required type="text" placeholder="Title" className={"m-0"} value={(this.state.currently_editing != -1) ? this.state.notes[this.state.currently_editing][0] : ""} onChange={(event) => this.editNote(0, event.target.value)} />
                                    </Col>
                                    <FontAwesomeIcon icon={faTimes} className={"m-3"} onClick={() => { this.setState({ currently_editing: -1 }) }} />
                                </Card.Header>
                                <Form.Control as="textarea" rows={7} style={{ borderTopLeftRadius: "0em", borderTopRightRadius: "0em" }} placeholder={"Enter notes here..."} value={(this.state.currently_editing != -1) ? this.state.notes[this.state.currently_editing][1] : ""} onChange={(event) => this.editNote(1, event.target.value)} />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Notes