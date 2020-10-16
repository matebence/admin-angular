export interface RouterPath {
  "value": string
}

export interface RouterService {
  "value": string,
  "models": RouterPath
}

export interface RouterModel {
  "create"?: RouterPath,
  "update": RouterPath,
  "delete"?: RouterPath,
  "get": RouterPath,
  "getAll"?: RouterPath,
  "search"?: RouterPath,
  "join"?: RouterPath
}
