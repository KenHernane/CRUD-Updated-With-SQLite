const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require("D:/XAMPP/htdocs/express/db/memberCrud.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', async (req, res) => {
    const members = await db.getAllMembers();
    res.status(200).json({members});
});

router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

router.post('/', async (req, res) => {
    
   const newMember = {
        name: req.body.name,
        email: req.body.email,
        status: 'active'
   }
   if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: "Please include a name and email" });
    }
    const createMember = await db.createMember(newMember);
   // res.json(members);
   res.redirect('/');
});

router.post('/update', async (req, res) => {
    const members = await db.getAllMembers();
    const found = members.some(member => member.ID === parseInt(req.body.id));

    if(found) {
        const updMember = req.body;
        
        await db.updateMember(parseInt(req.body.id), req.body);
        res.redirect('/');
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.body.id}`});
    }
});

router.post('/remove', async (req, res) => {
    const members = await db.getAllMembers();

    const found = members.some(member => member.name === req.body.name);
    if(found) {
        var val = req.body.name;
        await db.deleteMember(val);
        res.redirect('/');
    }
    else {
        res.status(400).json({ msg: `No member with the name of ${req.body.name}`});
    }
});

module.exports = router;