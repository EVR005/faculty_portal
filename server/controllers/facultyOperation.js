const qualification = require("../models/qualifications");
const experience = require("../models/experiences");
const puppeteer = require("puppeteer");
const citations = require("../models/CitationModel");
const Publications = require("../models/Publications");
const AlertModel = require("../models/AlertModel");
const Awards = require("../models/Awards");
const Faculties = require("../models/faculty_personal");
const ProfBody = require("../models/ProfessionalBody");
const LoginModel = require("../models/loginModel");
const { jwtDetails } = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Citations = require("../models/CitationModel");
const { Op } = require("sequelize");

const getAward = async (req, res) => {
  try {
    await Awards.findAll({ emp_id: req.query.emp_id })
      .then((data) => {
        return res.status(200).send(data);
      })
      .catch((err) => {
        return res.status(404).send({ msg: "Unsuccessful" });
      });
  } catch (err) {
    return res.status(404).send({ msg: "retrieve Unsuccessful" });
  }
};

const addAward = async (req, res) => {
  try {
    console.log(req.body);
    console.log(
      req.query.emp_id +
        " " +
        req.body.data.year +
        " " +
        req.body.data.award_title +
        " " +
        req.body.data.awarder
    );
    await Awards.create({
      emp_id: req.query.emp_id,
      year: req.body.data.year,
      award_title: req.body.data.award_title,
      awarder: req.body.data.awarder,
    })
      .then((data) => {
        return res.status(200).send({ msg: "Successful" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).send({ msg: "UnSu656ccessful" });
      });
  } catch (err) {
    return res.status(404).send({ msg: "Add Unsuccessful" });
  }
};

const getProfessionalBody = async (req, res) => {
  try {
    let emp_id = req.query.emp_id;
    console.log("hiii+" + emp_id);
    await ProfBody.findOne({ where: { emp_id: emp_id } })
      .then((data) => {
        console.log(data);
        return res.status(200).send(data);
      })
      .catch((err) => {
        return res.status(404).send({ msg: "Unsuccessful" });
      });
  } catch (err) {
    console.log(err);
  }
};

const addProfBody = async (req, res) => {
  try {
    let emp_id = req.body.emp_id;
    let title = req.body.title;
    let subtitle = req.body.subtitle;
    console.log(title + " " + subtitle);
    await ProfBody.findOne({ where: { emp_id: emp_id } }).then(async (data) => {
      let titles = JSON.parse(data["title"]);
      titles.push(title);
      let subtitles = JSON.parse(data["subtitle"]);
      subtitles.push(subtitle);
      await ProfBody.destroy({ where: { emp_id: emp_id } }).then(
        async (data) => {
          await ProfBody.create({
            emp_id: emp_id,
            title: JSON.stringify(titles),
            subtitle: JSON.stringify(subtitles),
          }).then((data) => {
            return res.status(200).send({ msg: "Add Successful" });
          });
        }
      );
    });
  } catch (err) {
    return res.status(404).send({ msg: "Add Unsuccessful" });
  }
};

const scrapProfBody = async (req, res) => {
  try {
    let emp_id = req.query.emp_id,
      irins_id;
    console.log(emp_id);
    // return res.status(200).send({msg:"hhello"})
    await ProfBody.destroy({ where: { emp_id: emp_id } }).then(async (data) => {
      await Faculties.findOne({
        where: { emp_id: emp_id },
        attributes: ["irins_id"],
      })
        .then((data) => {
          irins_id = data.irins_id;
        })
        .then(async (data) => {
          console.log("Irins : " + irins_id);
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          // await page.goto('https://annauniv.irins.org/profile/' + irins_id);
          await page.goto("https://annauniv.irins.org/profile/170322");
          // let text = await page.evaluate(
          //     element => element.textContent, element)
          const titleArray = await page.evaluate(() =>
            [...document.querySelectorAll(".profile-post-in > h3")].map(
              (elem) => elem.innerText
            )
          );
          const subtitlelArray = await page.evaluate(() =>
            [...document.querySelectorAll(".profile-post-in > p")].map(
              (elem) => elem.innerText
            )
          );
          let newData = {
            emp_id: emp_id,
            title: JSON.stringify(titleArray),
            subtitle: JSON.stringify(subtitlelArray),
          };
          browser.close();
          console.log(newData);
          await ProfBody.create(newData)
            .then((data) => {
              return res.status(200).send(newData);
            })
            .catch((err) => {
              return res.status(404).send({ msg: "Unable scrap data" });
            })
            .catch((err) => {
              return res.status(404).send({ msg: "Unable scrap data" });
            })
            .catch((err) => {
              return res.status(404).send({ msg: "Unable scrap data" });
            });
        });
    });
  } catch (err) {
    return res.status(404).send({ msg: "Unable scrap data" });
    console.log(err);
  }
};

const addPublication = async (req, res) => {
  try {
    let emp_id = req.body.emp_id;
    let title = req.body.title;
    let citation = req.body.citedby;
    let year = req.body.year;
    console.log("Hello " + req.body.emp_id);
    await Publications.findOne({ where: { emp_id: emp_id } })
      .then(async (data) => {
        let titles = JSON.parse(data["title"]);
        titles.push(title);
        let cit = JSON.parse(data["citations"]);
        cit.push(citation);
        let years = JSON.parse(data["year"]);
        years.push(year);
        await Publications.destroy({ where: { emp_id: emp_id } }).then(
          async (data) => {
            await Publications.create({
              emp_id: emp_id,
              title: JSON.stringify(titles),
              citations: JSON.stringify(cit),
              year: JSON.stringify(years),
            }).then((data) => {
              return res.status(200).send({ msg: "Add Successful" });
            });
          }
        );
      })

      .catch((err) => {
        return res.status(404).send({ msg: "Add Unsuccessful" });
        console.log(err);
      });
  } catch (err) {
    return res.status(404).send({ msg: "Add Unsuccessful" });
  }
};

const getAllPublication = async (req, res) => {
  try {
    await Publications.findAll()
      .then((data) => {
        return res.status(200).send(data);
      })
      .catch((err) => {
        return res.status(404).send({ msg: "Unsuccessful" });
      });
  } catch (err) {
    console.log(err);
  }
};

const getAllSpecificPublication = async (req, res) => {
  try {
    let emp_id = req.query.emp_id;
    console.log("here" + emp_id);
    await Publications.findOne({ where: { emp_id: emp_id } })
      .then((data) => {
        //console.log(data);
        return res.status(200).send(data);
      })
      .catch((err) => {
        return res.status(404).send({ msg: "Unsuccessful" });
      });
  } catch (err) {
    console.log(err);
  }
};

const scrapSpecfic = async (req, res) => {
  try {
    let emp_id = req.query.emp_id,
      g_s_id;
    console.log(emp_id);
    await Publications.destroy({ where: { emp_id: emp_id } }).then(
      async (data) => {
        await Faculties.findOne({
          where: { emp_id: emp_id },
          attributes: ["google_scholar_id"],
        })
          .then((data) => {
            g_s_id = data.google_scholar_id;
          })
          .then(async (data) => {
            console.log("Googel Scholar : " + g_s_id);
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(
              "https://scholar.google.com/citations?hl=en&user=" + g_s_id
            );
            const titleArray = await page.evaluate(() =>
              [
                ...document.querySelectorAll(
                  "#gsc_a_tw > table > tbody > tr > td.gsc_a_t"
                ),
              ].map((elem) => elem.innerText)
            );
            const CitationArray = await page.evaluate(() =>
              [
                ...document.querySelectorAll(
                  "#gsc_a_tw > table > tbody > tr > td.gsc_a_c"
                ),
              ].map((elem) => elem.innerText)
            );
            const yearArray = await page.evaluate(() =>
              [
                ...document.querySelectorAll(
                  "#gsc_a_tw > table > tbody > tr > td.gsc_a_y"
                ),
              ].map((elem) => elem.innerText)
            );

            let newData = {
              emp_id: emp_id,
              title: JSON.stringify(titleArray),
              citations: JSON.stringify(CitationArray),
              year: JSON.stringify(yearArray),
            };
            browser.close();
            console.log(newData);
            await Publications.create(newData)
              .then((data) => {
                return res.status(200).send(newData);
              })
              .catch((err) => {
                return res.status(404).send({ msg: "Unable scrap data" });
              });
            // .catch((err) => {
            //   return res.status(405).send({ msg: "Unable scrap data" });
            // })
            // .catch((err) => {
            //   return res.status(406).send({ msg: "Unable scrap data" });
            // });
          });
      }
    );
  } catch (err) {
    return res.status(404).send({ msg: "Unable scrap data" });
    console.log(err);
  }
};

const listStaff = async (req, res) => {
  try {
    await LoginModel.findAll({
      where: {
        email_id: {
          [Op.not]: "admin@gmail.com",
        },
      },
    })
      .then((data) => {
        console.log(data);
        return res.status(200).send({ stafflist: data });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    return res.status(404).send({ msg: "Unable to fetch data" });
  }
};

const listAlert = async (req, res) => {
  try {
    await AlertModel.findAll()
      .then((data) => {
        console.log(data);
        return res.status(200).send({ alertlist: data });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    return res.status(404).send({ msg: "Unable to fetch data" });
  }
};

const addStaff = async (req, res) => {
  try {
    let email_id = req.body.email_id;
    let emp_id = req.body.emp_id;
    let pwd = req.body.password;
    LoginModel.create({
      email_id: email_id,
      emp_id: emp_id,
      password: pwd,
      lastLoginTime: "10/05/2023",
    });
    return res.status(200).send({ msg: "Staff Added Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ msg: "Unable to add Staff" });
  }
};

const addAlert = async (req, res) => {
  try {
    let alert_content = req.body.alert_content;
    console.log(alert_content);
    await AlertModel.create({
      alert_content: alert_content,
    });
    return res.status(200).send({ msg: "Successfully Added" });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ msg: "Unable to add" });
  }
};
const updateDetails = async (req, res) => {
  try {
    let dataValues = req.body.dataValues;
    console.log("hi");
    console.log(dataValues);
    let g_s_id = dataValues["googlescholar"];
    //console.log(typeof dataValues.emp_id);
    console.log(dataValues["emp_id"]);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      "https://scholar.google.com/citations?hl=en&user=" + g_s_id
    );
    const r1 = await page.evaluate(() =>
      [
        ...document.querySelectorAll(
          "#gsc_rsb_st > tbody > tr > td.gsc_rsb_std"
        ),
      ].map((elem) => elem.innerText)
    );

    let val = await LoginModel.findOne({
      where: { emp_id: dataValues.emp_id },
    });
    console.log(val);
    if (val == null) {
      return res.status(400).send({ msg: "No faculty Found" });
    }

    var imageUrl = "";

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(
        "https://annauniv.irins.org/profile/" + dataValues["irins"]
      );
      const images = await page.$$eval(".img-responsive", (anchors) =>
        [].map.call(anchors, (img) => img.src)
      );
      // let element = await page.waitForSelector("#preview img[src]")
      // let text = await page.evaluate(
      //   element => element.textContent, element)
      console.log(images[1]);
      // return res.status(200).send({imgUrl:images[1]})
      imageUrl = images[1];
    } catch (err) {
      console.log("Image " + err);
    }

    let searchVal = await Faculties.findOrCreate({
      where: { emp_id: dataValues.emp_id },
      defaults: {
        first_name: dataValues["fname"],
        last_name: dataValues["lname"],
        middle_name: dataValues["mname"],
        title: dataValues["title"],
        email_id: dataValues["email"],
        mobile_no: dataValues["mobile_no"],
        gender: dataValues["gender"],
        description: dataValues["description"],
        dob: dataValues["dob"],
        age: dataValues["age"],
        aadhar: dataValues["aadhar"],
        pancard: dataValues["pan"],
        present_address: dataValues["present_address"],
        permanent_address: dataValues["permanent_address"],
        passport_no: dataValues["passport"],
        orcid_id: dataValues["orcid"],
        scopus_id: dataValues["scopus"],
        google_scholar_id: dataValues["googlescholar"],
        irins_id: dataValues["irins"],
        photo: imageUrl,
        emp_id: dataValues["emp_id"],
      },
    });

    if (searchVal != null) {
      console.log("hellooooo " + dataValues.mobile_no);
      console.log(dataValues);
      await Faculties.update(
        {
          first_name: dataValues["fname"],
          last_name: dataValues["lname"],
          middle_name: dataValues["mname"],
          title: dataValues.title,
          email_id: dataValues["email"],
          mobile_no: dataValues["mobile_no"],
          gender: dataValues["gender"],
          description: dataValues["description"],
          dob: dataValues["dob"],
          age: dataValues["age"],
          aadhar: dataValues["aadhar"],
          pancard: dataValues["pan"],
          present_address: dataValues["present_address"],
          permanent_address: dataValues["permanent_address"],
          passport_no: dataValues["passport"],
          orcid_id: dataValues["orcid"],
          scopus_id: dataValues["scopus"],
          google_scholar_id: dataValues["googlescholar"],
          irins_id: dataValues["irins"],
          photo: imageUrl,
        },
        { where: { emp_id: dataValues.emp_id } }
      );
    }

    try {
      await Citations.destroy({
        where: { emp_id: dataValues["emp_id"] },
      }).then(async (data) => {
        let newCitation = await Citations.create({
          emp_id: dataValues["emp_id"],
          citation_1: r1[0],
          h_index: r1[1],
          citation_2: r1[2],
          gs_citation: r1[3],
          gs_h_index: r1[4],
          gs_i10_index: r1[5],
        })
          .then((data) => console.log("Successfully added"))
          .catch((err) => console.log(err));
      });
    } catch (err) {
      console.log(err);
    }
    try {
      await experience
        .destroy({
          where: { emp_id: dataValues["emp_id"] },
        })
        .then(async (data) => {
          for (let i = 0; i < dataValues["experiences"].length; i++) {
            await experience.create({
              exp_college: dataValues["experiences"][i]["exp_college"],
              emp_id: dataValues["emp_id"],
              exp_description: dataValues["experiences"][i]["exp_description"],
              exp_from: dataValues["experiences"][i]["exp_from"],
              exp_to: dataValues["experiences"][i]["exp_to"],
              nature_of_appointment:
                dataValues["experiences"][i]["nature_of_appointment"],
              exp_years: dataValues["experiences"][i]["exp_years"],
            });
          }
        });
    } catch (err) {
      return console.log("Experience " + err);
    }
    try {
      await qualification
        .destroy({
          where: { emp_id: dataValues["emp_id"] },
        })
        .then(async (data) => {
          for (let i = 0; i < dataValues["qualifications"].length; i++) {
            await qualification.create({
              degree: dataValues["qualifications"][i]["degree"],
              college: dataValues["qualifications"][i]["college"],
              university: dataValues["qualifications"][i]["university"],
              emp_id: dataValues["emp_id"],
              percentage: dataValues["qualifications"][i]["percentage"],
              class_year: dataValues["qualifications"][i]["class_year"],
            });
          }
          return res.status(200).send({ msg: "Success" });
        });
    } catch (err) {
      console.log("Experience " + err);
    }

    console.log("Update Successful");

    // return res.status(200).send({msg:"Updated Successfully"})
  } catch (err) {
    console.log("Update UnSuccessful" + err);
    return res.status(404).send({ msg: "Failed to upload" });
  }
};

// {
//   title: '',
//   fname: 'Deivamani',
//   mname: '',
//   lname: '',
//   eid: '',
//   description: '',
//   dob: '',
//   aadhar: '',
//   pan: '',
//   presentaddress: '',
//   permanentaddress: '',
//   mobile: '',
//   email: '',
//   passport: '',
//   orcid: '',
//   scopus: '',
//   googlescholar: '',
//   irins: '',
//   qualifications: [
//     {
//       degree: 'vsffxffx',
//       college: 'jnvfjn',
//       university: 'vxds',
//       percentage: '36',
//       class_year: '2019'
//     },
//     {
//       degree: 'ygy',
//       college: 'yugug',
//       university: 'gyu',
//       percentage: '25',
//       class_year: '2008'
//     },
//     {
//       degree: 'vfkuh',
//       college: 'hg',
//       university: 'kughg',
//       percentage: '87',
//       class_year: '2020'
//     }
//   ],
//   experiences: [
//     {
//       exp_college: 'sdrvjbk',
//       description: 'kughgh',
//       exp_from: '2007',
//       exp_to: '2023',
//       nature_of_appointment: 'sfih',
//       exp_years: 16
//     }
//   ]
// }
const getFacultyDetails = async (req, res) => {
  try {
    var dataSend = {};
    let emp_id = req.query.emp_id;
    // console.log(emp_id);
    // console.log(req);
    // console.log(req.params);
    var allFaculties = await Faculties.findOne({ where: { emp_id: emp_id } });

    dataSend["facultyDetails"] = allFaculties;
    // dataSend += allFaculties;
    var LastLogin = await LoginModel.findOne({ where: { emp_id: emp_id } });
    // var jsonData =
    dataSend["lastLogin"] = LastLogin["lastLoginTime"];
    dataSend["email_id"] = LastLogin["email_id"];
    var experiences = await experience.findAll({ where: { emp_id: emp_id } });

    dataSend["experiences"] = experiences;
    // dataSend += experiences;
    var citation = await citations.findOne({ where: { emp_id: emp_id } });

    dataSend["citations"] = citation;
    // dataSend += citation;
    var qualifications = await qualification.findAll({
      where: { emp_id: emp_id },
    });
    // dataSend += qualifications;
    dataSend["qualifications"] = qualifications;
    var alerts = await AlertModel.findAll({ order: [["datePosted", "DESC"]] });
    dataSend["alerts"] = alerts;
    var basichonours = await Awards.findAll({
      where: { emp_id: emp_id },
      limit: 4,
    });
    dataSend["honours"] = basichonours;
    return res.status(200).send(dataSend);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

const Dummy = async (req, res) => {
  try {
    return res.status(200).send({ message: "Successful DUmmy" });
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
};

const Login = async (req, res) => {
  try {
    const mail = req.body.mail;
    const password = req.body.password;

    const data = await LoginModel.findOne({
      where: {
        email_id: mail,
        password: password,
      },
    });
    if (data === null) {
      return res
        .status(401)
        .send({ status: "failure", message: "Mail Id Not Found" });
    } else {
      let token = jwt.sign({ faculty_id: data["emp_id"] }, jwtDetails.secret, {
        expiresIn: jwtDetails.jwtExpiration,
      });
      console.log("hi" + data["emp_id"]);
      return res.status(200).json({
        status: "success",
        message: "Login success",
        accessToken: token,
        emp_id: data["emp_id"],
      });
      // bcrypt.compare(password,data.password,function(err,result){
      //     if(err){
      //         return res.status(401).send({status:"failure" , message:"Server Error"})
      //     }
      //     else{
      //         if (result === true) {

      //             const id = data.emp_id

      //             let token = jwt.sign({ role , id}, jwtDetails.secret, {
      //                 expiresIn: jwtDetails.jwtExpiration,
      //             });
      //             return res.status(200).json({status:"success" ,message:"Login success",accessToken:token,});
      //         }
      //         else{
      //             return res.status(401).send({status:"failure", message:"Wrong Password"})
      //         }
      //     }
      // })
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ status: "failure", message: "Server Error : " + err });
  }
};

module.exports = {
  getFacultyDetails,
  Login,
  Dummy,
  updateDetails,
  addAlert,
  addStaff,
  listAlert,
  listStaff,
  scrapSpecfic,
  addPublication,
  getAllPublication,
  getAllSpecificPublication,
  getProfessionalBody,
  addProfBody,
  scrapProfBody,
  addAward,
  getAward,
};
