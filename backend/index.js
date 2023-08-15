const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('./config');
const Details = require('./details')
const Audiencess = require('./audiences')
const images = require('./images')
// const users = require('./db/users');
app.use(express.json());
app.post("/data", async (req, resp) => {
    let details = new Details(req.body);
    let result = await details.save();
    // console.log(result);
    resp.send(result);
})
app.post("/audience", async (req, resp) => {
    let details = new Audiencess(req.body);
    let result = await details.save();
    // console.log(result);
    resp.send(result);
})
app.post("/image", async (req, resp) => {
    let details = new images(req.body);
    let result = await details.save();
    // console.log(result);
    resp.send(result);
})
app.get("/details", async (req, resp) => {
    let result = await Details.find();
    resp.send(result);
})
app.get("/audience", async (req, resp) => {
    let result = await Audiencess.find();
    resp.send(result);
})
app.get("/image", async (req, resp) => {
    let result = await images.find();
    resp.send(result);
})

app.get("/search/:key", async (req, resp) => {
    let result = await Details.find({
        "$or": [
            { EventDate: { $regex: req.params.key } },
            { Location: { $regex: req.params.key } }
        ]
    });
    resp.send(result);
})

// app.get("/searchAudience/:key", async (req, resp) => {
//     events = [];
//     let result = await Audiencess.find({
//         "$or": [
//             { Audiences: { $regex: req.params.key } },
//             { Event_id: { $regex: req.params.key } }
//         ]
//     });
//    await result.forEach(async element => {
//         let event_id = element.Event_id;
//         let event = await Details.findOne({ _id: event_id });
//         events.push(event);
//     });
//     resp.send(events);
// })
app.get("/searchAudience/:key", async (req, resp) => {
    try {
        const events = [];
        const results = await Audiencess.find({
            "$or": [
                { Audiences: { $regex: req.params.key } },
                { Event_id: { $regex: req.params.key } }
            ]
        });

        await Promise.all(results.map(async (element) => {
            const event_id = element.Event_id;
            const event = await Details.findOne({ _id: event_id });
            if (event) {
                events.push(event);
            }
        }));

        resp.send(events);
    } catch (error) {
        console.error('Error:', error);
        resp.status(500).send('Internal Server Error');
    }
});



app.get("/getAudiencesByEvent/:key", async (req, resp) => {
    let result = await Audiencess.find({
        "$or": [
            { Audiences: { $regex: req.params.key } },
            { Event_id: { $regex: req.params.key } }
        ]
    });
    resp.send(result);
})

app.listen(5000);