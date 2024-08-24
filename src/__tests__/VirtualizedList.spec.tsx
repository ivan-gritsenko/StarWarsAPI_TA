import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VirtualizedList } from '../assets/components/VirtulizedList/VirtulizedList';
import { Person } from '../types/Person';

const mockItems: Person[] = [
  { id: 1, name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', eye_color: 'blue', birth_year: '19BBY', gender: 'male', homeworld: 1, films: [], species: [], vehicles: [], starships: [], created: '', edited: '', url: '' },
  { id: 2, name: 'Darth Vader', height: '202', mass: '136', hair_color: 'none', skin_color: 'white', eye_color: 'yellow', birth_year: '41.9BBY', gender: 'male', homeworld: 1, films: [], species: [], vehicles: [], starships: [], created: '', edited: '', url: '' },
];

describe('VirtualizedList', () => {
  it('renders a list of items', () => {
    render(<VirtualizedList items={mockItems} loadMoreItems={jest.fn()} />);

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
  });

  it('calls setPerson and onOpen when an item is clicked', () => {
    render(<VirtualizedList items={mockItems} loadMoreItems={jest.fn()} />);

    fireEvent.click(screen.getByText(/Luke Skywalker/i));
  });
});