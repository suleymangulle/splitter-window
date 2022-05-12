export class TableModel {
    Data?: Array<DataItem>;
    Mode?: TableMode;
    ChangedData?: Function;
    ShowFilter?: boolean;
}

export class DataItem {
    Id?: string;
    Kontrakt?: string;
    Teklif?: string;
    Data?: string;
}

export enum TableMode {
    EditableMode = "EditableMode"
}