import "./App.css";
import { useState, useEffect } from "react";
import MainPageComponent from "./main";
import EmotionPage from "./emotion";
import LoginPage from "./account/login";
import JoinPage from "./account/join";
import ProfilePage from "./account/profile";
import VideoEmotionPage from "./emotion/video_emotion";
import ReportPage from "./report";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("id"));
  const onLogout = () => {
    localStorage.removeItem("id");
    document.location.href = "/";
  };

  useEffect(() => {
    // 로그아웃 상태
    if (localStorage.getItem("id") === null) {
      console.log("isLogin ? ", isLogin);
    } else {
      // 로그인 상태
      setIsLogin(true);
      console.log("isLogin ? ", isLogin);
    }
  });
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
              <Nav.Link href="/">Home</Nav.Link>
              {isLogin ? (
                <Nav.Link href="/emotion">Emotion Analysis</Nav.Link>
              ) : (
                <Nav.Link href="/account/login">Emotion Analysis</Nav.Link>
              )}

              <NavDropdown title="Account" id="basic-nav-dropdown">
                {isLogin ? (
                  <NavDropdown.Item href="/account/profile">
                    Profile
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/account/login">
                    Login
                  </NavDropdown.Item>
                )}
                {isLogin ? <NavDropdown.Divider /> : <div />}
                {isLogin ? (
                  <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/account/join">Join</NavDropdown.Item>
                )}
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
          <Route exact={true} path="/account/login">
            <LoginPage />
          </Route>
          <Route exact={true} path="/account/join">
            <JoinPage />
          </Route>
          <Route exact={true} path="/account/profile">
            <ProfilePage />
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
