export default{
name:'post',
title:'Post',
type:'document',
fields :[
{name: 'title',
title: 'Title',
type: 'string'

},
{name: 'image',
title: 'Image',
type: 'image',
options: {
    hotspot: true
}


},{
    name: 'postedBy',
    title: 'PostedBy',
    type:'postedBy'
},
{
    name:'likes',
    title:'Likes',
    type: 'array',
    of: [{type: 'like'}]
},
{
    name:'comments',
    title:'Comments',
    type: 'array',
    of: [{type: 'comment'}]
},
{name:'about',
    title:'About',
    type: 'string'
},
{
    name:'category',
    title: 'Category',
    type:'string'
}




]


}