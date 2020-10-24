import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@material-ui/core";
import firebase from "../../firebase";
import "firebase/firestore";
import { useContextDispatch } from "../context";
const db = firebase.firestore();
export default function ChatPage() {
  const [group, setGroup] = useState("");
  const [groupList, setGroupList] = useState([]);
  const dispatch = useContextDispatch();
  async function getChats() {
    try {
      db.collection("groups").limit(50).orderBy(
        "name",
        "desc",
      ).onSnapshot(function (groups) {
        let gl = [];
        groups.forEach((document) => {
          console.log(document.data());
          gl.push({ id: document.id, ...document.data() });
        });
        setGroupList(gl);
      });
    } catch (error) {
      console.log(error);
    }
  }
  console.log(groupList);
  async function handleSaveGroup() {
    const { uid } = firebase.auth().currentUser;
    await db.collection("groups").add({ name: group, uid });
    dispatch({ type: "showSnackbar", successMessage: "Save Group" });
  }

  useEffect(() => {
    getChats();
  }, []);

  return <div>
    Chat
    <TextField
      onChange={(e) => {
        setGroup(e.target.value);
      }}
    >
    </TextField>
    <Button onClick={handleSaveGroup}>Save</Button>
    <List component="nav" aria-label="secondary mailbox folders">
      {groupList.map((item) => (<ListItem button key={item.id}>
        name: {item.name}
        createdBy:{item.uid}
        <DeleteButton id={item.id} />
      </ListItem>))}
    </List>
  </div>;
}

function DeleteButton({ id }) {
  const dispatch = useContextDispatch();
  function handleDeleteGroup(id) {
    db.collection("groups").doc(id).delete().then(() => {
      dispatch({ type: "showSnackbar", successMessage: "Deleted" });
    }).catch((error) => {
      console.log(error);
    });
  }
  return (<Button
    onClick={() => {
      handleDeleteGroup(id);
    }}
  >
    Delete
  </Button>);
}
