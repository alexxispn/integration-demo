import { usePost } from "./usePost";
import { renderHook } from "@testing-library/react-hooks";
import * as postService from "../services/postService";

jest.mock("../services/postService");

describe('usePost', () => {
    it("should return post as null and isLoading as true on first update", () => {
        const { result } = renderHook(() => usePost("1"));
        const { post, isLoading } = result.current;
        expect(post).toBeNull();
        expect(isLoading).toBe(true);
    })
    it("should return post and isLoading as false on second update", async () => {
        jest.spyOn(postService, "getPostById").mockResolvedValue({ title: "title", body: "body" });
        const { result, waitForNextUpdate } = renderHook(() => usePost("1"));
        await waitForNextUpdate();
        const { post, isLoading } = result.current;
        expect(post).toEqual({ title: "title", body: "body" });
        expect(isLoading).toBe(false);
    })
    it("should return isError as true on fetch error", async () => {
        jest.spyOn(postService, "getPostById").mockRejectedValue(new Error("error"));
        const { result, waitForNextUpdate } = renderHook(() => usePost("1"));
        await waitForNextUpdate();
        const { isError } = result.current;
        expect(isError).toBe(true);
    })
})
