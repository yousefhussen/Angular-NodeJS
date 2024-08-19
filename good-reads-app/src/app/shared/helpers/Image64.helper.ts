export function handleFileInput(input: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    if (input != null) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const binaryString = event.target.result;
        const base64String = btoa(binaryString);
        resolve(base64String);
      };
      reader.readAsBinaryString(input);
    } else {
      reject('Error: Input is null or undefined');
    }
  });
}

  export function  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }