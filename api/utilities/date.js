/**
 * Get date as format YYYY-MM-DD
 */
exports.getDate = function () {
  return new Date().toISOString().split("T")[0];
}

/**
 * Get time as format YYYY-MM-DD HH:MM:SS
 */
exports.getDateTime = function () {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}