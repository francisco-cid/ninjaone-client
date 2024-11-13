import { render, screen, fireEvent } from "@testing-library/react";
import ToggleMenu from "./ToggleMenu";

describe("ToggleMenu", () => {
  let onEdit;
  let onDelete;
  beforeEach(() => {
    onEdit = jest.fn();
    onDelete = jest.fn();
  });
  it("should open and close the menu when clicking the IconButton", () => {
    render(<ToggleMenu onEdit={onEdit} onDelete={onDelete} />);
    const actionIconButton = screen.getByRole("button");

    // Initially, the menu should be closed
    expect(
      screen.queryByRole("button", { name: /edit/i }),
    ).not.toBeInTheDocument();

    // Click the button to open the menu
    fireEvent.click(actionIconButton);
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();

    // Click again to close the menu
    fireEvent.click(actionIconButton);
    expect(
      screen.queryByRole("button", { name: /edit/i }),
    ).not.toBeInTheDocument();
  });

  it("should close the menu when clicking outside of it", () => {
    render(<ToggleMenu onEdit={onEdit} onDelete={onDelete} />);
    const actionIconButton = screen.getByRole("button");
    fireEvent.click(actionIconButton); // Open menu

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();

    // Click outside the menu to close it
    fireEvent.mouseDown(document.body);
    expect(
      screen.queryByRole("button", { name: /edit/i }),
    ).not.toBeInTheDocument();
  });

  it("should call onEdit and close the menu when Edit is clicked", () => {
    render(<ToggleMenu onEdit={onEdit} onDelete={onDelete} />);
    const actionIconButton = screen.getByRole("button");
    fireEvent.click(actionIconButton); // Open menu

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalled();
    expect(
      screen.queryByRole("button", { name: /edit/i }),
    ).not.toBeInTheDocument(); // Menu should close
  });

  it("should call onDelete and close the menu when Delete is clicked", () => {
    render(<ToggleMenu onEdit={onEdit} onDelete={onDelete} />);
    const actionIconButton = screen.getByRole("button");
    fireEvent.click(actionIconButton); // Open menu

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalled();
    expect(
      screen.queryByRole("button", { name: /edit/i }),
    ).not.toBeInTheDocument(); // Menu should close
  });
});
