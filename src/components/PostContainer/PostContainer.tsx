import {PostCard} from "../PostCard/PostCard";
import {Link} from "react-router-dom";

export const PostContainer = ({isLoading, isError, post}: {isLoading: boolean, isError: boolean, post: any}): JSX.Element => {

    if (isLoading || !post) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading post</div>
    }
    
    return (
        <>
            <PostCard {...post} />
            <Link to="/post">Back to Home</Link>
        </>
    );
}
