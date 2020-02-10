const signin = (req, res, db, bcrypt) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json('incorrect from submission');
    }
    db.select('email', 'hash').from('login2')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users2')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get patient'));
            } else {
                res.status(400).json("wrong credentials 1")
            }
        })
        .catch(err => res.status(400).json('wrong credentials 2'))
}

module.exports = {
    signin: signin
}