// tslint:disable:max-line-length
import * as _ from 'lodash';

export class Commands {


    private commandList: any[] =
    [
        "ls", "cat", "ansible-playbook", "npm install"
    ];

    getRandomQuote(): string {

        const command = _.orderBy(this.commandList, (x) => _.random(1, 100, true))[0];
        return command;
    }

}

