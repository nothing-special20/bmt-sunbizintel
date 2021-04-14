module.exports.model = [
  "ORDER_ID",
  "FILE_ID",
  "USER_ID",
  "ORDER_DATE",
  "PRICE"
];

module.exports.recordMap = function (row) {
  return {
    orderId: row[0],
    fileId: row[1],
    userId: row[2],
    orderDate: row[3],
    price: row[4]
  }
}