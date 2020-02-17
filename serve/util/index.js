const saveHtml = str => {
    return str.replace(/'|"/g, function (str) {
      if (str === '"') {
        return '@quot;'
      } else if (str === "'") {
        return '@apos;'
      }
    });
  }



  module.exports = {
    saveHtml
  }