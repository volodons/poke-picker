import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface Pokemon {
  name: string;
  url: string;
}

const Select: React.FC = () => {
  const { register, setValue, getValues } = useForm();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        setError("Failed to fetch Pokemon data");
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
          onSelect(getValues('selectedPokemon'));
        }}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {pokemonList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.name}>
            {pokemon.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
