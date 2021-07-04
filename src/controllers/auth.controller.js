import User from '../models/User';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        //  Guardando el  usuario nuevo 
        const { name, email, password } = req.body;
        const user = new User({
            name,
            email,
            password
        });
        user.password = await user.encryptPassword(password);
        console.log(user);
        const savedUser = await user.save();
        // TOKEN 
        const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET)
        res.status(200).json(token);
    } catch (error) {
        if (error.code == 11000)
            return res.status(400).json({
                message: "Alguien  ya esta Usando ese Correo",
                error
            });
        res.status(500).json({
            message: "Ha ocurrido un error",
            error
        });
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: " Email Incorrecto" });
        const isCorrect = await user.validatePassword(password);
        if (!isCorrect) return res.status(404).json({ message: " Contraseña Incorrecto" });
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET); //opcional ,{expiresIn:60*60*24}
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({
            message: " ha  ocurrido un Error",
            error
        });
    }

}