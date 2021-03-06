const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }},
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }}},
        {
            hooks: {
                beforeCreate: async(newUser) => {
                    newUser.password = await bcrypt.hash(newUser.password, 8);
                    return newUser;
                },
                beforeUpdate: async(updatedUser) => {
                    updatedUser.password = await bcrypt.hash(updatedUser.password, 8);
                    return updatedUser;
                }},

            sequelize: sequelize,
            freezeTableName: true,
            underscored: true,
            timestamps: false,
            modelName: 'user'
            });

module.exports = User;