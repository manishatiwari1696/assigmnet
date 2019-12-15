var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Notes = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      default: null
    },
    title: {
      type: String,
      default: null
    },
    category: {
      type: String,
      default: null
    },
    notes: {
      type: String,
      default: null
    },
    is_deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

var Notes = mongoose.model("notes", Notes);
module.exports = Notes;