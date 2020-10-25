export interface Navigation {
  group: string,
  details: Details[]
}

export interface Details {
  title: string,
  icon: string,
  route: Route
}

export interface Route {
  main: string,
  sub: Details[]
}
