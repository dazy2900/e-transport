import './Register.scss'
import logo from '../../images/travelbro-blue-nav.png'
//import { TiSocialFacebook } from 'react-icons/ti'
import { BsArrowRightShort, BsFacebook } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Signup = () => {
  const [inputs, setInputs] = useState('')
  const [post, setPost] = useState('')
  const [cookies, setCookie] = useCookies(['user', 'status'])

  const baseURL = 'http://localhost/Travelbro/api.php'
  useEffect(() => {}, [])

  const change_handler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }
  const submit_handler = (e) => {
    e.preventDefault()
    console.log(inputs)
    //alert('done')
    const datas = {
      request: 'signup',
      data: inputs,
    }

    const new_data = JSON.stringify(datas)
    //const new_data2 = JSON.parse(new_data)

    axios.post(baseURL, new_data).then((response) => {
      const status = response.data.status
      setPost(status)
      console.log(status)
      alert(status)

      //alert(cookies.user)
      if (status == 'signed_up') {
        window.location.href = '/dashboard'
        setCookie('user', inputs.email, { path: '/' })
        setCookie('status', 'passenger', { path: '/' })
      } else {
        // alert('not yet')
      }
    })
  }

  return (
    <div className="my-container">
      {post}
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm-5 center s-container">
          <div className="signup-container center ">
            <div className="logo-container center ">
              <img src={logo} alt="Travelbro" className="logo-img" />
            </div>

            <div className="header-container">
              <h1 className="signup-title">Sign up with us</h1>
            </div>
            <form onSubmit={submit_handler}>
              <div className="body-container center">
                <div className="form-input center">
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload a display picture</Form.Label>
                    <Form.Control
                      name="profile-picture"
                      type="file"
                      value={inputs.profile}
                      onChange={change_handler}
                      accept="image/png, image/gif, image/jpeg, image/jpg"
                    />
                  </Form.Group>
                </div>
                <div className="row half-div center">
                  <div className="form-group col-6 pp-input-div center mb-4">
                    <input
                      type="email"
                      className=" email-input input"
                      name="email"
                      placeholder=" Enter email"
                      value={inputs.email}
                      onChange={change_handler}
                      required
                    />
                  </div>
                  <div className="form-group col-6 tel-input-div center mb-4">
                    <input
                      type="number"
                      className=" email-input input"
                      name="tel"
                      placeholder=" Tel"
                      value={inputs.tel}
                      onChange={change_handler}
                      required
                    />
                  </div>
                </div>
                <div className="form-group name-input-div center mb-4">
                  <input
                    type="text"
                    className=" email-input input"
                    name="name"
                    placeholder=" Full Name"
                    value={inputs.name}
                    onChange={change_handler}
                    required
                  />
                </div>

                <div className="form-group password-input-div center mb-4">
                  <input
                    type="password"
                    className=" password-input input"
                    name="password"
                    placeholder=" Password"
                    value={inputs.password}
                    onChange={change_handler}
                    required
                  />
                </div>
                <div className="button-div center mb-4">
                  <input type="submit" className="btn button " value="Submit" />
                </div>
                {/*<div className="fb-div center">
                  <div className="fb-text">Continue with Facebook</div>
                  <div className="fb-arrow">
                    <BsFacebook size={30} color="#5153e4" />
                    <BsArrowRightShort size={30} />
                  </div>
                </div> 
  */}
                <div className="signin-link center">
                  Already a member{' '}
                  <span className="link text-primary">Sign in</span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  )
}

export default Signup
