export interface Navigation {
  group: string,
  details: Details[]
}

export interface Details {
  title: string,
  icon?: string,
  authorities?: string[],
  route?: Route
}

export interface Route {
  main: string,
  sub?: Details[]
}

export interface NavigationResult {
  result: string,
  route?: string
}
