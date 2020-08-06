import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContainerPost, Comments } from './style';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts";
const token = window.localStorage.getItem("token");

const axiosConfig = {     
  headers: {       
    Authorization: token     
  }   
}

function PostDetail(props) {
    const [comments, setComments] = useState([]);

    let postId = props.idPost

    useEffect(() => {
      getDetailPosts(props.idPost)
    }, [])

    const getDetailPosts = ( idPost ) => {
        axios.get(`${baseUrl}/${idPost}`, axiosConfig)
        .then(response => {
          setComments(response.data.post.comments)
        }).catch(err => {
          console.log(err.message)
        })
      }

      const putVoteComment = ( idComment, direction, upDown ) => {
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
    
        axios.put(`${baseUrl}/${postId}/comment/${idComment}/vote`, body, axiosConfig)
        .then(response => {
          console.log(response.data)
        }).catch(err => {
          console.log(err.message)
        })
      }
  return (
      <ContainerPost>
        { comments.length === 0 ?
          <div>Loading...</div>
        :
          <><div>
            <span onClick={props.goBack}>Voltar</span>
          </div>
          <div>
            {comments.map(comment => {
                return (
                    <Comments key={comment.id}>
                        <div>
                            <span onClick={() => putVoteComment(comment.id , comment.userVoteDirection, "UP" )}>+</span>
                            <span>{comment.votesCount}</span>
                            <span onClick={() => putVoteComment(comment.id, props.idPost.userVoteDirection, "DOWN")}>-</span>
                        </div>
                        <p key={comment.id}>{comment.text}</p>
                    </Comments>
                )
            })}
          </div></>
        }
      </ContainerPost>
  )
}

export default PostDetail;