export function calculateDuration(startDateStr: string, endDateStr?: string | null): string {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const parseDate = (dateStr: string) => {
    const parts = dateStr.split(' ');
    const month = months.findIndex(m => m.startsWith(parts[0])) + 1;
    const year = parseInt(parts[1]);
    return { month, year };
  };

  const { month: startMonth, year: startYear } = parseDate(startDateStr);

  let endMonth: number, endYear: number;

  if (endDateStr) {
    const end = parseDate(endDateStr);
    endMonth = end.month;
    endYear = end.year;
  } else {
    endMonth = currentMonth;
    endYear = currentYear;
  }

  const endTotalMonths = endYear * 12 + endMonth;
  const startTotalMonths = startYear * 12 + startMonth;
  const monthsDiff = endTotalMonths - startTotalMonths;
  
  if (monthsDiff <= 0) {
    return '1 mo';
  }

  const years = Math.floor(monthsDiff / 12);
  const remainingMonths = monthsDiff % 12;

  if (years === 0) {
    return `${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return `${years} yr${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} yr${years !== 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`;
  }
}

export function formatPeriod(startDateStr: string, endDateStr: string | null = null): string {
  const duration = calculateDuration(startDateStr, endDateStr);
  const end = endDateStr || 'Present';
  return `${startDateStr} - ${end} · ${duration}`;
}