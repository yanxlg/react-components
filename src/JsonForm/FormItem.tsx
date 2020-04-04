import React from "react";
import { Form } from "antd";
import formStyles from "./_form.less";

const FormItem = ({
    formItemClassName = formStyles.formItem,
    children,
}: {
    formItemClassName?: string;
    children: React.ReactNode;
}) => {
    return <Form.Item className={formItemClassName}>{children}</Form.Item>;
};

export default FormItem;
