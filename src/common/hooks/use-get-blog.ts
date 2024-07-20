// imports
import { useQuery } from "@tanstack/react-query";
// config
import { axios } from "@/common/config";

// fetcher
export const getBlog = async () => {
  const { data } = await axios.get("/blog");
  return data as Blog;
};

// types
import { Blog } from "@/common/types";

// hooks
const useGetBlog = () => {
  return useQuery({ queryKey: ["blog"], queryFn: getBlog });
};

export default useGetBlog;