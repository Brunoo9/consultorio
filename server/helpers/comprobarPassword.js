import bcrypt from 'bcrypt';


const comprobarPassword = async (pwLogin,pwDB ) => {
    return await bcrypt.compare(pwLogin,pwDB)
}

export default comprobarPassword