import { Box, Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hook";

interface NewTodoFormProps {
  value: string;
  updateText: (str: string) => void;
  handleAction: () => void;
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({
  value,
  updateText,
  handleAction,
}) => {
  const todos = useAppSelector((state) => state.todos.list);

  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        width: "50%",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        margin: " 20px auto 0",
        paddingBottom: "30px",
        borderRadius: "20px 20px 0 0 ",
      }}
    >
      <h2>New Todo</h2>
      <div>
        <TextField
          size="small"
          label="todo's name"
          value={value}
          sx={{ width: "400px", marginRight: "20px" }}
          onChange={(e) => updateText(e.target.value)}
        />
        <Button onClick={handleAction}>Add todo</Button>
      </div>
    </div>
  );
};

export default NewTodoForm;
