/**
 * Service for handling filter operations
 */

export interface FilterState {
  genre: string | null;
}

const FILTER_STORAGE_KEY = 'gamershop_filters';

/**
 * Get current filter state from localStorage
 * @returns FilterState Current filter state
 */
export const getFilterState = (): FilterState => {
  try {
    const filterData = localStorage.getItem(FILTER_STORAGE_KEY);
    if (!filterData) {
      return { genre: null };
    }
    return JSON.parse(filterData);
  } catch (error) {
    return { genre: null };
  }
};

/**
 * Save filter state to localStorage
 * @param filters Filter state to save
 */
export const saveFilterState = (filters: FilterState): void => {
  try {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
    // Dispatch custom event to notify other components of filter changes
    window.dispatchEvent(
      new CustomEvent('filtersUpdated', { detail: filters })
    );
  } catch (error) {
    // Fail silently
  }
};

/**
 * Update genre filter
 * @param genre Genre to filter by (null for all)
 */
export const updateGenreFilter = (genre: string | null): void => {
  const currentFilters = getFilterState();
  const newFilters = { ...currentFilters, genre };
  saveFilterState(newFilters);
};

/**
 * Clear all filters
 */
export const clearAllFilters = (): void => {
  saveFilterState({ genre: null });
};

/**
 * Get available genres from the API response
 * @returns Promise<string[]> Array of available genres
 */
export const getAvailableGenres = async (): Promise<string[]> => {
  try {
    const response = await fetch('/api/games');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.availableFilters || [];
  } catch (error) {
    // Fallback to hardcoded genres if API fails
    return [
      'Action',
      'Adventure',
      'Racing',
      'RPG',
      'Shooter',
      'Simulation',
      'Sports',
      'Strategy',
    ];
  }
};
