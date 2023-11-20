export interface ISelectOptions {
    [key: string]: string | number;
    [key: number]: string | number;
}

export interface typeFieldOptions {
    text: 'text';
    string: 'string';
    checkbox: 'checkbox';
    number: 'number';
    grid: 'grid';
    multifiles: 'multifile';
    select: 'select';
    richTextBox: 'richTextBox';
    email: 'email';
    date: 'date';
    password: 'password';
    // Adicione outras opções aqui
}

export interface ISchema {
    type: keyof typeFieldOptions;
    width: number;
    order: number;
    min?: number;
    max?: number;
    browserColumn: boolean;
    api?: string;
    grid?: ISchema;
    mask?: string | string[];
    options?: Array<string> | ISelectOptions;
    default?: string | number;
    label?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    regex?: string;
}

export interface IsSchemaSelect extends ISchema {
    type: "select"; // Apenas quando o type for "select", a propriedade api será obrigatória
    api: string;
}


export interface IGlobals {
    $GLOBALS: {
        table: string;
        prefix: string;
        icon_name: string,
        plural_name: string,
        singular_name: string;
        fields: Record<string, ISchema>
    }
}