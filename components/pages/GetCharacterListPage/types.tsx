export interface iGetRoleListResponse {
  guid: string;
  name: string;
}
export interface iGetCharacterListResponse {
  guid: string;
  name: string;
  power: number;
  wealth: number;
  role: iGetRoleListResponse;
}
