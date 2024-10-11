 const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
    const image = await createImage(imageSrc); 
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
  
    ctx.drawImage(
      image,
      croppedAreaPixels.x, // Crop X position
      croppedAreaPixels.y, // Crop Y position
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
  
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };
  
  // Helper function to load image from a URL
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image); 
      image.onerror = (error) => reject(error); 
    });
  
  export default getCroppedImg;
  