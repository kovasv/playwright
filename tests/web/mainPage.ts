
import {Page} from '@playwright/test'

export default class mainPage{

addToCartButton = (itemName:String) => this.page.locator(`//div[text()="${itemName}"] /../../..//button`);
itemPrice = (itemName:String) => this.page.locator(`//div[text()="${itemName}"]/../../..//div[@class='inventory_item_price']`)
cartButton =() => this.page.locator('#shopping_cart_container');
public itemNameList =() => this.page.locator(".inventory_item_name").all();
public itemPriceList =() => this.page.locator(".inventory_item_price").all();

page: Page
constructor (page: Page){
    this.page =page;
}

/** add item to Cart
 * @param text - Item name
 */
public async addToCartItem(text: string)  {
    await this.addToCartButton(text).click();
    return  await this.itemPrice(text).textContent();
}

public async goToCart(){
  await this.cartButton().click();
}

public async  sortItemsBy(sortBy:string){
  await this.page.selectOption('.product_sort_container', sortBy);
  await this.page.waitForTimeout(500);
}

public async getPriceItemList(){
return   await Promise.all( (await this.itemPriceList()).map((item) =>{
  return ( item.textContent());}))
}

}