import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "./DataTable";
import { mockDevices } from "../../__mocks__/devices";

describe("DataTable", () => {
  const mockBeginEdit = jest.fn();
  const mockBeginDelete = jest.fn();

  beforeEach(() => {
    mockBeginEdit.mockClear();
    mockBeginDelete.mockClear();
  });

  it("renders the table with the correct header", () => {
    render(
      <DataTable
        devices={mockDevices}
        beginEdit={mockBeginEdit}
        beginDelete={mockBeginDelete}
      />,
    );
    expect(screen.getByText(/Device/i)).toBeInTheDocument();
  });

  it("renders rows for each device", () => {
    render(
      <DataTable
        devices={mockDevices}
        beginEdit={mockBeginEdit}
        beginDelete={mockBeginDelete}
      />,
    );

    // Check that each device's system_name is somewhere within the row text content
    mockDevices.forEach((device) => {
      const deviceNameRegex = new RegExp(device.system_name);
      const row = screen.getByText(deviceNameRegex);
      expect(row).toBeInTheDocument();
    });
  });

  it("does not render rows with missing details", () => {
    const devicesWithMissingInfo = [
      { id: 1, system_name: "Device 1", type: "Type A", hdd_capacity: "500" },
      { id: 2, type: "Type B", hdd_capacity: "1000" }, // Missing system_name
    ];

    render(
      <DataTable
        devices={devicesWithMissingInfo}
        beginEdit={mockBeginEdit}
        beginDelete={mockBeginDelete}
      />,
    );

    expect(screen.getByText(/Device 1/)).toBeInTheDocument();
    expect(screen.queryByText(/Device 2/)).not.toBeInTheDocument(); // Device 2 should not be rendered
  });

  it("shows action menu on row hover", () => {
    render(
      <DataTable
        devices={mockDevices}
        beginEdit={mockBeginEdit}
        beginDelete={mockBeginDelete}
      />,
    );

    const nameRegex = new RegExp(mockDevices[0].system_name);
    const deviceRow = screen.getByText(nameRegex).closest("tr");
    fireEvent.mouseEnter(deviceRow);

    // Ensure action menu button is visible on hover
    expect(
      screen.getByRole("button", { name: /action menu/i }),
    ).toBeInTheDocument();

    fireEvent.mouseLeave(deviceRow);

    // Ensure action menu disappears after hover
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls beginEdit when the edit action is clicked", () => {
    render(
      <DataTable
        devices={mockDevices}
        beginEdit={mockBeginEdit}
        beginDelete={mockBeginDelete}
      />,
    );

    const nameRegex = new RegExp(mockDevices[0].system_name);
    const deviceRow = screen.getByText(nameRegex).closest("tr");
    fireEvent.mouseEnter(deviceRow);

    const actionBtn = screen.getByRole("button", { name: /action menu/i });
    fireEvent.click(actionBtn);
    const editBtn = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editBtn);

    expect(mockBeginEdit).toHaveBeenCalledWith(mockDevices[0]);
  });

  it("calls beginDelete when the delete action is clicked", () => {
    render(
      <DataTable
        devices={mockDevices}
        beginEdit={mockBeginEdit}
        beginDelete={mockBeginDelete}
      />,
    );

    const nameRegex = new RegExp(mockDevices[0].system_name);
    const deviceRow = screen.getByText(nameRegex).closest("tr");
    fireEvent.mouseEnter(deviceRow);

    const actionBtn = screen.getByRole("button", { name: /action menu/i });
    fireEvent.click(actionBtn);
    const deleteBtn = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteBtn);

    expect(mockBeginDelete).toHaveBeenCalledWith(mockDevices[0]);
  });
});
