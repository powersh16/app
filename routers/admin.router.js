const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const uploadFeature = require('@admin-bro/upload')
const AdminBroMongoose = require('admin-bro-mongoose')
const bcryptjs=require('bcryptjs')


const mongoose = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

/*const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})
*/
const contentNavigation = {
  name: 'PowerShoes',
  icon: 'Shop',
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
      properties:{image:{components:{edit:AdminBro.bundle("./components/uploading-image.edit.tsx")}}},
     
    }},
  ],
  locale: {
    translations: {
      labels: {
        Produit: 'Produites',User:"Clients",Admins:"Administrateurs",MyFirstDatabase:"PowerShoes"
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