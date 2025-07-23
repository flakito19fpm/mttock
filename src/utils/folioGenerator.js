export const generateFolio = (lastFolio) => {
  if (!lastFolio) return "CM-0001";
  
  const number = parseInt(lastFolio.split('-')[1]);
  const nextNumber = number + 1;
  return `CM-${nextNumber.toString().padStart(4, '0')}`;
};