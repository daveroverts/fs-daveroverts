const BIRTHDATE = new Date("1997-03-14");

export function getAge(now: Date = new Date()): number {
  let age = now.getFullYear() - BIRTHDATE.getFullYear();
  const beforeBirthday =
    now.getMonth() < BIRTHDATE.getMonth() ||
    (now.getMonth() === BIRTHDATE.getMonth() &&
      now.getDate() < BIRTHDATE.getDate());
  if (beforeBirthday) age--;
  return age;
}
