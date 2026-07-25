//to customize my test data - interview question
import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};
export const customtest = baseTest.extend<{
    testDataForOrder: TestDataForOrder;
}>(
    {
        testDataForOrder: {
            username: "mbasu@gmail.com",
            password: "Mbasu@123",
            productName: "ZARA COAT 3"
        }
    }

)