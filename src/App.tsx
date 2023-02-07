import './App.scss'
import { Route, Routes, NavLink } from "react-router-dom";
import { Home } from './pages/Home/Home'
import { Blog } from './pages/Blog/Blog'

function App() {

  return (
    <div className="App">
      <div className='pageBody'>
        <nav className='nav__bar'>
          <NavLink to='/' className='nav__item'>Home</NavLink>
          <NavLink to='/blog' className='nav__item'>Blog</NavLink>
        </nav>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes> 
      </div>
    </div>
  )
}

export default App

// To do
//1: Make nav bar whit 2 links and add post button
//2: Style blog  section
//3: Create Blog card with read more
//4: Create big card
//5 create coment field