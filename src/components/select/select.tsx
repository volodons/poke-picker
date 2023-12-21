import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";

const Select: React.FC = () => {
  const { register, setValue, getValues } = useForm();
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <label>
      Select Your Team (4 Pokemon):
      <select
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
