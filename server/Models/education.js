var educationSchema = new Schema({
    'university': String
});

var EducationModel = mongoose.model('EducationModel', educationSchema);