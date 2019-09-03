import React, { Component } from 'react';
import './Joke.css'

 class Joke extends Component {
       getColor() {
             if(this.props.vote >= 15) {
                   return {color: '#4CAF50', smile: 'em em-rolling_on_the_floor_laughing'};
             } else if (this.props.vote >=12) {
                   return  {color: '#8BC34A', smile: 'em em-laughing'};
             } else if (this.props.vote >=9) {
                  return  {color: '#CDDC39', smile: 'em em-smiley'};
             } else if (this.props.vote >=6) {
                  return  {color: '#FFEB3B', smile: 'em em-slightly_smiling_face'};
             } else if (this.props.vote >=3) {
                  return  {color: '#FFC107', smile: 'em em-neutral_face'};
             } else if (this.props.vote >=0) {
                  return {color: '#FF9800', smile: 'em em-confused'};
             } else {
                  return  {color: '#F44336', smile: 'em em-angry'};
             }           
       }


      render() {
            return (
                  <div className='Joke'>
                        <div className='Vote'>
                              <i 
                                    className='fas fa-arrow-up'
                                    onClick={this.props.upvote}
                              />  
                              <span 
                                    className='Vote-rating'
                                    style={{ borderColor: this.getColor().color}}
                              >
                                          {this.props.vote}
                              </span>
                              <i 
                                    className='fas fa-arrow-down'
                                    onClick={this.props.downvote}
                              />  
                        
                        </div>
                        <div className='Joke-text'>
                              {this.props.joke}    
                        </div>
                        <div className='Joke-smile'>
                              <i className={this.getColor().smile}></i>
                        </div>
                  </div>
                  
            )
      }
}

export default Joke;
