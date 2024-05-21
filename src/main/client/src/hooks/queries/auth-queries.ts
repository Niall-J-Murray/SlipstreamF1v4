import {useQuery} from "react-query";
import {getUserFromLocalStorage} from "../../services/auth.service.ts";

export const useUserAuth = () =>
    useQuery({
        queryKey: ["currentUser"],
        queryFn: () => getUserFromLocalStorage(),
    });
