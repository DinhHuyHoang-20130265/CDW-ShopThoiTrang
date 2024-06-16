export const imgProvider = async (imageData: any) => {
    const apiUrl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_URL}`;

    const formData = new FormData();
    formData.append("image", imageData);

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json"
            },
            body: formData
        });

        const data = await response.json();
        if (data && data.data && data.data.url) {
            console.log("URL của ảnh đã upload:", data.data.url);
            return data.data.url;
        } else {
            console.log("Lỗi khi upload ảnh:", data.error.message);
            return data.error.message;
        }
    } catch (error) {
        console.log("Lỗi khi thực hiện yêu cầu upload:", error);
    }
};

export async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader: any = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result.split(',')[1])
        }
        reader.onerror = reject
    })
}
