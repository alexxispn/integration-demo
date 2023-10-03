import {PostCard} from "../PostCard/PostCard";
import {Link} from "react-router-dom";

export const PostContainer = ({isLoading, isError, post}: {isLoading: boolean, isError: boolean, post: any}): JSX.Element => {
    return (
        <div>
            {isError ? (
                <div>Error loading post</div>
            ) : isLoading || !post ? (
                <div>Loading...</div>
            ) : (
                <>
                    <PostCard {...post} />
                    <Link to="/post">Back to Home</Link>
                </>
            )}
        </div>
    );
}
