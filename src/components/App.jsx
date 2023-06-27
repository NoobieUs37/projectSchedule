import AddSchedule from "./AddSchedule"
import ListSchedule from "./ListSchedule"
import Auth from "./Auth"
import { useState, useEffect } from "react"

function App() {
    const [authDetails, setAuthDetails] = useState({
        userType: "",
        identificationNumber: "",
        password: "",
    })
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [slotsRemain, setSlotsRemain] = useState({
        Monday: 8,
        Tuesday: 0,
        Wednesday: 4,
        Thursday: 12,
        Friday: 8,
    })
    const [slotSchedules, setSlotSchedules] = useState({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
    })

    useEffect(() => {
        console.log(slotsRemain)
    }, [slotsRemain])

    useEffect(() => {
        console.log(slotSchedules)
    }, [slotSchedules])

    function addScheduleSlots(slotDetails) {
        let day = slotDetails.schedule["day"]
        setSlotSchedules((prevScheduledSlots) => {
            return {
                ...prevScheduledSlots,
                [day]: [...prevScheduledSlots[day], slotDetails.studentList],
            }
        })
        setSlotsRemain((prevSlotsRemain) => {
            return {
                ...slotsRemain,
                [day]: slotsRemain[day] - 1,
            }
        })
    }

    function sendMessage(message) {
        if (!message.auth) {
            alert("Authentication failed")
            setLoggedIn(false)
            return
        }
        setLoggedIn(true)
        setAuthDetails((prevAuthDetails) => {
            return { ...prevAuthDetails, userType: message.typeOfUser }
        })
    }

    return (
        <>
            {!isLoggedIn && (
                <Auth
                    sendMessage={sendMessage}
                    authDetails={authDetails}
                    setAuthDetails={setAuthDetails}
                />
            )}
            {isLoggedIn && authDetails.userType === "student" && (
                <AddSchedule
                    setAuthDetails={setAuthDetails}
                    setLoggedIn={setLoggedIn}
                    addScheduleSlots={addScheduleSlots}
                />
            )}
            {isLoggedIn && authDetails.userType === "faculty" && (
                <ListSchedule slotSchedules={slotSchedules} />
            )}
        </>
    )
}

export default App
