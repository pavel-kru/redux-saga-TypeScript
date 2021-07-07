interface Rules {
  required?: boolean;
  isMail?: boolean;
  isTel?: boolean;
  minLength?: number;
}

export const checkValidity = (value: string, rules: Rules): boolean => {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.isMail) {
    const pattern = /^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isTel) {
    const pattern = /^[\d+][\d()-]{7,19}\d$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  return isValid;
};
