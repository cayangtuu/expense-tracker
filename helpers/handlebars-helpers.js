module.exports = {
  ifEq: function (a, b, opts) {
    a = String(a)
    b = String(b)
    return (a === b) ? opts.fn(this) : opts.inverse(this)
  }
}