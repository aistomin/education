import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useState, useEffect} from "react";
import {format} from "date-fns";
import api from './api/posts';
import EditPost from "./EditPost";
import useWindowsSize from "./hooks/useWindowsSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const {width} = useWindowsSize();
    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => setPosts(data), [data]);

    useEffect(() => {
        const filteredResults = posts.filter(post =>
            (post.body.toLowerCase().includes(search.toLowerCase()))
            || (post.title.toLowerCase().includes(search.toLowerCase()))
        )
        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = {
            id: id,
            dateTime: dateTime,
            title: postTitle,
            body: postBody
        };
        try {
            const response = await api.post('/posts', newPost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    const handleEdit = async (id) => {
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {
            id: id,
            dateTime: dateTime,
            title: editTitle,
            body: editBody
        };
        try {
            const reponse = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map(post => post.id === id ? {...reponse.data} : post));
            setEditTitle('');
            setEditBody('');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`posts/${id}`);
            const postsList = posts.filter(post => post.id !== id);
            setPosts(postsList);
            navigate('/');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="App">
            <Header title="React JS Blog" width={width}/>
            <Nav search={search} setSearch={setSearch}/>
            <Routes>
                <Route path="/" element={<Home
                    posts={searchResults}
                    fetchError={fetchError}
                    isLoading={isLoading}
                />}/>
                <Route exact path="/post"
                       element={<NewPost
                           handleSubmit={handleSubmit}
                           postTitle={postTitle}
                           setPostTitle={setPostTitle}
                           postBody={postBody}
                           setPostBody={setPostBody}
                       />}
                />
                <Route path="/edit/:id"
                       element={<EditPost
                           posts={posts}
                           handleEdit={handleEdit}
                           editTitle={editTitle}
                           setEditTitle={setEditTitle}
                           editBody={editBody}
                           setEditBody={setEditBody}
                       />}
                />
                <Route exact path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="*" element={<Missing/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
