import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useStoreActions, useStoreState} from "easy-peasy";

const PostPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const deletePost = useStoreActions((actions) => actions.deletePost);
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id)

    const handleDelete = (id) => {
        deletePost(id);
        navigate('/');
    }

    return (
        <main className="PostPage">
            <article className="post">
                {post && <>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.dateTime}</p>
                    <p className="postBody">{post.body}</p>
                    <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                    <button className="deleteButton" onClick={() => handleDelete(post.id)}>Delete Post</button>
                </>}
                {!post && <>
                    <h2>Page Not Found.</h2>
                    <p>Well, that's disappointing.</p>
                    <p><Link to='/'>Visit our Homepage</Link></p>
                </>}
            </article>
        </main>
    );
};

export default PostPage;