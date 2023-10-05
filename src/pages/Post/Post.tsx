import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import { PostContainer } from "../../components/PostContainer/PostContainer";

export const Post = (): JSX.Element => {
    const { id } = useParams();
    const { post, isLoading, isError } = usePost(id as string);

    return (
        <div>
            <h1>Post {id}</h1>
            <PostContainer isLoading={isLoading} isError={isError} post={post} />
        </div>
    );
}
