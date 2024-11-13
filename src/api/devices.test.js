import { fetchDevices, postDevice, deleteDevice, editDevice } from "./devices";
import { mockDevices, testDeviceData } from "../__mocks__/devices";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

describe("API functions", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("fetchDevices", () => {
    it("should return a list of devices when the response is successful", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockDevices,
      });

      const devices = await fetchDevices();
      expect(devices).toEqual(mockDevices);
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/devices`);
    });

    it("should return an empty array and log an error when the response is unsuccessful", async () => {
      console.error = jest.fn();
      fetch.mockResolvedValueOnce({
        ok: false,
      });

      const devices = await fetchDevices();
      expect(devices).toEqual([]);
      expect(console.error).toHaveBeenCalledWith(
        "Fetch devices failed:",
        new Error("Network response was not ok"),
      );
    });
  });

  describe("postDevice", () => {
    it("should call fetch with the correct data when posting a device", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
      });
      await postDevice(testDeviceData);
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/devices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testDeviceData),
      });
    });

    it("should log an error when the post request fails", async () => {
      console.error = jest.fn();
      fetch.mockResolvedValueOnce({
        ok: false,
      });

      await postDevice(testDeviceData);
      expect(console.error).toHaveBeenCalledWith(
        "POST call to add device failed:",
        new Error("Network response was not ok"),
      );
    });
  });

  describe("deleteDevice", () => {
    it("should call fetch with the correct data when deleting a device", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
      });

      await deleteDevice(mockDevices[0]);
      const { id, ...expectedRequestData } = mockDevices[0];
      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/devices/${mockDevices[0].id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expectedRequestData),
        },
      );
    });

    it("should log an error when the delete request fails", async () => {
      console.error = jest.fn();
      fetch.mockResolvedValueOnce({
        ok: false,
      });

      await deleteDevice(mockDevices[0]);
      expect(console.error).toHaveBeenCalledWith(
        "DELETE call to add device failed:",
        new Error("Network response was not ok"),
      );
    });
  });

  describe("editDevice", () => {
    it("should call fetch with the correct data when editing a device", async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
      });
      const { id, ...expectedRequestData } = mockDevices[0];
      await editDevice(mockDevices[0]);
      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/devices/${mockDevices[0].id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expectedRequestData),
        },
      );
    });

    it("should log an error when the edit request fails", async () => {
      console.error = jest.fn();
      fetch.mockResolvedValueOnce({
        ok: false,
      });

      await editDevice(mockDevices[0]);
      expect(console.error).toHaveBeenCalledWith(
        "PUT call to edit device failed:",
        new Error("Network response was not ok"),
      );
    });
  });
});
