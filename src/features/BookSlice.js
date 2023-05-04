import { createSlice } from "@reduxjs/toolkit"
import api from "../apiService";
import { toast } from "react-toastify";


const initialState = {
    books: [],
    error: null,
    isLoading: false,
    book: {},
}

export const bookSlice = createSlice({ 
    name: "books",
    initialState,
    reducers: {
        startLoading (state) {
            state.isLoading = true;
            console.log("start loading");
        },
        endLoading (state) {
            state.isLoading = false;
            console.log("end loading");
        },
        hasError (state, action) {
            console.log(action)
            state.isLoading = false;
            state.error = action.payload;
        },
        getAllBooksSuccess (state, action) {
            console.log(action)
            state.books = action.payload;
            state.isLoading = false;
        },
        getDetailBookSuccess (state, action) {
            state.book = action.payload;
            state.isLoading = false;
        },
        setAddingBook(state, action) {
            state.isLoading = false;
            toast.success("The book has been added to the reading list!");
        },
        removeFavoriteBookSuccess(state, action) {
            toast.success("The book has been removed");
            state.isLoading = false;
        },
        getFavoriteBookSuccess(state, action) {
            state.isLoading = false;  
            state.books = action.payload;
        }
    }
})



export default bookSlice.reducer;


export const getAllBooks = ({pageNum , limit , query}) => async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
      let url = `/books?_page=${pageNum}&_limit=${limit}`;
        if (query) url += `&q=${query}`;
        const res = await api.get(url);
        dispatch(bookSlice.actions.getAllBooksSuccess(res?.data))
  } catch (error) {
    dispatch(bookSlice.actions.hasError(error));
    }
    dispatch(bookSlice.actions.endLoading());
};

export const getDetailBook = ({bookId}) =>
  async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
        const res = await api.get(`/books/${bookId}`);
        dispatch(bookSlice.actions.getDetailBookSuccess(res?.data)); //{}
    } catch (error) {
      dispatch(bookSlice.actions.hasError(error));
    }
    dispatch(bookSlice.actions.endLoading());
    };
  
export const addFavoriteBook = ({ addingBook }) =>
    async (dispatch) => {
        dispatch(bookSlice.actions.startLoading());
        try {
            const res = await api.post(`/favorites`, addingBook); //addingBook {}
            dispatch(bookSlice.actions.setAddingBook())
        } catch (error) {
            dispatch(bookSlice.actions.hasError(error));
            toast.error(error);
        }
        dispatch(bookSlice.actions.endLoading());
    };

export const removeFavoriteBook =
  ({ removedBookId }) =>
  async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
      const res = await api.delete(`/favorites/${removedBookId}`);
        dispatch(bookSlice.actions.removeFavoriteBookSuccess());
        dispatch(getFavorite());
    } catch (error) {
        dispatch(bookSlice.actions.hasError());
        toast.error(error);
    }
    dispatch(bookSlice.actions.endLoading());
        };
  
export const getFavorite = () =>
  async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
      const res = await api.get(`/favorites`);
      dispatch(bookSlice.actions.getFavoriteBookSuccess(res?.data)); //{}
    } catch (error) {
      dispatch(bookSlice.actions.hasError(error));
    }
    dispatch(bookSlice.actions.endLoading());
  };        