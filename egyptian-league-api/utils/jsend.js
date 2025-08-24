exports.success = (data, message = "تمت العملية بنجاح") => ({
  status: "success",
  data,
  message,
});

exports.fail = (data = null, message = "فشل في العملية") => ({
  status: "fail",
  data,
  message,
});

exports.error = (message = "Internal Server Error", data = null) => ({
  status: "error",
  data,
  message,
});
