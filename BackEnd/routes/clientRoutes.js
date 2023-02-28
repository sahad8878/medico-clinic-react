const express = require("express");
const {
  loginController,
  signupController,
} = require("../controller/authController");

const {
  getClietProfile,
  patchUpdateClientDetails,
  getdepartments,
  getDepartmentDoctors,
  getDoctorDetails,
  getSearchDoctor,
  getExperiencedDoctors,
  postAppointment,
  availableSlot,
} = require("../controller/clientController");

const clientAuthMiddlewares = require("../middlewares/clientAuthMiddlewares");

// router object
const router = express.Router();

// routes

// LOGIN || POST
router.post("/clientLogin", loginController);

// SIGNUP || POST
router.post("/clientSignup", signupController);


// Appointments || POST

router.post("/postAppointment",clientAuthMiddlewares, postAppointment);

// get user information || GET

router.get("/getClietProfile",clientAuthMiddlewares,getClietProfile)

// Get Departments || GET
router.get("/getdepartments",clientAuthMiddlewares, getdepartments);

// update client Details || POST

router.post("/updateClientDetails",clientAuthMiddlewares,patchUpdateClientDetails)

// Get Department Doctors || GET

router.get("/getDepartmentDoctors/:id/doctors",clientAuthMiddlewares, getDepartmentDoctors);

// Get  Doctor Details || GET

router.get("/getDoctorDetails/:doctorId",clientAuthMiddlewares, getDoctorDetails);

// Search Doctors || GET

router.get("/getSearchDoctor",clientAuthMiddlewares, getSearchDoctor);

// get Experienced Doctors || GET

router.get("/getExperiencedDoctors",clientAuthMiddlewares, getExperiencedDoctors);

// Check available Slotes || GET

router.get("/availableSlot",clientAuthMiddlewares, availableSlot);


module.exports = router;
