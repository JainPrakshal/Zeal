import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Breadcrumb } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
              <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
              <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>
            <h4>Profile</h4>
            <p className="mb-0">This is an opportunity to make your profile amazing for other members to find you more easily.</p>
          </div>
        </div>

        <Row>
          <Col xs={12} xl={8}>
            <GeneralInfoForm />
          </Col>

          <Col xs={12} xl={4}>
            <Row>
              <Col xs={12}>
                <ProfileCardWidget />
              </Col>
              <Col xs={12}>
                <ChoosePhotoWidget
                  title="Select profile photo"
                  photo={Profile3}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };
}

export default Profile