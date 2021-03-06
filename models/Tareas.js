const sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const Tareas = db.define('tareas', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tarea: sequelize.STRING(100),
    estado: sequelize.INTEGER(1)

});

Tareas.belongsTo(Proyectos);

module.exports = Tareas;