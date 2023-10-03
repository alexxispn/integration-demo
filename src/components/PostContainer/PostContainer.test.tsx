import { render, screen } from "@testing-library/react"
import { Link } from "react-router-dom"
import { PostCard } from "../PostCard/PostCard"
import { PostContainer } from "./PostContainer"

const props = {
    isLoading: false,
    isError: false,
    post: '::post::'
}

jest.mock('../PostCard/PostCard', () => ({
    PostCard: jest.fn(() => <div>::PostCard::</div>)
}))

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Link: jest.fn(() => <div>::Link::</div>)
}))

describe('PostContainer', () => {
    test('should render PostCard and Link', () => {
        render(
            <PostContainer {...props} />
        )
        expect(screen.getByText('::PostCard::')).toBeInTheDocument()
        expect(screen.getByText('::Link::')).toBeInTheDocument()
        expect(Link).toBeCalledTimes(1)
        expect(PostCard).toBeCalledTimes(1)
    })

    describe('should render loader when', () => {
        test('should render loader when post is undefined and isLoading is false', () => {
            const props2 = {
                ...props,
                post: undefined,
            }
            render(
                <PostContainer {...props2} />
            )
            expect(screen.getByText('Loading...')).toBeInTheDocument()
        })

        test('should render loader when isLoading is true and post is undefined', () => {
            const props2 = {
                ...props,
                isLoading: true
            }
            render(
                <PostContainer {...props2} />
            )
            expect(screen.getByText('Loading...')).toBeInTheDocument()
        })
    })



    test('should render error when isError is true', () => {
        const props2 = {
            ...props,
            isError: true
        }
        render(
            <PostContainer {...props2} />
        )
        expect(screen.getByText('Error loading post')).toBeInTheDocument()
    })
})