import { iFieldInput, iFieldInputError, iFormFields } from "./types";

export const FieldName = {
  Name: "name",
  RoleGUID: "roleGUID",
  Power: "power",
  Wealth: "wealth",
} as const;

export const defaultFieldValue: iFieldInput = {
  name: "",
  roleGUID: "",
  power: "",
  wealth: "",
};

export const defaultFieldInputError: iFieldInputError = {
  name: "",
  roleGUID: "",
  power: "",
  wealth: "",
};

export const formFields: iFormFields[] = [
  {
    fieldType: "text",
    label: "Name",
    fieldId: "name",
    fieldName: FieldName.Name,
  },
  {
    fieldType: "select",
    label: "Character Code",
    fieldId: "character-code",
    fieldName: FieldName.RoleGUID,
  },
  {
    fieldType: "number",
    label: "Power",
    fieldId: "power",
    fieldName: FieldName.Power,
    step: "1",
    min: 0,
    max: 100,
  },
  {
    fieldType: "number",
    label: "Wealth",
    fieldId: "Wealth",
    fieldName: FieldName.Wealth,
    step: "any",
    min: 0,
  },
];
