import "./App.scss";
import { Route, Routes, NavLink, Link } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { BlogPage } from "./pages/Blog/BlogPage";
import { BlogPost } from "./pages/BlogPost/BlogPost";
import { AddPost } from "./pages/AddPost/AddPost";

function App() {
  return (
    <div className="app">
      <nav className="nav__bar">
        <div className="pageSelection">
          <NavLink to="/" className="nav__item">
            Home
          </NavLink>
          <NavLink to="/blogPage" className="nav__item">
            Blog
          </NavLink>
        </div>
        <Link to="/addPost" className="nav__item">
          <button className="button__add-Post"
          >add Post</button>
        </Link>
      </nav>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/blogPage" element={<BlogPage />} />
        <Route path="/blogPost/:id" element={<BlogPost />} />
        <Route path="/addPost/" element={<AddPost />} />
      </Routes>
    </div>
  );
}

export default App;
