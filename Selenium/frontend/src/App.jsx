import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [ipAddress, setIpAddress] = useState("")
  const [trend1, setTrend1] = useState("")
  const [trend2, setTrend2] = useState("")
  const [trend3, setTrend3] = useState("")
  const [trend4, setTrend4] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [jsonFile, setJsonFile] = useState("")

  const getData = async () => {
   const getip =  await axios.get("https://api.ipify.org/?format=json")
   const ip = getip.data.ip
   
   await axios.post(import.meta.env.VITE_API, {ip:ip})
    .then(res=>{
      setTrend1(res.data[0].trending1)
      setTrend2(res.data[0].trending2)
      setTrend3(res.data[0].trending3)
      setTrend4(res.data[0].trending4)
      setIpAddress(res.data[0].ipAddress)
      setJsonFile(res.data)
      setDate(res.data[0].createdAt)
      console.log(res.data);
    })
    setLoading(true)
  }

  return (
    <>
      {loading && (
        <>
          <h2 className='mb-1 p-2'>These are the most happening topics as on {date}</h2>
          <ul>
            <li>{trend1}</li>
            <li>{trend2}</li>
            <li>{trend3}</li>
            <li>{trend4}</li>
          </ul>
          <p>The IP address used for this query was {ipAddress}</p>
          <p className='mb-2 p-2'>Here’s a JSON extract of this record from the MongoDB:</p>
          <p className='mb-2 bg-black text-white w-45 h-full p-2' >{JSON.stringify(jsonFile, null, 2)}</p>
        </>
      )}
      
      <button className='border-2 border-black' onClick={getData}>{loading ? "Click Here to Run Script Again" : "Click Here to Run Script"}</button>
    </>
  )
}

export default App
