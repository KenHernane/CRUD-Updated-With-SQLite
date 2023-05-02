const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const bodyParser = require('body-parser');
const members = require('../../Members');

router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', (req, res) => res.json(members));

router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: "Please include a name and email" });
    }
    members.push(newMember);
   // res.json(members);
   res.redirect('/');
});

router.post('/update', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.body.id));
    console.log(req.body.id);

    if(found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.body.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
            }
        });
        res.redirect('/');
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.body.id}`});
    }
});

router.post('/remove', (req, res) => {
    const found = members.some(member => member.name === req.body.name);
    if(found) {
        var index = -1;
        var val = req.body.name;
        console.log(val);
        var filter = members.find(function (item, i) {
            if(item.name === val) {
                index = i;
                return i;
            }
        });
        members.splice(index, 1);
        res.redirect('/');
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;