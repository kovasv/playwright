import {expect, test} from '@playwright/test';
import exp from 'constants';
import {User} from './Interface'




test.describe('Validations @api', () => {
 test('get users', async ({request ,baseURL}) => {
   const responce = await request.get(`${baseURL}/api/users?page=2`)
   const users :User[] =(await responce.json()).data;
   expect(responce.status()).toBe(200)
   //Print all users with odd ID numbers
   users.forEach((user)=>{if (user.id%2==0) {console.log(user)}})
 });

 test('Create a new user', async ({request ,baseURL}) => {
    let newUser = {} as User;
    newUser.first_name = "djoe";
    newUser.last_name= "doe";
    const responce = await request.post(`${baseURL}/api/users`,{data:newUser});
    expect(responce.status()).toBe(201);
    const dataCreation = ( await responce.json()).createdAt;
    const todayDate = new Date().toLocaleDateString('en-CA')
    expect(dataCreation).toContain(todayDate);
  });

  test('Update an user', async ({request ,baseURL}) => {
    const newName ="new User Name"
    const response = await request.put(`${baseURL}/api/users/2`,{data:{name: newName}});
    expect(response.status()).toBe(200);
    expect((await (response.json())).name ).toEqual(newName)
});


[0,3].forEach((delay)=>{
  test('delay response. Delay:' +delay, async ({request ,baseURL}) => {
    const startDate = new Date().valueOf();
    const responce = await request.get(`${baseURL}/api/users?delay=${delay}`)
    const endtDate = new Date().valueOf();
    const responseTime = (endtDate-startDate)/1000
    expect(responseTime).toBeLessThan(delay+1)
  });})

  test('asynchronous calls', async ({request ,baseURL}) => {
    const userList =[1,2,3,4,5,6,7,8,9]
    await Promise.all(userList.map(async(user)=>{
       const response = await request.get(`${baseURL}/api/users/${user}`)
       expect(response.status()).toBe(200)
    }))
});
});
