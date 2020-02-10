const adminRegistration = (req, res, db) => {

    db.select('*').from('users2')
        .then(users => {
            if (users.length) {
                res.json(users);
            } else {
                res.status(400).json('Not Found');
            }
        })
}

module.exports = {
    adminRegistration: adminRegistration
};