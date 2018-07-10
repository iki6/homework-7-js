import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PokemonList from '../PokemonList';
import PokemonDetails from '../PokemonDetails';
import WelcomePage from '../WelcomePage';
import './Main.css';

export default class Main extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <main role="main">
        <div className="container">
          <BrowserRouter>
            <Switch>
            <Route path={this.props.pokemonsLink} exact component={PokemonList}/>
            <Route path={this.props.caugthPokemonsLink} exact component={PokemonList}/>
            <Route path={this.props.specificPokemon} component={PokemonDetails} />
            <Route path='/' component={WelcomePage} />
            </Switch>
          </BrowserRouter>
        </div>
      </main>
    )
  }
}

Main.defaultProps = {
  pokemonsLink: '/pokemons',
  caugthPokemonsLink: '/caughtPokemons',
  specificPokemon: '/pokemons/:pokemonId'
}
