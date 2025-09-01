/**
 * ================================================================
 * HEADER COMPONENT
 * ================================================================
 * Displays the application branding.
 * Supports adding animated custom logo (PNG/SVG).
 * ------------------------------------------------
 * HOW TO USE LOGO:
 *   - Place your PNG logo inside /public/assets/logo.png
 *   - Replace <img src="/assets/logo.png" /> with your file path
 *   - Styling and animation handled by CSS classes `.logo`
 */

const Header = () => {
  return (
    <header className="header">
      <img
        src="/assets/qp-sw.png"
        alt="MyWeather Logo"
        className="logo"
      />
      <h1>Welcome to MyWeather Web App</h1>
    </header>
  );
};

export default Header;
