type UseDateReturnType = {
  formatDate: (date: Date) => string;
  ddMMyyyStringToDate: (value: string) => Date;
};

export const useDate = (): UseDateReturnType => {
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const ddMMyyyStringToDate = (dateString: string): Date => {
    const dateParts = dateString.split("/");
    return new Date(+dateParts[2], Number(dateParts[1]) - 1, +dateParts[0]);
  };

  return { formatDate, ddMMyyyStringToDate };
};
