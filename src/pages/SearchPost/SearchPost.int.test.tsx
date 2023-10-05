import { act, render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { getPostById as getPostByIdMocked } from "../../services/postService";
import { SearchPost } from "./SearchPost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Post } from "../Post/Post";

jest.mock("../../services/postService");

beforeEach(() => {
  window.history.pushState({}, 'Post detail', '/post');
})

afterEach(jest.clearAllMocks)


test("Can search for a post using its ID", async () => {
  const mockPost = {
    id: "1",
    title: "Post Title",
    body: "Post Body",
  };
  (getPostByIdMocked as any).mockResolvedValueOnce(mockPost);
  await act(async () => render(
    <BrowserRouter>
      <Routes>
        <Route path="/post" element={<SearchPost />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  ) as any);

  expect(screen.getByText(/submit/i)).toBeDisabled();
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByText(/search.*post.*id/i)).toBeInTheDocument();

  user.type(screen.getByLabelText(/post id/i), mockPost.id);
  const submitButton = screen.getByText(/submit/i);
  expect(submitButton).toBeEnabled();
  user.click(submitButton);

  // eslint-disable-next-line testing-library/prefer-find-by
  await waitFor(() => screen.getByText(/loading/i))
  expect(getPostByIdMocked).toHaveBeenCalledWith(mockPost.id);
  expect(getPostByIdMocked).toHaveBeenCalledTimes(1);
  expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  expect(screen.getByText(mockPost.body)).toBeInTheDocument();
});

test('should not render anything if router does not exists', async () => {
  const mockPost2 = {
    id: "abcde",
    title: "Post Title",
    body: "Post Body",
  };
  (getPostByIdMocked as any).mockResolvedValueOnce(mockPost2);
  await act(async () =>
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/post" element={<SearchPost />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    ) as any);
  user.type(screen.getByLabelText(/Post ID/i), mockPost2.id);
  const submitButton = screen.getByText("Submit");
  user.click(submitButton);

  expect(screen.queryByText("Post Title")).not.toBeInTheDocument();
  expect(screen.queryByText("Post Body")).not.toBeInTheDocument();
})
