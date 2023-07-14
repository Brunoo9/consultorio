import "antd/dist/antd.css";
import { notification } from "antd";

export const openError = (description) => {
  notification.error({
    message: "Error!",
    description: `${description}`,
    duration: 2,
  });
};
export const openSuccess = (description) => {
  notification.success({
    message: "Éxito!",
    description: `${description}`,
    duration: 2,
  });
};
