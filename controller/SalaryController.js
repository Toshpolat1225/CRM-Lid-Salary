const Salary = require('../models/Salary')
const mongoose = require("mongoose");


// ============================================Salary router start ===============================================================

module.exports.addSalary = async (req, res) => {
  const salary = await Salary.findOne();
  console.log(salary);
  res.render("admin/Salary/salary-add", {
    title: "salary add",
    salary,
  })

};
module.exports.getWorkerSalary = async (req, res) => {
  const salary = await Salary.find()
  res.render('admin/Salary/workerSalary', {
    title: 'Worker',
    salary
  })
}
module.exports.WorkerSalaryPost = async (req, res) => {
  const { date, dateOld, price, name } = req.body
  const salary = new Salary({
    date,
    dateOld,
    price,
    name
  })
  await salary.save()
  res.redirect('/admin/workerSalary')
}
module.exports.getSalary = async (req, res) => {
  const salary = await Salary.find();
  res.render("admin/Salary/salary", {
    title: "Salary view",
    salary,
  });
};
module.exports.creatSalary = (req, res) => {
  res.render("admin/Salary/salary-add", {
    title: "salary",
  });
};
module.exports.creatSalaryPost = async (req, res) => {
  const { date, dateOld, price, name } = req.body;
  console.log(req.body);
  const salary = new Salary({
    date,
    dateOld,
    price,
    name
  });
  await salary.save();
  res.redirect("/admin/salary");
};
module.exports.editSalary = async (req, res) => {
  const salary = await Salary.findById(req.params.id);
  res.render("admin/Salary/salary-edit", {
    title: `edit salary page`,
    salary,
  });
};

module.exports.editSalaryPost = async (req, res) => {
  const { date, dateOld, price, name } = req.body;
  const newSalary = {
    date,
    dateOld,
    price,
    name
  };
  await Salary.findByIdAndUpdate(req.body.id, newSalary);
  res.redirect("/admin/salary");
};
module.exports.removeSalary = async (req, res) => {
  await Salary.findByIdAndDelete(req.body.id);
  res.redirect("/admin/salary");
};
// ============================================Salary router end ===============================================================

