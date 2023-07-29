const express = require("express");
const router = express.Router();
const faculty = require("../controllers/facultyOperation");

// router.post('/editDetails',faculty.)
router.get("/dashboardDetails", faculty.getFacultyDetails);

router.get("/listStaff", faculty.listStaff);

router.get("/listAlert", faculty.listAlert);

router.post("/addStaff", faculty.addStaff);

router.post("/addAlert", faculty.addAlert);

router.post("/facultyLogin", faculty.Login);
router.post("/updateDetails", faculty.updateDetails);

router.post("/dummy", faculty.Dummy);

router.get("/getAllPublications", faculty.getAllPublication);
router.get("/getAllSpecificPublications", faculty.getAllSpecificPublication);
router.post("/addPublication", faculty.addPublication);
router.get("/scrapSpecific", faculty.scrapSpecfic);

router.get("/scrapProfBody", faculty.scrapProfBody);

router.post("/addProfBody", faculty.addProfBody);

router.get("/getProfBody", faculty.getProfessionalBody);

router.post("/addAward", faculty.addAward);
router.get("/getAward", faculty.getAward);

module.exports = router;
