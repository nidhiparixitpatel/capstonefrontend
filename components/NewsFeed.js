import React, { Component } from 'react';
import { View } from 'react-native';
import Post from './Post';
import axios from 'axios';

export default class NewsFeed extends Component {

    constructor() {
      super();
      this.state = {
      posts: [],
      error: "",
      };
    } 

    componentDidMount() {
      this.getPosts()
    }
  

    getPosts = () => {

      if(this.props.user === false){
        axios.get(`http://nivs-capstone.herokuapp.com/main/posts/`).then((response) => {
          const updatedPosts = response.data
          updatedPosts.reverse()
          this.setState({posts: updatedPosts})
      
        }).catch((error) => {
          console.log(error);
          });

      } else {
      axios.get(`http://nivs-capstone.herokuapp.com/main/users/${this.props.user}/posts/`).then((response) => {
        const updatedPosts = response.data
        updatedPosts.reverse()
        this.setState({posts: updatedPosts})
    
      }).catch((error) => {
        console.log(error);
        });
      }

    }



  render() {
  
    let allPosts = this.state.posts.map((post, i) => {
              return <Post 
                key={i}
                user={post["user"]}
                content={post["content"]}
                timestamp={post["timestamp"]}
                />
    })

    return (
      <View>
        <View>{allPosts}</View>
      </View>
    )
  }
}