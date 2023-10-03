import { useEffect, useState } from "react";
import { getPostById } from "../services/postService";

export const usePost = (id: string) => {
    const [post, setPost] = useState<{title: string, body: string} | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const fetchedPost = await getPostById(id);
                    setPost(fetchedPost);
                    setIsLoading(false);
                } catch (error) {
                    setIsError(true);
                    setIsLoading(false);
                }
            })();
        }
    }, [id]);

    return { post, isLoading, isError };
};
