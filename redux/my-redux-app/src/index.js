import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./app/store";
import {fetchUsers} from "./features/users/usersSlice";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {fetchPosts} from "./features/posts/postsSlice";

const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
