const User = require('../models/user')

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({
            ok: false,
            msg: "El usuario no existe"
        })
        const userPass = (password === user.password ? true : false)
        if (!userPass) return res.status(401).json({
            ok: false,
            msg: "Contraseña equivocada"
        })
        res.status(200).json({
            ok: true,
            user: user
        })
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const register = async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const userExist = await User.findOne({ 'email': newUser.email })
        if (userExist) return res.status(403).json({
            ok: false,
            msg: ' El email ya existe !'
        })
        const savedUser = await newUser.save()
        res.status(200).json({
            ok: true,
            user: savedUser
        })

    } catch (error) {
        res.status(500).json({ ok: false, msg: ' Ha ocurrido un error !' })
    }
}

module.exports = {
    register,
    login
}