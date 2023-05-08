import { useState } from "react";
import { useAppDispatch } from "../hook";
import { toggleComplete, removeTodo, editTodo } from "../store/todoSlice";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title); // new state variable to hold the edited title
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleSaveChanges = () => {
    dispatch(editTodo({ id, title: editedTitle })); // dispatch the editTodo action with the new title value
    setOpen(false);
  };

  return (
    <div
      className="qq"
      style={{
        width: "25vw",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgb(125, 171, 250)",
        paddingLeft: " 10%",
      }}
    >
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleComplete(id))}
        />
        <span className="title">{title}</span>
      </div>
      <div>
        <span onClick={() => setOpen(true)}>
          <ModeEditIcon />
        </span>
        <span className="delete" onClick={() => dispatch(removeTodo(id))}>
          <DeleteIcon />
        </span>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              sx={{
                margin: "auto",
              }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Edit todo
              {/* </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
              <TextField
                fullWidth
                size="small"
                value={editedTitle}
                onChange={handleTitleChange}
              />
              <Button onClick={handleSaveChanges}>save changes</Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default TodoItem;
