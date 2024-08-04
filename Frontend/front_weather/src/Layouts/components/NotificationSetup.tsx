/// src/components/NotificationSetup.tsx
import React, { useEffect } from "react";
import {
  requestFirebaseNotificationPermission,
 
} from "../../firebase";
import axios from "axios";

const NotificationSetup: React.FC = () => {
  useEffect(() => {
    const registerToken = async () => {
      try {
        const token = await requestFirebaseNotificationPermission();
        if (token) {
          await sendTokenToServer(token);
        }
      } catch (error) {
        console.error("Error registering FCM token:", error);
      }
    };

    const sendTokenToServer = async (token: string) => {
      try {
        const response = await axios.post("http://localhost:8000/weather/registerToken", {token :JSON.stringify( token )},{        
            headers: {
            "Content-Type": "application/json",
          }}
        );

        if (response.status!=200 ) {
          throw new Error("Failed to register token with the server");
        }

        console.log("Token registered with the server successfully");
      } catch (error) {
        console.error("Error sending token to server:", error);
      }
    };

    registerToken();

 
  }, []);

  return (
    <div>
    </div>
  );
};

export default NotificationSetup;
