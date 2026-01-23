const validateUsername = (value) => {
    if (!value) return "Name is required";
    if (value.length < 3) return "Name must be at least 3 characters";
    return "";
};

const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
    return "";
};

const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
};

export { validateUsername, validateEmail, validatePassword };