export interface iFieldInput {
  name: string;
  roleGUID: string;
  wealth: string;
  power: string;
}

export interface iFieldInputError {
  name: string;
  roleGUID: string;
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

export interface iGetRoleListResponse {
  guid: string;
  name: string;
}

export interface iCreateCharacterSecureResponse {
  guid?: string;
  error?: string;
}
