import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getDealStatusColor = (status: string): string => {
  switch (status) {
    case "pending":
      return "text-yellow-600";
    case "approved":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};


export const getErrorMessage = (error: any): string => {
  // Handle Zod validation errors from backend (error.response.data.error.details)
  if (error?.response?.data?.error?.details && Array.isArray(error.response.data.error.details)) {
    const validationErrors = error.response.data.error.details;
    if (validationErrors.length > 0) {
      const firstError = validationErrors[0];
      if (firstError.path?.includes('password')) {
        return 'Password must be at least 6 characters long';
      }
      if (firstError.path?.includes('email')) {
        return 'Invalid email format';
      }
      if (firstError.path?.includes('username')) {
        return 'Username must be at least 3 characters long';
      }
      return firstError.message || 'Validation failed';
    }
  }

  // Handle validation errors array in other locations
  if (error?.response?.data?.error && Array.isArray(error.response.data.error)) {
    const validationErrors = error.response.data.error;
    if (validationErrors.length > 0) {
      const firstError = validationErrors[0];
      if (firstError.code === 'too_small' && firstError.path?.includes('password')) {
        return 'Password must be at least 6 characters long';
      }
      return firstError.message || 'Validation failed';
    }
  }

  // Handle case where error itself is an array
  if (Array.isArray(error?.response?.data)) {
    const errorArray = error.response.data;
    if (errorArray.length > 0) {
      const firstError = errorArray[0];
      if (firstError.code === 'too_small' && firstError.path?.includes('password')) {
        return 'Password must be at least 6 characters long';
      }
      return firstError.message || 'Validation failed';
    }
  }

  // Handle case where error is directly an array
  if (Array.isArray(error)) {
    const firstError = error[0];
    if (firstError?.code === 'too_small' && firstError.path?.includes('password')) {
      return 'Password must be at least 6 characters long';
    }
    return firstError?.message || 'Validation failed';
  }

  // Handle standard error messages
  if (error?.response?.data?.error?.message) return error.response.data.error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "Something went wrong";
};

export const setLocalStorageItem = (key: string, value: any): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
