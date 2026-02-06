export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  const cpfDigits = cpf.split("").map((el) => +el);
  const rest = (count: number) =>
    ((cpfDigits
      .slice(0, count - 12)
      .reduce((soma, el, index) => soma + el * (count - index), 0) *
      10) %
      11) %
    10;

  return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
};

export const formatCPF = (cpf: string): string => {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const validatePassword = (
  password: string,
): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return {
      valid: false,
      message: "A senha deve ter pelo menos 8 caracteres.",
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "A senha deve conter pelo menos uma letra maiúscula.",
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "A senha deve conter pelo menos um número.",
    };
  }
  return { valid: true };
};
