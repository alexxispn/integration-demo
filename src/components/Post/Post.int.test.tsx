import { render, screen } from "@testing-library/react";
import { Post } from "./Post";
import { usePost } from "../../hooks/usePost";
import { BrowserRouter, Route, Routes } from "react-router-dom";


jest.mock("../../hooks/usePost", () => ({
  usePost: jest.fn(),
}));

beforeEach(() => {
  window.history.pushState({}, 'Post detail', '/post/:id');
})


describe("Post", () => {
  test("renders PostContainer when post is defined", async () => {
    (usePost as any).mockReturnValueOnce({
      post: { id: "1", title: "Post Title", body: "Post Body" },
      isLoading: false,
      isError: false,
    });
    render(
      <MemoryRouter initialEntries={["/post/1"]}>
        <Route path="/post/:id" >
          <Post />
        </Route>
      </MemoryRouter>

    );

    expect(screen.getByText(/post.*1/i)).toBeInTheDocument();
  });
});

expect(screen.getByText(/post.*1/i)).toBeInTheDocument();
  });
});
