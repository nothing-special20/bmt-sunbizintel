module.exports = {
  validateCheckout: (req, res, next) => {
    try {
      const items = req.query.lineItems;
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        total += items[i].price_data.unit_amount;
      }
      
      // Total must be greater than $0.50 = 50 for STRIPE
      if (total < 0.50 * 100) {
        return res.status(400).send({ msg: "Total must be at least $0.50." });
      }
      next();
    } catch (err) {
      console.log("Rejecting checkout request.", err);
      return res.status(401).send({ msg: "Unable to perform checkout." });
    }
  }
};