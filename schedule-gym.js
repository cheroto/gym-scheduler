const puppeteer = require('puppeteer');
require('dotenv').config();

let date_ob = new Date();
const date = ("0" + date_ob.getDate()).slice(-2);
const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
const year = date_ob.getFullYear();
date_ob.setDate(date_ob.getDate() + 7);
const reqDate = ("0" + date_ob.getDate()).slice(-2);
const reqMonth = ("0" + (date_ob.getMonth() + 1)).slice(-2);
const reqYear = date_ob.getFullYear();

const currentDate = `${year}/${month}/${date}`;
const requestDate = `${reqYear}/${reqMonth}/${reqDate}`;

console.info(`Current Date: ${currentDate}`);
console.info(`Request Date: ${requestDate}`);

(async () => {
  console.info('Starting form submission. Opening login page.');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.935sheppardwest.com/login.aspx');

  await page.type('#txtUserID', process.env.username);
  await page.type('#txtPsw', process.env.password);
  await page.keyboard.press('Enter');

  await page.waitForNavigation();
  console.log('Logged into portal.');

  // Slot 1
  console.info('Starting form submission for slot 1');
  await page.goto(`https://www.935sheppardwest.com/Admin/ResevationBooking/FillRequestFormV2.aspx?itemID=121&from=${currentDate}%2020:35`);
  await page.evaluate(() => document.getElementById("tbStartDate").value = "");
  await page.type('#tbStartDate', requestDate);
  await page.focus('#drpStartTime');
  await page.waitForNetworkIdle();
  await page.select('#drpStartTime', '0:17:05');
  await page.waitForNetworkIdle();
  await page.screenshot({path: 'slot1.png'});
  //await page.click('#cmdSubmitBookingReq');
  console.info('Completed form submission for slot 1');


  // Slot 1
  console.info('Starting form submission for slot 2');
  await page.goto(`https://www.935sheppardwest.com/Admin/ResevationBooking/FillRequestFormV2.aspx?itemID=122&from=${currentDate}%2020:35`);
  await page.evaluate(() => document.getElementById("drpStartTime").value = "");  
  await page.type('#tbStartDate', requestDate);
  await page.focus('#drpStartTime');
  await page.waitForNetworkIdle();
  await page.select('#drpStartTime', '0:17:05');
  await page.waitForNetworkIdle();
  await page.screenshot({path: 'slot2.png'});
  //await page.click('#cmdSubmitBookingReq');
  console.info('Completed form submission for slot 2');


  await browser.close();

})();