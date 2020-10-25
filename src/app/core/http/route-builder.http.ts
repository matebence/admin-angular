import {Injectable} from '@angular/core';

import routeConfig from '../../configs/routes.config.json';

import {environment} from '../../../environments/environment';

import {RouterModel, RouterPath, RouterService} from '../../shared/models/router/router.model';

@Injectable()
export class RouteBuilder {

  private routerPath: RouterPath;
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
    this.routerPath = this.routerModel[action];
    return this;
  }

  public params(params: Object[]): this {
    params.forEach(e => {this.routerPath.value = this.routerPath.value.replace(`{${Object.keys(e).toString()}}`, Object.values(e).toString())});
    return this
  }

  public build(): string {
    return `${this.routerHost}${this.routerService.value}${this.routerPath.value}`;
  }
}
