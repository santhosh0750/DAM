const validateEmail = (email) => {
  console.log("email", email);
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
};

const dynamicSort = (prop, arr) =>
  [...arr].sort((a, b) => {
    const valA = a[prop] ?? "";
    const valB = b[prop] ?? "";
    return String(valB).localeCompare(String(valA));
  });

export { validateEmail, dynamicSort };
