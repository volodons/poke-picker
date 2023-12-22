import React, { useState, useEffect } from "react";
import axios from "axios";
import { POKE_API_URL } from "../../constants/api/urls";

export interface ModalProps {
  selectedPokemons: string[];
  onClose: () => void;
}

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
}

const Modal: React.FC<ModalProps> = ({ selectedPokemons, onClose }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const requests = selectedPokemons.map(async (pokemon) => {
          const response = await axios.get(`${POKE_API_URL}${pokemon.name}`);
          return response.data;
        });
        const pokemonDetails = await Promise.all(requests);
        setPokemonDetails(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [selectedPokemons]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center bg-white p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Selected Pokémons</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {pokemonDetails.map((details, index) => (
              <div key={index} className="flex flex-col items-center p-4 border-4 border-blue-500 rounded-2xl">
                <img
                  src={details.sprites.front_default}
                  alt="Pokemon Sprite"
                  className="w-16 h-16"
                />
                <span className="font-bold">{details.name}</span>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 font-bold text-white rounded-md transition duration-300 ease-in-out transform hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
