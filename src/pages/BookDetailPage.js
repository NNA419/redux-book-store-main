import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../apiService";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteBook, getDetailBook, getFavorite } from "../features/BookSlice";


const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  // const [loading, setLoading] = useState(false);
  // const [book, setBook] = useState(null);
  // const [addingBook, setAddingBook] = useState(false);

  const dispatch = useDispatch();

  const params = useParams();
  const bookId = params.id;

  

  const { book, isLoading , favoriteBooks , error} = useSelector((state) => state.bookStore);

  const addToReadingList = (addingBook) => {
    // setAddingBook(book)
    
    const found = favoriteBooks.filter((book) => book.id === addingBook.id)
    dispatch(addFavoriteBook({ addingBook: book }));
    if (found !== null && found.length > 0) {
      
    } else {
      
    }
  };

  useEffect(() => {
    dispatch(getFavorite());
  }, [favoriteBooks.length, dispatch]);
  // useEffect(() => {
  //   const postData = async () => {
  //     if (!addingBook) return;
  //     // setLoading(true);
  //     try {
  //       await api.post(`/favorites`, addingBook); // gửi kèm addingBook
  //       toast.success("The book has been added to the reading list!");
  //     } catch (error) {
  //       toast.error(error.message); 
  //     }
  //     // setLoading(false);
  //   };
  //   postData();
  // }, [addingBook]);

  useEffect(() => {
    dispatch(getDetailBook({bookId}))
  },[bookId])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await api.get(`/books/${bookId}`);
  //       //https:localhost5000/books/...id..
  //       console.log(res);
  //       setBook(res.data);
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [bookId]);
  console.log(error);

  if (error !== null) {
    console.log(error)
    toast.error(error.message);
  }

  return (
    <Container>
      {/* {error ? toast.error(error) : <Container/>} */}
      {isLoading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {book && (
              <img
                width="100%"
                src={`${BACKEND_API}/${book.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {book && (
              <Stack>
                <h2>{book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => addToReadingList(book)}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
