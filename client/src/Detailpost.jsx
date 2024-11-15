import { useState, useEffect, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import Comment from './Comment'
import { useLocation } from "react-router-dom";
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const Detailpost = () => {
   
    
    const [post, setPost] = useState(null);
    const path = useLocation().pathname.split("/")[3];
    
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchVideo = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/posts/find/${path}`);
          setPost(response.data);
        //   console.log(response.data);
          console.log(post);
        } catch (error) {
          console.error("Error fetching video data", error);
        } finally {
          setLoading(false); // Set loading to false once the request is complete
        }
      };
  
      fetchVideo();
    }, []);
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (!post) {
      return <p>No post data available.</p>;
    }
 

    return (
      <>
        <Container>
            <Image src={`http://localhost:8000/uploads/${post.thumbnail}`} alt="post" />
          
            <Heading>{post.title}</Heading>

            <Author>
               
                    <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
             
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdAt).toDateString()}</Typography>
            </Author>

            <Typography>{post.description}</Typography>
           
        </Container>
        <Comment></Comment>
        </>
    )
}

export default Detailpost;