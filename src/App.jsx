
import './App.css';
import { Routes, Route } from "react-router-dom";
import { BlogForm } from "./components/BlogForm";
import { BlogList } from "./components/BlogList";
import { BlogPreview } from './components/BlogPreview';

function App() {

  return (
    <>
     <Routes>
      <Route path = "/" element={<BlogList />} />
      <Route path = "/blog-form" element={<BlogForm />}></Route>
      <Route path = "/blog-preview" element={<BlogPreview />}></Route>
     </Routes>
    </>
  )
}

export default App
