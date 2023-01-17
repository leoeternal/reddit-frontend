import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import CreatePost from "./components/post/CreatePost";
import CommunityProfile from "./components/profile/CommunityProfile";
import PostInfo from "./components/post/PostInfo";
import UserProfile from "./components/profile/UserProfile";
import Moderator from "./components/community/Moderator";

function App() {
  console.log(process.env);
  return (
    <div style={{ backgroundColor: "rgb(218,224,230)", minHeight: "100vh" }}>
      <Router>
        <Header />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/submit" element={<CreatePost />} />
          <Route
            exact
            path="/r/:communityName"
            element={<CommunityProfile />}
          />
          <Route exact path="/user/:userName/:type" element={<UserProfile />} />
          <Route
            exact
            path="/r/:communityName/about/moderators"
            element={<Moderator />}
          />
          <Route
            exact
            path="/r/:communityName/submit"
            element={<CreatePost />}
          />
          <Route
            exact
            path="/:type/:name/comments/:postId/:title"
            element={<PostInfo />}
          />
          <Route exact path="/user/:username/submit" element={<CreatePost />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
