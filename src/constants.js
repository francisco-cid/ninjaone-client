export const MODAL_MODES = { EDIT: "Edit", ADD: "Add" };

export const DEVICE_TYPES = {
  MAC: "MAC",
  WINDOWS: "WINDOWS",
  LINUX: "LINUX",
  ANY: "ALL",
};

export const SORT_OPTIONS = {
  CAP_ASCENDING: "CAP,ASC",
  CAP_DESCENDING: "CAP,DESC",
  NAME_ASCENDING: "NAME,ASC",
  NAME_DESCENDING: "NAME,DESC",
};

// passed to select component includes user facing text
export const FILTER_DROPDOWN_OPTIONS = [
  { value: DEVICE_TYPES.ANY, text: "All" },
  { value: DEVICE_TYPES.WINDOWS, text: "Windows" },
  { value: DEVICE_TYPES.MAC, text: "Mac" },
  { value: DEVICE_TYPES.LINUX, text: "Linux" },
];

export const SORT_DROPDOWN_OPTIONS = [
  { value: SORT_OPTIONS.CAP_DESCENDING, text: "HDD Capacity (Descending)" },
  { value: SORT_OPTIONS.CAP_ASCENDING, text: "HDD Capacity (Ascending)" },
  { value: SORT_OPTIONS.NAME_DESCENDING, text: "Name (Descending)" },
  { value: SORT_OPTIONS.NAME_ASCENDING, text: "Name (Ascending)" },
];
