import React, { Component } from "react";
import { Breadcrumb, Nav, Row, Col } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import { Routes } from "../routes";

// Dependencies:
// react-big-calendar
// moment

class Calender extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    localizer = momentLocalizer(moment)

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                            <Breadcrumb.Item active>Calendar</Breadcrumb.Item>
                        </Breadcrumb>
                        <h4>Calendar</h4>
                        <p className="mb-0">Schedule meetings and achievement celebrations with your team members.</p>
                    </div>
                </div>
                <div>
                    <Calendar
                        localizer={this.localizer}
                        events={[
                            {
                                title: "Amazing date",
                                start: new Date(),
                                end: new Date(),
                                allDay: true,
                                resource: "whatever",
                            },
                            {
                                title: "An event",
                                start: new Date(),
                                end: new Date(),
                                allDay: true,
                                resource: "whatever",
                            },
                        ]}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 550 }}
                    />
                </div>
            </div>
        )
    }
}

export default Calender