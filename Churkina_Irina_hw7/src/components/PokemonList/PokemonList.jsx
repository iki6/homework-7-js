import React, {Component} from 'react';
import ListItem from '../ListItem';
import PokemonDetails from '../PokemonDetails';
import './PokemonList.css';
export default class PokemonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons: [],
            curPage: this.props.match.url,
            curPokemonListPage: 0,
            requestUrlPart: '',
            probablyLastPage: false,
            pokemonNames: []
        }
        this.loadPokemons = this.loadPokemons.bind(this);
    }
    loadPokemons() {
        this.state.curPokemonListPage++;
        fetch(`${this.props.dbLink}${this.state.curPage}?_page=${this.state.curPokemonListPage}&_limit=${this.props.pageLimit}`).then(data => data.json()).then((pokemonsList) => {
            this.setState({
                pokemons: this.state.pokemons.concat(pokemonsList)
            });
            pokemonsList.length < this.props.pageLimit ? this.setState({
                probablyLastPage: true
            }) : '';
            this.state.pokemons.map(pokemon => {
                pokemon.hasBeenCaught = false;
                fetch(`${this.props.dbLink}${this.props.defaultLink}${pokemon.id}/caughtPokemon`).then(data => {
                    if (data.status == 200) {
                        pokemon.hasBeenCaught = true
                        fetch(`${this.props.dbLink}${this.props.defaultLink}${pokemon.id}`).then(data => data.json()).then(response => {
                            this.setState({
                                pokemonNames: this.state.pokemonNames.concat([response.name])
                            })
                        })
                    }
                })
            })
        })
    }
    componentDidMount() {
        this.loadPokemons();
    }
    render() {
        const pokemons = this.state.pokemons;
        const imageUrl = this.props.imageDirectory;
        return (
            <React.Fragment>
              <ul className = "pokemons-list"> {
                this.state.pokemons.map(pokemon => React.createElement(ListItem, {
                    key: pokemon.id,
                    id: pokemon.id,
                    name: pokemon.name || this.state.pokemonNames[pokemons.indexOf(pokemon)],
                    image: 'https://raw.githubusercontent.com/epam-js-may-2018/homework-7-js/master/pokemons/'+ pokemon.id+'.png',
                    url: this.props.defaultLink + pokemon.id,
                    hasBeenCaught: pokemon.hasBeenCaught
                }))
            } </ul>
              <button hidden = {this.state.probablyLastPage} id = 'load-more-btn' onClick = {this.loadPokemons}> Load more </button>
            </React.Fragment>)
    }
}
PokemonList.defaultProps = {
    pageLimit: 24,
    dbLink: 'http://localhost:3000',
    imagePath: '/pokemons/',
    imageType: '.png',
    defaultLink: '/pokemons/',
    caughtOnes: '/caughtPokemons/',
    imageDirectory: '/pokemons/',
}
