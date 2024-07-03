import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertIcon, Box, Center } from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function OAuthLogin(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const { setMemberInfo } = useContext(LoginContext);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get("username");
    const accessToken = queryParams.get("token");

    if (username && accessToken) {
      setUsername(username);
      setAccessToken(accessToken);

      axios
        .get("/api/member/info?username=" + username)
        .then((response) => {
          const memberInfo = {
            access: accessToken,
            id: "" + response.data.member.id,
            nickname: response.data.member.nickname,
          };
          console.log(memberInfo);
          setMemberInfo(memberInfo);

          // 토큰을 로컬 스토리지에 저장
          localStorage.setItem("memberInfo", JSON.stringify(memberInfo));

          navigate("/");
        })
        .catch();
    }
  }, [location, navigate]);

  return (
    <Center mt={10}>
      <Box w={500} p={10} boxShadow="lg" borderRadius="md" bg="white">
        <Alert
          status="info"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <Box fontSize="xl" fontWeight="bold" mt={4} mb={2}>
            불편을 드려 죄송합니다.
          </Box>
          <Box>해당 서비스는 추후 업데이트 예정입니다. :(</Box>
        </Alert>
      </Box>
    </Center>
  );
}
