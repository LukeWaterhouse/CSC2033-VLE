import React from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import "../css-files/AdminHome.css";
import Card from "react-bootstrap/Card";
import { CardDeck, CardGroup } from "react-bootstrap";
class AdminHome extends React.Component {
  render() {
    return (
      <div>
        <AdminNavBar />

        <h1
          className="text-md-center"
          style={{ marginBottom: "40px", marginTop: "40px" }}
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
              <Card.Title style={{ color: "black" }}>My Classes</Card.Title>
              <Card.Img
                variant="top"
                src="../../Pictures/Classes.jpg"
                style={{ marginBottom: "20px" }}
              />
              <Card.Text>
                My Classes will show you all the different modules on your
                course
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
                Heading to My Assignments will show you all of the assignments
                for each module and enable you to create assignments for them so
                your Students can get busy! Set the title, module, marks and
                instructions for the assignment which will all be easy to view
                for your students.
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
                The Analytics section will give you overviews of the Grades that
                your students have achieved in different ways
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
                The Feedback System works from both ends, the feedback you see
                from your students is anonymous and given by students for
                modules in General and the Assignments in each of them
                specifically so you can take this on board when teaching in the
                future
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
                The Forum is a great place to interact with your Students who
                may have many questions about different topics, in order to
                organize this you have the ability to both create and delete
                different threads that are suitable for the topics of your
                classes or maybe something more abstract or general
              </Card.Text>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </CardDeck>
      </div>
    );
  }
}

export default AdminHome;
