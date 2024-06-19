// import React, { useEffect, useState } from "react";
// import { Box, Heading, Spinner } from "@chakra-ui/react";
// import { DiaryCommentList } from "./DiaryCommentList.jsx";
// import { DiaryCommentWrite } from "./DiaryCommentWrite.jsx";
// import axios from "axios";
//
// function DiaryCommentComponent() {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [diary, setDiary] = useState(null);
//
//   useEffect(() => {
//     const id = 1; // 사용할 id 값을 정의합니다. 필요에 따라 동적으로 변경하세요.
//     axios
//       .get(`/api/diaryComment/${id}`)
//       .then((res) => setDiary(res.data))
//       .catch((error) => {
//         console.error("Error fetching diary data:", error);
//         // 추가적인 오류 처리를 여기서 할 수 있습니다.
//       });
//   }, []);
//
//   if (!diary) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="100vh"
//       >
//         <Spinner size="xl" />
//       </Box>
//     );
//   }
//
//   return (
//     <Box>
//       <Box mb={7}>
//         <Heading>{diary.title || "Title"}</Heading>{" "}
//         {/* 동적으로 제목을 추가합니다. */}
//       </Box>
//       <Box mb={7}>
//         <DiaryCommentWrite
//           diaryId={diary.id}
//           isProcessing={isProcessing}
//           setIsProcessing={setIsProcessing}
//         />
//       </Box>
//       <Box mb={7}>
//         <DiaryCommentList
//           diaryId={diary.id}
//           setIsProcessing={setIsProcessing}
//           isProcessing={isProcessing}
//         />
//       </Box>
//     </Box>
//   );
// }
//
// export default DiaryCommentComponent;
