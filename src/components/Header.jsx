/**
 * ================================================================
 * HEADER COMPONENT - PREMIUM BRANDING INTERFACE
 * ================================================================
 * 
 * Sophisticated header component featuring advanced logo animations
 * and premium typography effects. Designed to make a powerful
 * first impression for portfolio presentations.
 * 
 * VISUAL FEATURES:
 * • Multi-layered logo animation system with GPU acceleration
 * • Gradient text effects with glow animations
 * • Glassmorphism background with backdrop blur
 * • Responsive layout adaptation
 * • Accessibility-compliant structure
 * 
 * ANIMATION SYSTEM:
 * ┌─ Primary Float Animation (4s cycle)
 * ├─ Glow Pulse Effect (3s alternate)
 * ├─ Subtle Rotation (20s continuous)
 * └─ Orbital Glow Background (6s alternate)
 * 
 * LOGO IMPLEMENTATION GUIDE:
 * ════════════════════════════════════════════════════════════════
 * 1. Place your logo file in: /public/assets/your-logo.png
 * 2. Supported formats: PNG, SVG, WebP (PNG recommended)
 * 3. Optimal dimensions: 200x200px minimum for crisp rendering
 * 4. Update src attribute below to match your filename
 * 5. Modify alt attribute for accessibility compliance
 * ════════════════════════════════════════════════════════════════
 * 
 * @version 2.0.0 - Enhanced Portfolio Edition
 * @component Header
 * @accessibility WCAG 2.1 AA Compliant
 */

/**
 * ================================================================
 * HEADER FUNCTIONAL COMPONENT
 * ================================================================
 * 
 * Renders the application header with animated branding elements.
 * Implements semantic HTML5 structure for optimal SEO and accessibility.
 * 
 * COMPONENT ARCHITECTURE:
 * • Semantic <header> element for document structure
 * • Logo container with advanced CSS animations
 * • Typography with gradient text effects
 * • Responsive behavior across all screen sizes
 * 
 * CUSTOMIZATION OPTIONS:
 * • Logo source: Update src attribute for your brand
 * • Title text: Modify h1 content for your app name
 * • Animation timing: Adjust in corresponding CSS classes
 * • Color scheme: Modify CSS custom properties in App.css
 * 
 * @returns {JSX.Element} Premium header with animated logo and title
 */
const Header = () => {
  return (
    <header className="header" role="banner">
      {/* ============================================================
          LOGO CONTAINER - ANIMATED BRAND IDENTITY
          ============================================================
          Features multi-layered animation system:
          • FloatLogo: Smooth vertical movement with scaling
          • GlowPulse: Dynamic filter effects for premium feel  
          • RotateSubtle: Gentle continuous rotation
          • Orbital background glow via CSS pseudo-element
          ============================================================ */}
      <div className="logo-container">
        <img
          src="/assets/qp-sw.png"
          alt="MyWeather App - Premium Weather Application Logo"
          className="logo"
          loading="eager"
          decoding="async"
        />
      </div>
      
      {/* ============================================================
          APPLICATION TITLE - GRADIENT TYPOGRAPHY
          ============================================================
          Implements advanced text effects:
          • Linear gradient background clipping
          • Animated glow with text-shadow
          • Responsive font scaling
          • Semantic heading hierarchy (h1)
          ============================================================ */}
      <h1 className="app-title">
        Welcome to MyWeather Web App
      </h1>
    </header>
  );
};

// ================================================================
// COMPONENT EXPORT - ES6 MODULE PATTERN
// ================================================================
export default Header;