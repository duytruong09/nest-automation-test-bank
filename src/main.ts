import { Builder, By, until, Key, Actions } from 'selenium-webdriver';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  const driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().maximize();

  try {
    // Step1: access website
    await driver.get('https://ebank.tpb.vn/retail/vX/');

    // Step2: Wait for the login input field to be visible
    const loginId = await driver.wait(
      until.elementLocated(By.xpath('//input[@placeholder="Tên đăng nhập"]')),
      2000,
    );
    await loginId.sendKeys(process.env.USER_NAME);

    // Step3: Wait for the password input field to be visible
    const passwd = await driver.wait(
      until.elementLocated(By.xpath('//input[@placeholder="Mật khẩu"]')),
      2000,
    );
    await passwd.sendKeys(process.env.PASSWORD);

    // Step4: Wait for the login button to be displayed
    const submit = await driver.wait(
      until.elementLocated(By.xpath('//button[contains(@class, "btn-login")]')),
      2000,
    );
    await driver.sleep(1000);
    await submit.click();

    // Step5: Wait for the skip button to be displayed
    const skipButton = await driver.wait(
      until.elementLocated(
        By.xpath('//button[contains(@class, "btn_cm non-border")]'),
      ),
      2000,
    );
    await driver.sleep(1000);
    await skipButton.click();

    // Step6: Wait for the transfer link to be displayed
    const transferLink = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//div[contains(@class, 'card-name-home') and text()='Chuyển khoản']",
        ),
      ),
      2000,
    );
    await driver.sleep(1000);
    await transferLink.click();

    // Step7: Wait for the interbank transfer link to be displayed
    const interbankTransferLink = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//div[contains(@class, 'card-name') and text()='Chuyển tiền liên ngân hàng']",
        ),
      ),
      2000,
    );
    await driver.sleep(1000);
    await interbankTransferLink.click();

    // Step8: Wait for the bank selection input field to be displayed
    const bankSelectionDiv = await driver.wait(
      until.elementLocated(By.css('.selection-input')),
      2000,
    );
    await driver.sleep(1000);
    await bankSelectionDiv.click();

    // Step9: Wait for the search input field to be displayed
    const searchInput = await driver.wait(
      until.elementLocated(By.css('.selection-search-input')),
      2000,
    );
    await searchInput.sendKeys('vib');

    // Step10: Wait for the bank option to be displayed
    const bankOption = await driver.wait(
      until.elementLocated(
        By.xpath("//div[@class='search-detail-name']//*[text()='VIB']"),
      ),
      2000,
    );
    await driver.sleep(1000);
    await bankOption.click();

    // Step11: Wait for the account input field to be displayed
    const accountInput = await driver.wait(
      until.elementLocated(By.css('app-account-input input.input-customize')),
      2000,
    );
    await accountInput.sendKeys(process.env.RECIPIENT_ACCOUNT);

    // Step12: Wait for the money input field to be displayed
    const moneyInput = await driver.wait(
      until.elementLocated(By.css('div.money-container input.ng-valid')),
      2000,
    );
    await moneyInput.sendKeys('1000');

    // Step13: Click space to exit input money
    await driver.findElement(By.xpath('//html')).click();

    // Step14: Wait for the bank to continue
    const element = await driver.findElement(
      By.xpath(
        '//button[contains(@class, "btn-primary") and contains(text(), "Tiếp tục")]',
      ),
    );
    await driver.sleep(3000);
    await driver.executeScript('arguments[0].click();', element as WheelEvent);

    // Step15: Wait for the bank turn off popup
    const button = await driver.wait(
      until.elementLocated(By.css('div.modal-body button.btn.btn-primary')),
      2000,
    );
    await driver.sleep(1000);
    await button.click();

    // Step16: Wait for the "Xác Nhận Giao Dịch" button to be visible
    const confirmButton = await driver.wait(
      until.elementLocated(By.css('div.action button.btn-confirm')),
      2000,
    );
    await driver.sleep(1000);
    await confirmButton.click();

    const title = await driver.getTitle();
    console.log(title);
  } finally {
    // await driver.quit();
  }
}

bootstrap();
