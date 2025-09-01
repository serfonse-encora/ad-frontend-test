/**
 * Service for handling game-related API operations
 */

export interface Game {
  id: string;
  genre: string;
  image: string;
  name: string;
  description: string;
  price: number;
  isNew: boolean;
}

export interface GamesResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

export const fetchGames = async (
  page: number = 1,
  genre?: string
): Promise<GamesResponse> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  if (genre) {
    params.append('genre', genre);
  }

  const response = await fetch(`/api/games?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: GamesResponse = await response.json();

  return data;
};

/**
 * Fetches games for a specific page (convenience method that returns only games array)
 * @param page Page number to fetch
 * @param genre Optional genre filter
 * @returns Promise<Game[]> Array of games
 */
export const fetchGamesPage = async (
  page: number = 1,
  genre?: string
): Promise<Game[]> => {
  const response = await fetchGames(page, genre);
  return response.games || [];
};
