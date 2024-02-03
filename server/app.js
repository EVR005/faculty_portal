const express = require("express");
var logger = require("./utils/log")(module);
const app = express();
const cors = require("cors");
const puppeteer = require("puppeteer");
// app.use(cors());

app.use(cors({ credentials: true, origin: "https://audistfis.vercel.app" }));

const sequelize = require("./db_connect");
const utils = require("./utils");
// importing the module
const qualification = require("./models/qualifications");
const experience = require("./models/experiences");
const Faculties = require("./models/faculty_personal");
const LoginModel = require("./models/loginModel");
const CitationModel = require("./models/CitationModel");
const Publications = require("./models/Publications");
const AlertModel = require("./models/AlertModel");
const ProfBody = require("./models/ProfessionalBody");
const Awards = require("./models/Awards");
const facultyroutes = require("./routes/faculty");
const { Login } = require("./controllers/facultyOperation");
const Experiences = require("./models/experiences");
const Qualification = require("./models/qualifications");
//database connection
sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const unAuth = ["/api/faculty/facultyLogin"];
app.get("/addDetails", async (req, res) => {
  // const newAlert = await AlertModel.create(
  //   {
  //     alert_content:"This is the alert",
  //   }
  // )
  // const newLogin = await LoginModel.create(
  //   {
  //     email_id: "raju1@gmail.com",
  //     emp_id:"123567",
  //     loginDetailId:"123567",
  //     password:"123567",
  //     lastLoginTime:"12.04.2023"
  //   }
  // )
  // const newFaculty = await Faculties.create(
  //   {
  //     first_name:"Deivamani",
  //           last_name:"Mallaya",
  //           middle_name:" N ",
  //           title:"Mr",
  //           email_id:"deivamani@gmail.com",
  //           mobile_no:"9887545623",
  //           emp_id:"123789",
  //           gender:"Male",
  //           description:"jkbfkbk kjjsnnvjkd ",
  //           dob:"28.12.2001",
  //           age:56,
  //           aadhar:"7894561232157889",
  //           pancard:"7894561232157889",
  //           present_address:"hbvkjsbvkjdvj kjvnkjd vn",
  //           permanent_address:"hbvkjsbvkjdvj kjvnkjd vn",
  //           passport_no:"hbvkjsbvkjdvj kjvnkjd vn",
  //           category:"BC",
  //           position:"Teaching Fellow",
  //           orcid_id:"789456213",
  //           scopus_id:"789456213",
  //           google_scholar_id:"789456213",
  //           photo:"ersdthtrejhfdgg",
  //           irins_id:"789456213"
  //   }
  // ).then((data)=>console.log("Success")).catch(err=>console.log(err))
  // const newFaculty = await Experiences.create(
  // {
  // exp_college: "Anna University",
  // emp_id: "123789" ,
  // exp_description:"gcvbjnkfbfjnkdgb",
  // exp_from: "2002",
  // exp_to: "2023",
  // nature_of_appointment: "Teaching Fellow",
  // exp_years : "15",
  // loginDetailId:"123789"
  // }
  // ).then((data)=>console.log("Success")).catch(err=>console.log(err))
  // const newFaculty = await Qualification.create(
  //   {
  //     degree: "B.Tech",
  //     emp_id: "123789" ,
  //     college:"Sakthi College",
  //     university:"Barathiyar University",
  //     percentage:"95",
  //     class_year: "2001",
  //     loginDetailId:"123789"
  //   }
  // ).then((data)=>console.log("Success")).catch(err=>console.log(err))
  // const newFaculty = await CitationModel.create(
  //   {
  //     citation_1: "94",
  //     citation_2: "95",
  //     gs_citation: "195",
  //     gs_h_index:"55",
  //     gs_i10_index:"57",
  //     h_index:"56",
  //     emp_id: "123567" ,
  //   }
  // ).then((data)=>console.log("Success")).catch(err=>console.log(err))
});

// app.use((req,res,next)=>{
//   // console.log(req)
//   // console.log(req.headers.cookie)
//   // console.log(req.headers)
//   const flag = unAuth.includes(req.url)
//   console.log("The flag is " + flag);
//   if(flag){
//     next();
//   }
//   else{
//     if(req.method != 'GET'){
//       const data = utils.token.verifyToken(req.body.accessToken);
//     }
//     else{
//       // const data = utils.token.verifyToken(req.params.accessToken);
//       next();

//     }
//     console.log(data);
//     if(data){
//       console.log("Mail id : " + data.faculty_id)
//       res.locals.faculty_id = data.faculty_id;
//       next();
//     }else{
//       console.log("Empty Data")
//       return res.status(498).send({status:"failure"})
//     }
//   }

// })

app.get("/imageUrl", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://annauniv.irins.org/profile/170322");
  const images = await page.$$eval(".img-responsive", (anchors) =>
    [].map.call(anchors, (img) => img.src)
  );
  // let element = await page.waitForSelector("#preview img[src]")
  // let text = await page.evaluate(
  //   element => element.textContent, element)
  console.log(images[1]);
  return res.status(200).send({ imgUrl: images[1] });
});

app.get("/scrapData", async (req, res) => {
  try {
    // let all_gs_id = [],all_emp_id = [];
    // await Faculties.findAll({attributes:['google_scholar_id','emp_id']})
    // .then(data=>{
    //   for(let i = 0; i < data.length; i++){
    //     all_gs_id.push(data[i]['google_scholar_id'])
    //     all_emp_id.push(data[i]['emp_id'])
    //   }

    //   console.log(data.length)})
    // .catch(err=>console.log(err));
    // // return res.status(200).send({msg:all_gs_id});
    // //acual implementation
    // async () => {
    //   const result = [];
    //   	const browser = await puppeteer.launch();
    //   	const page = await browser.newPage();
    // for(let i = 0; i < all_gs_id.length; i++){
    //   await page.goto('https://scholar.google.com/citations?hl=en&user='+all_gs_id[i]);
    //   const titleArray = await page.evaluate(
    //         () => [...document.querySelectorAll(
    //     			'#gsc_a_tw > table > tbody > tr > td.gsc_a_t')]
    //     			.map(elem => elem.innerText)
    //       )
    //       const CitationArray = await page.evaluate(
    //         () => [...document.querySelectorAll(
    //     			'#gsc_a_tw > table > tbody > tr > td.gsc_a_c')]
    //     			.map(elem => elem.innerText)
    //       )
    //       const yearArray = await page.evaluate(
    //         () => [...document.querySelectorAll(
    //     			'#gsc_a_tw > table > tbody > tr > td.gsc_a_y')]
    //     			.map(elem => elem.innerText)
    //       )
    //       titleArray.forEach((titleArr, i)=>{
    //             // console.log(titleArr + " " + CitationArray[i] + " " + yearArray[i]);
    //       let newData = {"emp_id":all_emp_id[i],"title":titleArr,"citations":CitationArray[i],"year":yearArray[i]}
    // await Publications.create(newData).then(data=>console.log(data)).catch(err=>console.log(err))
    //         result.push(newData)
    //       })
    // let newData = {"name":text,"title":titleArray,"citation":CitationArray,"year":yearArray}
    // }
    // browser.close();
    // }
    //for now implementation

    const result = [];
    (async () => {
      const gs_id = [
        "5puGaPAAAAAJ",
        "rD9h9-gAAAAJ",
        "rTgkrEUAAAAJ",
        "1KdFhYQAAAAJ",
        "JXdJJZ4AAAAJ",
        "qTh3IiYAAAAJ",
        "es-RJ3AAAAAJ",
        "jDKAd6MAAAAJ",
        "X7D4W5kAAAAJ",
        "l9qipyYAAAAJ",
        "_om1c54AAAAJ",
        "QpknulAAAAAJ",
        "VmeFQwUAAAAJ",
        "SoiiKMkAAAAJ",
        "KaZc888AAAAJ",
        "2Nsi39EAAAAJ",
        "S88bYKIAAAAJ",
        "WdfqSlcAAAAJ",
        "7-g7OE8AAAAJ",
        "TSHevDoAAAAJ",
        "Aak9dzcAAAAJ",
        "lsZpAx4AAAAJ",
        "d7SodpkAAAAJ",
        "Zp8-JXEAAAAJ",
        "9IZiUTwAAAAJ",
        "h89DMFcAAAAJ",
        "ojFgyLAAAAAJ",
        "jbvTWngAAAAJ",
        "-Pccm70AAAAJ",
        "60-CQT8AAAAJ",
        "enZRExMAAAAJ",
        "Ywfct0kAAAAJ",
      ];
      for (let i = 0; i < gs_id.length; i++) {
        try {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(
            "https://scholar.google.com/citations?hl=en&user=" + gs_id[i]
          );

          let element = await page.waitForSelector("#gsc_prf_in");
          let text = await page.evaluate(
            (element) => element.textContent,
            element
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
            name: text,
            title: titleArray,
            citation: CitationArray,
            year: yearArray,
          };
          result.push(newData);
          browser.close();
          console.log(result);
        } catch (err) {
          continue;
        }
      }
      res.status(200).send({ msg: result });
    })();
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/faculty", facultyroutes);
app.use((req, res, next) => {
  res.status(404).send({ message: "Page Not Found" });
});
const port = 5000;
app.listen(port, () => {
  console.log("Server is listening at port " + port);
});
