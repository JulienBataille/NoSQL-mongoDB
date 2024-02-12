const {MongoClient} = require(`mongodb`);
require ('dotenv').config();
const client = new MongoClient(process.env.MONGO_URL);

async function main(){
    await client.connect();
    console.log(`Connection OK !`);
    const db = client.db('myTask');
    const collection = db.collection('Documents');
//Create
    try {
        const insertData = await collection.insertMany([
            {
                name: 'Alex',
                age: 30,
                genre: 'Masculin',
                hobby: 'Coding'
            },
            {
                name: 'Justine',
                age: 30,
                genre: 'Féminin',
                hobby: 'Coding'
            },
            {
                name: 'Pierre',
                age: 35,
                genre: 'Masculin',
                hobby: 'Escalade'
            }
        ]);
        console.log('Documents insérés =>', insertData)
    
    } catch(e){ throw e;}

// READ    
    try {
    const findData = await collection.findOne({name : 'Justine'});
    console.log('document trouvé =>', findData);

    const findMultipleData = await collection.find({age: 30});
    console.log(await findMultipleData.toArray());
    } catch(e){ throw e;}

// UPDATE
    try {
    const updatePierre = collection.updateOne({name: 'Pierre'}, {$set: {name: 'Pauline', genre: 'Féminin'}});
    console.log(await updatePierre);

    const updateAge = collection.updateMany({age: 30}, {$set: {age: 31}});
    console.log(await updateAge);
    } catch(e){ throw e;}
    
//DELETE
    try {
        const deletePierre = await collection.deleteOne({name: 'Pauline'});
        console.log(await deletePierre)
        const deleteEveryone = await collection.deleteMany({age: 31});
        console.log(await deleteEveryone)

    } catch(e){ throw e;}

    return 'done!';
}

main()
.then (console.log)
.catch(console.error)
.finally(() => client.close);