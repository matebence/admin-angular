export interface RouterPath {
  value: string
}

export interface RouterService {
  value: string,
  models: RouterPath
}

export interface RouterModel {
  get: RouterPath,
  update: RouterPath,
  join?: RouterPath
  create?: RouterPath,
  delete?: RouterPath,
  getAll?: RouterPath,
  search?: RouterPath,
}

export interface RouteDataTransport {
  data: RouterData
}

export interface RouterData {
  roles?: string[]
}
