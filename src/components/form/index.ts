import Form from "./Form.vue";
import TextInput from "./TextInput.vue";
import ValidationMessage from "./ValidationMessage.vue";
import SubmitButton from "./SubmitButton.vue";
import DeleteButton from "./DeleteButton.vue";

Form.TextInput = TextInput;
Form.ValidationMessage = ValidationMessage;
Form.SubmitButton = SubmitButton;
Form.DeleteButton = DeleteButton;

export default Form as typeof Form & {
    TextInput: typeof TextInput,
    ValidationMessage: typeof ValidationMessage,
    SubmitButton: typeof SubmitButton,
    DeleteButton: typeof DeleteButton
};