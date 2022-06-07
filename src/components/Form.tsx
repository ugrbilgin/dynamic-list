import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Form(props) {
  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    page: 0,
    genre: "",
    rating: 0,
  });

  useEffect(() => {
    if(!!props.initial){
      setBookInfo({...props.initial})
    }
  },[props.initial])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBookInfo({ ...bookInfo, [name]: value });
  };

  const submit = () => {
    const basicPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("success");
      }, 1000);
    });

    if (props.type == "edit") {
      updateDoc(doc(db, "books", bookInfo.id), bookInfo)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      setDoc(doc(db, "books", Date.now().toString(16)), bookInfo)
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 1 / 5,
        alignItems: "space-between",
        rowGap: "1rem",
      }}
    >
      <pre>{JSON.stringify(bookInfo, null, 4)}</pre>
      //FIXME: burada onChange kullanacağım ancak daha sonra daha efektif bir
      yol bulacağım
      <TextField
        id="title"
        label="Title"
        name="title"
        variant="standard"
        onChange={handleChange}
        value={bookInfo.title}
      />
      <TextField
        id="author"
        label="Author"
        name="author"
        variant="standard"
        onChange={handleChange}
        value={bookInfo.author}
      />
      <TextField
        id="page"
        label="Page"
        name="page"
        variant="standard"
        onChange={handleChange}
        value={bookInfo.page}
      />
      <TextField
        id="genre"
        label="Genre"
        name="genre"
        variant="standard"
        onChange={handleChange}
        value={bookInfo.genre}
      />
      <Typography component="legend">Rate the book</Typography>
      <Rating
        name="rating"
        defaultValue={0}
        precision={0.5}
        size="large"
        onChange={handleChange}
        value={bookInfo.rating}
      />
      <Button variant="contained" color="primary" onClick={submit}>
        Add
      </Button>
    </Box>
  );
}
