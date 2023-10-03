import {PostCard} from "./PostCard";
import { render, screen } from "@testing-library/react";

describe("PostCard", () => {
    test("Should render PostCard", () => {
        render(<PostCard title="Post Title" body="Post Body" />)
        const title = screen.getByText("Post Title");
        const body = screen.getByText("Post Body");
        expect(title).toBeInTheDocument();
        expect(body).toBeInTheDocument();
    });
});
