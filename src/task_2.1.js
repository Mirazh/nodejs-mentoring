import fs from 'fs';
import csv from 'csvtojson';

(async () => {
    try {
        const jsonArray = await csv().fromFile('./src/task-2.csv');

        const formattedJson = jsonArray.map(data => {
            delete data.Amount;

            return Object.keys(data).reduce((result, key) => {
                result[key.toLowerCase()] = data[key];

                return result;
            }, {});
        });

        await fs.promises.writeFile('./src/task-2.1.json', JSON.stringify(formattedJson, null, 2));
    } catch (error) {
        console.log(error.code);
    }
})();
