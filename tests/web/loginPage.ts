
import {Page} from '@playwright/test'

export default class loginPage{

userNameInput = () => this.page.locator("#user-name");
passwordInput = () => this.page.locator("#password");
loginButton = () => this.page.locator("#login-button");

page: Page
constructor (page: Page){
    this.page =page;
}

 public async login (){
   await  this.page.goto("https://www.saucedemo.com/");
   await  this.userNameInput().fill('standard_user');
   await  this.passwordInput().fill('secret_sauce');
   await  this.loginButton().click();

}

}