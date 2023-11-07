const db = require("../../data/db-config")

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
}

async function get() {
  // const result = await db.raw("select * from shippers;");
  const result = await db("shippers");
  return result;
}

async function getById(shipperId) {
  // const result = await db.raw(`select * from shippers where shipperid = ${id}`)
  const [shipper] = await db("shippers").where("shipperid", shipperId);
  return shipper;
}

async function create(shipper) {
  const result = await db("shippers").insert(shipper);
  return getById(result[0]);
}

async function update(shipperId, shipperBody) {
  // const result = await db.raw(`update shippers set shipperName = ${shipperBody.ShipperName}, Phone = "555-555-555" where ShipperId = ${shipperId} `)
  const result = await db("shippers").update({"ShipperName": shipperBody.ShipperName, "Phone": shipperBody.Phone}).where("shipperId", shipperId);
  return getById(result);
}

async function remove(shipperId) {
  // const result await db.raw(`delete from shippers where shipperId = ${shipperId};`);
  const toBeDeleted = await getById(shipperId);
  await db("shippers").delete().where("shipperId", shipperId);
  return toBeDeleted;
}
