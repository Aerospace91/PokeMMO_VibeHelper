# PokeMMO Helper Tool

A comprehensive web-based helper tool for PokeMMO players, built with HTML, CSS, and TypeScript.

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

## Next Steps for Development

### 1. Start with Mock Data
The boilerplate includes mock data generators. Begin by:
- Understanding how the data flows through the application
- Modifying the mock data to match your needs
- Adding new mock functions for additional features

**Example - Extending mock data:**
```typescript
private generateMockItems(query: string): Item[] {
  // Add more items to the mock data array
  const mockItems: Item[] = [
    // Add your custom items here
    {
      id: 4,
      name: 'Master Ball',
      category: ItemCategory.POKEBALLS,
      currentPrice: 50000,
      priceHistory: [],
      description: 'The best Ball with the ultimate level of performance.'
    }
  ];
}
```

### 2. Add Real API Integration
Replace mock methods with actual API calls for live data:

**Example - Real API integration:**
```typescript
// Replace generateMockItems() with real API
private async searchItems(query: string): Promise<void> {
  this.setLoading(true);
  
  try {
    const response = await fetch(`https://api.pokemmo-hub.com/items?search=${query}`);
    const items = await response.json();
    this.displayItems(items);
  } catch (error) {
    this.showError('Failed to fetch items');
  } finally {
    this.setLoading(false);
  }
}

// Add error handling and loading states
private async fetchPokemonData(): Promise<Pokemon[]> {
  try {
    const response = await fetch('/api/pokemon');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return this.generateMockPokemon(); // Fallback to mock data
  }
}
```

### 3. Extend Features
The architecture makes it easy to add new features following these patterns:

**Adding a new tab:**
1. Add HTML structure in the main file
2. Create corresponding method in TypeScript class
3. Add styling following existing patterns

**Example - Adding a "Teams" tab:**
```html
<!-- Add to navigation -->
<button class="nav-btn" data-tab="teams">Teams</button>

<!-- Add content section -->
<section id="teams" class="tab-content">
  <div class="container">
    <h2>Team Builder</h2>
    <!-- Team builder content -->
  </div>
</section>
```

```typescript
// Add to loadTabData method
case 'teams':
  this.loadTeamBuilder();
  break;

// Add new method
private loadTeamBuilder(): void {
  // Implementation for team builder
}
```

### 4. Advanced Features
Based on PokeMMO Hub functionality, consider implementing:

**Price History Charts:**
```typescript
// Using Chart.js or similar charting library
private createPriceChart(item: Item): void {
  const ctx = document.getElementById('price-chart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: item.priceHistory.map(p => p.date),
      datasets: [{
        label: 'Price History',
        data: item.priceHistory.map(p => p.price),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
  });
}
```

**Real-time Price Updates:**
```typescript
// WebSocket integration for live updates
private setupPriceUpdates(): void {
  const ws = new WebSocket('wss://api.pokemmo-hub.com/prices');
  
  ws.onmessage = (event) => {
    const priceUpdate = JSON.parse(event.data);
    this.updateItemPrice(priceUpdate);
  };
}
```

**Breeding Tree Visualization:**
```typescript
// Complex breeding path visualization
private displayBreedingTree(project: BreedingProject): void {
  const treeContainer = document.getElementById('breeding-tree');
  // Create visual tree representation of breeding steps
}
```

**Import/Export Functionality:**
```typescript
// Export user data
public exportUserData(): void {
  const dataBlob = new Blob([JSON.stringify(this.appData)], 
    { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'pokemmo-helper-data.json';
  link.click();
}

// Import user data
public importUserData(file: File): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      this.appData = JSON.parse(e.target?.result as string);
      this.saveAppData();
      this.updateDashboard();
    } catch (error) {
      this.showError('Invalid file format');
    }
  };
  reader.readAsText(file);
}
```

## Learning Path Recommendations

### For JavaScript/TypeScript Learning:
1. **Start with event handlers** in `setupEventListeners()` - understand DOM events
2. **Study tab switching logic** in `showTab()` - learn DOM manipulation
3. **Understand data management** in `loadAppData()` and `saveAppData()` - localStorage usage
4. **Explore DOM manipulation** in methods like `createItemCard()` - dynamic content creation

### For Advanced Features:
1. **API Integration**: Replace mock data with real API calls using fetch()
2. **State Management**: Implement more sophisticated state handling patterns
3. **Performance**: Add caching strategies and virtual scrolling for large datasets
4. **Testing**: Write unit tests using Jest or similar testing frameworks

### Suggested Development Order:
1. **Phase 1**: Get familiar with the existing code structure and mock data
2. **Phase 2**: Customize the UI and add your own styling touches
3. **Phase 3**: Implement one real API integration (start with items or Pokemon data)
4. **Phase 4**: Add advanced features like charts or real-time updates
5. **Phase 5**: Optimize performance and add testing

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