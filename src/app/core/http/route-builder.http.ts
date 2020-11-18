import {Injectable} from '@angular/core';

import routeConfig from '../../configs/json/http-builder/routes.config.json';

import {environment} from '../../../environments/environment';

import {RouterModel, RouterAction, RouterService} from '../../shared/models/router/router.model';

@Injectable()
export class RouteBuilder {

  private routerPath: string;
  private routerModel: RouterModel;
  private routerService: RouterService;
  private routerHost: string = routeConfig.gateway.value.replace(`{host}`, environment.HOST_BLESK);

  public constructor() {
  }

  public service(service: string): this {
    this.routerService = routeConfig.gateway.services[service];
    return this;
  }

  public model(model: string): this {
    this.routerModel = this.routerService.models[model];
    return this;
  }

  public action(action: string): this {
    const routerAction: RouterAction = this.routerModel[action];
    this.routerPath = routerAction.value;
    return this;
  }

  public params(params: Object[]): this {
    params.forEach(e => {this.routerPath = this.routerPath.replace(`{${Object.keys(e).toString()}}`, Object.values(e).toString())});
    return this
  }

  public build(): string {
    return `${this.routerHost}${this.routerService.value}${this.routerPath}`;
  }
}
