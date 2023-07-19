const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://khansharukhjpr66:v1f6w74Ocn5KcDMN@cluster0.ayshzfu.mongodb.net/FINGIN_project",)
    .then(() => {
        console.log("connection successful...")
    }).catch((e) => {
        console.log(e);
    })