import compressImage from "./CompressImage"

const uploadToS3 = async (file, ref) => {
    try {
        const key = `next-e-commerce/${ref}/${Date.now()}-${file?.name}`
        const uploadResponse = await fetch('/api/upload/', {
            method: 'POST',
            body: JSON.stringify({ key: key })
        })
        const compressedFile = await compressImage(file, 0.5)
        if (uploadResponse?.status === 200) {
            const uploadData = await uploadResponse.json()
            const uploaded = await fetch(uploadData?.uploadUrl, {
                method: 'PUT',
                body: compressedFile,
                headers: {
                    'Content-Type': file?.type
                }
            })
            if (uploaded?.status === 200) {
                return { success: true, key: uploadData?.getUrl }
            }
        }
    } catch (error) {
        return { message: error?.message, success: false }
    }
}

export default uploadToS3