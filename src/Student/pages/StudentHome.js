import React from "react";
import StudentNavBar from "../../Student/NavBar/StudentNavBar";
import { CardDeck } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Welcome from "../components/welcomeUser";

/**
 * Created by: Luke Waterhouse
 * This page makes use of React Bootstrap to show a deck of cards each with an image and a description of the feature they
 * represent.
 */

class StudentHome extends React.Component {
  render() {
    return (
      <div>
        <StudentNavBar />
        <Welcome />

        <h1
          className="text-md-center"
          style={{ marginTop: "40px", marginBottom: "40px" }}
        >
          <u>Home</u>
        </h1>

        <CardDeck
          style={{
            marginLeft: "100px",
            marginRight: "100px",
            marginBottom: "100px",
          }}
        >
          <Card>
            <Card.Body style={{ color: "black" }}>
              <Card.Title style={{ color: "black" }}>Modules</Card.Title>
              <Card.Img
                variant="top"
                src="../../Pictures/Classes.jpg"
                style={{ marginBottom: "20px" }}
              />
              <Card.Text>
                Head over here to view the details of each of your modules
              </Card.Text>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>

          <Card>
            <Card.Body style={{ color: "black" }}>
              <Card.Title style={{ color: "black" }}>My Assignments</Card.Title>
              <Card.Img
                variant="top"
                src="../../Pictures/Assignments.png"
                style={{ marginBottom: "20px" }}
              />
              <Card.Text>
                My Assignments will show you a breakdown of all the assignments
                that your teacher has set you sorted into the different modules
                they belong to, with the creation date, the due date and a way
                to submit them
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"> </small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body style={{ color: "black" }}>
              <Card.Title style={{ color: "black" }}>Analytics</Card.Title>
              <Card.Img
                variant="top"
                src="../../Pictures/Analytics.jpeg"
                style={{ marginBottom: "20px" }}
              />
              <Card.Text>
                The Analytics section will give you a breakdown of the grades
                you have achieved so far as well as the average marks for each
                of the modules
              </Card.Text>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </CardDeck>

        <CardDeck
          style={{
            marginLeft: "100px",
            marginRight: "100px",
            marginBottom: "30px",
          }}
        >
          <Card>
            <Card.Body style={{ color: "black" }}>
              <Card.Title style={{ color: "black" }}>Feedback</Card.Title>
              <Card.Img
                variant="top"
                src="../../Pictures/Feedback.png"
                style={{ marginBottom: "20px" }}
              />
              <Card.Text>
                The Feedback system will allow you to give feedback both in a
                general way for each module as well as assignment specific, your
                feedback will remain anonymous but please keep your feedback
                respectful and if negative at least constructive.
              </Card.Text>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
          <Card>
            <Card.Body style={{ color: "black" }}>
              <Card.Title style={{ color: "black" }}>Forum</Card.Title>
              <Card.Img
                variant="top"
                src="../../Pictures/Forum.jpg"
                style={{ marginBottom: "20px" }}
              />
              <Card.Text>
                The Forum is a great place to interact with both other Students
                who may have many questions about different topics as well as
                your teachers, If you have questions specific to a topic or a
                module there may well be a thread for it already! If not be sure
                to ask your teacher to create one
              </Card.Text>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
          <Card>
            <Card.Body style={{ color: "black" }}>
              <Card.Title style={{ color: "black" }}>
                Deadline Tracker
              </Card.Title>
              <Card.Img
                variant="top"
                src="../../Pictures/DeadlineTracker.jpg"
                style={{ marginBottom: "20px" }}
              />
              <Card.Text>
                The Forum is a great place to interact with both other Students
                who may have many questions about different topics as well as
                your teachers, If you have questions specific to a topic or a
                module there may well be a thread for it already! If not be sure
                to ask your teacher to create one
              </Card.Text>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </CardDeck>
      </div>
    );
  }
}

export default StudentHome;
