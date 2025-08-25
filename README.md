# PokeMMO Helper Tool

A comprehensive web-based, vibe-coded helper tool for PokeMMO players, built with HTML, CSS, and TypeScript.

because I am bored and not taking this seriously at all.

## Features

- **Dashboard**: Overview of your tracked items, breeding projects, and Pokédex completion
- **Item Price Tracker**: Search and track item prices and market trends
- **Breeding Calculator**: Calculate optimal breeding paths for perfect IV Pokémon
- **Pokédex**: Browse Pokémon with filtering options
- **Additional Tools**:
  - Catch Rate Calculator
  - Egg Move Helper
  - Berry Timer
  - Investment Tracker

## Project Structure

```
pokemmo-helper-tool/
├── pokemmo-helper.html    # Main HTML file
├── styles.css             # CSS styles
├── tsconfig.json          # TypeScript configuration
├── package.json           # NPM package configuration
├── src/
│   ├── types.ts          # TypeScript type definitions
│   └── main.ts           # Main application logic
└── dist/                 # Compiled JavaScript (generated)
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- NPM

### Installation

1. Clone or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

1. **Compile TypeScript**:
   ```bash
   npm run build
   ```
   
2. **Development mode** (auto-compile on changes):
   ```bash
   npm run dev
   ```

3. **Serve the application**:
   ```bash
   npm run serve
   ```
   
4. **Build and serve** (one command):
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## File Overview

### HTML Structure (`pokemmo-helper.html`)
- Modern HTML5 boilerplate with semantic elements
- Tab-based navigation system
- Responsive design with CSS Grid and Flexbox
- Modal system for tools and detailed views
- Accessibility features included

### CSS Styles (`styles.css`)
- CSS Custom Properties (variables) for theming
- Responsive design with mobile-first approach
- Modern CSS features (Grid, Flexbox, custom properties)
- Consistent spacing and typography system
- Light/dark mode support ready

### TypeScript Structure

#### Types (`src/types.ts`)
- Comprehensive type definitions for all data structures
- Enums for consistent data values
- Interfaces for complex objects
- Strong typing for better development experience

#### Main Application (`src/main.ts`)
- Class-based architecture for maintainability
- Event-driven design with proper event listeners
- Local storage for data persistence
- Modular methods for different features
- Mock data implementation for development

## Key Features Explained

### Tab System
The application uses a simple tab system where each major feature is a separate tab:
- Dashboard for overview
- Items for price tracking
- Breeding for breeding calculations
- Pokédex for Pokémon information
- Tools for additional utilities

### Data Management
- Uses browser's `localStorage` for data persistence
- Auto-save functionality every 30 seconds
- Type-safe data structures throughout
- Mock data for development and testing

### Responsive Design
- Mobile-first CSS approach
- Flexible grid layouts that adapt to screen size
- Touch-friendly interface elements
- Accessible design principles

## Customization

### Adding New Features
1. Add new types to `src/types.ts`
2. Create new methods in the main class
3. Add corresponding HTML structure
4. Style with CSS following the existing pattern

### Styling Changes
- Modify CSS custom properties in `:root` for global changes
- Use the existing class naming conventions
- Follow the established spacing and color system

### API Integration
The current implementation uses mock data. To integrate with real APIs:
1. Replace mock methods with actual API calls
2. Add proper error handling
3. Implement loading states
4. Add authentication if needed

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features required
- CSS Grid and Flexbox support needed

## Development Tips

### TypeScript Benefits
- Strong typing prevents runtime errors
- Better IntelliSense and code completion
- Easier refactoring and maintenance
- Clear interfaces for data structures

### CSS Organization
- Utility-first approach with semantic classes
- Consistent naming conventions
- Modular structure for easy maintenance
- Responsive design patterns

### JavaScript Patterns
- Event delegation for dynamic content
- Class-based architecture for organization
- Separation of concerns between data and UI
- Error handling and user feedback

## Future Enhancements

### Potential Features
- Real-time price updates via WebSocket
- User accounts and cloud data sync
- Advanced breeding algorithms
- Team builder functionality
- Battle simulator integration
- Import/export functionality for data

### Technical Improvements
- Service Worker for offline functionality
- Progressive Web App (PWA) features
- Performance optimization
- Advanced caching strategies
- Testing suite implementation

## Contributing

To contribute to this project:
1. Follow the existing code style and patterns
2. Add proper TypeScript types for new features
3. Test across different screen sizes
4. Ensure accessibility compliance
5. Update documentation for new features

## License

MIT License - feel free to use and modify for your own projects.