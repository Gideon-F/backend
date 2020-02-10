const adminRegistration = (req, res, db) => {
    const { name } = req.body;


    db('users').where('name', '=', name)
        .update({
            approval: 1
        })
        .returning('*')
        .then(appointment => {
            res.json(appointment[0]);
        })
        .catch(err => res.status(400).json('unable to update appointmrnt'));
}

module.exports = {
    adminRegistration: adminRegistration
};