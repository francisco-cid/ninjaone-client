import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { mockDevices } from "./__mocks__/devices";
import * as api from "./api/devices";
import { SORT_OPTIONS } from "./constants";

jest.mock("./api/devices", () => ({
  fetchDevices: jest.fn(),
  postDevice: jest.fn(),
  deleteDevice: jest.fn(),
  editDevice: jest.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Define default return values for each mock
    api.fetchDevices.mockResolvedValue(mockDevices);
    api.postDevice.mockResolvedValue({});
    api.deleteDevice.mockResolvedValue({});
    api.editDevice.mockResolvedValue({});
  });

  it("renders the component and loads devices on initial render", async () => {
    render(<App />);
    expect(screen.getByText(/Devices/i)).toBeInTheDocument();
    await waitFor(() => expect(api.fetchDevices).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      mockDevices.forEach((device) => {
        const nameRegex = new RegExp(device.system_name);
        expect(screen.getByText(nameRegex)).toBeInTheDocument();
      });
    });
  });

  it("filters devices by type", async () => {
    render(<App />);
    await waitFor(() => expect(api.fetchDevices).toHaveBeenCalledTimes(1));

    const filterSelect = screen.getByLabelText(/filter devices/);
    fireEvent.change(filterSelect, { target: { value: "MAC" } });

    await waitFor(() => {
      expect(screen.queryByText(/Windows workstation/)).not.toBeInTheDocument();
      expect(screen.getAllByText(/Mac workstation/)[0]).toBeInTheDocument();
    });
  });

  it("sorts devices by HDD capacity descending", async () => {
    render(<App />);
    await waitFor(() => expect(api.fetchDevices).toHaveBeenCalledTimes(1));

    const sortSelect = screen.getByLabelText(/sort devices/);
    fireEvent.change(sortSelect, {
      target: { value: SORT_OPTIONS.CAP_DESCENDING },
    });

    const sortedDevices = mockDevices.sort(
      (a, b) => Number(b.hdd_capacity) - Number(a.hdd_capacity),
    );
    await waitFor(() => {
      expect(
        screen.getByText(sortedDevices[0].system_name),
      ).toBeInTheDocument();
    });
  });

  it("sorts devices by HDD capacity ascending", async () => {
    render(<App />);
    await waitFor(() => expect(api.fetchDevices).toHaveBeenCalledTimes(1));

    const sortSelect = screen.getByLabelText(/sort devices/);
    fireEvent.change(sortSelect, {
      target: { value: SORT_OPTIONS.CAP_ASCENDING },
    });

    const sortedDevices = mockDevices.sort(
      (a, b) => Number(a.hdd_capacity) - Number(b.hdd_capacity),
    );
    await waitFor(() => {
      expect(
        screen.getByText(sortedDevices[0].system_name),
      ).toBeInTheDocument();
    });
  });

  it("sorts devices by name descending", async () => {
    render(<App />);
    await waitFor(() => expect(api.fetchDevices).toHaveBeenCalledTimes(1));

    const sortSelect = screen.getByLabelText(/sort devices/);
    fireEvent.change(sortSelect, {
      target: { value: SORT_OPTIONS.NAME_DESCENDING },
    });

    const sortedDevices = mockDevices.sort((a, b) =>
      b.system_name?.localeCompare(a.system_name),
    );
    await waitFor(() => {
      expect(
        screen.getByText(sortedDevices[0].system_name),
      ).toBeInTheDocument();
    });
  });

  it("sorts devices by name ascending", async () => {
    render(<App />);
    await waitFor(() => expect(api.fetchDevices).toHaveBeenCalledTimes(1));

    const sortSelect = screen.getByLabelText(/sort devices/);
    fireEvent.change(sortSelect, {
      target: { value: SORT_OPTIONS.NAME_ASCENDING },
    });

    const sortedDevices = mockDevices.sort((a, b) =>
      a.system_name?.localeCompare(b.system_name),
    );
    await waitFor(() => {
      expect(
        screen.getByText(sortedDevices[0].system_name),
      ).toBeInTheDocument();
    });
  });

  it("opens and closes the add device modal", () => {
    render(<App />);
    const addButton = screen.getByText(/Add device/i);
    fireEvent.click(addButton);
    const confirmAddBtn = screen.getByRole("button", { name: "Submit" });
    expect(confirmAddBtn).toBeInTheDocument();

    const closeButton = screen.getByLabelText("close modal");
    fireEvent.click(closeButton);
    expect(confirmAddBtn).not.toBeInTheDocument();
  });

  it("submits new device data via API on add", async () => {
    render(<App />);
    const addButton = screen.getByText(/Add device/i);
    fireEvent.click(addButton);

    fireEvent.change(screen.getByLabelText(/System name/i), {
      target: { value: "New Device" },
    });
    fireEvent.change(screen.getByLabelText(/Device type/i), {
      target: { value: "LINUX" },
    });
    fireEvent.change(screen.getByLabelText(/HDD capacity/i), {
      target: { value: "500" },
    });

    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() =>
      expect(api.postDevice).toHaveBeenCalledWith({
        system_name: "New Device",
        type: "LINUX",
        hdd_capacity: "500",
      }),
    );
  });

  it("opens and closes the delete modal, then deletes the device", async () => {
    render(<App />);
    await waitFor(() => expect(api.fetchDevices).toHaveBeenCalledTimes(1));

    // Hover over the first row to reveal the action button
    await waitFor(() => {
      const firstRow = screen.getAllByRole("row")[1];
      fireEvent.mouseEnter(firstRow);
      // click action menu btn
      const actionMenuButton = screen.getByRole("button", {
        name: /action menu/i,
      });
      fireEvent.click(actionMenuButton);
    });

    // click delete button in action menu
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButton);

    // Confirm that the delete modal opens
    expect(screen.getByText(/Delete device?/i)).toBeInTheDocument();

    // Click the delete button in the modal to confirm deletion
    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() =>
      expect(api.deleteDevice).toHaveBeenCalledWith(mockDevices[0]),
    );

    // Confirm the modal closes after deletion
    await waitFor(() =>
      expect(screen.queryByText(/Delete device?/i)).not.toBeInTheDocument(),
    );
  });

  it("opens and closes the edit modal, then edits the device", async () => {
    render(<App />);
    await waitFor(() => expect(api.fetchDevices).toHaveBeenCalledTimes(1));

    // Hover over the first row to reveal the action button
    await waitFor(() => {
      const firstRow = screen.getAllByRole("row")[1];
      fireEvent.mouseEnter(firstRow);
      // click action menu btn
      const actionMenuButton = screen.getByRole("button", {
        name: /action menu/i,
      });
      fireEvent.click(actionMenuButton);
    });

    // click delete button in action menu
    const editBtn = screen.getByRole("button", { name: /Edit/i });
    fireEvent.click(editBtn);

    // Confirm that the delete modal opens
    expect(screen.getByText(/Edit Device/i)).toBeInTheDocument();

    // update device name
    fireEvent.change(screen.getByLabelText("System name *"), {
      target: { value: "Updated Name" },
    });

    // Click the edit button in the modal to submit form
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    const expectedRequestData = mockDevices[0];
    expectedRequestData.system_name = "Updated Name";
    await waitFor(() =>
      expect(api.editDevice).toHaveBeenCalledWith(expectedRequestData),
    );

    // Confirm the modal closes after deletion
    await waitFor(() =>
      expect(screen.queryByText(/Edit device/i)).not.toBeInTheDocument(),
    );
  });

  it("handles refresh", async () => {
    render(<App />);
    await waitFor(() => expect(api.fetchDevices).toHaveBeenCalledTimes(1));
    const refreshBtn = screen.getByRole("button", { name: "refresh devices" });
    fireEvent.click(refreshBtn);
    await waitFor(() => expect(api.fetchDevices).toHaveBeenCalledTimes(2));
  });
});
