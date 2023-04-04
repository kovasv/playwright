import mainPage from "./mainPage";
import {Page} from '@playwright/test'

export default class cartPage extends mainPage{

    removeButton = (itemName: string) => this.page.locator(`//div[text()="${itemName}"]/../..//button`);
    public checkoutButton =()=> this.page.locator('#checkout');
    public firstNameInput =()=> this.page.locator('#first-name');
    public lastNameInput =()=> this.page.locator('#last-name');
    public postalCode =()=> this.page.locator('#postal-code');
    public finishButton =() => this.page.locator('#finish');
    public continue =() => this.page.locator('#continue');
    
    constructor (page: Page){
        super(page);
    }
    
    /** remove item from Cart
     * @param text - Item name
     */
    public async removeItem(text: string) {
        await this.removeButton(text).click();
    }
    
    public async getPriceByName (text: string){
    return await this.itemPrice(text).textContent()
    }

    public async fillCheckoutInformation (){
        await this.firstNameInput().fill("test")
        await this.lastNameInput().fill("test")
        await this.postalCode().fill("12345")
        }
    
    }