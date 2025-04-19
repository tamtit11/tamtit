export const ROLE = [
  {
    value: "pm",
    label: "Project Manager",
  },
  {
    value: "dev",
    label: "Developer",
  },
  {
    value: "ba",
    label: "Business Analyst",
  },
  {
    value: "tester",
    label: "Tester",
  },
];

export const COMPANY = [
  {
    value: "vti",
    label: "VTI Group",
  },
  {
    value: "fsoft",
    label: "FPT Software",
  },
  {
    value: "cmc",
    label: "CMC Global",
  },
  {
    value: "viettel",
    label: "Viettel",
  },
];

export const roleMapping = (param) => {
  return ROLE.find((role) => role.value === param)?.label;
};
export const companyMapping = (param) => {
  return COMPANY.find((company) => company.value === param)?.label;
};

export const ACCOUNT = {
  username: "TamTit",
  password: "Tamtit@1234",
};
