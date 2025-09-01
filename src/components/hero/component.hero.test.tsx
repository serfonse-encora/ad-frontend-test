import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import '@testing-library/jest-dom';

import * as filterService from '../../services/filter.service';

import ComponentHero from './component.hero';

// Mock the filter service
jest.mock('../../services/filter.service');

const mockFilterService = filterService as jest.Mocked<typeof filterService>;

describe('ComponentHero', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFilterService.getAvailableGenres.mockResolvedValue([
      'Action',
      'Adventure',
      'RPG',
      'Shooter',
    ]);
    mockFilterService.getFilterState.mockReturnValue({ genre: null });
  });

  it('renders the hero section with filter dropdown', async () => {
    await act(async () => {
      render(<ComponentHero />);
    });

    const heroSection = screen.getByText('Top Sellers');
    expect(heroSection).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Genre')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  it('displays available genres in dropdown', async () => {
    await act(async () => {
      render(<ComponentHero />);
    });

    await waitFor(() => {
      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toBeInTheDocument();

      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByText('Adventure')).toBeInTheDocument();
      expect(screen.getByText('RPG')).toBeInTheDocument();
      expect(screen.getByText('Shooter')).toBeInTheDocument();
    });
  });

  it('calls updateGenreFilter when dropdown selection changes', async () => {
    await act(async () => {
      render(<ComponentHero />);
    });

    await waitFor(() => {
      const dropdown = screen.getByRole('combobox');
      fireEvent.change(dropdown, { target: { value: 'Action' } });
    });

    expect(mockFilterService.updateGenreFilter).toHaveBeenCalledWith('Action');
  });

  it('sets genre to null when "All" is selected', async () => {
    await act(async () => {
      render(<ComponentHero />);
    });

    await waitFor(() => {
      const dropdown = screen.getByRole('combobox');
      fireEvent.change(dropdown, { target: { value: 'all' } });
    });

    expect(mockFilterService.updateGenreFilter).toHaveBeenCalledWith(null);
  });

  it('displays the correct layout with title and filter', async () => {
    await act(async () => {
      render(<ComponentHero />);
    });

    const heroSection = document.querySelector('section');
    expect(heroSection).toBeInTheDocument();

    const title = screen.getByText('Top Sellers');
    expect(title.tagName).toBe('H1');

    await waitFor(() => {
      const filterContainer = screen.getByText('Genre').parentElement;
      expect(filterContainer).toBeInTheDocument();
    });
  });

  it('displays the "Top Sellers" heading', async () => {
    await act(async () => {
      render(<ComponentHero />);
    });

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Top Sellers');
    expect(heading).toHaveClass('font-weight-700');
  });

  it('renders without crashing', () => {
    expect(() => render(<ComponentHero />)).not.toThrow();
  });
});
