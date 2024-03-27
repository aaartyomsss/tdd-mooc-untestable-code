const millisPerDay = 24 * 60 * 60 * 1000;

/**
 * This code is untestable due to the Date comparison starting from now.
 * I believe in other word the function is not pure, because each call will 
 * produce different output.
 * 
 * As a result the function should accept specific date as a argument and perform
 * the calculation for it. Then the code will return the same result each time.
 */
export function daysUntilChristmas() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const christmasDay = new Date(now.getFullYear(), 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
