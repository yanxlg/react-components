// 支持仅Icon可控
import React, { useCallback, useMemo, useState } from 'react';
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
        expandIcon,
        ..._props
    } = props;
    const [key, setKey] = useState(activeKey);

    const onMixChange = useCallback((key: string | string[]) => {
        if (!controlByIcon) {
            onChange && onChange(key);
            setKey(key);
        }
    }, []);

    const toggleActive = useCallback(() => {
        setKey(key => {
            if (key === __props.key || (Array.isArray(key) && key.indexOf(__props.key) > -1)) {
                onChange && onChange([]);
                return [];
            } else {
                onChange && onChange([__props.key as any]);
                return [__props.key];
            }
        });
    }, []);

    const icon = useMemo(() => {
        if (expandIcon) {
            return (props: any) => {
                const _icon = expandIcon(props);
                return React.cloneElement(_icon as any, {
                    ...(_icon as any).props,
                    onClick: controlByIcon ? toggleActive : undefined,
                });
            };
        } else {
            return undefined;
        }
    }, []);

    return (
        <Collapse
            className={formStyles.formCollapse}
            {..._props}
            activeKey={key}
            onChange={onMixChange}
            expandIcon={icon}
        >
            <Collapse.Panel header={getFormItems([_header], form)} {...__props}>
                {getFormItems(fieldList, form, labelClassName, itemCol, itemRow)}
            </Collapse.Panel>
        </Collapse>
    );
};

CollapseLayout.typeList = typeList;

export default CollapseLayout;
