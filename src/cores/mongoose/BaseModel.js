/*
|--------------------------------------------------------------------------
| Base Model Class
| Define base method
|--------------------------------------------------------------------------
*/
import mongoose from "mongoose"

import Moment from "../../utils/Moment"

// Exteneral fields
const BaseFields = {
    status: { type: String, lowercase: true, trim: true, enum: ["active", "inactive", "delete"], default: "active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null },
    createdAt: { type: Date, default: Moment.format() },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
	updateddAt: { type: Date, default: Moment.format() },
}


// BaseSchema process middleware
const BaseSchema = schema => {
    // Add Exteneral fields
    schema.add(BaseFields)

    // Create a pre-save hook
    schema.pre("save", function(next) {
        const now = Moment.format()
        this.createdBy = mongoose.mongo.ObjectID() //Temp data
        this.createdAt = now
        if (!this.created_at) {
            this.updatedBy = mongoose.mongo.ObjectID() //Temp data
            this.updateddAt = now
        }
        next()
    })
}

// Based function
class BaseModel {
    // Update status => "delete"
    static softDelete(id, res) {
        this.findOne({_id: id}, (err) => {
            if(err) return res.status(404).json({success: false, message: 'Not found user by id!', error: 'Wrong id'});
        });
        return this.updateOne({_id: id}, {status: "delete"});
    }

    static findUserAndCount(username) {
        return this.aggregate([
            {$match: {status: 'active'}},
            {$group: {
                _id: null,
                totalUser: {$sum: 1},
                data: {$push:'$$ROOT'},
            }},
            {$project: {
                totalUser: "$totalUser" ,
                data: { $slice: [ "$data", 5 ] },
            }}
        ])
    }

    // Temp function
    static findByFullName(username) {
        return this.find({ username: username })
    }
}

export default BaseModel
export {
    BaseSchema,
    BaseFields
}