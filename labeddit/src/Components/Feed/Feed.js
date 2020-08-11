import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container,  Post } from './style'
import PostDetail from '../PostDetail/PostDetail'
import Header from '../Header/Header'

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts";
const token = window.localStorage.getItem("token");

const axiosConfig = {     
  headers: {       
    Authorization: token     
  }   
}

function Feed() {
  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState("");

  const [showDetailPost, setShowDetailPost] = useState(false);

  const handleShowDetail = () => {
    setShowDetailPost(!showDetailPost)
  }

  const getIdPost = id => {
    setIdPost(id)
    handleShowDetail()
  }

  useEffect(() => {
    getAllPosts()
  }, [])


  const getAllPosts = () => {
    
    axios.get(`${baseUrl}`, axiosConfig)
    .then(response => {
      setPosts(response.data.posts)
    }).catch(err => {
      console.log(err.message)
    })
  }

  const putVote = ( idPost, direction, upDown ) => {
    let vote
    if( direction === 1 || direction === -1){
      vote = 0
    } else {
      if( upDown === "UP" ) {
        vote = 1
      } else {
        vote = -1
      }
    }

    const body = { 
      "direction": vote
    }

    axios.put(`${baseUrl}/${idPost}/vote`, body, axiosConfig)
    .then(response => {
      console.log(response.data)
      getAllPosts()
    }).catch(err => {
      console.log(err.message)
    })
  }
  
  return (
    <Container>
      <Header changeHeader={showDetailPost} idPost={idPost}/>
      { posts.length === 0 ?
        <div>Loading...</div>
      :
        <section>
          { showDetailPost === false ?
            <>{posts.map(post => {
              return (
                    <Post key={post.id}>
                      <div>
                        <span onClick={() => putVote(post.id, post.userVoteDirection, "UP")}>+</span>
                        <span>{post.votesCount}</span>
                        <span onClick={() => putVote(post.id, post.userVoteDirection, "DOWN")}>-</span>
                      </div>
                      <div>
                        <h3>{post.username}</h3>
                        <div>
                          <p>{post.title}</p>
                          <p onClick={() => getIdPost(post.id)}>{post.text}</p>
                        </div>
                      </div>
                    </Post>  
              )
            })}</>
          :
            <PostDetail idPost={idPost} goBack={handleShowDetail}/>
          }
        </section>
      }
    </Container>
  ) 
}

export default Feed;