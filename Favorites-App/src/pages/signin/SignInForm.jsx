import { useEffect, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import useFetch from '../../useFetch'
import './signinstyles.css'

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {data, loading, error} = useFetch('/');

  useEffect(() => {
    //console.log(`Data: ${data.data}, loading: ${loading}, error: ${error.message}`)
  }, [data, loading, error])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit pressed');
  }

  const handlueInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="login-header mb-4">Fave Con</h1>
        <div className="main-form d-flex justify-content-center border rounded align-items-center" >
          <Form className="d-flex flex-column justify-content-evenly" onSubmit={handleSubmit}>

          {/* Username */}
            <Form.Group controlId="formUser">
              <Form.Label>Username: </Form.Label>
              <Form.Control type="email" autoComplete="email" name='email' placeholder="Email: " value={formData.email} onChange={handlueInputChange} />
            </Form.Group>

          {/* Password */}
            <Form.Group controlId="formPass">
              <Form.Label>Password: </Form.Label>
              <Form.Control type="password" autoComplete="current-password" name='password' value={formData.password} placeholder="Password: " onChange={handlueInputChange}/>
            </Form.Group>
            <p className="mt-2 mb-0 text-center">Already have an account?</p>
          <Button type="submit">Login</Button>
            <p className="mb-0 mt-2 text-center">New User?</p>
          <Button type="submit">Sign Up</Button>
            
          </Form>
        </div>
      </Container>
    </>
  )
}

export default SigninForm