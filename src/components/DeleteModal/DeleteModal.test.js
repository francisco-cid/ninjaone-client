import { render, screen, fireEvent } from "@testing-library/react";
import DeleteModal from "./DeleteModal";
import { mockDevices } from "../../__mocks__/devices";

describe("DeleteModal component", () => {
  const mockOnClose = jest.fn();
  const mockOnDelete = jest.fn();
  const deviceInfo = mockDevices[0];

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnDelete.mockClear();
  });

  it("should not render the modal when show is false", () => {
    render(
      <DeleteModal
        show={false}
        onClose={mockOnClose}
        onDelete={mockOnDelete}
        deviceInfo={deviceInfo}
      />,
    );
    expect(screen.queryByText(/delete device\?/i)).not.toBeInTheDocument();
  });

  it("should render the modal when show is true", () => {
    render(
      <DeleteModal
        show={true}
        onClose={mockOnClose}
        onDelete={mockOnDelete}
        deviceInfo={deviceInfo}
      />,
    );
    expect(screen.getByText(/delete device\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/you are about to delete the device/i),
    ).toBeInTheDocument();
    expect(screen.getByText(deviceInfo.system_name)).toBeInTheDocument();
  });

  it("should call onClose when the close icon button is clicked", () => {
    render(
      <DeleteModal
        show={true}
        onClose={mockOnClose}
        onDelete={mockOnDelete}
        deviceInfo={deviceInfo}
      />,
    );
    // Get button by aria-label
    const closeButton = screen.getByRole("button", { name: /close modal/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call onClose when the cancel button is clicked", () => {
    render(
      <DeleteModal
        show={true}
        onClose={mockOnClose}
        onDelete={mockOnDelete}
        deviceInfo={deviceInfo}
      />,
    );
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call onDelete with deviceInfo and onClose when delete button is clicked", () => {
    render(
      <DeleteModal
        show={true}
        onClose={mockOnClose}
        onDelete={mockOnDelete}
        deviceInfo={deviceInfo}
      />,
    );
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(deviceInfo);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
