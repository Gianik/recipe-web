import { toastError, toastSuccess } from '../../components/toast';

export const validate = ({ recipeName, ingredientlist, instructionList }: any) => {
    var errorTracker = false // track if the forEach has error found
    if (recipeName !== "") { // validate recipe name
        if (/^[A-Za-z0-9 ]+$/.test(recipeName)) {

        }
        else {
            toastError("No special characters in Recipe Name")
            return false;
        }
    }
    else {
        toastError("Recipe Name cannot be empty")
        return false
    }
    ingredientlist.forEach(element => {
        if (element.Ingredient == "") {
            toastError("One of the Ingredient List field is empty please fill it up or remove it")
            errorTracker = true;
            return false;
                
        }
    });
    instructionList.forEach(element => {
        if (element.Instruction == "") {
            toastError("One of the Instruction List field is empty please fill it up or remove it")
            errorTracker = true;
            return false;
        }
    });
    if (errorTracker as boolean == true) { // assert the type to remove typescript error
        return false;
    }
    else {
        return true;
    }
    
};
