const router = require("express").Router();
var Workout = require("../models/workout.js");


router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(workouts => {
            res.json(workouts)
        })
        .catch(err => {
            res.json(err)
        })
});

router.post("/api/workouts",({body}, res) => {
    Workout.create(body)
        .then(workout => res.json(workout))
        .catch(err => {
            console.log("err", err)
            res.json(err)
        })
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    )
        .then(data => res.json(data))
        .catch(err => {
            console.log("err", err)
            res.json(err)
        })
});

module.exports = router;