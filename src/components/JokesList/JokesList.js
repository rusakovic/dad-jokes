import React, { Component } from 'react';
import axios from 'axios';
import Joke from '../Joke/Joke';
import './JokesList.css';

const API_URL = 'https://icanhazdadjoke.com/';

class JokesList extends Component {
      static defaultProps = {
            numNewJokes: 10,
      }
       constructor(props) {
             // JSON parse convertst a string to JS object
             // if there is nothing in localstorage - insert [].
             super(props);
             this.state = {
                   jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]' ),
                   loading: false
             };
             // checking the duplicates of the jokes using Set
             this.seenJokesId = new Set(this.state.jokes.map(j => j.id ));

             this.handleClick = this.handleClick.bind(this);
       }

      componentDidMount() {
             //if there are no jokes into the state (in localstorage) we should get new jokes from API
             if(this.state.jokes.length === 0) this.getJokes();
       }   

      async getJokes() {
            let jokes = [];

            while(jokes.length < this.props.numNewJokes) {
                  let res = await axios.get(API_URL, {
                        headers: {Accept: 'application/json'}
                  });
                  // Compare array of jokes to existing jokes into the state to avoid duplicates
                  let newJokeId = res.data.id;
                  if (!this.seenJokesId.has(newJokeId)) {
                        jokes.push({
                              id: res.data.id,
                              text: res.data.joke,
                              vote: 0
                        });
                        //update this.set for new jokes IDs
                        this.seenJokesId.add(newJokeId);
                  }
            }

            // assing array to state
            this.setState(st => ({
                  loading: false,
                  jokes: [...st.jokes, ...jokes]
            }),
            // update localstorage with votes
           this.updateLocalStorage()
            
            )
            // console.log(this.state.jokes)

      }
      
      // update local storage with state
      updateLocalStorage() {
            window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      }

      handleVote(id, delta) {
            this.setState(
                  st => ({
                       jokes: st.jokes.map(j =>
                              j.id === id ? { ...j, vote: j.vote + delta } : j
                        ) 
                  }),
                  // update localstorage with votes
                  this.updateLocalStorage()
            )
      }  
      
      handleClick() {
            // add loading spinner
            this.setState({ loading: true }, this.getJokes);
      }

       
      render() {
            // sorting the jokes array in state according to votes
            let sortedJokes = this.state.jokes.sort((a,b) => b.vote - a.vote);

            let spinner;
            if(this.state.loading) {
                  spinner = <div className='JokeList-spinner'>
                        <i className='far fa-6x fa-laugh fa-spin'  />
                        <h1 >Loading...</h1>
                   </div> 
             } else {
                   spinner = sortedJokes.map((j, idx) => 
                         <Joke 
                               key={j.id} 
                               joke={j.text} 
                               vote={j.vote} 
                               upvote={() => this.handleVote(j.id, 1)}
                               downvote={() => this.handleVote(j.id, -1)}
                         />
                   )
             }
            return (
                  <div className='JokeList'>
                        <div className='JokeList-sidebar'>
                              <h1 className='JokeList-title'>
                                    <span>Dad</span> Jokes
                              </h1>
                              <img src="https://image.flaticon.com/icons/svg/260/260161.svg" alt="smile" />
                              <button 
                                    className='JokeList-getmore'
                                    onClick={this.handleClick}
                              >New Jokes
                              </button>
                        </div>
                        <div className='JokeList-jokes'>
                              {spinner}
                        </div>
                  </div>
            )
      }
}

export default JokesList;