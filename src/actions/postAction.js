import axios from "axios";
import { Cookies } from 'react-cookie';
import { CLEAR_ERRORS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, LIKE_UNLIKE_POST_FAIL, LIKE_UNLIKE_POST_REQUEST, LIKE_UNLIKE_POST_SUCCESS, NEW_COMMENT_FAIL, NEW_COMMENT_REQUEST, NEW_COMMENT_SUCCESS, NEW_POST_FAIL, NEW_POST_REQUEST, NEW_POST_SUCCESS, POST_DETAILS_FAIL, POST_DETAILS_REQUEST, POST_DETAILS_SUCCESS, POST_FOLLOWING_FAIL, POST_FOLLOWING_REQUEST, POST_FOLLOWING_SUCCESS, SAVE_UNSAVE_POST_FAIL, SAVE_UNSAVE_POST_REQUEST, SAVE_UNSAVE_POST_SUCCESS } from "../constants/postConstants";


// New Post
export const addNewPost = (postData) => async (dispatch) => {
    try {

        const cookies = new Cookies();
        const token = cookies.get('token');

        console.log(token);
        console.log(postData.get("title"));
        console.log(postData.get("discript"));
        console.log(postData.get("images"));

        const formData = new FormData();
        formData.append("title", postData.get("title"));
        formData.append("discript", postData.get("discript"));
        // formData.append("images", [postData.get("images"), postData.get("images"), postData.get("images")]);
        formData.append("token", token);
        formData.append("images", postData.get('images'));
        formData.append("images", postData.get('images'));
        formData.append("images", postData.get('images'));

        console.log(formData.get("images"));
        // const config = { header: { "Content-Type": "application/json" } }

        dispatch({ type: NEW_POST_REQUEST });
        const config = { 
            headers: { "Content-Type": "multipart/form-data" },  // "multipart/form-data"으로 변경
            withCredentials: true,
        };
        const { data } = await axios.post("https://madcamp.dhki.kr/posts/new", formData, config);

        dispatch({
            type: NEW_POST_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: NEW_POST_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Get Post of Followings
export const getPostsOfFollowing = (page = 1) => async (dispatch) => {
    try {

        dispatch({ type: POST_FOLLOWING_REQUEST });

        setTimeout(async () => {

            const { data } = await axios.get(`/api/v1/posts?page=${page}`);

            dispatch({
                type: POST_FOLLOWING_SUCCESS,
                payload: data,
            });

        }, 300);

    } catch (error) {
        dispatch({
            type: POST_FOLLOWING_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Like | Unlike Post
export const likePost = (postId) => async (dispatch) => {
    try {

        dispatch({ type: LIKE_UNLIKE_POST_REQUEST });
        const { data } = await axios.get(`/api/v1/post/${postId}`);

        dispatch({
            type: LIKE_UNLIKE_POST_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: LIKE_UNLIKE_POST_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Add Comment
export const addComment = (postId, comment) => async (dispatch) => {
    try {

        dispatch({ type: NEW_COMMENT_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post(`/api/v1/post/comment/${postId}`, { comment }, config);

        dispatch({
            type: NEW_COMMENT_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: NEW_COMMENT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Save | Unsave Post
export const savePost = (postId) => async (dispatch) => {
    try {

        dispatch({ type: SAVE_UNSAVE_POST_REQUEST });
        const { data } = await axios.post(`/api/v1/post/${postId}`);

        dispatch({
            type: SAVE_UNSAVE_POST_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: SAVE_UNSAVE_POST_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Post
export const deletePost = (postId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_POST_REQUEST });
        const { data } = await axios.delete(`/api/v1/post/${postId}`);

        dispatch({
            type: DELETE_POST_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: DELETE_POST_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Post Details
export const getPostDetails = (postId) => async (dispatch) => {
    try {

        dispatch({ type: POST_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/post/detail/${postId}`);

        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}