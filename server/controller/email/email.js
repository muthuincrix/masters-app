// var nodemailer = require("nodemailer");

// exports.SendEmail = (email, OTP) => {
//   var transporter = nodemailer.createTransport({
//     host: process.env.HOST,
//     name: process.env.NAME,
//     port: process.env.EMAIL_PORT,
//     secure: true,
//     auth: {
//       user: process.env.USER,
//       pass: process.env.PASSWORD,
//     },
//   });

//   var mailOptions = {
//     from: process.env.USER,
//     to: email,
//     subject: "[The Master Academy] Please verify your account",

//     html: textHtml(OTP),
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

// const textHtml = (OTP) => {
//   return `<!DOCTYPE html>
//   <html>
//     <head>
//       <title>OTP Email</title>
//       <style>
//         * {
//           padding: 0;
//           box-sizing: border-box;
//           margin: 0;
//         }
//         body {
//           font-family: Arial, sans-serif;
//         }
//         .container{
//           max-width: 600px;
//           margin: 0 auto;
//           padding: 20px;
//           border: 1px solid #ccc;
//           border-radius: 5px;
//         }
//         .header {
//           padding: 10px;
//           border-radius: 5px 5px 0 0;
//         }
//         .logo {
//           display: flex;
//           width: 100%;
//           justify-content: center;
//           align-items: center;
//           gap: 10px;
//         }
//         .content {
//           display: flex;
//           align-items: center;
//           flex-direction: column;
//           gap: 20px;
//           justify-content: center;
//           width: 100%;
//           height: 100%;
//           padding: 20px;
//         }
//         .otp-container {
//           display: flex;
//           margin-top: 20px;
//           gap: 20px;
//         }
//         .otp-block {
//           width: 50px;
//           height: 50px;
//           border: 2px solid #187163;
//           border-radius: 5px;
//           padding: 0;
//           text-align: center;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .footer {
//           background-color: #f4f4f4;
//           padding: 10px;
//           text-align: center;
//           border-radius: 0 0 5px 5px;
//         }
//         .otp-align {
//           display: flex;
//           align-items: center;
//           width: 100%;
//           height: 300px;
//           justify-content: center;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <div class="header">
//           <center  > 
//               <div style="display: flex; width: 50%; ">
//                   <img
//                   style="height: 50px; margin-right: 10px "
//                   src="https://upload.incrix.com/search?url=/file/MasterAcademy/image/file-1697039117590.png"
//                   alt="Company Logo"
//                 />
              
//                 <p
//                   style="    
//                     font-family: DM Sans;
//                     font-size: 15px;
//                     font-style: normal;
//                     font-weight: 500;
//                    display: inline-block;
//                     height: 50px;
//                 margin-left: 10px;
//                  margin-bottom: auto;
//                  margin-top: 10px;
//                   "
               
//                 >
//                   The <font color="#FEA800">Masters Academy </font>
//                 </p>
//               </div>
           
       
         
//         </div>
//         <center  >
//           <p style="margin-bottom: 20px;">Your One-Time Password (OTP) is:</p>
         
//               <p style=" font-size: 24px; display: inline-block; border: 2px solid #187163; width: 50px; border-radius: 5px; margin-left: 5px; margin-right: 5px; height: 50px; text-align: center;  line-height: 50px; ">
//                 ${OTP[0]}
//               </p>
  
//               <p style=" font-size: 24px; display: inline-block; border: 2px solid #187163; width: 50px;  border-radius: 5px; margin-left: 5px; margin-right: 5px; height: 50px; text-align: center;  line-height: 50px; ">
//               ${OTP[1]}
//               </p>
  
//               <p style=" font-size: 24px; display: inline-block; border: 2px solid #187163; width: 50px;  border-radius: 5px; margin-left: 5px; margin-right: 5px; height: 50px; text-align: center;  line-height: 50px; ">
//               ${OTP[2]}
//               </p>
  
//               <p style=" font-size: 24px; display: inline-block; border: 2px solid #187163; width: 50px ;  border-radius: 5px; height: 50px; margin-left: 5px; margin-right: 5px; text-align: center;  line-height: 50px; ">
//               ${OTP[3]}
//               </p>
  
      
//           <p style="margin-top: 20px;margin-bottom: 10px;">Please use this OTP to complete your verification process.</p>
//         </center>
//         <div class="footer">
//           <p style="color: #187163">Best regards,<br />The Masters Academy</p>
//         </div>
//       </div>
//     </body>
//   </html>
  
  
//   `;
// };


const nodemailer = require("nodemailer");

exports.SendEmail = async (email, OTP) => {


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
    secure: true,
});

await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});

const mailData = {
    from: {
        name: `incrix`,
        address: process.env.USER,

    },
    replyTo: process.env.USER,
    to: email,
    subject: `form message`, 
    html:textHtml(OTP),
};

await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            console.log(info);
            resolve(info);
        }
    });
});

};


const textHtml = (OTP) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>OTP Email</title>
      <style>
        * {
          padding: 0;
          box-sizing: border-box;
          margin: 0;
        }
        body {
          font-family: Arial, sans-serif;
        }
        .container{
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .header {
          padding: 10px;
          border-radius: 5px 5px 0 0;
        }
        .logo {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        .content {
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 20px;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 20px;
        }
        .otp-container {
          display: flex;
          margin-top: 20px;
          gap: 20px;
        }
        .otp-block {
          width: 50px;
          height: 50px;
          border: 2px solid #187163;
          border-radius: 5px;
          padding: 0;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer {
          background-color: #f4f4f4;
          padding: 10px;
          text-align: center;
          border-radius: 0 0 5px 5px;
        }
        .otp-align {
          display: flex;
          align-items: center;
          width: 100%;
          height: 300px;
          justify-content: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <center  > 
              <div style="display: flex; width: 50%; ">
                  <img
                  style="height: 50px; margin-right: 10px "
                  src="https://upload.incrix.com/search?url=/file/MasterAcademy/image/file-1697039117590.png"
                  alt="Company Logo"
                />
              
                <p
                  style="    
                    font-family: DM Sans;
                    font-size: 15px;
                    font-style: normal;
                    font-weight: 500;
                   display: inline-block;
                    height: 50px;
                margin-left: 10px;
                 margin-bottom: auto;
                 margin-top: 10px;
                  "
               
                >
                  The <font color="#FEA800">Masters Academy </font>
                </p>
              </div>
           
       
         
        </div>
        <center  >
          <p style="margin-bottom: 20px;">Your One-Time Password (OTP) is:</p>
         
              <p style=" font-size: 24px; display: inline-block; border: 2px solid #187163; width: 50px; border-radius: 5px; margin-left: 5px; margin-right: 5px; height: 50px; text-align: center;  line-height: 50px; ">
                ${OTP[0]}
              </p>
  
              <p style=" font-size: 24px; display: inline-block; border: 2px solid #187163; width: 50px;  border-radius: 5px; margin-left: 5px; margin-right: 5px; height: 50px; text-align: center;  line-height: 50px; ">
              ${OTP[1]}
              </p>
  
              <p style=" font-size: 24px; display: inline-block; border: 2px solid #187163; width: 50px;  border-radius: 5px; margin-left: 5px; margin-right: 5px; height: 50px; text-align: center;  line-height: 50px; ">
              ${OTP[2]}
              </p>
  
              <p style=" font-size: 24px; display: inline-block; border: 2px solid #187163; width: 50px ;  border-radius: 5px; height: 50px; margin-left: 5px; margin-right: 5px; text-align: center;  line-height: 50px; ">
              ${OTP[3]}
              </p>
  
      
          <p style="margin-top: 20px;margin-bottom: 10px;">Please use this OTP to complete your verification process.</p>
        </center>
        <div class="footer">
          <p style="color: #187163">Best regards,<br />The Masters Academy</p>
        </div>
      </div>
    </body>
  </html>
  
  
  `;
};
