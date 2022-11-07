import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Pagination from '@mui/material/Pagination';
import PokemonCard from "../components/card";
import { Skeletons } from "../components/skeleton";

export const Home2 = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    getPokemons();
  }, []);
  const [page, setPage] = useState(1);

  const getPokemons = () => {
    var endpoints = [];
    for (var i = 1; i < 200; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
  };

  const pokemonFilter = (name) => {
    var filteredPokemons = [];
    if (name === "") {
      getPokemons();
    }
    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }

    setPokemons(filteredPokemons);
  };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth={false}>
      <Pagination
          style={{
            padding: 20,
            // width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
          sx={{ "& .MuiPaginationItem-root": { color: "blue"} }}
          count={(pokemons?.length / 50).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 1);
          }}
        />
        <Grid container spacing={3}>
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.slice((page-1)*40+1).map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types} />
              </Grid>
            ))
          )}
        </Grid>
        
        {/* <Pagination
          style={{
            padding: 20,
            // width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
          sx={{ "& .MuiPaginationItem-root": { color: "blue"} }}
          count={(pokemons?.length / 50).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 1);
          }}
        /> */}
      </Container>
    </div>
  );
};