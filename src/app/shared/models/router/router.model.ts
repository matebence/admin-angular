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
  create?: RouterAction,
  update: RouterAction,
  delete?: RouterAction,
  get: RouterAction,
  getAll?: RouterAction,
  search?: RouterAction,
  join?: RouterAction
}
