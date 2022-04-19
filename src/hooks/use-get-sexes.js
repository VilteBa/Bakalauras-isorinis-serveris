import { useQuery } from "react-query";
import { sexesQueryKey } from "./constants";

export function useGetSexes(){
    return useQuery([sexesQueryKey])
}