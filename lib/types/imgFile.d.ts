export default class ImgFile {
    private store;
    constructor();
    saveImgFiles: (name: string, file: File, forceUpdate?: boolean) => void;
    getImgFile: <T>(name: string, defaultValue: T) => File | T;
    getAllImgFiles: () => {
        [key: string]: File;
    };
    resetImgFiles: () => Record<string, never>;
}
//# sourceMappingURL=imgFile.d.ts.map