import {Injectable} from "@angular/core";

import routes from '../../configs/routes.config.json';
import {environment} from "../../../environments/environment";

@Injectable()
export class RouteBuilder {

  private routeHost: string;
  private routePath: Object;
  private routeModel: RouteModel;
  private routeService: RouteService;

  constructor() {
    this.routeHost = routes.gateway.value.replace("{host}", environment.HOST_BLESK)
  }

  public service(service: string): this {
    this.routeService = routes.gateway.services[service];
    return this;
  }

  public model(model: string): this {
    this.routeModel = this.routeService.models[model];
    return this;
  }

  public action(action: string): this {
    this.routePath = this.routeModel[action];
    return this;
  }

  public params(params: Object[]): this {
    params.forEach(e => {this.routePath.value = this.routePath.value.replace(Object.keys(e), Object.values(e))});
    return this
  }

  public build(): string {
    return `${this.routeHost}${this.routeService.value}${this.routePath.value}`;
  }
}

export interface RouteService {
  "value": string,
  "models": RouteModel
}

export interface RouteModel {
  "create"?: Object,
  "update": Object,
  "delete"?: Object,
  "get": Object,
  "getAll"?: Object,
  "search"?: Object,
  "join"?: Object
}
