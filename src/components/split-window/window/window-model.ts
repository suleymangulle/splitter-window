import React from "react"
import { SplitterStyle } from "../splitter/splitter-moel";

export class WindowModel {
    ViewType?: ViewTypes;
    SplitterProps?: SplitterStyle;
    Width?: number;
    Height?: number;
    children?: React.ReactNode;
    root?: boolean;
}

export enum ViewTypes {
    Vertical = "Vertical",
    Horizontal = "Horizontal"
}