export async function detectEmotion(imageBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('file', imageBlob, 'image.png');

  const response = await fetch('http://localhost:8000/predict-emotion/', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to get emotion prediction');
  }

  const data = await response.json();
  return data.emotion;
}

