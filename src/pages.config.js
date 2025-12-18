import About from './pages/About';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Admin": Admin,
    "Blog": Blog,
    "Contact": Contact,
    "Home": Home,
    "Portfolio": Portfolio,
    "Services": Services,
    "Testimonials": Testimonials,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};