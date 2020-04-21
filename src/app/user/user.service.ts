import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user_name = 'Josh';
  public starting_number = 16;

  constructor() { }
}
