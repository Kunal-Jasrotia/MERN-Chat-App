import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import { post } from '../../api/fetch'
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let toast = useToast()
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false)
  const naviagte = useNavigate()
  const submitHandler = async () => {
    setLoading(true)
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: 'Input Field cannot be empty',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top"
      })
      setLoading(false)
    }
    if (password !== confirmpassword) {
      toast({
        title: "Password Doesn't Match",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top"
      })
      setLoading(false)
    }
    const data = await post('api/user', { name, email, password, pic })
    if (data !== "error") {
      toast({
        title: "Sign Up Successful",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "top"
      })
      setLoading(false)
      localStorage.setItem("userInfo", JSON.stringify(data))
      naviagte("/chats");
    } else {
      toast({
        title: "Sign Up Failed",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top"
      })
      setLoading(false)
    }
  };

  const postDetails = (pics) => {
    console.log(pics);
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
