const knex = require('./knex');

function createMember(member) {
    return knex('members').insert(member);
};

function getAllMembers() {
    return knex('members').select('*');
};

function deleteMember(name) {
    return knex('members').where("name", name).del();
};

function updateMember(id, member) {
    return knex("members").where('ID', id).update(member);
};

module.exports = {
    createMember,
    getAllMembers,
    deleteMember,
    updateMember
};
