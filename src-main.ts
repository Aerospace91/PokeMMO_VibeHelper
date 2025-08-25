import { 
  TabState, 
  UIState, 
  AppData, 
  BreedingProject, 
  Investment,
  IVSpread,
  Nature,
  Pokemon,
  Item,
  ItemCategory
} from './types.js';

/**
 * Main application class that manages the PokeMMO Helper Tool
 */
class PokeMMOHelper {
  private tabState: TabState = { activeTab: 'dashboard' };
  private uiState: UIState = { 
    isLoading: false, 
    error: null, 
    modalOpen: false, 
    modalContent: '' 
  };
  private appData: AppData;

  constructor() {
    this.appData = this.loadAppData();
    this.init();
  }

  /**
   * Initialize the application
   */
  private init(): void {
    this.setupEventListeners();
    this.updateDashboard();
    this.showTab('dashboard');
  }

  /**
   * Set up all event listeners for the application
   */
  private setupEventListeners(): void {
    // Navigation tab switching
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const tabName = target.dataset.tab;
        if (tabName) {
          this.showTab(tabName);
        }
      });
    });

    // Item search functionality
    const itemSearchBtn = document.getElementById('search-btn');
    const itemSearchInput = document.getElementById('item-search') as HTMLInputElement;
    
    itemSearchBtn?.addEventListener('click', () => {
      this.searchItems(itemSearchInput.value);
    });

    itemSearchInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.searchItems(itemSearchInput.value);
      }
    });

    // Breeding calculator
    const calculateBreedingBtn = document.getElementById('calculate-breeding');
    calculateBreedingBtn?.addEventListener('click', () => {
      this.calculateBreedingPath();
    });

    // Tool modal handlers
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const tool = target.dataset.tool;
        if (tool) {
          this.openTool(tool);
        }
      });
    });

    // Modal close handler
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn?.addEventListener('click', () => {
      this.closeModal();
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    // Auto-save functionality
    setInterval(() => {
      this.saveAppData();
    }, 30000); // Save every 30 seconds
  }

  /**
   * Show a specific tab and hide others
   */
  private showTab(tabName: string): void {
    // Update tab state
    this.tabState.activeTab = tabName;

    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
      tab.classList.remove('active');
    });

    // Show selected tab
    const activeTab = document.getElementById(tabName);
    activeTab?.classList.add('active');

    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-tab') === tabName) {
        btn.classList.add('active');
      }
    });

    // Load tab-specific data
    this.loadTabData(tabName);
  }

  /**
   * Load data for a specific tab
   */
  private loadTabData(tabName: string): void {
    switch (tabName) {
      case 'dashboard':
        this.updateDashboard();
        break;
      case 'items':
        this.loadItems();
        break;
      case 'breeding':
        this.loadBreedingProjects();
        break;
      case 'pokedex':
        this.loadPokedex();
        break;
      case 'tools':
        // Tools are static, no loading needed
        break;
    }
  }

  /**
   * Update dashboard with current statistics
   */
  private updateDashboard(): void {
    const itemsCount = document.getElementById('items-count');
    const breedingCount = document.getElementById('breeding-count');
    const pokedexCompletion = document.getElementById('pokedex-completion');

    if (itemsCount) {
      itemsCount.textContent = this.appData.investments.length.toString();
    }

    if (breedingCount) {
      breedingCount.textContent = this.appData.breedingProjects.length.toString();
    }

    if (pokedexCompletion) {
      const completed = Object.values(this.appData.pokedexCompletion).filter(Boolean).length;
      const total = Object.keys(this.appData.pokedexCompletion).length || 1;
      const percentage = Math.round((completed / total) * 100);
      pokedexCompletion.textContent = `${percentage}%`;
    }
  }

  /**
   * Search for items based on query
   */
  private searchItems(query: string): void {
    const itemsGrid = document.getElementById('items-grid');
    if (!itemsGrid) return;

    this.setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock data for demonstration
      const mockItems = this.generateMockItems(query);
      this.displayItems(mockItems);
      this.setLoading(false);
    }, 500);
  }

  /**
   * Display items in the items grid
   */
  private displayItems(items: Item[]): void {
    const itemsGrid = document.getElementById('items-grid');
    if (!itemsGrid) return;

    itemsGrid.innerHTML = '';

    items.forEach(item => {
      const itemCard = this.createItemCard(item);
      itemsGrid.appendChild(itemCard);
    });
  }

  /**
   * Create an item card element
   */
  private createItemCard(item: Item): HTMLElement {
    const card = document.createElement('div');
    card.className = 'item-card';
    
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p class="item-category">${item.category}</p>
      <p class="item-price">₽${item.currentPrice.toLocaleString()}</p>
      <p class="item-description">${item.description}</p>
      <button class="add-to-watchlist" data-item-id="${item.id}">
        Add to Watchlist
      </button>
    `;

    // Add event listener for watchlist button
    const watchlistBtn = card.querySelector('.add-to-watchlist');
    watchlistBtn?.addEventListener('click', () => {
      this.addToWatchlist(item);
    });

    return card;
  }

  /**
   * Calculate breeding path based on form inputs
   */
  private calculateBreedingPath(): void {
    const pokemonSelect = document.getElementById('pokemon-select') as HTMLSelectElement;
    const natureSelect = document.getElementById('nature-select') as HTMLSelectElement;
    
    // Get IV inputs
    const targetIVs: IVSpread = {
      hp: this.getIVInput('hp-iv'),
      attack: this.getIVInput('attack-iv'),
      defense: this.getIVInput('defense-iv'),
      specialAttack: this.getIVInput('spatk-iv'),
      specialDefense: this.getIVInput('spdef-iv'),
      speed: this.getIVInput('speed-iv')
    };

    const pokemon = pokemonSelect.value;
    const nature = natureSelect.value as Nature | '';

    if (!pokemon) {
      this.showError('Please select a Pokémon first');
      return;
    }

    this.setLoading(true);

    // Simulate breeding calculation
    setTimeout(() => {
      const breedingPath = this.calculateOptimalBreedingPath(
        pokemon, 
        targetIVs, 
        nature || null
      );
      this.displayBreedingResults(breedingPath);
      this.setLoading(false);
    }, 1000);
  }

  /**
   * Get IV input value
   */
  private getIVInput(inputId: string): number {
    const input = document.getElementById(inputId) as HTMLInputElement;
    return parseInt(input.value) || 0;
  }

  /**
   * Calculate optimal breeding path (mock implementation)
   */
  private calculateOptimalBreedingPath(
    pokemon: string, 
    targetIVs: IVSpread, 
    nature: Nature | null
  ): BreedingProject {
    // This is a simplified mock calculation
    // In a real implementation, this would be much more complex
    
    const perfectIVCount = Object.values(targetIVs).filter(iv => iv === 31).length;
    const estimatedSteps = Math.max(1, perfectIVCount - 1);
    const estimatedCost = estimatedSteps * 50000; // Mock cost calculation

    return {
      id: `breeding-${Date.now()}`,
      pokemonName: pokemon,
      targetIVs,
      targetNature: nature,
      eggMoves: [],
      status: 'PLANNING' as any,
      steps: [],
      estimatedCost,
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Display breeding calculation results
   */
  private displayBreedingResults(project: BreedingProject): void {
    const resultsDiv = document.getElementById('breeding-results');
    if (!resultsDiv) return;

    const perfectIVs = Object.values(project.targetIVs).filter(iv => iv === 31).length;
    
    resultsDiv.innerHTML = `
      <h3>Breeding Plan for ${project.pokemonName}</h3>
      <div class="breeding-summary">
        <p><strong>Target:</strong> ${perfectIVs}x31 IVs</p>
        ${project.targetNature ? `<p><strong>Nature:</strong> ${project.targetNature}</p>` : ''}
        <p><strong>Estimated Cost:</strong> ₽${project.estimatedCost.toLocaleString()}</p>
        <p><strong>Estimated Steps:</strong> ${Math.max(1, perfectIVs - 1)}</p>
      </div>
      <div class="breeding-actions">
        <button id="save-breeding-project">Save Project</button>
        <button id="start-breeding">Start Breeding</button>
      </div>
    `;

    // Add event listeners for breeding actions
    document.getElementById('save-breeding-project')?.addEventListener('click', () => {
      this.saveBreedingProject(project);
    });
  }

  /**
   * Save a breeding project
   */
  private saveBreedingProject(project: BreedingProject): void {
    this.appData.breedingProjects.push(project);
    this.saveAppData();
    this.showSuccess('Breeding project saved successfully!');
    this.updateDashboard();
  }

  /**
   * Load and display items
   */
  private loadItems(): void {
    // In a real app, this would fetch from an API
    const mockItems = this.generateMockItems('');
    this.displayItems(mockItems);
  }

  /**
   * Load breeding projects
   */
  private loadBreedingProjects(): void {
    // Populate breeding form with data
    this.populateBreedingForm();
  }

  /**
   * Populate breeding form with Pokemon and nature options
   */
  private populateBreedingForm(): void {
    const pokemonSelect = document.getElementById('pokemon-select') as HTMLSelectElement;
    const natureSelect = document.getElementById('nature-select') as HTMLSelectElement;

    if (pokemonSelect && pokemonSelect.children.length <= 1) {
      // Mock Pokemon list
      const pokemonList = [
        'Charizard', 'Blastoise', 'Venusaur', 'Pikachu', 'Mewtwo',
        'Dragonite', 'Tyranitar', 'Garchomp', 'Metagross', 'Salamence'
      ];

      pokemonList.forEach(pokemon => {
        const option = document.createElement('option');
        option.value = pokemon;
        option.textContent = pokemon;
        pokemonSelect.appendChild(option);
      });
    }

    if (natureSelect && natureSelect.children.length <= 1) {
      // Nature list
      const natures = [
        'Adamant', 'Bold', 'Brave', 'Calm', 'Careful', 'Hasty',
        'Impish', 'Jolly', 'Modest', 'Naive', 'Quiet', 'Timid'
      ];

      natures.forEach(nature => {
        const option = document.createElement('option');
        option.value = nature;
        option.textContent = nature;
        natureSelect.appendChild(option);
      });
    }
  }

  /**
   * Load Pokedex data
   */
  private loadPokedex(): void {
    const pokemonGrid = document.getElementById('pokemon-grid');
    if (!pokemonGrid) return;

    // Mock Pokemon data
    const mockPokemon = this.generateMockPokemon();
    pokemonGrid.innerHTML = '';

    mockPokemon.forEach(pokemon => {
      const pokemonCard = this.createPokemonCard(pokemon);
      pokemonGrid.appendChild(pokemonCard);
    });
  }

  /**
   * Create a Pokemon card element
   */
  private createPokemonCard(pokemon: Pokemon): HTMLElement {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    
    card.innerHTML = `
      <h3>${pokemon.name}</h3>
      <p class="pokemon-types">${pokemon.types.join(' / ')}</p>
      <div class="pokemon-stats">
        <small>HP: ${pokemon.baseStats.hp}</small>
        <small>ATK: ${pokemon.baseStats.attack}</small>
        <small>DEF: ${pokemon.baseStats.defense}</small>
      </div>
    `;

    card.addEventListener('click', () => {
      this.showPokemonDetails(pokemon);
    });

    return card;
  }

  /**
   * Show Pokemon details in modal
   */
  private showPokemonDetails(pokemon: Pokemon): void {
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <h2>${pokemon.name}</h2>
      <p><strong>Types:</strong> ${pokemon.types.join(', ')}</p>
      <p><strong>Egg Groups:</strong> ${pokemon.eggGroups.join(', ')}</p>
      <div class="pokemon-base-stats">
        <h3>Base Stats</h3>
        <div class="stats-grid">
          <div>HP: ${pokemon.baseStats.hp}</div>
          <div>Attack: ${pokemon.baseStats.attack}</div>
          <div>Defense: ${pokemon.baseStats.defense}</div>
          <div>Sp. Atk: ${pokemon.baseStats.specialAttack}</div>
          <div>Sp. Def: ${pokemon.baseStats.specialDefense}</div>
          <div>Speed: ${pokemon.baseStats.speed}</div>
        </div>
      </div>
    `;

    this.openModal();
  }

  /**
   * Open a tool in modal
   */
  private openTool(toolName: string): void {
    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;

    switch (toolName) {
      case 'catch-rate':
        modalBody.innerHTML = this.getCatchRateCalculatorHTML();
        break;
      case 'egg-moves':
        modalBody.innerHTML = this.getEggMoveHelperHTML();
        break;
      case 'berry-timer':
        modalBody.innerHTML = this.getBerryTimerHTML();
        break;
      case 'investments':
        modalBody.innerHTML = this.getInvestmentTrackerHTML();
        break;
    }

    this.openModal();
  }

  /**
   * Generate mock items for demonstration
   */
  private generateMockItems(query: string): Item[] {
    const mockItems: Item[] = [
      {
        id: 1,
        name: 'Ultra Ball',
        category: ItemCategory.POKEBALLS,
        currentPrice: 1200,
        priceHistory: [],
        description: 'A high-performance Ball with a higher catch rate than a Great Ball.'
      },
      {
        id: 2,
        name: 'Rare Candy',
        category: ItemCategory.MEDICINE,
        currentPrice: 5000,
        priceHistory: [],
        description: 'A candy that is packed with energy. It raises the level of a Pokemon by one.'
      },
      {
        id: 3,
        name: 'Leftovers',
        category: ItemCategory.HELD_ITEMS,
        currentPrice: 15000,
        priceHistory: [],
        description: 'An item to be held by a Pokemon. The holder restores HP gradually.'
      }
    ];

    if (query) {
      return mockItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    return mockItems;
  }

  /**
   * Generate mock Pokemon data
   */
  private generateMockPokemon(): Pokemon[] {
    return [
      {
        id: 1,
        name: 'Charizard',
        types: ['Fire', 'Flying'],
        baseStats: {
          hp: 78,
          attack: 84,
          defense: 78,
          specialAttack: 109,
          specialDefense: 85,
          speed: 100
        },
        eggGroups: ['Monster', 'Dragon'],
        genderRatio: { male: 87.5, female: 12.5 }
      },
      {
        id: 2,
        name: 'Blastoise',
        types: ['Water'],
        baseStats: {
          hp: 79,
          attack: 83,
          defense: 100,
          specialAttack: 85,
          specialDefense: 105,
          speed: 78
        },
        eggGroups: ['Monster', 'Water 1'],
        genderRatio: { male: 87.5, female: 12.5 }
      }
    ] as Pokemon[];
  }

  /**
   * HTML templates for tools
   */
  private getCatchRateCalculatorHTML(): string {
    return `
      <h2>Catch Rate Calculator</h2>
      <div class="tool-form">
        <div class="form-group">
          <label>Pokémon:</label>
          <select id="catch-pokemon">
            <option value="">Select Pokémon...</option>
            <option value="charizard">Charizard</option>
            <option value="pikachu">Pikachu</option>
          </select>
        </div>
        <div class="form-group">
          <label>Current HP (%):</label>
          <input type="number" id="current-hp" min="1" max="100" value="100">
        </div>
        <div class="form-group">
          <label>Status:</label>
          <select id="status-condition">
            <option value="none">None</option>
            <option value="sleep">Sleep</option>
            <option value="freeze">Freeze</option>
            <option value="paralysis">Paralysis</option>
            <option value="poison">Poison</option>
            <option value="burn">Burn</option>
          </select>
        </div>
        <div class="form-group">
          <label>Pokéball:</label>
          <select id="pokeball-type">
            <option value="pokeball">Poké Ball</option>
            <option value="greatball">Great Ball</option>
            <option value="ultraball">Ultra Ball</option>
          </select>
        </div>
        <button onclick="app.calculateCatchRate()">Calculate</button>
        <div id="catch-rate-result"></div>
      </div>
    `;
  }

  private getEggMoveHelperHTML(): string {
    return `
      <h2>Egg Move Helper</h2>
      <div class="tool-form">
        <div class="form-group">
          <label>Target Pokémon:</label>
          <select id="target-pokemon">
            <option value="">Select Pokémon...</option>
            <option value="charizard">Charizard</option>
            <option value="blastoise">Blastoise</option>
          </select>
        </div>
        <div class="form-group">
          <label>Desired Egg Move:</label>
          <select id="egg-move">
            <option value="">Select Move...</option>
            <option value="dragon-pulse">Dragon Pulse</option>
            <option value="ancient-power">Ancient Power</option>
          </select>
        </div>
        <button onclick="app.findEggMovePath()">Find Breeding Path</button>
        <div id="egg-move-result"></div>
      </div>
    `;
  }

  private getBerryTimerHTML(): string {
    return `
      <h2>Berry Timer</h2>
      <div class="tool-form">
        <div class="form-group">
          <label>Berry Type:</label>
          <select id="berry-type">
            <option value="oran">Oran Berry</option>
            <option value="sitrus">Sitrus Berry</option>
            <option value="leppa">Leppa Berry</option>
          </select>
        </div>
        <div class="form-group">
          <label>Plant Time:</label>
          <input type="datetime-local" id="plant-time">
        </div>
        <button onclick="app.addBerryTimer()">Add Timer</button>
        <div id="berry-timers">
          <p>No active berry timers</p>
        </div>
      </div>
    `;
  }

  private getInvestmentTrackerHTML(): string {
    return `
      <h2>Investment Tracker</h2>
      <div class="tool-form">
        <div class="form-group">
          <label>Item:</label>
          <input type="text" id="investment-item" placeholder="Item name">
        </div>
        <div class="form-group">
          <label>Quantity:</label>
          <input type="number" id="investment-quantity" min="1">
        </div>
        <div class="form-group">
          <label>Purchase Price:</label>
          <input type="number" id="investment-price" min="0">
        </div>
        <button onclick="app.addInvestment()">Add Investment</button>
        <div id="investment-list">
          <p>No investments tracked</p>
        </div>
      </div>
    `;
  }

  /**
   * Utility methods
   */
  private openModal(): void {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'block';
      this.uiState.modalOpen = true;
    }
  }

  private closeModal(): void {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
      this.uiState.modalOpen = false;
    }
  }

  private setLoading(loading: boolean): void {
    this.uiState.isLoading = loading;
    const body = document.body;
    
    if (loading) {
      body.classList.add('loading');
    } else {
      body.classList.remove('loading');
    }
  }

  private showError(message: string): void {
    this.uiState.error = message;
    // You could implement a toast notification system here
    alert('Error: ' + message);
  }

  private showSuccess(message: string): void {
    // You could implement a toast notification system here
    alert('Success: ' + message);
  }

  private addToWatchlist(item: Item): void {
    // Mock implementation
    console.log('Added to watchlist:', item.name);
    this.showSuccess(`${item.name} added to watchlist!`);
  }

  /**
   * Data persistence methods
   */
  private loadAppData(): AppData {
    const saved = localStorage.getItem('pokemmo-helper-data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved data:', e);
      }
    }

    // Return default data structure
    return {
      investments: [],
      breedingProjects: [],
      berryPlots: [],
      pokedexCompletion: {},
      settings: {
        theme: 'light',
        defaultRegion: 'KANTO' as any,
        autoSave: true,
        notifications: true
      }
    };
  }

  private saveAppData(): void {
    try {
      localStorage.setItem('pokemmo-helper-data', JSON.stringify(this.appData));
    } catch (e) {
      console.error('Failed to save data:', e);
    }
  }

  /**
   * Public methods for tool functionality
   */
  public calculateCatchRate(): void {
    // Mock implementation
    const result = document.getElementById('catch-rate-result');
    if (result) {
      result.innerHTML = '<p><strong>Catch Rate:</strong> 85.3%</p>';
    }
  }

  public findEggMovePath(): void {
    // Mock implementation
    const result = document.getElementById('egg-move-result');
    if (result) {
      result.innerHTML = '<p><strong>Breeding Path:</strong> Charizard → Horsea → Target</p>';
    }
  }

  public addBerryTimer(): void {
    // Mock implementation
    const timers = document.getElementById('berry-timers');
    if (timers) {
      timers.innerHTML = '<p>Berry timer added! Harvest in 2 hours 30 minutes.</p>';
    }
  }

  public addInvestment(): void {
    // Mock implementation
    const list = document.getElementById('investment-list');
    if (list) {
      list.innerHTML = '<p>Investment added successfully!</p>';
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Make app available globally for tool methods
  (window as any).app = new PokeMMOHelper();
});