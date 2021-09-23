import React, { Component } from "react";
import { Breadcrumb, Nav, Tab } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEdit, faTimes, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import { Routes } from "../../routes";

class ParticipantEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                            <Breadcrumb.Item active>My Events</Breadcrumb.Item>
                        </Breadcrumb>
                        <h4>My Events</h4>
                        <p className="mb-0">Find your past and ongoing events, or join them.</p>
                    </div>
                </div>

                <Tab.Container defaultActiveKey="join">
                    <Nav fill variant="pills" className="flex-column flex-sm-row">
                        <Nav.Item>
                            <Nav.Link eventKey="past" className="mb-sm-3 mb-md-0">
                                Past Events
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="ongoing" className="mb-sm-3 mb-md-0">
                                Ongoing Events
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="join" className="mb-sm-3 mb-md-0">
                                Join Events
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="past" className="py-4">
                            <p>
                                Your past events will show up here.
                            </p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="ongoing" className="py-4">
                            <p>
                                Your ongoing events will show up here.
                            </p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="join" className="py-4">
                            <p>
                                Join an event by using the unique code/URL or browse through and participate in thousands of events worldwide!
                            </p>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        )
    }
}

export default ParticipantEvents