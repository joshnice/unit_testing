import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private user_logged_in: boolean = false;
  private username: string;

  private starting_number: number;
  private calc_answer: string;

  constructor(private user_service: UserService) { 
  }

  ngOnInit() {
    this.setUserName();
    this.setNumber();
  }

  login() {
    this.user_logged_in = true;
  }

  setUserName() {
    this.username = this.user_service.user_name;
  }

  setNumber() {
    this.starting_number = this.user_service.starting_number;
  }


  calculateSum(num: number) {
    this.calc_answer = (num * this.starting_number).toString();
  } 

}
