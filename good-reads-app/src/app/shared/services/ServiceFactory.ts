import { Injectable, Inject, Injector } from '@angular/core';
import { SERVICE_MAP } from './ServiceInjectionToken'; // Path to your injection token file

@Injectable({
  providedIn: 'root'
})
export class ServiceFactory {
  constructor(@Inject(SERVICE_MAP) private serviceMap: Map<any, any>, private injector: Injector) { }

  getService<T>(type: string): T {
    const service = this.serviceMap.get(type);
    if (!service) {
      throw new Error(`No service found for type ${type}`);
    }
    return this.injector.get(service);
  }
}