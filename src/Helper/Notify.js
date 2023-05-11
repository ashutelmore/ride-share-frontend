import { notification } from "antd";



export const useNotify = () => {
    const [api, contextHolder] = notification.useNotification();
    notification.config({
        duration: 0,
    })


    const showNotification = (message, descp = "") => {

        api.info({
            message: ` ${message}`,
            description: `${descp}`,
            message,
        });
    };

    return [showNotification, contextHolder];
}
