const puppeteer = require("puppeteer"),
  noVacStr = "There are currently no vacancies, please check back again later.";
let isRunning = true;

const runScraper = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    while (isRunning) {
      const d = new Date();
      if (d.getMinutes() == 1 && d.getSeconds() == 1) {
        console.log("running...");
        let msg = await checkStatus(page);
        if (msg != noVacStr) {
          browser.close();
          sendMail();
        } else {
          //console.log("No vacancies yet. Sorry!");
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const checkStatus = async (page) => {
  //   await page.goto("https://lincolnsu.com/vacancies/student");
  await page.goto("https://www.hl.co.uk/shares/stock-market-summary/ftse-100");
  const results = await page.evaluate(() => {
    return {
      msg: document.getElementById("ls-mid-III-L").innerHTML,
    };
  });
  console.log(results.msg);
  return results.msg;
};

const sendMail = async () => {
  console.log("sending mail...");
  isRunning = false;
};

runScraper();
