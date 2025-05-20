const usersSrv = require("../services/users");

class UsersController {



  async signUp(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const payload = { name, email, password, role };
      
      const user = await usersSrv.createUserSrv(payload);
  
      res.status(201).json({
        message: "User created successfully",
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
  

  //signin
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const payload = { email, password };    

      //signinsrv returns token
      const user = await usersSrv.signInSrv(payload);

      res.status(200).json({
        message: "User signed in successfully",
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);  // Pass error to error handling middleware
    }
  }

  async getAllUsers(req, res) {

    //get user from req.user from authorization middleware
    console.log("HEEEEREE=>>>>>",req.user);

    // read users.json
    const users = await usersSrv.getAllUsersSrv();

    res.status(200).json({
      message: "Users fetched successfully",
      status: "success",
      data: users,
    });
  }
  async getUserById(req, res) {
    const id = req.params.id;

    const user = await usersSrv.getUserByIdSrv(id);

    res.status(200).json({
      message: "User fetched successfully",
      status: "success",
      data: user,
    });
  }
  
  async updateUserById(req, res) {
    const id = req.params.id;
    const { name } = req.body;

    const user = await usersSrv.updateUserByIdSrv(id, name);

    res.status(200).json({
      message: "user updated successfully",
      status: "success",
      data: user,
    });
  }



  async deleteUserById(req, res) {
    const id = req.params.id;

    await usersSrv.deleteUserByIdSrv(id);

    res.status(204).json({
      // 204 => no content, no response body
      message: "user deleted successfully",
      status: "success",
    });
  }
}

// singleton pattern
module.exports = new UsersController();
