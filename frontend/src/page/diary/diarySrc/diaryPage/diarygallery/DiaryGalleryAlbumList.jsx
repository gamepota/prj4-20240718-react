import { Box, Center, FormControl, FormLabel, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function DiaryGalleryAlbumList() {
  const [album, setAlbum] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/gallery`)
      .then((res) => {
        setAlbum(res.data);
      })
      .catch((err) => {
        console.error("There was an error fetching the albums!", err);
      });
  }, []);

  return (
    <Center>
      <Box>
        <Box w={700} p={6} boxShadow="lg" borderRadius="md" bg="white">
          <FormControl>
            <FormLabel textAlign={"center"}>갤러리</FormLabel>
          </FormControl>
          <FormControl>
            <Box>
              {album.map((album) => (
                <li key={album.id}>
                  <Link to={`/photos/${album.id}`}>{album.name}</Link>
                </li>
              ))}
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Center>
  );
}
