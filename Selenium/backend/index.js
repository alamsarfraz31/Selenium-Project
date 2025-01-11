require('dotenv').config()
const express = require("express")
const cors = require("cors")
const { Builder, Browser, By, WebDriver,} = require('selenium-webdriver');
const db = require('./model/db');
const Trending = require("./model/trends");
const bodyParser= require("body-parser")

const DB = db()
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use(cors());

const corsOption = {
    origin : process.env.API_ORIGIN,
}

app.post("/", async (req, res)=>{

    try {
        const driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.navigate().to("https://x.com/i/flow/login");
        await driver.sleep(10000)
        const username = await driver.findElement(By.css('div[role="group"] input[name="text"]'));
        await driver.actions().sendKeys(username, process.env.USER_NAME).perform()
        await driver.sleep(3000)
        const next = await driver.findElements(By.css(' div[role="group"] button div span span'));
        await next[1].click();
        await driver.sleep(10000)
        const password = await driver.findElement(By.css('div[role="group"] input[name="password"]'));
        await driver.actions().sendKeys(password, process.env.USER_PASS).perform()
        await driver.sleep(3000)
        const login = await driver.findElements(By.css('div[role="group"] button div span span'));
        await login[0].click();
        await driver.sleep(5000)
        
        const trends = await driver.findElements(By.css("section div.r-1bymd8e"));
        const t1 = await trends[0].getText();
        const t2 = await trends[1].getText();
        const t3 = await trends[2].getText();
        const t4 = await trends[3].getText();
        console.log(t1);
        console.log(t2);
        console.log(t3);
        console.log(t4);
        
        await driver.quit();

        const data = {
            trending1:t1,
            trending2:t2,
            trending3:t3,
            trending4:t4,
            ipAddress: req.body.ip,
        }

        await Trending.create(data)
        const file = await Trending.find().sort({ $natural: -1 }).limit(1)

        res.status(200).json(file)

    }
    catch {
        error=>{
            console.log(error)
            res.send(error)
        }
    }

})

app.listen(process.env.PORT, ()=>{
    console.log("server Running on 3000")
})