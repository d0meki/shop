export const gerProductImageAction = (imagenName: string) => {
  return imagenName.includes('http')
    ? imagenName
    : `${import.meta.env.VITE_TESLO_API_URL}/files/product/${imagenName}`;
};
