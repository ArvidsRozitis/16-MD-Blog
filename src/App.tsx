import "./App.scss";
import { Route, Routes, NavLink } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { BlogPage } from "./pages/Blog/BlogPage";
import BlogPost from "./pages/BlogPost/BlogPost";

function App() {
  return (
    <div className="app">
      <nav className="nav__bar">
        <NavLink to="/" className="nav__item">
          Home
        </NavLink>
        <NavLink to="/blogPage" className="nav__item">
          Blog
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/blogPage" element={<BlogPage />} />
        <Route path="/blogPost/:id" element={<BlogPost />} />
      </Routes>
    </div>
  );
}

export default App;

// To do
//1: Make nav bar whit 2 links and add post button
//2: Style blog  section
//3: Create Blog card with read more
//4: Create big card
//5 create coment field
