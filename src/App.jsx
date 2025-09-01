/**
 * ================================================================
 * APP ROOT COMPONENT
 * ================================================================
 * Entry point of the React application.
 * Renders global layout structure with:
 *   - Header (App Branding & Logo)
 *   - Main   (Search & Weather Display)
 *   - Footer (Author credits/info)
 */

import './css/App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
