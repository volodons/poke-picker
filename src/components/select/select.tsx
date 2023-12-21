import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface Pokemon {
  name: string;
  url: string;
}

interface SelectProps {
  onSelect: (selectedPokemons: string[]) => void;
}

const Select: React.FC<SelectProps> = ({ onSelect }) => {
  const { register, setValue, getValues } = useForm();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

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
    const randomIndex = Math.floor(Math.random() * allColors.length);
    return allColors[randomIndex];
  };

  const addToSelectedPokemons = (pokemon: Pokemon) => {
    if (selectedPokemons.length < 4) {
      const isPokemonAlreadySelected = selectedPokemons.some(
        (selectedPokemon) => selectedPokemon.url === pokemon.url
      );

      if (!isPokemonAlreadySelected) {
        const coloredPokemon = { ...pokemon, colorClass: getRandomColor() };
        const updatedSelectedPokemons = [...selectedPokemons, coloredPokemon];
        setSelectedPokemons(updatedSelectedPokemons);
        onSelect(updatedSelectedPokemons);
      } else {
        alert(`${pokemon.name} is already selected!`);
      }
    } else {
      alert("Maximum limit of 4 selected Pokémon reached");
    }
  };

  const removeFromSelectedPokemons = (urlToRemove: string) => {
    const updatedSelectedPokemons = selectedPokemons.filter(
      (selectedPokemon) => selectedPokemon.url !== urlToRemove
    );
    setSelectedPokemons(updatedSelectedPokemons);
    onSelect(updatedSelectedPokemons);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <label htmlFor="selectedPokemon" className="block mt-4 text-sm font-medium text-gray-700">
        Select Your Team (4 Pokemon):
      </label>
      <div className="relative mt-1 block w-full">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="my-2 p-2 w-full font-medium border-2 rounded-md focus:outline-none focus:border-blue-500 hover:border-blue-400"
        />
        <div className="absolute right-0 top-0 mt-2 mr-2 space-x-2 overflow-hidden max-w-full">
          {selectedPokemons.map((pokemon) => (
            <button
              key={pokemon.url}
              onClick={() => removeFromSelectedPokemons(pokemon.url)}
              className={`pl-2.5 pr-2.5 pt-0.5 pb-0.5 m-1 rounded-full text-white ${pokemon.colorClass}`}
            >
              {pokemon.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8">
        {filteredPokemonList.map((pokemon) => (
          <button
            key={pokemon.url}
            onClick={() => addToSelectedPokemons(pokemon)}
            className={`pl-2.5 pr-2.5 pt-0.5 pb-0.5 m-1 rounded-full text-white ${getRandomColor()}`}
          >
            {pokemon.name}
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
