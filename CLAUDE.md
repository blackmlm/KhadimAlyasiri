# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page personal resume website for Khadim Alyasiri, built as a static HTML site with modern CSS and JavaScript. The project showcases a responsive, space-themed design with interactive particle effects and glassmorphism UI elements.

## Project Structure

- `index.html` - Main resume page (clean HTML structure)
- `css/styles.css` - Custom styles and responsive design
- `js/particles.js` - Particle system and interactive animations
- `images/khadim.png` - Profile picture
- `.gitignore` - Version control exclusions (includes .yoyo/ directory)

## Architecture

### Modular Architecture
The website follows a standard separation of concerns:
- **HTML** (`index.html`) - Semantic structure and content
- **CSS** (`css/styles.css`) - All styling, animations, and responsive design
- **JavaScript** (`js/particles.js`) - Interactive particle system and Lucide icon initialization
- **External dependencies** loaded via CDN (Tailwind CSS, Lucide Icons, Google Fonts)

### CSS Architecture
- **Base Styles**: CSS custom properties for fonts, keyframe animations
- **Component Classes**: `.glass-effect`, `.hover-lift`, `.text-gradient`, `.custom-bullet`
- **Responsive Design**: Mobile-first approach with multiple breakpoints
- **Theme System**: Space-themed color palette with gradients and particle effects

### JavaScript Architecture
- **ParticleSystem Class** (lines 587-776): Object-oriented particle animation system
- **Responsive Optimization**: Dynamic particle count based on screen size
- **Event Handling**: Mouse/touch interaction with particles
- **Performance Features**: Mobile optimization, boundary collision detection

### Responsive Strategy
- **Mobile Header**: Separate header component for mobile screens only
- **Desktop Header**: Different layout for desktop screens
- **Progressive Enhancement**: Base layout works without JavaScript
- **Breakpoints**: Mobile (<768px), Tablet (641px-1023px), Desktop (>1024px)

## Key Features

### Visual Design
- **Glassmorphism**: Backdrop blur effects with semi-transparent backgrounds
- **Particle System**: Interactive space-themed particle animation
- **Gradient Elements**: Custom gradients for text and backgrounds
- **Custom Bullet Points**: Styled list items with gradient dots

### Responsive Behavior
- **Mobile-First Design**: Optimized layouts for all screen sizes
- **Conditional Headers**: Different header layouts for mobile vs desktop
- **Performance Optimization**: Reduced particle count on mobile devices
- **Touch Interaction**: Mobile-friendly particle interaction

### Content Structure
- **Profile Section**: Personal information and professional summary
- **Education**: Academic background
- **Skills**: Professional and additional skills with custom styling
- **Work Experience**: Chronological employment history
- **Leadership**: Separate section for leadership and communications roles

## Development Notes

### External Dependencies
- **Tailwind CSS**: Utility-first CSS framework loaded via CDN
- **Lucide Icons**: Icon library for contact information and UI elements
- **Google Fonts**: Inter (body text) and Space Grotesk (headings)

### Browser Compatibility
- Modern CSS features: backdrop-filter, CSS custom properties, CSS Grid
- ES6+ JavaScript: Classes, arrow functions, modern DOM APIs
- Responsive images with object-fit

### Performance Considerations
- **Mobile Optimization**: Reduced particle count and effects on mobile
- **Lazy Animation**: Particles only animated when in view
- **Efficient Rendering**: Canvas-based particle system with requestAnimationFrame
- **Resource Management**: Event listeners with passive option for touch events

## File Modification Guidelines

### CSS Modifications
- Color scheme defined in gradient classes and CSS custom properties
- Responsive breakpoints follow mobile-first approach
- Animation delays are staggered for progressive reveal effect

### JavaScript Modifications
- Particle system parameters are mobile-responsive
- Event listeners use passive option for performance
- Canvas rendering optimized for different screen sizes

### Content Updates
- Work experience follows chronological structure (newest first)
- Skills are categorized into Professional and Additional Skills
- Contact information uses Lucide icons with semantic markup

## Performance Budget
- **Particle Count**: 15 (small mobile) → 25 (mobile) → 50 (desktop)
- **Animation**: 60fps target with requestAnimationFrame
- **Image Optimization**: Single profile image with multiple responsive sizes
- **CDN Dependencies**: Minimal external resources for fast loading