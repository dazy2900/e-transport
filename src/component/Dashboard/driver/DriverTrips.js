import './driver.scss'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import Passenger from '../passenger/passenger'

const cookies = new Cookies()

const DriverTrips = () => {
  const [post, setPost] = useState([])
  const [cancelTrip, setCancelTrip] = useState([])
  const [passenger, setPassenger] = useState([])

  const baseURL = 'http://localhost/Travelbro/api.php'
  useEffect(() => {
    ViewStuff()
  }, [cancelTrip])
  const ViewStuff = () => {
    const user = cookies.get('user')

    const data = {
      request: 'driver_trips',
      user: user,
    }
    const new_data = JSON.stringify(data)

    axios.post(baseURL, new_data).then((response) => {
      const driver_trips = response.data
      //alert(trip_request)
      console.log(driver_trips)
      setPost(driver_trips)
    })
  }
  const CancelTrip = (e) => {
    const id = e.target.id
    const user = cookies.get('user')
    //alert(id)

    const datas = {
      request: 'cancel_trip',
      id: id,
      user: user,
    }
    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const cancel_trip = response.data
      setCancelTrip(cancel_trip)
      //alert(cancelTrip)
    })
  }
  const Passengers = (e) => {
    const id = e.target.id
    const user = cookies.get('user')
    //alert(id)

    const datas = {
      request: 'trip_passenger',
      id: id,
      user: user,
    }
    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const trip_passenger = response.data
      setPassenger(trip_passenger)
      alert(passenger)
    })
  }
  return (
    <div className="my-container">
      <table className="table table-container1 center mt-4">
        <thead className="text-light pb-4 bg-dark">
          <tr>
            <th scope="col" className="mb-4 ">
              Departure
            </th>
            <th scope="col ">Destination</th>
            <th scope="col">Date</th>
            <th scope="col">Departure Time</th>
            <th scope="col">Departure Point</th>
            <th scope="col">Available seats</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {post.map((data1, idx) => {
            return (
              <tr key={idx} className="port-map" style={{ Margin: '20px' }}>
                <th scope="row ">{data1.departure}</th>
                <td className="pb-4 ">{data1.destination}</td>
                <td>{data1.date}</td>
                <td>{data1.time}</td>
                <td>{data1.departure_point}</td>
                <td>{data1.seats}</td>

                <td>
                  <div className="mb-1">
                    <button
                      className="btn btn-sm btn-dark center"
                      id={data1.trip_id}
                      onClick={Passengers}
                    >
                      passengers
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm  btn-dark center"
                      id={data1.trip_id}
                      onClick={CancelTrip}
                    >
                      Cancel Trip
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default DriverTrips
