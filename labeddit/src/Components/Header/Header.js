import React, { useState} from 'react';
import { ContainerHeader } from './style';
import axios from 'axios';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts";
const token = window.localStorage.getItem("token");

const axiosConfig = {     
  headers: {       
    Authorization: token     
  }   
}

function Header(props) {
    const [textPost, setTextPost] = useState("");
    const [titlePost, setTitlePost] = useState("");
    const [textComment, setTextComment] = useState("");


    const handleText = (e) =>{
        setTextPost(e.target.value)
    }

    const handleTitle = (e) => {
        setTitlePost(e.target.value)
    }

    const handleTextComment = (e) => {
        setTextComment(e.target.value)
    }
    
    const createPost = (event) => {
        event.preventDefault();
    
        const body = { 
          "text": textPost,
          "title": titlePost
        }
    
        axios
        .post(`${baseUrl}`, body, axiosConfig)
        .then(response => {
          console.log(response.data)
          alert("Post criado com sucesso")
        }).catch(err => {
          console.log(err.message)
        })
      }

      const createComment = (event) => {
        event.preventDefault();
    
        const body = { 
          "text": textComment,
        }
    
        axios
        .post(`${baseUrl}/${props.idPost}/comment`, body, axiosConfig)
        .then(response => {
          console.log(response.data)
          alert("Comentário criado com sucesso")
        }).catch(err => {
          console.log(err.message)
        })
      }
  return (
    <ContainerHeader>
        { props.changeHeader === false ?
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
            </div>
        :
            <div>
                <form onSubmit={createComment}>
                <input
                    onChange={handleTextComment}
                    required
                    placeholder="Comentário"
                    ></input>
                <button>Comentar</button>
                </form>
            </div>
        }

    </ContainerHeader>
  )
}

export default Header;