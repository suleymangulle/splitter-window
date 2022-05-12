export class SplitterStyle {
    Border?: string;
    Width?: number;
    Background?: string;
}

export class SplitterModel extends SplitterStyle {
    SplitterMode?: SplitterMode;
    OnSchangeSplitterPosition?: Function
}

export enum SplitterMode {
    Vertical = "Vertical",
    Horizontal = "Horizontal"
}