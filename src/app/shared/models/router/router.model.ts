export interface RouterAction {
  value: string
}

export interface RouteDataTransport {
  data: RouterData
}

export interface RouterData {
  roles?: string[]
}

export interface RouterService {
  value: string,
  models: RouterAction
}

export interface RouterModel {
  get: RouterAction,
  update: RouterAction,
  join?: RouterAction
  create?: RouterAction,
  delete?: RouterAction,
  getAll?: RouterAction,
  search?: RouterAction,
}
