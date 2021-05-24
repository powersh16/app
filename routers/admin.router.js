const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const bcryptjs=require('bcryptjs')
const path = require('path');
const fs = require('fs');


const mongoose = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

/*const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})
*/
const contentNavigation = {
  name: 'PowerShoes',
  icon: '/public/assets/img/icons/images/logo2_1.png',
}
const adminBro = new AdminBro({
  resources: [
    { resource: require("../models/Admins"), options: {navigation: contentNavigation,  properties:{
      _id:{
        isVisible:{edit:false,list:true,filtre:true,show:true}
      },
      date:{
        isVisible:{edit:false,list:true,filtre:true,show:true}
      },
      password:{
        isVisible:false,
      },
      Password:{
        type:'password',
        isVisible:{edit:true,list:false,filtre:false,show:true},
        
      },
    },
    actions:{
      new:{
        after:async(response)=>{
          if(response.record && response.record.errors){
            response.record.errors.Password=response.record.errors.password;
          }
          return response

        },
        before: async(request)=>{
          if(request.method=='post'){
            const{Password,...otherParams}=request.payload
            if(Password){
               const password=bcryptjs.hashSync(Password,10);
              return{
                ...request,
                payload:{
                  ...otherParams,
                  password
                }
              }
            }
          }
          return request
        }
      }
    },
  }
},
    { resource: require("../models/User"), options: {navigation: contentNavigation,
      properties:{
        _id:{isVisible:{edit:false,list:true,filtre:true,show:true}},
        date:{
          isVisible:{edit:false,list:true,filtre:true,show:true}
        },
        password:{
          isVisible:false,
        },
        Password:{
          type:'password',
          isVisible:{edit:true,list:false,filtre:false,show:true},
           
        },
      },
      actions:{
        new:{
          after:async(response)=>{
            if(response.record && response.record.errors){
              response.record.errors.Password=response.record.errors.password;
            }
            return response

          },
          before: async(request)=>{
            if(request.method=='post'){
              const{Password,...otherParams}=request.payload
              if(Password){
                 const password=bcryptjs.hashSync(Password,10);
                return{
                  ...request,
                  payload:{
                    ...otherParams,
                    password
                  }
                }
              }
            }
            return request
          }
        }
      },
    },
  },
    { resource: require("../models/Produit"), options: {navigation: contentNavigation,
      properties:{images:{components:{
        list:AdminBro.bundle("./components/upload-image-list.jsx"),
        show:AdminBro.bundle("./components/upload-image-list.jsx"),
        edit:AdminBro.bundle("./components/uploading-image.edit.jsx")}}},
        actions:{
          new:{
            after:async (response, request, context) => {
             
              const { record, uploadImage } = context;
            
              if (record.isValid() && uploadImage) {
              
               const id= String(record.params._id);
              
                const filePath = path.join('uploads', id, uploadImage.name);
                 fs.mkdir(path.dirname(filePath), { recursive: true },function(err) {
                  if (err) {
                    console.log(err)
                  } else {
                    
                    console.log("New directory successfully created.")
                  }
                });
                fs.readFile(uploadImage.path,(err,data)=>{
                  if(err){console.log(err)}else{
                    fs.writeFile(filePath,data,function(err) {
                      if (err) {
                     console.log(err)
                      } else {
                          console.log("New directory successfully created.")
                             }
                            });
                  }
                });
               /* 
               fs.writeFile(filePath,uploadImage.path,function(err) {
                  if (err) {
                 console.log(err)
                  } else {
                      console.log("New directory successfully created.")
                         }
                        });
                        */
                
                await record.update({ images:`/${filePath}`});
              }
              return response;
            },
            before:async (request, context) => {
              if (request.method === 'post') {
               
               
                const  uploadImage = request.payload.images;
                const otherParams=request.payload;
              
                // eslint-disable-next-line no-param-reassign
              
                context.uploadImage = uploadImage;
              
            
                return {
                  ...request,
                  payload: otherParams,
                };
              }
              return request;
            },
          },
        },
    
    }},
  ],
  locale: {
    translations: {
      labels: {
        Produit: 'Produits',User:"Clients",Admins:"Administrateurs",myFirstDatabase:"PowerShoes"
      }
    }
  },
  branding: {
    companyName: 'PowerShoes',
  },
})

/*const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'lovejs',
  
}
*/

const router = AdminBroExpress.buildRouter(adminBro);
/*AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN
    }
    return null
  }
})
*/

module.exports = router