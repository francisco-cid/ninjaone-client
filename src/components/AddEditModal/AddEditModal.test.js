import { render, screen, fireEvent } from "@testing-library/react";
import AddEditModal from "./AddEditModal";
import { DEVICE_TYPES, MODAL_MODES } from "../../constants";

describe("AddEditModal", () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly in Add mode", () => {
    render(
      <AddEditModal
        show={true}
        mode={MODAL_MODES.ADD}
        initialValues={null}
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );
    // correct title
    expect(screen.getByText("Add device")).toBeInTheDocument();
    // all inputs are empty
    expect(screen.getByLabelText("System name *")).toHaveValue("");
    expect(screen.getByLabelText("HDD capacity (GB) *")).toHaveValue(null);
    expect(screen.getByLabelText("Device type *")).toHaveValue("");
  });

  test("renders correctly in Edit mode with initial values", () => {
    const initialValues = {
      system_name: "Test Device",
      type: DEVICE_TYPES.WINDOWS,
      hdd_capacity: "256",
    };

    render(
      <AddEditModal
        show={true}
        mode={MODAL_MODES.EDIT}
        initialValues={initialValues}
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );
    // correct title
    expect(screen.getByText("Edit device")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Device")).toBeInTheDocument();
    expect(screen.getByDisplayValue("256")).toBeInTheDocument();
  });

  test("updates state when user inputs data", () => {
    render(
      <AddEditModal
        show={true}
        mode={MODAL_MODES.ADD}
        initialValues={null}
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText("System name *"), {
      target: { value: "New Device" },
    });
    fireEvent.change(screen.getByLabelText("HDD capacity (GB) *"), {
      target: { value: "500" },
    });

    expect(screen.getByDisplayValue("New Device")).toBeInTheDocument();
    expect(screen.getByDisplayValue("500")).toBeInTheDocument();
  });

  test("displays error message if device type is not selected on form submission", () => {
    render(
      <AddEditModal
        show={true}
        mode={MODAL_MODES.ADD}
        initialValues={null}
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Please select a device")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("calls onSubmit and onClose correctly on valid form submission", () => {
    render(
      <AddEditModal
        show={true}
        mode={MODAL_MODES.ADD}
        initialValues={null}
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText("System name *"), {
      target: { value: "Device Name" },
    });
    fireEvent.change(screen.getByLabelText("HDD capacity (GB) *"), {
      target: { value: "256" },
    });

    // Simulate selecting a device type
    fireEvent.change(screen.getByLabelText("Device type *"), {
      target: { value: DEVICE_TYPES.WINDOWS },
    });

    fireEvent.click(screen.getByText("Submit"));

    expect(onSubmit).toHaveBeenCalledWith({
      system_name: "Device Name",
      type: DEVICE_TYPES.WINDOWS,
      hdd_capacity: "256",
    });
    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose when the cancel button is clicked", () => {
    render(
      <AddEditModal
        show={true}
        mode={MODAL_MODES.ADD}
        initialValues={null}
        onClose={onClose}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });
});
