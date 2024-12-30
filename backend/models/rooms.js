import mongoose from 'mongoose'; 

const roomschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maxcount: {
        type: Number,
        required: true
    },
    phonenumber: {
        type: String,  // Change to String, as phone numbers are often stored as strings
        required: true
    },
    rentperday: {
        type: Number,  // Fix the typo
        required: true
    },
    imageurls: {
        type: [String],  // Assuming this is an array of URLs
        required: true
    },
    currentbookings: {
        type: [String],  // Assuming this is an array of booking references or IDs
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Room = mongoose.model('Room', roomschema);  // Export the model

export default Room;  // Export the model
