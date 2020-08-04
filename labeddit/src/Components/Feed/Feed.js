import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts";
const token = window.localStorage.getItem("token");

const axiosConfig = {     
  headers: {       
    Authorization: token     
  }   
}

function Feed() {
  const [posts, setPosts] = useState([]);
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
      console.log(response.data)
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
      console.log("oi") 
      getAllPosts();
    }).catch(err => {
      console.log(err.message)
    })
  }
  

  return (
    <div>
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
      <div>
        {posts.map(post => {
          return (
            <div>
              <h3>{post.username}</h3>
              <p>{post.title}</p>
              <p>{post.text}</p>
            </div>
          )
        })}
      </div>
    </div>
  ) 
}

export default Feed;