/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

/** Función encargada de tranformar un audio blob a un string base64 */
export const audioBlobToBase64 = (audioBlob, callback) => {
  const reader = new FileReader();
  reader.onload = () => {
    const { result } = reader;
    const base64 = result.split(',')[1];
    callback(base64);
  }
  reader.readAsDataURL(audioBlob);
}

/** Función encargada de transformar un string base64 en un audio blob */
export const base64ToAudioBlob = (audioURL) => {
  const rawData = window.atob(audioURL);
  const dataLen = rawData.length;

  /** 
   * El arreglo Uint8Array/ArrayBuffer es muy IMPORTANTE para que 
   * la transformación funcione de manera correcta. 
   */
  let chunks = new Uint8Array(new ArrayBuffer(dataLen));
  for (let i = 0; i < dataLen; i++) {
    chunks[i] = rawData.charCodeAt(i);
  }

  return chunks;
}