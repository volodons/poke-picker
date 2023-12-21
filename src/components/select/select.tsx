import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface Pokemon {
  name: string;
  url: string;
}

interface SelectProps {
  onSelect: (selectedPokemon: string[]) => void;
}

const Select: React.FC<SelectProps> = ({ onSelect }) => {
  const { register, setValue, getValues } = useForm();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        setError('Failed to fetch Pokemon data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const getRandomColor = () => {
    const allColors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500',
    ];
    const currentIndex = selectedPokemons.length % allColors.length;
    return allColors[currentIndex];
  };

  const addToSelectedPokemons = (pokemon: Pokemon) => {
    const isPokemonAlreadySelected = selectedPokemons.some(
      (selectedPokemon) => selectedPokemon.url === pokemon.url
    );

    if (!isPokemonAlreadySelected) {
      const coloredPokemon = { ...pokemon, colorClass: getRandomColor() };
      setSelectedPokemons((prevSelectedPokemons) => [...prevSelectedPokemons, coloredPokemon]);
    }
  };

  const removeFromSelectedPokemons = (urlToRemove: string) => {
    const updatedSelectedPokemons = selectedPokemons.filter(
      (selectedPokemon) => selectedPokemon.url !== urlToRemove
    );
    setSelectedPokemons(updatedSelectedPokemons);
  };

  return (
    <div>
      <label htmlFor="selectedPokemon" className="block text-sm font-medium text-gray-700">
        Select Your Team (4 Pokemon):
      </label>
      <select
        id="selectedPokemon"
        multiple
        {...register('selectedPokemon', { validate: (value) => value.length === 4 })}
        onChange={() => {
          setValue('selectedPokemon', getValues('selectedPokemon'));
          setSelectedPokemon(getValues('selectedPokemon'));
          onSelect(getValues('selectedPokemon'));
        }}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {pokemonList.map((pokemon) => (
          <option
            key={pokemon.url}
            value={pokemon.url}
            onClick={() => addToSelectedPokemons(pokemon)}
          >
            {pokemon.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <div className="mt-4 space-x-2">
        {selectedPokemons.map((pokemon) => (
          <button
            key={pokemon.url}
            onClick={() => removeFromSelectedPokemons(pokemon.url)}
            className={`pl-2.5 pr-2.5 pt-0.5 pb-0.5 m-1 rounded-md text-white ${pokemon.colorClass}`}
          >
            {pokemon.name} <span className="ml-2">&#10006;</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
