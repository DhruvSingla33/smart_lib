import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl  } from '@mui/material';
import './Addpost.css'; 
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '70vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;



const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: 2px solid #ccc; 
    border-radius: 4px; 
    margin-top: 50px;
    font-size: 18px;
    padding: 10px; 
    min-height: 100px; /* Set a minimum height */
    max-height: 300px; /* Set a maximum height */
    overflow-y: auto; /* Allow scrolling if the content exceeds the max height */
    &:focus-visible {
        outline: none; 
        border-color: #1976d2; 
    }
`;






const Addpost = () => {
    const [thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState('');

    const { user, isAuthenticated, isLoading } = useAuth0();

   var  username='';
    
    if (isAuthenticated && user) {
        username=user.name;
    } else {
      console.log("User is not authenticated or still loading.");
    }
    
    
    const url = image ? image : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const savePost = async (e) => {
        console.log("hello");
        // e.preventDefault();
    
        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("thumbnail", thumbnail);
        formData.append("username", username); 
        
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
        
        try {
          const response = await fetch("http://localhost:8000/api/posts", {
            method: "POST",
            body: formData,
          });
    
          if (response.ok) {
            console.log("book ho gyi submit")
            setTitle("");
            setSlug("");
            setDescription("");
            setThumbnail(null);
          } else {
            console.log("Failed to submit data.");
          }
        } catch (error) {
          console.log(error);
        }
      };
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setImage(URL.createObjectURL(e.target.files[0]));
          setThumbnail(e.target.files[0]);
        }
      };
     
    return (
        
        <Container data-theme="light">
        <Image src={url} alt="post" />

        <StyledFormControl>
            <label htmlFor="fileInput">
                <Add fontSize="large" color="action" />
            </label>
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={onImageChange}
            />
            <InputTextField onChange={(e) => setTitle(e.target.value)} name='title' placeholder="Title" />
            <InputTextField onChange={(e) => setSlug(e.target.value)} name='slug' placeholder="Slug" />
            <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
        </StyledFormControl>

        <Textarea
            rowsMin={5}
            placeholder="Tell your story..."
            name='description'
            onChange={(e) => setDescription(e.target.value)} 
        />
    </Container>
    );
};

export default Addpost;
