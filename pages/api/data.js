// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../middleware/mongoose";
import Trading from "../../model/Trading";
const handler = async (req, res) => {
  //   let newProduct = await Trading();

  let sort = req.body.sort;
  let query = req.body.query;
  if (sort) {
    let newProduct = await Trading.find({ e: sort }).sort().limit(20);
    return res.status(200).json({ data: newProduct });
  }
  if (query) {
    let c = req.body.SeachIn;
    if (query.length === 0) {
      return res.status(200).json({ data: [] });
    }
    // let newProduct = await Trading.find({ $or: [{ c: query }] }).limit(20);
    let newProduct = await Trading.find({ [c]: query }).limit(20);
    return res.status(200).json({ data: newProduct });
  }

  // await newProduct.save();
  res.status(200).json({ success: "success" });
};
export default connectDb(handler);
