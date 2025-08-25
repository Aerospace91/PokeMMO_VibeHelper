// Types for PokeMMO Helper Tool

// Core Pokemon and game-related types
export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  baseStats: BaseStats;
  eggGroups: EggGroup[];
  genderRatio: GenderRatio;
  locations?: Location[];
  evolutionChain?: Evolution[];
}

export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface Location {
  region: Region;
  area: string;
  method: CatchMethod;
  rarity: Rarity;
  levels: [number, number]; // [min, max]
}

export interface Evolution {
  from: string;
  to: string;
  method: string;
  condition?: string;
}

// Item and market related types
export interface Item {
  id: number;
  name: string;
  category: ItemCategory;
  currentPrice: number;
  priceHistory: PriceData[];
  description: string;
  sprite?: string;
}

export interface PriceData {
  date: string;
  price: number;
  volume?: number;
}

export interface Investment {
  itemId: number;
  itemName: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  currentPrice: number;
  profitLoss: number;
  profitLossPercentage: number;
}

// Breeding related types
export interface BreedingProject {
  id: string;
  pokemonName: string;
  targetIVs: IVSpread;
  targetNature: Nature | null;
  eggMoves: string[];
  status: BreedingStatus;
  steps: BreedingStep[];
  estimatedCost: number;
  createdAt: string;
}

export interface IVSpread {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface BreedingStep {
  stepNumber: number;
  parent1: BreedingParent;
  parent2: BreedingParent;
  expectedResult: IVSpread;
  items: string[]; // Power items, Everstone, etc.
  cost: number;
}

export interface BreedingParent {
  pokemon: string;
  ivs: IVSpread;
  nature?: Nature;
  gender: Gender;
  source: 'wild' | 'bred' | 'owned';
}

// Catch rate calculator types
export interface CatchRateCalculation {
  pokemon: string;
  level: number;
  currentHP: number;
  maxHP: number;
  statusCondition: StatusCondition;
  pokeball: Pokeball;
  catchRate: number;
  probability: number;
}

// Berry management types
export interface BerryPlot {
  id: string;
  berry: Berry;
  plantedAt: string;
  harvestAt: string;
  stage: BerryStage;
  watered: boolean;
  lastWatered?: string;
}

export interface Berry {
  name: string;
  growthTime: number; // in minutes
  yield: [number, number]; // [min, max]
  value: number;
}

// Enums
export enum PokemonType {
  NORMAL = 'Normal',
  FIRE = 'Fire',
  WATER = 'Water',
  ELECTRIC = 'Electric',
  GRASS = 'Grass',
  ICE = 'Ice',
  FIGHTING = 'Fighting',
  POISON = 'Poison',
  GROUND = 'Ground',
  FLYING = 'Flying',
  PSYCHIC = 'Psychic',
  BUG = 'Bug',
  ROCK = 'Rock',
  GHOST = 'Ghost',
  DRAGON = 'Dragon',
  DARK = 'Dark',
  STEEL = 'Steel',
  FAIRY = 'Fairy'
}

export enum Region {
  KANTO = 'Kanto',
  JOHTO = 'Johto',
  HOENN = 'Hoenn',
  SINNOH = 'Sinnoh',
  UNOVA = 'Unova'
}

export enum ItemCategory {
  POKEBALLS = 'Pokeballs',
  BERRIES = 'Berries',
  MEDICINE = 'Medicine',
  TMS = 'TMs',
  HELD_ITEMS = 'Held Items',
  EVOLUTION_ITEMS = 'Evolution Items',
  BREEDING_ITEMS = 'Breeding Items',
  BATTLE_ITEMS = 'Battle Items'
}

export enum Nature {
  HARDY = 'Hardy',
  LONELY = 'Lonely',
  BRAVE = 'Brave',
  ADAMANT = 'Adamant',
  NAUGHTY = 'Naughty',
  BOLD = 'Bold',
  DOCILE = 'Docile',
  RELAXED = 'Relaxed',
  IMPISH = 'Impish',
  LAX = 'Lax',
  TIMID = 'Timid',
  HASTY = 'Hasty',
  SERIOUS = 'Serious',
  JOLLY = 'Jolly',
  NAIVE = 'Naive',
  MODEST = 'Modest',
  MILD = 'Mild',
  QUIET = 'Quiet',
  BASHFUL = 'Bashful',
  RASH = 'Rash',
  CALM = 'Calm',
  GENTLE = 'Gentle',
  SASSY = 'Sassy',
  CAREFUL = 'Careful',
  QUIRKY = 'Quirky'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  GENDERLESS = 'Genderless'
}

export enum EggGroup {
  MONSTER = 'Monster',
  WATER1 = 'Water 1',
  WATER2 = 'Water 2',
  WATER3 = 'Water 3',
  BUG = 'Bug',
  FLYING = 'Flying',
  FIELD = 'Field',
  FAIRY = 'Fairy',
  GRASS = 'Grass',
  HUMANLIKE = 'Human-Like',
  MINERAL = 'Mineral',
  AMORPHOUS = 'Amorphous',
  DRAGON = 'Dragon',
  UNDISCOVERED = 'Undiscovered',
  DITTO = 'Ditto'
}

export enum BreedingStatus {
  PLANNING = 'Planning',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  PAUSED = 'Paused'
}

export enum StatusCondition {
  NONE = 'None',
  SLEEP = 'Sleep',
  FREEZE = 'Freeze',
  PARALYSIS = 'Paralysis',
  POISON = 'Poison',
  BURN = 'Burn'
}

export enum Pokeball {
  POKEBALL = 'Pokeball',
  GREATBALL = 'Great Ball',
  ULTRABALL = 'Ultra Ball',
  MASTERBALL = 'Master Ball',
  SAFARIBALL = 'Safari Ball',
  NETBALL = 'Net Ball',
  DIVEBALL = 'Dive Ball',
  NESTBALL = 'Nest Ball',
  REPEATBALL = 'Repeat Ball',
  TIMERBALL = 'Timer Ball',
  LUXURYBALL = 'Luxury Ball',
  PREMIERBALL = 'Premier Ball'
}

export enum CatchMethod {
  WALK = 'Walk',
  SURF = 'Surf',
  FISH = 'Fish',
  HEADBUTT = 'Headbutt',
  ROCK_SMASH = 'Rock Smash',
  SWEET_SCENT = 'Sweet Scent'
}

export enum Rarity {
  VERY_COMMON = 'Very Common',
  COMMON = 'Common',
  UNCOMMON = 'Uncommon',
  RARE = 'Rare',
  VERY_RARE = 'Very Rare',
  EXTREMELY_RARE = 'Extremely Rare'
}

export enum BerryStage {
  PLANTED = 'Planted',
  SPROUTED = 'Sprouted',
  TALLER = 'Taller',
  FLOWERING = 'Flowering',
  FRUITING = 'Fruiting'
}

export interface GenderRatio {
  male: number;
  female: number;
}

// Utility types for form handling
export interface TabState {
  activeTab: string;
}

export interface UIState {
  isLoading: boolean;
  error: string | null;
  modalOpen: boolean;
  modalContent: string;
}

// Data storage types
export interface AppData {
  investments: Investment[];
  breedingProjects: BreedingProject[];
  berryPlots: BerryPlot[];
  pokedexCompletion: Record<string, boolean>;
  settings: AppSettings;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  defaultRegion: Region;
  autoSave: boolean;
  notifications: boolean;
}