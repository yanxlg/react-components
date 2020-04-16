/**
 * @disc:example
 * @author:yanxinaliang
 * @time：2018/6/9 20:34
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { generateApi } from '../src/api';

class Test extends React.Component<any, any> {
    componentDidMount(): void {
        const api = generateApi({
            method: 'get',
            path: 'http://localhost:8000/v1/task/exec_log',
            options: {
                mode: 'cors',
            },
        });
        api.request();
        console.time();
        setTimeout(() => {
            console.timeEnd();
            api.cancel();
            //
            // setTimeout(() => {
            //     api.cancel();
            // }, 1000);
        }, 3000);
    }

    render() {
        return <div></div>;
    }
}

ReactDOM.render(
    <div>
        1111
        <Test />
    </div>,
    document.getElementById('__react-content'),
);
