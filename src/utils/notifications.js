import toast from "react-hot-toast";
import Swal from "sweetalert2";

// Toast notifications
export const showToast = {
  success: (message) =>
    toast.success(message, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#10B981",
      },
    }),

  error: (message) =>
    toast.error(message, {
      duration: 5000,
      position: "top-right",
      style: {
        background: "#EF4444",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#EF4444",
      },
    }),

  loading: (message) =>
    toast.loading(message, {
      position: "top-right",
      style: {
        background: "#6B7280",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        fontWeight: "500",
      },
    }),

  info: (message) =>
    toast(message, {
      duration: 4000,
      position: "top-right",
      icon: "ℹ️",
      style: {
        background: "#3B82F6",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        fontWeight: "500",
      },
    }),

  dismiss: () => toast.dismiss(),
};

// Sweet Alert configurations with enhanced dark mode support
const getSwalTheme = (isDark = false) => ({
  background: isDark ? "#1a1f2e" : "#fff",
  color: isDark ? "#f8fafc" : "#111827",
  confirmButtonColor: "#af3494",
  cancelButtonColor: isDark ? "#64748b" : "#9CA3AF",
  fontFamily: "Inter, sans-serif",
  buttonsStyling: false,
  customClass: {
    popup: isDark ? "dark-popup" : "",
    confirmButton: "swal-confirm-btn",
    cancelButton: "swal-cancel-btn",
  },
});

export const showAlert = {
  confirm: async (options = {}) => {
    const isDark = document.documentElement.classList.contains("dark");

    const result = await Swal.fire({
      title: options.title || "Are you sure?",
      text: options.text || "This action cannot be undone.",
      icon: options.icon || "warning",
      showCancelButton: true,
      confirmButtonText: options.confirmText || "Yes, proceed",
      cancelButtonText: options.cancelText || "Cancel",
      reverseButtons: true,
      heightAuto: false,
      backdrop: isDark ? "rgba(17, 24, 39, 0.8)" : "rgba(0, 0, 0, 0.4)",
      customClass: {
        popup: isDark ? "dark-popup" : "",
        title: "swal-title",
        content: "swal-content",
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
      ...getSwalTheme(isDark),
      ...options.config,
    });

    return result.isConfirmed;
  },

  success: (options = {}) => {
    const isDark = document.documentElement.classList.contains("dark");

    return Swal.fire({
      title: options.title || "Success!",
      text: options.text || "Operation completed successfully.",
      icon: "success",
      confirmButtonText: options.confirmText || "OK",
      heightAuto: false,
      backdrop: isDark ? "rgba(17, 24, 39, 0.8)" : "rgba(0, 0, 0, 0.4)",
      customClass: {
        popup: isDark ? "dark-popup" : "",
        title: "swal-title",
        content: "swal-content",
        confirmButton: "swal-confirm-btn",
      },
      ...getSwalTheme(isDark),
      ...options.config,
    });
  },

  error: (options = {}) => {
    const isDark = document.documentElement.classList.contains("dark");

    return Swal.fire({
      title: options.title || "Error!",
      text: options.text || "Something went wrong.",
      icon: "error",
      confirmButtonText: options.confirmText || "OK",
      heightAuto: false,
      backdrop: isDark ? "rgba(17, 24, 39, 0.8)" : "rgba(0, 0, 0, 0.4)",
      customClass: {
        popup: isDark ? "dark-popup" : "",
        title: "swal-title",
        content: "swal-content",
        confirmButton: "swal-confirm-btn",
      },
      ...getSwalTheme(isDark),
      ...options.config,
    });
  },

  info: (options = {}) => {
    const isDark = document.documentElement.classList.contains("dark");

    return Swal.fire({
      title: options.title || "Information",
      text: options.text,
      icon: "info",
      confirmButtonText: options.confirmText || "OK",
      heightAuto: false,
      backdrop: isDark ? "rgba(17, 24, 39, 0.8)" : "rgba(0, 0, 0, 0.4)",
      customClass: {
        popup: isDark ? "dark-popup" : "",
        title: "swal-title",
        content: "swal-content",
        confirmButton: "swal-confirm-btn",
      },
      ...getSwalTheme(isDark),
      ...options.config,
    });
  },
};
