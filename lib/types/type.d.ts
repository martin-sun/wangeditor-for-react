import WEditor from 'wangeditor';
type ConfigType = InstanceType<typeof WEditor>['config'];
type hookType = Record<string, Array<unknown> | ((editor: typeof WEditor, ...args: unknown[]) => void)>;
export type ReactWEProps = {
    style?: StyleSheet;
    className?: string;
    config?: Partial<ConfigType>;
    defaultValue?: string;
    localBlobImg?: boolean;
    placeholder?: string;
    value?: string;
    languages?: Record<string, string>;
    instanceHook?: hookType;
    globalHook?: hookType;
    linkImgCallback?: (src: string, alt: string, href: string) => void;
    onlineVideoCallback?: (video: unknown) => void;
    onChange?: (html: string) => void;
    onBlur?: (html: string) => void;
    onFocus?: (html: string) => void;
};
export {};
//# sourceMappingURL=type.d.ts.map