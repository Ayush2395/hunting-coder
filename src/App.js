import Menubar from "./components/Menubar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BlogList from "./components/BlogList";
import Admin from "./components/Admin";
import AppState from "./context/AppState";
import { useEffect } from "react";
import Blog from "./pages/Blog";

export default function App() {
  useEffect(() => {
    googleAds();
  }, []);

  function googleAds() {
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6095023723120057";
    script.crossOrigin = "anonymous";
    document.body.append(script);
  }

  return (
    <>
      <AppState>
        <Router>
          <Menubar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </AppState>
    </>
  );
}
