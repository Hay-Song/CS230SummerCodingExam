/*
    Browswer: Chrome
    Operating System: Edition - Windows 11 Home , Version - 23H2
    Browser Version: Version 123.0.6312.59 (Official Build) (64-bit)

    -- Website: Atlas MongoDB
    -- Network Access: 0.0.0.0
    -- Node.js version: v20.11.1
    -- Atlas Version: 7.0.8
    -- const uri = "mongodb+srv://haysong69:Mongo-12Bongo123@cluster0.82ajhwe.mongodb.net/";

    There should be a database called "Exam" in the collections where the 10 Tenants, 6 Landlords, and 12 Contracts are already made

    W3Schools
    expressjs.com
    GeeksForGeeks
    Codeacademy
*/

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();

//Helps with getting JSON, Cors and urlencoded
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connection URI for MongoDB Atlas 
const uri = "mongodb+srv://haysong69:Mongo-12Bongo123@cluster0.82ajhwe.mongodb.net/";

//Create a new MongoClient
const client = new MongoClient(uri);

//Call the function to connect to the database
connectToDatabase();

//Function to connect to MongoDB Atlas
async function connectToDatabase() {
    try {
        //Connect the client to the server
        await client.connect();
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
    }
}

//Listen for requests on port 3000
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

//C (create) activity
app.post('/createTenant', async function (req, res) {
    try {
        const newTenant = {
            tenantID: req.body.tenantID,
            tenantTitle: req.body.tenantTitle,
            tenantFirstName: req.body.tenantFirstName,
            tenantSurname: req.body.tenantSurname,
            tenantPhoneNumber: req.body.tenantPhoneNumber,
            tenantEmailAddress: req.body.tenantEmailAddress,
            tenantAddressLine1: req.body.tenantAddressLine1,
            tenantAddressLine2: req.body.tenantAddressLine2,
            tenantTown: req.body.tenantTown,
            tenantCounty_City: req.body.tenantCounty_City,
            tenantEircode: req.body.tenantEircode
        };

        //Access the database
        const database = client.db("Exam");
        const tenantCollection = database.collection("Tenant");

        //Check for existing tenants with the same ID
        const existingTenant = await tenantCollection.findOne({ tenantID: newTenant.tenantID });
        if (existingTenant) {
            return res.status(400).json({ error: "Tenant with ID exists." });
        }


        //Insert the new gym member document into the collection
        const result = await tenantCollection.insertOne(newTenant);

        console.log("Insertion Result:", result); //Log the result object

        //Send response
        res.status(201).json({ message: "Created successfully", insertedId: result.insertedId });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/createLandlord', async function (req, res) {
    console.log("HEllo")
    try {
        console.log("HEllo")
        const newLandlord = {
            landLordID: req.body.landLordID,
            landLordTitle: req.body.landLordTitle,
            landLordFirstName: req.body.landLordFirstName,
            landLordSurname: req.body.landLordSurname,
            landLordPhoneNumber: req.body.landLordPhoneNumber,
            landLordEmailAddress: req.body.landLordEmailAddress,
            dateOfBirth: req.body.dateOfBirth,
            councilPermission: req.body.councilPermission,
            tenantEmailPermission: req.body.tenantEmailPermission,
            landLordAddressLine1: req.body.landLordAddressLine1,
            landLordAddressLine2: req.body.landLordAddressLine2,
            landLordTown: req.body.landLordTown,
            landLordCounty_City: req.body.landLordCounty_City,
            landLordEircode: req.body.landLordEircode
        };

        //Access the database
        const database = client.db("Exam");
        const landLordCollection = database.collection("Landlord");

        //Check for existing members with the same ID
        const existingLandlord = await landLordCollection.findOne({ landLordID: newLandlord.landLordID });
        if (existingLandlord) {
            return res.status(400).json({ error: "Landlord with ID exists." });
        }

        //Insert the new gym member document into the collection
        const result = await landLordCollection.insertOne(newLandlord);

        console.log("Insertion Result:", result); //Log the result object

        //Send response
        res.status(201).json({ message: "Created successfully", insertedId: result.insertedId });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/createContract', async function (req, res) {
    console.log("Im in create contract")
    try {
        const newContract = {
            contractID: req.body.contractID,
            date: req.body.date,
            propertyAddress: req.body.propertyAddress,
            tenant: req.body.tenant,
            landLord: req.body.landLord,
            monthlyFee: req.body.monthlyFee,
            propertyDoorNumber: req.body.propertyDoorNumber,
            contractLength: req.body.contractLength,
            propertyType: req.body.propertyType
        };

        console.log(newContract)

        //Access the database
        const database = client.db("Exam");
        const contractCollection = database.collection("Contract");

        /// Check for existing members with the same ID
        const existingContract = await contractCollection.findOne({ contractID: newContract.contractID });
        if (existingContract) {
            return res.status(400).json({ error: "Contract with ID exists." });
        }

        //Insert the new gym member document into the collection
        const result = await contractCollection.insertOne(newContract);

        console.log("Insertion Result:", result); //Log the result object

        //Send response
        res.status(201).json({ message: "Created successfully", insertedId: result.insertedId });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//R (retrieve) activity
app.get('/getTenant/:tenantID', async function (req, res) {
    try {
        const tenantID = req.params.tenantID;

        //Access the database
        const database = client.db("Exam");
        const tenantCollection = database.collection("Tenant");

        //Find the tenant by ID
        const tenant = await tenantCollection.findOne({ tenantID: tenantID });
        if (!tenant) {
            return res.status(404).json({ error: "Tenant not found" });
        }

        //Send response
        res.status(200).json(tenant);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/getLandlord/:landLordID', async function (req, res) {
    try {
        const landLordID = req.params.landLordID;

        //Access the database
        const database = client.db("Exam");
        const landLordCollection = database.collection("Landlord");

        //Find the landlord by ID
        const landlord = await landLordCollection.findOne({ landLordID: landLordID });
        if (!landlord) {
            return res.status(404).json({ error: "Landlord not found" });
        }

        //Send response
        res.status(200).json(landlord);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/getContract/:contractID', async function (req, res) {
    try {
        const contractID = req.params.contractID;

        //Access the database
        const database = client.db("Exam");
        const contractCollection = database.collection("Contract");

        //Find the contract by ID
        const contract = await contractCollection.findOne({ contractID: contractID });
        if (!contract) {
            return res.status(404).json({ error: "Contract not found" });
        }

        //Send response
        res.status(200).json(contract);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//U (update) activity
app.put('/updateTenant/:tenantID', async function (req, res) {
    try {
        const tenantID = req.params.tenantID;
        const updatedFields = {
            tenantTitle: req.body.tenantTitle,
            tenantFirstName: req.body.tenantFirstName,
            tenantSurname: req.body.tenantSurname,
            tenantPhoneNumber: req.body.tenantPhoneNumber,
            tenantEmailAddress: req.body.tenantEmailAddress,
            tenantAddressLine1: req.body.tenantAddressLine1,
            tenantAddressLine2: req.body.tenantAddressLine2,
            tenantTown: req.body.tenantTown,
            tenantCounty_City: req.body.tenantCounty_City,
            tenantEircode: req.body.tenantEircode
        };

        //Access the database
        const database = client.db("Exam");
        const tenantCollection = database.collection("Tenant");

        //Update the tenant document
        const result = await tenantCollection.updateOne({ tenantID: tenantID }, { $set: updatedFields });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Tenant not found" });
        }

        //Send response
        res.status(200).json({ message: "Tenant updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put('/updateLandlord/:landLordID', async function (req, res) {
    try {
        const landLordID = req.params.landLordID;
        const updatedFields = {
            landLordTitle: req.body.landLordTitle,
            landLordFirstName: req.body.landLordFirstName,
            landLordSurname: req.body.landLordSurname,
            landLordPhoneNumber: req.body.landLordPhoneNumber,
            landLordEmailAddress: req.body.landLordEmailAddress,
            dateOfBirth: req.body.dateOfBirth,
            councilPermission: req.body.councilPermission,
            tenantEmailPermission: req.body.tenantEmailPermission,
            landLordAddressLine1: req.body.landLordAddressLine1,
            landLordAddressLine2: req.body.landLordAddressLine2,
            landLordTown: req.body.landLordTown,
            landLordCounty_City: req.body.landLordCounty_City,
            landLordEircode: req.body.landLordEircode
        };

        //Access the database
        const database = client.db("Exam");
        const landLordCollection = database.collection("Landlord");

        //Update the landlord document
        const result = await landLordCollection.updateOne({ landLordID: landLordID }, { $set: updatedFields });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Landlord not found" });
        }

        //Send response
        res.status(200).json({ message: "Landlord updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put('/updateContract/:contractID', async function (req, res) {
    try {
        const contractID = req.params.contractID;
        const updatedFields = {
            date: req.body.date,
            propertyAddress: req.body.propertyAddress,
            tenant: req.body.tenant,
            landLord: req.body.landLord,
            monthlyFee: req.body.monthlyFee,
            propertyDoorNumber: req.body.propertyDoorNumber,
            contractLength: req.body.contractLength,
            propertyType: req.body.propertyType
        };

        //Access the database
        const database = client.db("Exam");
        const contractCollection = database.collection("Contract");

        //Update the contract document
        const result = await contractCollection.updateOne({ contractID: contractID }, { $set: updatedFields });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Contract not found" });
        }

        //Send response
        res.status(200).json({ message: "Contract updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//D (delete) activity
app.delete('/deleteTenant/:tenantID', async function (req, res) {
    try {
        const tenantID = req.params.tenantID;

        //Access the database
        const database = client.db("Exam");
        const tenantCollection = database.collection("Tenant");

        //Delete the tenant document
        const result = await tenantCollection.deleteOne({ tenantID: tenantID });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Tenant not found" });
        }

        //Send response
        res.status(200).json({ message: "Tenant deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete('/deleteLandlord/:landLordID', async function (req, res) {
    try {
        const landLordID = req.params.landLordID;

        //Access the database
        const database = client.db("Exam");
        const landLordCollection = database.collection("Landlord");

        //Delete the landlord document
        const result = await landLordCollection.deleteOne({ landLordID: landLordID });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Landlord not found" });
        }

        //Send response
        res.status(200).json({ message: "Landlord deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete('/deleteContract/:contractID', async function (req, res) {
    try {
        const contractID = req.params.contractID;

        //Access the database
        const database = client.db("Exam");
        const contractCollection = database.collection("Contract");

        //Delete the contract document
        const result = await contractCollection.deleteOne({ contractID: contractID });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Contract not found" });
        }

        //Send response
        res.status(200).json({ message: "Contract deleted successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//I made most of this using my past assignments and the challenges I faced was mostly from misspelling words. The hardest 
//part of this was actually the delete activity since I had a few errors occur and they went away even though I didn't do anything, it was strange
//The design is a simple one that just shows the forms in a more nicer way