import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TimerIcon from "@mui/icons-material/Timer";
import School from "@mui/icons-material/School";
import Location from "@mui/icons-material/LocationOn";
import User from "@mui/icons-material/Person";
import Header from "../../../components/users/header";
import CollecButtonSubmit from "../../../components/users/presensi/collecbutton";
import { getRole, fetchUser } from "../../../libs/api";
import { checkLocation } from "../../../libs/location";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Page = () => {
    const [role, setRole] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [location, setLocation] = useState("Loading...");
    const [selectedName, setSelectedName] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const time = new Date();
    const days = `${time.getDate().toLocaleString("en-US", { minimumIntegerDigits: 2 })}-${(time.getMonth() + 1).toLocaleString("en-US", { minimumIntegerDigits: 2 })}-${time.getFullYear()}`;

    const features = [
        {
            icon: <User />,
            title: (
                <select
                    className="focus:outline-none w-full"
                    value={selectedName}
                    onChange={(event) => setSelectedName(event.target.value)}
                >
                    <option value="">Select Name</option>
                    {user?.map((u, index) => (
                        <option key={index} value={u.name}>
                            {u.name}
                        </option>
                    ))}
                </select>
            ),
        },
        {
            icon: <School />,
            title: (
                <select
                    className="focus:outline-none w-40"
                    value={selectedClass}
                    onChange={(event) => setSelectedClass(event.target.value)}
                >
                    <option value="">Select Kelas</option>
                    {[...new Set(user?.map((u) => u.kelas))].map((kelas, index) => (
                        <option key={index} value={kelas}>
                            {kelas}
                        </option>
                    ))}
                </select>
            ),

        },
        { icon: <CalendarMonthIcon />, title: days },
        { icon: <TimerIcon />, title: currentTime },
        { icon: <Location />, title: location },
    ];

    useEffect(() => {
        const fetchRoleAndUser = async () => {
            try {
                const roles = await getRole();
                setRole(roles);

                const userData = await fetchUser();
                if (userData?.data?.name && userData?.data?.kelas) {
                    const combinedData = userData.data.name.map((name, index) => ({
                        name,
                        kelas: userData.data.kelas[index],
                    }));
                    setUser(combinedData);
                } else {
                    console.error("Unexpected data structure:", userData.data);
                    setUser([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
                setOpenSnackbar(true);
            }
        };

        fetchRoleAndUser();

        checkLocation()
            .then((isAllowed) => {
                setLocation(isAllowed ? "Di Dalam Sekolah" : "Di Luar Sekolah");
            })
            .catch((error) => {
                console.error("Error:", error.message);
                setError(error.message);
                setOpenSnackbar(true);
            });

        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            name: selectedName,
            kelas: selectedClass,
            time: currentTime,
            location,
        }));
    }, [selectedName, selectedClass, currentTime, location]);

    const [data, setData] = useState({
        name: "",
        kelas: "",
        date: days,
        time: "",
        location: "",
    });

    const resetData = () => {
        setSelectedName("");
        setSelectedClass("");
        setData((prev) => ({
            ...prev,
            name: "",
            kelas: "",
        }));
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Layout>
            <div className="container md:w-[50%] mx-auto md:px-4">
                <Header title="Presensi" />
                <div className="flex flex-col justify-center items-center w-full">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-row items-center space-x-2 border-2 border-pink-300 rounded-full p-2 w-[80%] mb-3"
                        >
                            {feature.icon}
                            <p className="text-sm px-2">{feature.title}</p>
                        </div>
                    ))}
                    <CollecButtonSubmit data={data} resetData={resetData} />
                </div>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
                        {error || "Terjadi kesalahan. Silakan coba lagi."}
                    </Alert>
                </Snackbar>
            </div>
        </Layout>
    );
};

export default Page;
