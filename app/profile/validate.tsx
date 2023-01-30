
//This component validates the User inputs from the Register Component
export const validate = ({ email, fullName }: any) => {
    if (email !== "") { // validate email
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            
        }
        else {
            return { validate: false, message: "Invalid Email Format" }
        }
    }
    else {
        return { validate: false, message: "Email can not be empty" }
    }

    if (fullName !== "") {
        if (/^[a-z ,.'-]+$/i.test(fullName)) {
            
        }
        else {
            return { validate: false, message: "Invalid Name Format" }
        }
        
    }
    else {
        return { validate: false, message: "Name can not be empty" }
    }

    return {validate:true,message:""}
}