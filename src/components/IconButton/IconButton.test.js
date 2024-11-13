import { render, screen, fireEvent } from "@testing-library/react";
import IconButton from "./IconButton";

describe("IconButton", () => {
  it("should render children inside the button", () => {
    render(<IconButton>Test Icon</IconButton>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("Test Icon");
  });

  it("should pass down props to the button element", () => {
    const mockOnClick = jest.fn();
    render(<IconButton aria-label="icon button" onClick={mockOnClick} />);
    const buttonElement = screen.getByRole("button", { name: /icon button/i });

    // Check if aria-label prop is applied
    expect(buttonElement).toHaveAttribute("aria-label", "icon button");

    // Simulate click event and verify onClick prop works
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
