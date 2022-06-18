const {DataTypes} = require('sequelize');
const db = require('../db');

const Post = db.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'posts',
    timestamps: true,
});

module.exports = Post;
