async function sendImageToAPI(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await fetch("http://localhost:5000/predict", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        console.log("Full API Response:", data); // Log full response
        console.log("Detected Emotion:", data.emotion);
        return data.emotion;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
