import { render, screen } from "@testing-library/react";
import { UserList } from "./UserList";
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

jest.mock("../UserTable/UserTable", () => ({
    UserTable: jest.fn(() => <div>::UserTable::</div>),
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
        render(<UserList />);
        const UserTable = screen.getByText("::UserTable::");

        expect(useUsers).toHaveBeenCalledTimes(1);
        expect(UserTable).toBeInTheDocument();
    });

    it("should could click Button", async () => {
        (useUsers as any).mockReturnValueOnce({
            users,
            addUser: jest.fn(),
            setFilter: jest.fn(),
            filter: "",
            deleteUser: jest.fn(),
        });
        render(<UserList />);
        const Button = screen.getByText("::Button::");

        userEvent.click(Button);

        expect(Button).toBeInTheDocument();
        expect(useUsers).toHaveBeenCalledTimes(1);
    });
});
