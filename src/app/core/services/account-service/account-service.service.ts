import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {BaseServiceService} from "../base-service.service";
import {RouteBuilder} from "../../http/route-builder.http";

@Injectable()
export class AccountServiceService extends BaseServiceService {

  public constructor(private httpClient: HttpClient, private routeBuilder: RouteBuilder) {
    super(httpClient, routeBuilder);
  }
}
