export interface iFieldInput {
  name: string;
  roleID: string;
  wealth: string;
  power: string;
}

export interface iFormFields {
  label: string;
  fieldType: string;
  fieldId: string;
  fieldName: string;
  step?: string;
  min?: number;
  max?: number;
}

export interface iCreateCharacterNonSecureResponse {
  guid?: string;
  error?: string;
}
