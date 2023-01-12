import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Context } from "../../Context/ContextProvider";
import { findSender } from "../../utils/chatUtils";
import { BACKEND_URL } from "../../utils/helpers";
import SelectUsers from "../SelectUsers";

const CreateGroup = ({ createChat }) => {
  const {
    user,
    isCreateOpen,
    setCreateOpen,
    chats,
    setSelectedChat,
    setChats,
  } = useContext(Context);

  const toast = useToast();

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [group, setGroup] = useState({
    chatName: "",
    chatAvatar: "",
  });

  const showToast = (title, status, position, desc = "") => {
    toast({
      title: title,
      description: desc,
      position: position,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };

  const [selectedId, setselectedId] = useState([]);

  const [userList, setUserList] = useState(
    Array.isArray(chats) &&
      chats
        ?.slice(0, 10)
        .map((item) => (!item.isGroupChat ? findSender(item, user) : null))
  );

  const getBase64 = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (Math.round(file.size / 1000) > 5000) {
      showToast("File size must be less than 5mb", "warning");
      setLoading(false);
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setGroup((prev) => ({ ...prev, chatAvatar: reader.result }));
    };
    setLoading(false);
  };

  const createGroup = async () => {
    if (group.chatName.length === 0) {
      showToast("Please enter a group name", "warning", "top");
      return;
    }
    if (selectedId.length < 2) {
      showToast(
        "Minimum 2 members needed!!",
        "info",
        "top",
        "You lonely?? 😂!"
      );
      return;
    }

    setLoading(true);

    const response = await fetch(`${BACKEND_URL}/api/group`, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      }),
      body: JSON.stringify({ ...group, users: selectedId }),
    });

    if (response.ok) {
      const data = await response.json();
      setChats([...chats, data]);
      setSelectedChat(data);
      setCreateOpen(false);
    } else {
      toast({
        title: "Could not connect!!",
        description: "Something went wrong 😥",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <Modal
      size={["xs", "sm"]}
      scrollBehavior="inside"
      isOpen={isCreateOpen}
      onClose={() => {
        setCreateOpen(false);
        setMessage("");
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader height="fit-content">
          <Text fontSize="25" textAlign="center">
            Create a new Group
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll" className="custom-scrollbar-search">
          <>
            <div className="input_container">
              <Text fontSize={"sm"}>Group name</Text>
              <Input
                name="chatName"
                value={group.chatName}
                onChange={(e) => {
                  setGroup({ ...group, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="input_container">
              <Text marginTop="10px" fontSize={"sm"}>
                Group icon
              </Text>
              <Input
                size="xs"
                cursor="pointer"
                variant="outlined"
                type="file"
                accept="image/*"
                onChange={getBase64.bind(this)}
              />
            </div>

            <SelectUsers
              message={message}
              loading={loading}
              createGroup={createGroup}
              selectedId={selectedId}
              setselectedId={setselectedId}
              userList={userList}
              setUserList={setUserList}
            />
          </>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateGroup;
