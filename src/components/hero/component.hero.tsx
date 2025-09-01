'use client';

import React, { useEffect, useState } from 'react';

import {
  getAvailableGenres,
  getFilterState,
  updateGenreFilter,
} from '../../services/filter.service';

const ComponentHero = () => {
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGenresAndFilters = async () => {
      try {
        // Load available genres
        const genres = await getAvailableGenres();
        setAvailableGenres(genres);

        // Load current filter state
        const filterState = getFilterState();
        setSelectedGenre(filterState.genre);
      } catch (error) {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };

    loadGenresAndFilters();
  }, []);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = event.target.value === 'all' ? null : event.target.value;
    setSelectedGenre(genre);
    updateGenreFilter(genre);
  };

  return (
    <section className='hero pt-48 pb-48'>
      <div className='d-flex justify-content-space-between align-items-center flex-wrap'>
        <h1 className='font-weight-700'>Top Sellers</h1>

        <div className='filter-container d-flex align-items-center gap-12 flex-wrap'>
          <span className='text-xxl text-grey-medium font-weight-700'>
            Genre
          </span>
          <span className='text-xxl text-grey-medium'>|</span>
          <select
            className='filter-genre'
            value={selectedGenre || 'all'}
            onChange={handleGenreChange}
            disabled={loading}
          >
            <option value='all'>All</option>
            {availableGenres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default ComponentHero;
