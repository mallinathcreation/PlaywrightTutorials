//to customize my test data - interview question
const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            username: "mbasu@gmail.com",
            password: "Mbasu@123",
            productName: "ZARA COAT 3"
        }
    }

)