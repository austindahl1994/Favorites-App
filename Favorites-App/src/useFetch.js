import { useEffect, useState } from "react"

const useFetch = (url) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({})

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000${url}`)

        if (!res.ok) {
          setError(res.status)
          setData(null)
          setLoading(false)
          return;
        }

        const resData = await res.json()
        setData(resData)

      } catch (err) {
        setError(err)
        setData(null)
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url])

  return {data, loading, error}
}

export default useFetch