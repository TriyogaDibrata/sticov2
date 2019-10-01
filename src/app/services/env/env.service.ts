import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = "http://localhost:8001/api/"

  constructor() { }
}
