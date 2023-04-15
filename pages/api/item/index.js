import connectDB from "../../../utils/connectDB"
import Items from "../../../models/itemsModel"
import auth from "../../../middleware/auth"

connectDB()

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getItems(req, res)
      break
    case "POST":
      await createItem(req, res)
      break
  }
}

class APIfeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }
  //can be used for sorting, pagination and otherts
}

const getItems = async (req, res) => {
  try {
    const result = new APIfeatures(Items.find())

    const items = await result.query
    res.json({
      status: "success",
      result: items.length,
      items,
    })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

const createItem = async (req, res) => {
  try {
    const result = await auth(req, res)
    if (result.role !== "admin")
      return res.status(400).json({ err: "Not authorised" })

    const { title, price, description } = req.body

    if (!title || !price || !description)
      return res.status(400).json({ err: "Please enter all the info" })

    const newProduct = new Items({
      title: title.toLowerCase(),
      price,
      description,
    })

    await newProduct.save()

    res.json({ msg: "Success" })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}
