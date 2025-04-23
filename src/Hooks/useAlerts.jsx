// src/Hooks/useAlert.ts
import Swal from 'sweetalert2';

const useAlert = () => {
    const showSuccess = (title, text) => {
        Swal.fire({
            title,
            text,
            icon: 'success',
        });
    };

    const showError = (title, text) => {
        Swal.fire({
            title,
            text,
            icon: 'error',
        });
    };

    return { showSuccess, showError };
};

export default useAlert;
