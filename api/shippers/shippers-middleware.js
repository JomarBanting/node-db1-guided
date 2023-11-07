module.exports = {
  checkId,
  checkPayload,
}

// const Shipper = require("./shippers-model");
const db = require("../../data/db-config");

async function checkId(req, res, next) {
  // const shipper = await Shipper.getById(req.params.id);
  const shipper = await db("shippers").where("shipperId", req.params.id).first()
  if(!shipper){
    next({
      status:404, message: "Invalid ID"
    })
  } else {
    next();
  }
}

function checkPayload(req, res, next) {
  if (!req.body.Phone || !req.body.ShipperName){
    next({
      status: 422, message: "Phone and ShipperName are required!"
    })
  } else {
    next();
  }
}
