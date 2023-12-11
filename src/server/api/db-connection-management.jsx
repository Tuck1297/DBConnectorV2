import { Sequelize } from "sequelize";
import { db } from "@/server/api/db";
import z from "zod";

export const dbConnectionManagement = {
    create,
    delete: _delete,
    update,
    get,
    updateUserCurrentInteracting
}

async function create(connectionObj) {

}
async function _delete(id) {

}
async function update(connectionObj) {

}
async function get(id) {

}

async function updateUserCurrentInteracting(userId, connectionId) {
    
}