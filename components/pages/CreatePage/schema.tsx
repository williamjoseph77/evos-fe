import { iFieldInput, iFieldInputError, iFormFields } from "./types";

export const FieldName = {
  Name: "name",
  RoleID: "roleID",
  Power: "power",
  Wealth: "wealth",
} as const;

export const defaultFieldValue: iFieldInput = {
  name: "",
  roleID: "",
  power: "",
  wealth: "",
};

export const defaultFieldInputError: iFieldInputError = {
  name: "",
  roleID: "",
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
    fieldType: "number",
    label: "Character Code",
    fieldId: "character-code",
    fieldName: FieldName.RoleID,
    step: "1",
    min: 1,
    max: 2,
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
