/**
 * @disc:example
 * @author:yanxinaliang
 * @time：2018/6/9 20:34
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { generateApi } from '../src/api';
import JsonForm from '../src/JsonForm';

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
        return (
            <JsonForm
                fieldList={[
                    {
                        type: 'collapseLayout',
                        fieldList: [],
                        panel: {
                            header: {
                                type: 'input',
                                name: 'aaa',
                                label: '1111',
                            },
                        },
                    },
                ]}
            />
        );
    }
}

ReactDOM.render(
    <div>
        1111
        <Test />
    </div>,
    document.getElementById('__react-content'),
);
