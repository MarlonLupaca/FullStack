import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function notify(message, type = 'default') {
    if (type === "modal") {
        Swal.fire({
            title: message,
            icon: "info",
            showConfirmButton: true,
        });
    } else if (type === "default") {
        toast.info(message);
    } else if (type === "error") {
        toast.error(message);
    }
}
