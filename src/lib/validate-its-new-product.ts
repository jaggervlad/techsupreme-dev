export function validateItsNewProduct(date: string) {
  const today = new Date();

  const daysBefore = new Date();
  daysBefore.setDate(today.getDate() - 15);

  const fomartedDate = new Date(date);

  return fomartedDate >= daysBefore;
}
