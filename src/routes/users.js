//importing express
const express = require("express");
const router = express.Router();

//import bcryt to hash password
const bcrypt = require("bcryptjs");

//importing helper function to use in app
const { postNewUser } = require("../helper functions/postHelpers");
const {
  getUserDetails,
  getUserEmail,
  getAllUsersDetails,
} = require("../helper functions/getHelpers");
const {
  updateUsername,
  updateUser,
  updateEmail,
} = require("../helper functions/putHelpers");
const { deleteUser } = require("../helper functions/deleteHelper");

//importing verify token function to verify users
const verifyToken = require("../middleware/token");

router.post("/", async (req, res) => {
  //vairables passed in from request body
  const { first_name, last_name, email, age, username, password } = req.body;

  //if all fields aren't filler return error
  if (!first_name || !last_name || !email || !age || !username || !password) {
    return res
      .status(400)
      .json({ message: "All fields must be filled, something is missing" });
  }

  //create a hash
  const hash = await bcrypt.hash(password, 13);

  try {
    //variable to handle helper function call
    const newUser = await postNewUser(
      first_name,
      last_name,
      email,
      age,
      username,
      hash
    );

    //if helper returns nothing return error status ans json
    if (!newUser) {
      return res.status(500).json({ message: "Failed to create new user" });
    }

    //if error returned return status and json
    if (newUser.error) {
      return res.status(400).json({ error: newUser.error });
    }

    //return success status and json
    res.status(201).json({ message: "New user created", newUser });
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while making new user:",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message:
        "An error occurred while making new user. Please try again later.",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    //variable to handle helper function
    const allUsersDeatils = await getAllUsersDetails();

    //response 200 ok status if function returns something
    res.status(200).json(allUsersDeatils);
  } catch (error) {
    //catch and log if any errors
    console.error("Error fetching all users", error.message, error.stack);
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  //variable to handle id from url
  const userId = req.params.id;

  try {
    //variable to handle helper function call
    const userDetails = await getUserDetails(userId);

    //return success status and json
    res.status(200).json(userDetails);
  } catch (error) {
    //catch and log if any errors
    console.error(
      "Error occurred while fetching user details.",
      error.message,
      error.stack
    );

    //return error status with json messgae
    res.status(500).json({
      message: "An error occurred while fetching user details.",
      error: error.message,
    });
  }
});

router.get("/forgot-password/:email", async (req, res) => {
  //getting the email from the URL
  const userEmail = req.params.email;

  try {
    //variable to handle helper function with passed in variable
    const userEmailDetails = await getUserEmail(userEmail);

    //response success status and json
    res.status(200).json(userEmailDetails);
  } catch (error) {
    //catch if any errors, log and respond error status json
    console.error(
      "Error occurred while fetching email details.",
      error.message,
      error.stack
    );
    res.status(500).json({
      message: "An error occurred while fetching email",
      error: error.message,
    });
  }
});

router.put("/update/:username", verifyToken, async (req, res) => {
  //variables to handle username and new username
  const username = req.params.username;
  const { newUsername } = req.body;

  //if both aren't passed return error status and message
  if (!username || !newUsername) {
    return res.status(400).json({
      message: "Username is required and update required.",
    });
  }

  try {
    //variable to hable helper function with passed in variables
    const updatedUsername = await updateUsername(username, newUsername);

    //if nothing from helper function return error status
    if (!updatedUsername) {
      return res.status(500).json({ message: "Failed to updated username." });
    }

    //if helper returns error return status with json
    if (updatedUsername.error) {
      return res.status(400).json({ error: updatedUsername.error });
    }

    //return ok status with json and updated username
    res.status(200).json({ message: "Updated username", updatedUsername });
  } catch (error) {
    //catch if any errors log and return error status
    console.error("Error occurred while updating username.", error);
    res.status(500).json({ error: "Error occurred while updating username." });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  //variable to handle id as Int
  const userId = parseInt(req.params.id);
  //variables to handle updated data passed in body
  const { first_name, last_name, age } = req.body;

  //if no id return error status and json
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  //if no updates passed return error status and json
  if (!first_name || !last_name || !age) {
    return res.status(400).json({
      error: "Need all fields to update user ",
    });
  }

  try {
    //variable to handle helper function with passed in variables
    const updatedUser = await updateUser(userId, first_name, last_name, age);

    //if nothing return from helper return errors status and json
    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update user." });
    }

    //return success status with json object
    res.status(200).json({ message: "Updated user", updatedUser });
  } catch (error) {
    //catch if any error and return status
    console.error("Error occurred while updating user.", error);
    res.status(500).json({ error: "Error occurred while updating user" });
  }
});

router.put("/email/:id", verifyToken, async (req, res) => {
  //variable to handle data from URL and body
  const userId = req.params.id;
  const { newEmail } = req.body;

  //if both variable aren't there return error
  if (!userId || !newEmail) {
    return res.status(400).json({
      message: "User ID or Email field missing.",
    });
  }

  try {
    //vaiable to handle helepr function
    const updatedEmail = await updateEmail(userId, newEmail);

    //if nothing returned from helper return error status and json
    if (!updatedEmail) {
      return res.status(500).json({ message: "Failed to update email." });
    }

    //if has error return status with json
    if (updatedEmail.error) {
      return res.status(400).json({ error: updatedEmail.error });
    }

    //return success status and json
    res.status(200).json({ message: "Updated email", updatedEmail });
  } catch (error) {
    //catch if any errors log and return error status
    console.error("Error occurred while updating username.", error);
    res.status(500).json({ error: "Error occurred while updating username." });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  //variable to handle id
  const userId = req.params.id;

  //if no id passed return error status and message
  if (!userId) {
    return res.status(400).json({
      message: "Username required.",
    });
  }

  try {
    //varialbe to handle helper function with passed in variable
    const deletedUser = await deleteUser(userId);

    //return success status and json
    res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    //error message and status
    console.error("Error occurred while deleting user.", error);
    res.status(500).json({ error: "Failed to delete user from database." });
  }
});

module.exports = router;
