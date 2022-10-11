export const convertFileToBase64 = (
    file: File,
    callBack: (value: string) => void,
): void => {
    const reader = new FileReader();

    reader.onloadend = () => {
        const file64 = reader.result as string;
        callBack(file64);
    };
    reader.readAsDataURL(file);
};
