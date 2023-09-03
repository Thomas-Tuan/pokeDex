import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import PokemonList from './features/PokemonList';
import DetailPage from './features/DetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pokemons" />} />
      <Route path="/pokemons/*" element={<PokemonList />} />
      <Route path="/pokemons/:pokemonName" element={<DetailPage />} />
    </Routes>
  );
}

export default App;
