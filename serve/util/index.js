const saveHtml = str => {
    return str.replace(/'|"/g, function (str) {
      if (str === '"') {
        return '@quot;'
      } else if (str === "'") {
        return '@apos;'
      }
    });
  }

  const spaceAdd = str => str && str.replace(/\+/g, ' ')

  module.exports = {
    spaceAdd,
    saveHtml
  }