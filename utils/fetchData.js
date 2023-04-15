const baseUrl = process.env.BASE_URL

export const getData = async (url, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })

  const data = await res.json()
  return data
}

export const postData = async (url, payload, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()
  return data
}

//same way defined for post delete when necessary
