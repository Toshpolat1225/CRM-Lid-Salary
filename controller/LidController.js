const mongoose = require("mongoose");
const LidCategory = require("../models/LidCategory");
const LidForm = require("../models/LidForm"); 

//------------------------------ LID ----------------------------
//--------------------------- All LID GET -----------------------
module.exports.LidsGet = async (req, res) => {
  const admin = req.session.admin;
  const lidForms = await LidForm.find();
  const lids = await LidCategory.find();
  await Promise.all(lidForms.map((c) => c.populate("categoryId").execPopulate()));
  lids.map((c) => {
    const count = lidForms.filter((k) => {
      return c.name === k.categoryId.name;
    });
    c.count = count.length;
    return c;
  });
  const today = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 0 && timer < 24) {
      return c;
    }
  });
  const todayLength = today.length;
  const tomorrow = lidForms.filter((c) => {
    // return get_timer(c.date);
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 24 && timer < 48) {
      return c;
    }
  });
  const tomorrowLength = tomorrow.length;
  const fire = lidForms.filter((c) => {
    // return get_timer(c.date);
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer < 0) {
      return c;
    }
  });
  const fireLength = fire.length;
  res.render("admin/Lids/lids", {
    layout: "admin",
    admin,
    lids,
    lidForms,
    todayLength,
    tomorrowLength,
    fireLength,
  });
};
//--------------------------- All LID POST -----------------------
module.exports.LidsPost = async (req, res) => {
  const { name, categoryId, num1, num2, found, company, comment, date, note } =
    req.body;
  const lids = new LidForm({
    name,
    categoryId,
    num1,
    num2,
    found,
    company,
    comment,
    date,
    note,
  });
  await lids.save();
  res.redirect("/admin/lids");
};
//--------------------------- More LID GET -----------------------
module.exports.moreLidsGet = async (req, res) => {
  const admin = req.session.admin;
  const lidForms = await LidForm.findById(req.params.id);
  res.render("admin/Lids/moreLid", {
    layout: "admin",
    admin,
    lidForms,
  });
};
//------------------------------Lid Categories ----------------------------
//--------------------------- Lid Categories GET -----------------------
module.exports.lidCategoriesGet = async (req, res) => {
  const admin = req.session.admin;
  const lids = await LidCategory.find();
  res.render("admin/Lids/lidCategory", {
    layout: "admin",
    lids,
    admin,
  });
};
//---------------------------- ID Categories GET -----------------------
module.exports.idCategoriesLidGet = async (req, res) => {
  const admin = req.session.admin;
  const lidsCategory = await LidCategory.findById(req.params.id);
  const lidForms = await LidForm.find();
  await Promise.all(lidForms.map((c) => c.populate("categoryId").execPopulate()));
  const lidds = lidForms.filter((c) => {
    return c.categoryId.name == lidsCategory.name;
  });
  res.render("admin/Lids/lidID", {
    title: lidsCategory.name,
    layout: "admin",
    lidds,
    admin,
  });
};
//--------------------------- Add Categories GET -----------------------
module.exports.createCategoriesLidGet = (req, res) => {
  const admin = req.session.admin;
  res.render("admin/Lids/addCategoryLid", {
    layout: "admin",
    title: "Create LidCategory",
    admin,
  });
};
//--------------------------- Add Categories POST -----------------------
module.exports.createCategoriesLidPost = async (req, res) => {
  const { name } = req.body;
  const lidCategory = new LidCategory({
    name,
  });
  await lidCategory.save();
  res.redirect("/admin/lids");
};
//---------------------------- Edit Lids GET --------------------------
module.exports.editLidsGet = async (req, res) => {
  const admin = req.session.admin;
  const lidForms = await LidForm.findById(req.params.id);
  const lids = await LidCategory.find();
  res.render("admin/Lids/lidEdit", {
    layout: "admin",
    title: "Edit Lid",
    lids,
    lidForms,
    admin,
  });
};
//---------------------------- Edit Lids POST -------------------------
module.exports.editLidsPost = async (req, res) => {
  const admin = req.body;
  await LidForm.findByIdAndUpdate(req.params.id, admin, (err) => {
    console.log(err);
  });
  res.redirect("/admin/lids");
};
//---------------------------- Delete Lids GET ------------------------
module.exports.deleteLidsGet = async (req, res) => {
  const admin = req.session.admin;
  await LidForm.findByIdAndDelete(req.params.id);
  res.redirect("/admin/lids");
};
//--------------------------- Today LID GET -----------------------
module.exports.todayLidsGet = async (req, res) => {
  const admin = req.session.admin;
  const lidForms = await LidForm.find();
  const lids = await LidCategory.find();
  const today = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 0 && timer < 24) {
      return c;
    }
  });
  res.render("admin/Lids/today", {
    layout: "admin",
    lids,
    lidForms,
    admin,
    today,
  });
};
//--------------------------- Tomorrow LID GET -----------------------
module.exports.tomorrowLidsGet = async (req, res) => {
  const admin = req.session.admin;
  const lidForms = await LidForm.find();
  const lids = await LidCategory.find();
  const tomorrow = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer > 24 && timer < 48) {
      return c;
    }
  });
  res.render("admin/Lids/tomorrow", {
    layout: "admin",
    admin,
    lids,
    lidForms,
    tomorrow,
  });
};
//--------------------------- Fire LID GET -----------------------
module.exports.fireLidsGet = async (req, res) => {
  const admin = req.session.admin;
  const lidForms = await LidForm.find();
  const lids = await LidCategory.find();
  const fire = lidForms.filter((c) => {
    var date_new = c.date;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = (date_t - date) / 1000 / 3600;
    if (timer < 0) {
      return c;
    }
  });
  res.render("admin/Lids/fire", {
    layout: "admin",
    admin,
    lids,
    lidForms,
    fire,
  });
};