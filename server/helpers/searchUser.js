import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const searchUserByName = async (name) => { 

    return await prisma.usuarios.findUnique({
        where:{
            nombreusuario: name.toLowerCase()
        }
    });


}




export {
    searchUserByName
}