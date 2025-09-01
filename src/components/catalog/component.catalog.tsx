'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { addToCart, isGameInCart } from '../../services/cart.service';
import { getFilterState } from '../../services/filter.service';
import { fetchGames, Game } from '../../services/games.service';

const ComponentCatalog = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [_error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [_totalPages, setTotalPages] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0);
  const [currentGenreFilter, setCurrentGenreFilter] = useState<string | null>(
    null
  );

  const loadGames = useCallback(
    async (
      page: number,
      isLoadMore: boolean = false,
      genre?: string | null
    ) => {
      try {
        if (isLoadMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        // Use current genre filter if not explicitly provided
        const genreToUse = genre !== undefined ? genre : currentGenreFilter;
        const data = await fetchGames(page, genreToUse || undefined);

        if (data && Array.isArray(data.games)) {
          if (isLoadMore) {
            setGames(prevGames => [...prevGames, ...data.games]);
          } else {
            setGames(data.games);
          }
          setCurrentPage(data.currentPage);
          setTotalPages(data.totalPages);
          setHasMorePages(data.currentPage < data.totalPages);
          setError(null);
        } else {
          setError('Invalid data format received');
          if (!isLoadMore) {
            setGames([]);
          }
        }
      } catch (err) {
        setError('Failed to load games');
        if (!isLoadMore) {
          setGames([]);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [currentGenreFilter]
  );

  useEffect(() => {
    // Load initial filter state and games
    const filterState = getFilterState();
    setCurrentGenreFilter(filterState.genre);
    loadGames(1, false, filterState.genre);
  }, [loadGames]);

  // Listen for cart changes to update button states
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartUpdateTrigger(prev => prev + 1);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  // Listen for filter changes
  useEffect(() => {
    const handleFilterUpdate = (event: CustomEvent) => {
      const newFilters = event.detail;
      setCurrentGenreFilter(newFilters.genre);
      // Reset to page 1 and reload games with new filter
      setCurrentPage(1);
      loadGames(1, false, newFilters.genre);
    };

    window.addEventListener('filtersUpdated', handleFilterUpdate as any);

    return () => {
      window.removeEventListener('filtersUpdated', handleFilterUpdate as any);
    };
  }, [loadGames]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMorePages) {
      loadGames(currentPage + 1, true);
    }
  };

  const handleAddToCart = async (game: Game) => {
    // Check if game is already in cart
    if (isGameInCart(game.id)) {
      return;
    }

    try {
      setAddingToCart(game.id);
      const success = addToCart(game);

      if (success) {
        // Force re-render by updating cart trigger state
        setCartUpdateTrigger(prev => prev + 1);
      }
    } catch (error) {
      // Handle error silently
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
    return (
      <section className='pt-48 pb-48'>
        <p>Loading games...</p>
      </section>
    );
  }

  return (
    <section className='pt-48 pb-48'>
      {Array.isArray(games) && games.length > 0 ? (
        <>
          <div className='columns equal-3'>
            {games.map(game => {
              // Recalculate cart status on each render when cartUpdateTrigger changes
              const gameInCart = isGameInCart(game.id);
              const isAddingThisGame = addingToCart === game.id;

              return (
                <div className='card' key={`${game.id}-${cartUpdateTrigger}`}>
                  <Image
                    src={game.image}
                    alt={game.name}
                    width={200}
                    height={100}
                  />
                  <p className='text-neutral-500 font-weight-700 text-reading mt-24'>
                    {game.genre}
                  </p>
                  <div className='d-flex justify-content-space-between mt-24'>
                    <p className='text-reading text-grey-medium font-weight-700'>
                      {game.name}
                    </p>
                    <p className='text-reading text-grey-medium font-weight-700'>
                      ${game.price}
                    </p>
                  </div>
                  <button
                    className={`button ${gameInCart ? 'primary' : 'outline'} mt-24 full-width`}
                    onClick={() => handleAddToCart(game)}
                    disabled={isAddingThisGame || gameInCart}
                  >
                    {(() => {
                      if (isAddingThisGame) {
                        return 'Adding...';
                      }
                      if (gameInCart) {
                        return 'Already in Cart';
                      }
                      return 'Add to Cart';
                    })()}
                  </button>
                </div>
              );
            })}
          </div>

          {hasMorePages && (
            <div className='mt-24'>
              <button
                className='button primary'
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div>No games available</div>
      )}
    </section>
  );
};

export default ComponentCatalog;
