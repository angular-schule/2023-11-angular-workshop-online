export interface Book {
  isbn: string;
  title: string;
  rating: number;
  description: string;
  // authors: string[];
  price: number;
}

// Argumente für Rohdaten + Interface statt Klasse:
// - Serialisierbarkeit
// - Klonbarkeit / Immutability
// Mehr dazu im Buch ab Seite 94
