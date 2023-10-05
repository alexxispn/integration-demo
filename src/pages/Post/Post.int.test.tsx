import { render, screen } from "@testing-library/react";
import { Post } from "./Post";
import { usePost } from "../../hooks/usePost";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";


jest.mock("../../hooks/usePost", () => ({
  usePost: jest.fn(),
}));

beforeEach(() => {
  window.history.pushState({}, 'Post detail', '/post/:id');
})


describe("Post", () => {
  test.skip("renders PostContainer when post is defined", async () => {
    (usePost as jest.Mock).mockReturnValue({
      post: {
        id: "1",
        title: "Post Title",
        body: "Post Body",
      },
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Route path="/post/:id" element={<Post />} />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(usePost).toHaveBeenCalledWith("1");
    expect(usePost).toHaveBeenCalledTimes(1);
  });
});
