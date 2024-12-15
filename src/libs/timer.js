import React, { useEffect, useState } from "react";

const Timer = () => {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });
            setCurrentTime(formattedTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <>{currentTime || "00:00:00"}</>;
};

export default Timer;
