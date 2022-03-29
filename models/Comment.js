const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            },
        post_comment: {
            type: DataTypes.TEXT,
            allowNull: false,
            primaryKey: true
            },
        date_created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
            }}},
        {
            sequelize: sequelize,
            freezeTableName: true,
            underscored: true,
            timestamps: false,
            modelName: 'comment'
        });

module.exports = Comment;