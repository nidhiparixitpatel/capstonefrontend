import React, { Component } from 'react';
import { Button, View, ScrollView, Text } from 'react-native';
import Post from './Post';
// import PropTypes from 'prop-types';
import axios from 'axios';

export default class NewsFeed extends Component {

    constructor() {
      super();
      this.state = {
      posts: [],
      error: "",
      // deleteCardCallBack: this.deleteCard,
      // addCardCallBack: this.addCard,
      };
    } 

    componentDidMount() {
      this.getPosts()
    }
  

    getPosts = () => {

      if(this.props.user === false){
        axios.get(`http://172.24.47.79:8000/main/posts/`).then((response) => {
          const updatedPosts = response.data
          updatedPosts.reverse()
          this.setState({posts: updatedPosts})
      
        }).catch((error) => {
          console.log(error);
          });

      } else {
      axios.get(`http://172.24.47.79:8000/main/users/${this.props.user}/posts/`).then((response) => {
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
                // deleteCardCallBack = {this.state.deleteCardCallBack}
                />
    })

    return (
      <View>
        <View>{allPosts}</View>
      </View>
    )
  }
}





// class NewsFeed extends React.Component {

// //   constructor() {
// //     super();
// //     this.state = {
// //       posts: [],
// //       error: "",
// //       deleteCardCallBack: this.deleteCard,
// //       addCardCallBack: this.addCard,
// //     };
// //   }


// //   componentDidMount() {
// //     this.updatePosts()
// //   }

// //   updatePosts = () => {
// //     const url = ''
// //     axios.get(url)
// //       .then((response) => {
// //         this.setState({ posts: response.data });
// //       })
// //       .catch((error) => {
// //         this.setState({ error: error.message });
// //       });
// //   }

// //   deleteCard = (id) => {
// //     const url = `https://inspiration-board.herokuapp.com/cards/${id}`
// //     axios.delete(url)
// //     .then(res => {
// //       console.log(res);
// //       console.log(res.data);
// //       this.updateCards()
// //     })
// //  }

// //  addCard = (cardContent) => {
// //    const url = `${this.props.url}${this.props.boardName}/cards`

// //     axios.post(url, cardContent)
// //     .then((response) => {
// //       this.updateCards()
// //     })
// //     .catch((error) => {
// //       // Use the same idea we had in our GET request
// //       this.setState({ error: error.message });
// //     });
// //  }

//   render() {
  
//     const allPosts = this.state.posts.map((post, i) => {
//       return <Post
//                 key={i}
//                 user={card["card"["id"]]}
//                 content={card["card"]["text"]}
//                 timestamp={card["card"]["emoji"]}
//                 // deleteCardCallBack = {this.state.deleteCardCallBack}
//       />
//     }

//     return (
//       <View>
//         {/* {allPosts} */}
//       </View>)

//   }
// }


// // Board.propTypes = {
// //   url: PropTypes.string.isRequired,
// //   boardName: PropTypes.string.isRequired
// // };