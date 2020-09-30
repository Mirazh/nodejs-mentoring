import express from 'express';
import { apiRouter } from './routes';
import { connectToDB } from './config/dbConnect';

import { UserGroupService } from "./components/userGroup";
import { Service as GroupService } from "./components/group";

const app: express.Application = express();
const PORT = 3000;

app.use(express.json());
app.use(apiRouter);

connectToDB().then(() => app.listen(PORT, async () => {
    console.log(`App listening at http://localhost:${PORT}`);

    // await UserGroupService.addUserToGroup(
    //     '83499fc6-fa72-11ea-adc1-0242ac120002',
    //     ['01b7587c-fa72-11ea-adc1-0242ac120002', '01b75c14-fa72-11ea-adc1-0242ac120002']
    // );

    // await GroupService.deleteGroupById('83499fc6-fa72-11ea-adc1-0242ac120002')
}));
