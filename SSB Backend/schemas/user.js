export default{
name: 'user',
title: 'User',
type: 'document',
fields: [
{name: 'userName',
title: 'UserName',
type:'string'
},{name: 'email',
title: 'Email',
type:'string'
},{name: 'password',
title: 'Password',
type:'string'
},{name: 'profilePic',
title: 'ProfilePic',
type:'image',
options:{
    hotspot: true
}
},{name: 'details',
title: 'Details',
type:'string'
},{name: 'phoneNumber',
title: 'PhoneNumber',
type:'number'
},


]


}