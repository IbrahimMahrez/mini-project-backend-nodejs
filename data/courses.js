


const courses = [   
    { id: 1, name: 'java', price:500 },
    { id: 2, name: 'css', price:300 },
    { id: 3, name: 'html',price:4568 }
];




module.exports={
    courses
};





//database connection code
// const url="mongodb+srv://ibrahimmahrez726:123456789ib@backend-learn-db.jappqwn.mongodb.net/?appName=backend-learn-db"
// const client=new MongoClient(url);

// const client=new MongoClient(url);

// const main=async()=>{
//   //connect to mongo db
//     await client.connect();
//     console.log("connect secissfly");
//     //select database and collection
//     const db =client.db("backend_courses");
//     // select collection
//     const collection=db.collection("courses")
     
//       await collection.insertOne({
//         id: 1, name: 'javerwa', price:500,
       
//       });

//         //query collection
//     const  data=await collection.find().toArray();
//     console.log(data);

    
// }
// main();
