/**
 * Routage des pages.
 *
 * Chaque clé de PAGES devient une URL : "Contact" -> /Contact (la casse n'importe pas,
 * /contact fonctionne aussi). `mainPage` est la page affichée sur "/".
 * Pour ajouter une page : créer le fichier dans ./pages puis l'importer et l'ajouter ici.
 */
import About from './pages/About';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Home from './pages/Home';
import MentionsLegales from './pages/MentionsLegales';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Layout from './Layout.jsx';

export const PAGES = {
  About,
  Admin,
  Blog,
  Contact,
  Home,
  MentionsLegales,
  Portfolio,
  Services,
  Testimonials,
};

export const pagesConfig = {
  mainPage: 'Home',
  Pages: PAGES,
  Layout,
};
