import imageCompression from "browser-image-compression";

const compressImage = async (file, requiredSizeInMB) => {
    try {
        let compressedFile = file;
        let compressedSizeInMB = (compressedFile.size / (1024 * 1024)).toFixed(2);

        while (compressedSizeInMB > requiredSizeInMB) {
            compressedFile = await imageCompression(compressedFile, { maxSizeMB: 1 });
            compressedSizeInMB = (compressedFile.size / (1024 * 1024)).toFixed(2);
        }
        return compressedFile;
    } catch (error) {
        throw error;
    }
};

export default compressImage;
