import "./App.css";
import MainPageComponent from "./main";
import EmotionPage from "./emotion";
import AccountPage from "./account";
import VideoEmotionPage from "./emotion/video_emotion";
import ReportPage from "./report";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function App() {
  return (
    <div>
      {/* Header */}
      <Navbar className="sticky-top border-bottom" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="logo_img"
              src="/images/logo.png"
              width="110"
              height="50"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto mb-2 mb-lg-0">
              {/* 우측 정렬 */}
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/emotion">Emotion Analysis</Nav.Link>
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/account/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/account/3.2">Setting</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/account/3.3">Sign in</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div id="body">
        <Switch>
          <Route exact={true} path="/">
            {/* // 기본으로 보이는 페이지는 exact True 로 설정 */}
            <MainPageComponent />;
          </Route>
          <Route exact={true} path="/account/:id">
            <AccountPage />
          </Route>
          <Route exact={true} path="/emotion">
            <EmotionPage />
          </Route>
          <Route
            exact={true}
            path="/emotion/video/:id"
            component={VideoEmotionPage}
          />
          <Route exact={true} path="/report">
            <ReportPage />
          </Route>
        </Switch>
      </div>
      {/* Footer */}
      <Container
        fluid
        className="py-5 position-static bottom-0 d-flex justify-content-center bg-secondary"
      >
        <Nav className="text-white">Copyright &copy; 9_Weeks 2021</Nav>
      </Container>
    </div>
  );
}

export default App;
