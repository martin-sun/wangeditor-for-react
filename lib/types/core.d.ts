import * as React from 'react';
import WEditor from 'wangeditor';
import { ReactWEProps } from './type';
import ImgFile from './imgFile';
interface ReactWEditorState {
    [key: string]: unknown;
}
export default class ReactWEditor extends React.PureComponent<ReactWEProps, ReactWEditorState> {
    readonly props: ReactWEProps;
    state: ReactWEditorState;
    private readonly id;
    private hasCreated;
    protected imgFile: ImgFile;
    protected defaultConfig: Record<string, unknown>;
    editor: WEditor | null;
    private _isMounted;
    UNSAFE_componentWillReceiveProps(nextProps: ReactWEProps): void;
    componentDidUpdate(prevProps: ReactWEProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private __hook__run;
    private __before__instanced;
    private __after__instanced;
    protected init(): void;
    protected check(): boolean;
    protected create(context?: {}): void;
    extend(context?: Record<string, unknown>, customFilter?: string[]): void;
    destroy(): void;
    setConfig(config: Record<string, unknown> | undefined): void;
    setDefaultConfigByProps: () => void;
    setContentByHTMLString(html: string | undefined): void;
    replaceHTMLImgBlobURL(html: string, callback: (v: File | {
        toString: () => string;
    }) => string): string;
    render(): React.DetailedReactHTMLElement<{
        style: React.CSSProperties;
        className: string | undefined;
        id: string;
    }, HTMLElement>;
    changeCreatedFlag: (flag: boolean) => boolean;
    created: () => boolean;
    destroyed: () => boolean;
    isCreated: () => boolean;
}
export {};
//# sourceMappingURL=core.d.ts.map