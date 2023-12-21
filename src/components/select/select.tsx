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
  const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);

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

  const addToSelectedPokemons = (pokemon) => {
    setSelectedPokemons((prevSelectedPokemons) => [...prevSelectedPokemons, pokemon]);
  };

  const removeFromSelectedPokemons = (urlToRemove: number) => {
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
        {...register('selectedPokemon', {validate: (value) => value.length === 4})}
        onChange={() => {
          setValue('selectedPokemon', getValues('selectedPokemon'));
          setSelectedPokemon(getValues('selectedPokemon'));
          onSelect(getValues('selectedPokemon')); // Pass the updated selectedPokemon to onSelect
        }}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {pokemonList.map((pokemon) => (
          <option key={pokemon.url} value={pokemon.name} onClick={() => addToSelectedPokemons(pokemon)}>
            {pokemon.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {selectedPokemons.map((pokemon) => (
        <button key={pokemon.url} onClick={() => removeFromSelectedPokemons(pokemon.url)}>
          {pokemon.name}
        </button>
      ))}
    </div>

  );
};

export default Select;
