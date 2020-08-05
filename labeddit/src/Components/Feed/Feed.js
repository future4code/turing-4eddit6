import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Header, Post, Comments } from './style'

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts";
const token = window.localStorage.getItem("token");

const axiosConfig = {     
  headers: {       
    Authorization: token     
  }   
}

function Feed() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [idPost, setIdPost] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getAllPosts()
  }, [])

  const handleText = (e) =>{
    setText(e.target.value)
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const getAllPosts = () => {
    
    axios.get(`${baseUrl}`, axiosConfig)
    .then(response => {
      setPosts(response.data.posts)
    }).catch(err => {
      console.log(err.message)
    })
  }

  const getDetailPosts = ( idPost ) => {
    axios.get(`${baseUrl}/${idPost}`, axiosConfig)
    .then(response => {
      setComments(response.data.post.comments)
      setIdPost(idPost)
    }).catch(err => {
      console.log(err.message)
    })
  }

  const createPost = (event) => {
    event.preventDefault();

    const body = { 
      "text": text,
      "title": title
    }

    axios
    .post(`${baseUrl}`, body, axiosConfig)
    .then(response => {
      console.log(response.data)
      getAllPosts();
    }).catch(err => {
      console.log(err.message)
    })
  }

  const putVote = ( idPost, vote, upDown ) => {
    let choice = vote
    if( upDown === 1 ) {
      choice += 1
    } else {
      choice -= 1
    }

    const body = { 
      "direction": choice
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
      <Header>
        <form onSubmit={createPost}>
          <input
            onChange={handleTitle}
            required
            placeholder="title"
          ></input>
          <input
            onChange={handleText}
            required
            placeholder="text"
          ></input>
          <button>Postar</button>
        </form>
      </Header>
      <section>
        {posts.map(post => {
          return (
            <Post key={post.id} onClick={() => getDetailPosts(post.id)}>
              <div>
                <span onClick={() => putVote(post.id, post.votesCount, 1)}>+</span>
                <span>{post.votesCount}</span>
                <span onClick={() => putVote(post.id, post.votesCount, -1)}>-</span>
              </div>
              <div>
                <h3>{post.username}</h3>
                <div>
                  <p>{post.title}</p>
                  <p>{post.text}</p>
                </div>
                { post.id === idPost ?
                  <Comments>
                    {comments.map(comment => {
                      return <p key={comment.id}>{comment.text}</p>
                    })}
                  </Comments>
                : 
                  <p onClick={() => getDetailPosts(post.id)}>Comentários</p>
                }
              </div>
            </Post>
          )
        })}
        
      </section>
    </Container>
  ) 
}

export default Feed;