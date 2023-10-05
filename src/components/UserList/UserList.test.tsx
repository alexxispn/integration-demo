import { render, screen, act, fireEvent } from "@testing-library/react";
import { UserList } from "./UserList";
import { Button } from "../Button/Button";
import { useUsers } from "../../hooks/useUsers";
import userEvent from "@testing-library/user-event";

const users = [
    { id: 1, name: "Pepa juana" },
    { id: 2, name: "juana" },
    { id: 3, name: "Pepa" },
];

jest.mock("../Button/Button", () => ({
    Button: jest.fn(() => <div>::Button::</div>),
}));

jest.mock("../../hooks/useUsers", () => ({
    useUsers: jest.fn()
}));

afterEach(() => {
    jest.clearAllMocks()
});

describe("UserList", () => {
    it("should not render UserList component", () => {
        (useUsers as any).mockReturnValueOnce({
            users: null,
            addUser: jest.fn(),
            setFilter: jest.fn(),
            filter: "",
            deleteUser: jest.fn(),
        });
        render(<UserList />);
        const linkElement = screen.queryByRole("list");
        expect(linkElement).not.toBeInTheDocument();
    });

    it("should render UserList component after call our useUsers hook", async () => {
        (useUsers as any).mockReturnValueOnce({
            users,
            addUser: jest.fn(),
            setFilter: jest.fn(),
            filter: "",
            deleteUser: jest.fn(),
        });
        await act(async () => render(<UserList />) as any);
        expect(useUsers).toHaveBeenCalledTimes(1);
        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });


    it("should could click on Button", async () => {
        (useUsers as any).mockReturnValueOnce({
            users,
            addUser: jest.fn(),
            setFilter: jest.fn(),
            filter: "",
            deleteUser: jest.fn(),

        });
        await act(async () => render(<UserList />) as any);
        expect(screen.getByRole("list")).toBeInTheDocument();
        expect(screen.getAllByRole("listitem")).toHaveLength(3);
        const buttons = screen.getAllByText("::Button::");

        userEvent.click(buttons[0]);
        expect(Button).toHaveBeenCalledTimes(1);
    });
});
