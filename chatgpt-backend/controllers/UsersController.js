//-----Registration-------

const register = async (req, res) => {
  res.json({
    status: true,
    message: "User registered successfully",
  });
};

//-----Login-------
//-----Logout-------
//-----Profile-------
//-----Check users auth status-------

module.exports = {
  register,
};
