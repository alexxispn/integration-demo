import { render, screen } from "@testing-library/react"
import { Post } from "./Post"
import { useParams } from 'react-router-dom';
import { usePost } from "../../hooks/usePost";
import { PostContainer } from "../../components/PostContainer/PostContainer";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(() => ({ id: '::id::' }))
}))

jest.mock('../../hooks/usePost', () => ({
    usePost: jest.fn(() => ({
        post: '::post::',
        isLoading: false,
        isError: false,
    }))
}))

jest.mock('../../components/PostContainer/PostContainer', () => ({
    PostContainer: jest.fn(() => <div>::PostContainer</div>)
}))

describe('Post', () => {
    test('should render without erros', () => {
        render(<Post />)
        const title = screen.getByText(`Post ::id::`)
        const postContainer = screen.getByText('::PostContainer');
        expect(title).toBeInTheDocument();
        expect(usePost).toHaveBeenNthCalledWith(1, '::id::')
        expect(useParams).toBeCalledTimes(1);
        expect(postContainer).toBeInTheDocument()
        expect(PostContainer).toBeCalledTimes(1)
    })

    test('should render title without id when is not received by params', () => {
        jest.mocked(useParams).mockReturnValue({ id: undefined })
        render(<Post />);
        const title = screen.getByText(`Post`)
        expect(title).toBeInTheDocument()
    })
})
