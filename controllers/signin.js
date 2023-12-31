const handleSignin = (req, res, db, bcrypt) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json('Please Fill All Blanks...');
    }

    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {

            const isValid = bcrypt.compareSync(password, data[0].hash);

            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {

                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable To Get User...'))
            } else {

                res.status(400).json('Wrong Credetials...')
            }
        })
        .catch(err => res.status(400).json('Wrong Credetials...'))
}

module.exports = {

    handleSignin: handleSignin
}