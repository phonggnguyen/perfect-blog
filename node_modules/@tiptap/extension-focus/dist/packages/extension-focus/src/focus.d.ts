import { Extension } from '@tiptap/core';
export interface FocusOptions {
    className: string;
    mode: 'all' | 'deepest' | 'shallowest';
}
export declare const FocusClasses: Extension<FocusOptions, any>;
