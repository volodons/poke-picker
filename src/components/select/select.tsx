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
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon data', error);
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

  return (
    <label htmlFor="selectedPokemon">
      Select Your Team (4 Pokemon):
      <select
        id="selectedPokemon"
        multiple
        {...register('selectedPokemon', { validate: (value) => value.length === 4 })}
        onChange={() => setValue('selectedPokemon', getValues('selectedPokemon'))}
      >
        {pokemonList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.name}>
            {pokemon.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
