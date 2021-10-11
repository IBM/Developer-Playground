import { ToastNotification, Loading } from "carbon-components-react"
import { useState } from "react"
import axios from "axios"

const showNotifications = (endpoint, type, data) => {
    const [showNotif, setNotification] = useState(true)
    return (
        <div>
            {showNotif ?
                <ToastNotification
                    kind="error"
                    iconDescription="Close notification"
                    subtitle={<span>Results not ready yet</span>}
                    timeout={3000}
                    onCloseButtonClick={() => setNotification(false)}
                    title="Error Notification"
                /> : null}
        </div>
    )
}
export default showNotifications;
