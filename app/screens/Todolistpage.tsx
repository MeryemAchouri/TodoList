import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { db } from "../config/firebaseConf";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { auth } from "../config/firebaseConf";
type Item = {
  ownerId: string;
  id: string;
  title: string;
  isChecked: boolean;
  createdAt?: any;
};

const Todolistpage: React.FC = () => {
  const navigation : NavigationProp<ParamListBase> = useNavigation();
  const { handleLogOut } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  const addItems = async () => {
    try {
      const docRef = await addDoc(collection(db, "Items"), {
        ownerId: auth.currentUser?.uid,
        title,
        isChecked: false,
        createdAt: serverTimestamp(),
      });
      Alert.alert("Item added successfully");
      setItems([
        ...items,
        {
          id: docRef.id,
          ownerId: auth.currentUser?.uid,
          title,
          isChecked: false,
        } as Item,
      ]);
      setTitle("");
      setVisible(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Items", id));
      Alert.alert("Item deleted successfully");
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const modifyItem = async (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      const newIsChecked = !item.isChecked;
      try {
        await updateDoc(doc(db, "Items", id), {
          isChecked: newIsChecked,
        });
        setItems(
          items.map((item) =>
            item.id === id ? { ...item, isChecked: newIsChecked } : item
          )
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "Items"));
      const fetchedItems: Item[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Item, "id">;
        if (data.ownerId === auth.currentUser?.uid) {
          fetchedItems.push({ id: doc.id, ...data });
        }
      });
      setItems(fetchedItems);
      setVisible(fetchedItems.length > 0);
    };

    fetchItems();
  }, []);


  return (
    <View style={styles.background}>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => handleLogOut(navigation)}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="Add a note"
          style={styles.input}
          onChangeText={setTitle}
          value={title}
        />
        <View style={styles.addButton}>
          <TouchableOpacity onPress={addItems}>
            <Ionicons name="add" color="#ffffff" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {visible ? (
        items.map((item) => (
          <View key={item.id} style={styles.container}>
            <View style={styles.item}>
              <View style={styles.checked}>
                <TouchableOpacity onPress={() => modifyItem(item.id)}>
                  <Ionicons
                    name={
                      item.isChecked
                        ? "radio-button-on-outline"
                        : "radio-button-off-outline"
                    }
                    size={24}
                    style={styles.pencilIcon}
                  />
                </TouchableOpacity>
                <Text>{item.title}</Text>
              </View>
              <View style={styles.icons}>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Ionicons name="trash" size={20} style={styles.trashIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.noItem}>
          <Ionicons
            name="document-outline"
            color="#5FC2BA"
            size={60}
            style={{ textAlign: "center" }}
          />
          <Text style={styles.text}>No Notes</Text>
        </View>
      )}
    </View>
  );
};

export default Todolistpage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  button: {
    justifyContent: "flex-end",
    marginBottom: 20,
    marginTop: 20,
    width: "95%",
    flexDirection: "row",
  },
  buttonText: {
    color: "#5FC2BA",
    fontSize: 17,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 5,
    width: "80%",
    backgroundColor: "#EBF2FA",
    padding: 18,
    borderRadius: 10,
  },
  addButton: {
    padding: 12,
    justifyContent: "center",
    marginBottom: 2,
    backgroundColor: "#06668C",
    width: "15%",
    flexDirection: "row",
    borderRadius: 10,
  },
  container: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    backgroundColor: "#EBF2FA",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  trashIcon: {
    color: "#F26619",
    paddingLeft: 10,
  },
  pencilIcon: {
    color: "#5FC2BA",
    paddingRight: 5,
  },
  text: {
    fontSize: 20,
    color: "#5FC2BA",
    textAlign: "center",
    marginTop: 20,
  },
  checked: {
    flexDirection: "row",
    alignItems: "center",
  },
  noItem: {
    marginTop: 50,
    justifyContent: "center",
  },
});
