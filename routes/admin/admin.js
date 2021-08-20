const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const SalaryController = require("../../controller/SalaryController");
const LidController = require("../../controller/LidController");


router.get('/', (req, res) => {
    res.render('admin/index',{
        layout: 'admin'
    })
})

/* +++++++++++++++++++++++++++++++++++++++ Lid ++++++++++++++++++++++++++++++++++++++++++++++ */

router.get('/lids', LidController.LidsGet)
router.post('/lids', LidController.LidsPost)
router.get('/lids/today', LidController.todayLidsGet)
router.get('/lids/tomorrow', LidController.tomorrowLidsGet)
router.get('/lids/fire', LidController.fireLidsGet)
router.get('/lids/lidCategory', LidController.lidCategoriesGet)
router.get('/lids/lidCategory/add', LidController.createCategoriesLidGet)
router.get('/lids/:id', LidController.moreLidsGet)
router.get('/lids/lidCategory/:id', LidController.idCategoriesLidGet)
router.post('/lids/lidCategory/add', LidController.createCategoriesLidPost)
router.get("/lids/edit/:id", LidController.editLidsGet)
router.post("/lids/edit/:id", LidController.editLidsPost)
router.get("/lids/delete/:id", LidController.deleteLidsGet)

// =========================================== Salary page =======================================================
router.get("/salary", SalaryController.getSalary);
router.get("/salary-add", SalaryController.addSalary);
router.get("/salary/:id/edit", SalaryController.editSalary);
router.get("/salary/add", SalaryController.creatSalary);
router.post("/salary-add", SalaryController.creatSalaryPost);
router.post("/salary/edit", SalaryController.editSalaryPost);
router.post("/salary/remove", SalaryController.removeSalary);
router.get('/workerSalary', SalaryController.getWorkerSalary)
router.post('/worker', SalaryController.WorkerSalaryPost)
// =========================================== Salary page =======================================================


module.exports = router;
