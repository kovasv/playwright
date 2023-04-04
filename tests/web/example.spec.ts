import {expect} from '@playwright/test';
import {test} from './fixture';

test.beforeEach(async ({loginPage}) => {
  await loginPage.login()
});

test.describe('Validations @web', () => {
test('Validation 1', async ({ mainPage, cartPage}) => {
  const item1 ='Sauce Labs Backpack';
  const item2 ='Sauce Labs Bolt T-Shirt';

  //add items to cart
  await mainPage.addToCartItem(item1);
  const costItem2 = await mainPage.addToCartItem(item2);
  await mainPage.goToCart();
  //delete 1 item
  await cartPage.removeItem(item1);
  //check nly contains the item
  await expect(cartPage.removeButton(item1)).toHaveCount(0);
  expect(costItem2).toEqual(await cartPage.getPriceByName(item2))
  cartPage.checkoutButton().click();
  await cartPage.fillCheckoutInformation();
  await cartPage.continue().click();
  await cartPage.finishButton().click();
});

test('sort name', async ({mainPage }) => {
 await mainPage.sortItemsBy("Name (A to Z)");
 //get item list
 const itemList = await Promise.all( (await mainPage.itemNameList()).map((item) =>{
                  return item.textContent();}))
// sort list
 const sorteditemList =itemList.slice(0).sort();
 expect(itemList).toEqual(sorteditemList)
});


test('sort price', async ({mainPage }) => {
  await mainPage.sortItemsBy("Price (low to high)");
//  get price list
const priceList = (await mainPage.getPriceItemList()).map((x)=>Number(x?.replace("$","")));
// sort list
  const sortedPriceList =priceList.slice(0).sort((a, b) => a - b);
  expect(priceList).toEqual(sortedPriceList)
 });

 test('fail', async ({ }) => {
  expect(1).toEqual(2)
 });
});
