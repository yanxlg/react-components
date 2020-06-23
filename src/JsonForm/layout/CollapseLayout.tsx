// 支持仅Icon可控
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Collapse } from 'antd';
import { FormInstance } from 'antd/es/form';
import { FormField, getFormItems } from '../index';
import { ColProps } from 'antd/lib/grid/col';
import { RowProps } from 'antd/lib/grid/row';
import { CollapsePanelProps, CollapseProps } from 'antd/es/collapse';
import formStyles from '../_form.less';

export type CollapseLayoutType = 'collapse';
const typeList = ['collapse'];

export declare interface CollapseLayoutProps<T = string> extends CollapseProps {
    form: FormInstance;
    type: CollapseLayoutType;
    fieldList: Array<FormField<T>>;
    labelClassName?: string;
    itemCol?: ColProps;
    itemRow?: RowProps;
    header?: React.ReactElement;
    footer?: React.ReactElement;
    panel: CollapsePanelProps & {
        header: FormField<T>;
    };
    controlByIcon?: boolean; // 是否限制为仅icon可触控
}

const CollapseLayout = (props: CollapseLayoutProps) => {
    const {
        form,
        labelClassName,
        type,
        fieldList,
        itemCol,
        itemRow,
        header,
        footer,
        panel: { header: _header, ...__props },
        activeKey,
        controlByIcon = false,
        onChange,
        ..._props
    } = props;
    const [key, setKey] = useState(activeKey);
    const targetRef = useRef<EventTarget>(null);

    const onMixChange = useCallback((key: string | string[]) => {
        const target = targetRef.current as HTMLElement;
        console.log(target);
        if (
            controlByIcon &&
            target &&
            /ant-collapse-header/.test(target.parentElement.className) &&
            /anticon/.test(target.className)
        ) {
            onChange && onChange(key);
            setKey(key);
        } else {
            onChange && onChange(key);
            setKey(key);
        }
    }, []);

    useEffect(() => {
        const clickFn = (e: MouseEvent) => {
            targetRef.current = e.target;
        };
        document.addEventListener('click', clickFn);
        return () => document.removeEventListener('click', clickFn);
    }, []);

    return (
        <Collapse
            className={formStyles.formCollapse}
            {..._props}
            activeKey={key}
            onChange={onMixChange}
        >
            <Collapse.Panel header={getFormItems([_header], form)} {...__props}>
                {getFormItems(fieldList, form, labelClassName, itemCol, itemRow)}
            </Collapse.Panel>
        </Collapse>
    );
};

CollapseLayout.typeList = typeList;

export default CollapseLayout;
