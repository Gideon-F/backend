const register = (req, res, db, bcrypt) => {
    const { email, name, password, id } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            id: id,
            hash: hash,
            email: email
        })
            .into('login2')
            .returning('email')
            .then(loginEmail => {
                return trx('users2')
                    .returning('*')//return every column of response.
                    .insert({
                        id: id,
                        email: loginEmail[0],
                        name: name,
                    })
                    .then(user => {
                        //we want to grap the last user which we just added
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register'));
}

module.exports = {
    register: register
};